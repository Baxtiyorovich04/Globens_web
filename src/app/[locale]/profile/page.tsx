"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  FaUser,
  FaGamepad,
  FaTrophy,
  FaHistory,
  FaSignOutAlt,
  FaCamera,
} from "react-icons/fa";
import { IoMdStats } from "react-icons/io";
import { RiSwordFill } from "react-icons/ri";
import { GiPistolGun, GiHeadshot } from "react-icons/gi";
import { authService } from "@/API/services/auth";
import { profileService, ProfileData } from "@/API/services/profile";
import { useToast } from "@/components/ui/ToastContext";
import { useRouter } from "next/navigation";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import styles from "./ProfilePage.module.scss";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { TeamsSection } from "@/components/Teams/TeamsSection/TeamsSection";
import { API_URL } from "@/utilities/constants";
import ProfileEditModal from "@/components/ProfileEditModal";

// Skeleton component for loading state
const ProfileSkeleton = () => (
  <div className={styles.profilePage}>
    <div className={styles.heroSection}>
      <div className={styles.playerCard}>
        <div className={styles.avatarContainer}>
          <div className={`${styles.skeleton} ${styles.avatar}`}></div>
          <div className={styles.levelBadge}>...</div>
        </div>

        <div className={styles.playerInfo}>
          <div
            className={`${styles.skeleton} ${styles.text} ${styles.title}`}
          ></div>
          <div
            className={`${styles.skeleton} ${styles.text} ${styles.subtitle}`}
          ></div>
          <div
            className={`${styles.skeleton} ${styles.text} ${styles.short}`}
          ></div>
        </div>

        <div className={styles.quickStats}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.statItem}>
              <div className={`${styles.skeleton} ${styles.stat}`}></div>
              <div
                className={`${styles.skeleton} ${styles.text} ${styles.short}`}
              ></div>
            </div>
          ))}
        </div>

        <div className={styles.logoutSection}>
          <div className={`${styles.skeleton} ${styles.button}`}></div>
        </div>
      </div>
    </div>

    <div className={styles.mainContent}>
      <div className={styles.tabNavigation}>
        <div className={styles.tabsContainer}>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`${styles.skeleton} ${styles.button}`}
            ></div>
          ))}
        </div>
      </div>

      <div className={styles.statsTab}>
        <div className={styles.radarChartContainer}>
          <div
            className={`${styles.skeleton} ${styles.text} ${styles.title}`}
          ></div>
          <div className={styles.chartWrapper}>
            <div className={`${styles.skeleton} ${styles.card}`}></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function ProfilePage() {
  const t = useTranslations("ProfilePage");
  const locale = useLocale();
  const { showToast } = useToast();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("stats");
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [avatarKey, setAvatarKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const buildAvatarSrc = (avatarUrl?: string): string => {
    if (!avatarUrl || avatarUrl.trim() === "") {
      console.log("No avatar URL provided, using default");
      return "/assets/imgs/default-avatar.jpg";
    }
    

    if (avatarUrl.startsWith("http://") || avatarUrl.startsWith("https://")) {
      console.log("Avatar URL is already full URL:", avatarUrl);
      return avatarUrl;
    }
    

    try {
      const origin = new URL(API_URL).origin;
      const prefix = avatarUrl.startsWith("/") ? "" : "/";

      const cacheBuster = `?t=${Date.now()}`;
      const fullUrl = `${origin}${prefix}${avatarUrl}${cacheBuster}`;
      console.log("Built avatar URL:", fullUrl);
      return fullUrl;
    } catch (error) {
      console.warn("Failed to build avatar URL:", error);
      return "/assets/imgs/default-avatar.jpg";
    }
  };

  const checkAuth = useCallback(() => {
    if (!authService.isAuthenticated()) {
      showToast({
        type: "error",
        title: "Xatolik",
        message: "Siz tizimga kirmagansiz. Iltimos, avval tizimga kiring.",
        duration: 5000,
      });
      router.replace(`/${locale}/login`);
      return false;
    }
    return true;
  }, [showToast, router, locale]);


  const fetchProfileData = useCallback(async () => {
    try {

      if (!checkAuth()) {
        return;
      }

      setLoading(true);
      setError(null);

      const response = await profileService.getProfile();

      if (response.success && response.data) {
        setProfileData(response.data);
      } else {
        throw new Error(response.message || "Profil ma'lumotlari yuklanmadi");
      }
    } catch (error: unknown) {
      console.error("Error fetching profile:", error);

      let errorMessage = "Profil ma'lumotlari yuklanmadi";

      if (error && typeof error === "object" && "message" in error) {
        errorMessage = (error as { message: string }).message || errorMessage;
      }

      if (error && typeof error === "object" && "message_type" in error) {
        const errorObj = error as { message_type: string; message: string };
        if (errorObj.message_type === "error") {
          if (
            errorObj.message.includes("sessiyangiz tugagan") ||
            errorObj.message.includes("tizimga kirmagansiz")
          ) {
            showToast({
              type: "error",
              title: "Xatolik",
              message: errorObj.message,
              duration: 5000,
            });
            authService.logout();
            router.replace(`/${locale}/login`);
            return;
          }
        }
      }

      setError(errorMessage);
      showToast({
        type: "error",
        title: "Xatolik",
        message: errorMessage,
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  }, [showToast, checkAuth, router, locale]);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.replace(`/${locale}/login`);
      return;
    }
    fetchProfileData();
  }, [fetchProfileData, router, locale]);

  useEffect(() => {
    console.log("Profile data changed:", profileData);
    console.log("Avatar URL:", profileData?.avatar);
  }, [profileData]);


  useEffect(() => {
    console.log("Avatar key changed:", avatarKey);
  }, [avatarKey]);


  useEffect(() => {
    if (profileData?.avatar) {
      const finalUrl = buildAvatarSrc(profileData.avatar);
      console.log("Final avatar URL being used:", finalUrl);
    }
  }, [profileData?.avatar]);

  const handleProfileUpdate = (updatedData: ProfileData) => {
    setProfileData(updatedData);
  };

  const handleAvatarFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast({
        type: "error",
        title: "Xatolik",
        message: "Faqat rasm faylini yuklang",
        duration: 3000,
      });
      e.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast({
        type: "error",
        title: "Xatolik",
        message: "Rasm hajmi 5MB dan katta",
        duration: 3000,
      });
      e.target.value = "";
      return;
    }

    try {
      const res = await profileService.uploadAvatar(file);
      if (!res.success) {
        throw new Error(res.message || "Avatar yuklanmadi");
      }
      
      // If the API response contains updated profile data, update it immediately
      if (res.data && profileData) {
        console.log("Avatar upload response:", res.data);
        console.log("Current profile data:", profileData);
        setProfileData({
          ...profileData,
          avatar: res.data.avatar || profileData.avatar
        });
        setAvatarKey(prev => prev + 1);
        console.log("Profile data updated with new avatar URL");
      }
      
      await fetchProfileData();
      
      showToast({
        type: "success",
        title: "Muvaffaqiyatli",
        message: "Avatar yangilandi",
        duration: 3000,
      });
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "message" in err
          ? (err as { message: string }).message
          : "Avatar yuklanmadi";
      showToast({
        type: "error",
        title: "Xatolik",
        message: msg,
        duration: 5000,
      });
    } finally {

      e.target.value = "";
    }
  };

  const handleLogout = async () => {
    setLogoutLoading(true);

    try {

      try {
        await authService.logoutApi();
      } catch (apiError) {
        console.warn(
          "Logout API failed, but continuing with local logout:",
          apiError
        );
      }

      // Always clear local data
      authService.logout();

      showToast({
        type: "success",
        title: "Muvaffaqiyatli",
        message: "Muvaffaqiyatli chiqildi",
        duration: 3000,
      });

      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);

      // Even if there's an error, try to logout locally
      try {
        authService.logout();
        router.push("/");
      } catch (localError) {
        console.error("Local logout failed:", localError);
        showToast({
          type: "error",
          title: "Xatolik",
          message:
            "Chiqishda xatolik yuz berdi. Iltimos, brauzerni qayta ishga tushiring.",
          duration: 5000,
        });
      }
    } finally {
      setLogoutLoading(false);
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (error || !profileData) {
    return (  
      <div className={styles.profilePage}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className={styles.errorTitle}>Profil yuklanmadi</h2>
          <p className={styles.errorMessage}>
            {error || "Profil ma'lumotlarini yuklashda xatolik yuz berdi"}
          </p>
          <div className={styles.errorActions}>
            <button onClick={fetchProfileData} className={styles.retryButton}>
              Qaytadan urinish
            </button>
            <button
              onClick={() => router.push("/")}
              className={styles.homeButton}
            >
              Bosh sahifaga qaytish
            </button>
            <button
              onClick={() => router.replace(`/${locale}/login`)}
              className={styles.loginButton}
            >
              Qaytadan kirish
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.heroSection}>
        <div className={styles.playerCard}>
          <div className={styles.avatarContainer}>
            <Image
              key={`${profileData?.avatar || 'default'}-${avatarKey}`}
              src={buildAvatarSrc(profileData?.avatar)}
              alt={profileData?.full_name || "Profile"}
              width={120}
              height={120}
              className={styles.avatar}
              priority
              onLoad={() => {
                console.log("Avatar loaded successfully:", profileData?.avatar);
              }}
              onError={(e) => {
                console.log("Avatar failed to load, using default");
                // If avatar fails to load, use default avatar
                const target = e.target as HTMLImageElement;
                target.src = "/assets/imgs/default-avatar.jpg";
                target.onerror = null; // Prevent infinite loop
              }}
            />
            <div className={styles.levelBadge}>87</div>

            <div className={styles.playerInfo}>
              <h1 className={styles.nickname}>
                {profileData?.full_name || "Unknown"}
              </h1>
              <div className={styles.rankBadge}>
                <span>✦</span> Diamond III
              </div>
              <p className={styles.username}>
                @{profileData?.username || "unknown"}
              </p>
              <div className={styles.avatarActions}>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={styles.avatarEditButton}
                  title="Avatarni o'zgartirish"
                >
                  <FaCamera />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleAvatarFileChange}
                />
              </div>
              <button
                onClick={() => setShowEditModal(true)}
                className={styles.editButton}
              >
                <FaUser /> Edit Profile
              </button>
            </div>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.quickStats}>
              <div className={styles.statItem}>
                <div className={styles.statValue}>2450</div>
                <div className={styles.statLabel}>{t("quickStats.elo")}</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>2.8</div>
                <div className={styles.statLabel}>{t("quickStats.kd")}</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>78%</div>
                <div className={styles.statLabel}>{t("quickStats.win")}</div>
              </div>
            </div>

            <div className={styles.logoutSection}>
              <button
                className={styles.logoutButton}
                onClick={handleLogout}
                disabled={logoutLoading}
              >
                <FaSignOutAlt />
                {logoutLoading ? t("logout.loggingOut") : t("logout.logout")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.tabNavigation}>
          <div className={styles.tabsContainer}>
            <button
              className={`${styles.tabButton} ${
                activeTab === "stats" ? "active" : ""
              }`}
              onClick={() => setActiveTab("stats")}
            >
              <IoMdStats /> {t("tabs.stats")}
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "matches" ? "active" : ""
              }`}
              onClick={() => setActiveTab("matches")}
            >
              <FaHistory /> {t("tabs.matches")}
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "teams" ? "active" : ""
              }`}
              onClick={() => setActiveTab("teams")}
            >
              <FaUser /> {t("tabs.teams")}
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "achievements" ? "active" : ""
              }`}
              onClick={() => setActiveTab("achievements")}
            >
              <FaTrophy /> {t("tabs.achievements")}
            </button>
          </div>
        </div>

        {activeTab === "stats" && (
          <div className={styles.statsTab}>
            <div className={styles.radarChartContainer}>
              <h3>
                <IoMdStats /> {t("stats.radarTitle")}
              </h3>
              <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    data={[
                      { stat: "Rating", value: 2450, max: 3000 },
                      { stat: "K/D", value: 1345, max: 5 },
                      { stat: "Headshots", value: 2300, max: 100 },
                      { stat: "Win Rate", value: 1500, max: 100 },
                      { stat: "Accuracy", value: 2500, max: 100 },
                      { stat: "Clutches", value: 1200, max: 30 },
                    ]}
                  >
                    <PolarGrid stroke="#4B5563" />
                    <PolarAngleAxis
                      dataKey="stat"
                      tick={{ fill: "#E5E7EB", fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, "dataMax"]}
                      stroke="#4B5563"
                    />
                    <Radar
                      name="Stats"
                      dataKey="value"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.4}
                      dot={{ fill: "#8B5CF6", strokeWidth: 2 }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statsCard}>
                <h4>
                  <GiPistolGun /> {t("stats.combatTitle")}
                </h4>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>{t("stats.kd")}</span>
                  <span className={styles.statValue}>2.8</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>
                    {t("stats.headshots")}
                  </span>
                  <span className={styles.statValue}>63%</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>
                    {t("stats.accuracy")}
                  </span>
                  <span className={styles.statValue}>42%</span>
                </div>
              </div>

              <div className={styles.statsCard}>
                <h4>
                  <FaGamepad /> {t("stats.performanceTitle")}
                </h4>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>
                    {t("stats.matchesPlayed")}
                  </span>
                  <span className={styles.statValue}>426</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>{t("stats.winRate")}</span>
                  <span className={styles.statValue}>78%</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>
                    {t("stats.currentStreak")}
                  </span>
                  <span className={`${styles.statValue} positive`}>+5</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "matches" && (
          <div className={styles.matchesTab}>
            <div className={styles.matchesHeader}>
              <h3>
                <FaHistory /> {t("matches.recentMatches")}
              </h3>
            </div>
            <div className={styles.matchesList}>
              {[
                {
                  id: 1,
                  game: "CS2",
                  map: "Mirage",
                  result: "Victory",
                  score: "16-8",
                  kda: "32/5/10",
                  rating: 9.4,
                  date: "15.05.2023",
                },
                {
                  id: 2,
                  game: "Valorant",
                  map: "Ascent",
                  result: "Defeat",
                  score: "11-13",
                  kda: "18/12/7",
                  rating: 6.2,
                  date: "14.05.2023",
                },
                {
                  id: 3,
                  game: "CS2",
                  map: "Inferno",
                  result: "Victory",
                  score: "16-12",
                  kda: "27/8/14",
                  rating: 8.9,
                  date: "13.05.2023",
                },
              ].map((match) => (
                <div
                  key={match.id}
                  className={`${
                    styles.matchCard
                  } ${match.result.toLowerCase()}`}
                >
                  <div className={styles.gameInfo}>
                    <span className={styles.gameIcon}>
                      {match.game === "CS2" ? "🔫" : "💥"}
                    </span>
                    <div className={styles.gameDetails}>
                      <div className={styles.gameName}>{match.game}</div>
                      <div className={styles.gameMap}>{match.map}</div>
                    </div>
                  </div>

                  <div className={styles.matchResult}>
                    <span
                      className={`${
                        styles.resultText
                      } ${match.result.toLowerCase()}`}
                    >
                      {t(`matches.${match.result.toLowerCase()}`)}
                    </span>
                    <span className={styles.matchScore}>{match.score}</span>
                  </div>

                  <div className={styles.matchStats}>
                    <div className={styles.kda}>{match.kda}</div>
                    <div className={styles.rating}>
                      {t("matches.rating")}: {match.rating}
                    </div>
                  </div>

                  <div className={styles.matchDate}>{match.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "teams" && <TeamsSection />}

        {activeTab === "achievements" && (
          <div className={styles.achievementsTab}>
            {[
              {
                id: 1,
                title: "Headshot Machine",
                icon: <GiHeadshot size={20} />,
                unlocked: "12.03.2023",
              },
              {
                id: 2,
                title: "Win Streak (10)",
                icon: <FaTrophy size={20} />,
                unlocked: "05.04.2023",
              },
              {
                id: 3,
                title: "Clutch Master",
                icon: <RiSwordFill size={20} />,
                unlocked: "22.04.2023",
              },
            ].map((achievement) => (
              <div key={achievement.id} className={styles.achievementCard}>
                <div className={styles.achievementContent}>
                  <div className={styles.iconContainer}>{achievement.icon}</div>
                  <div className={styles.achievementInfo}>
                    <div className={styles.achievementTitle}>
                      {achievement.title}
                    </div>
                    <div className={styles.achievementDate}>
                      {t("achievements.unlocked")}: {achievement.unlocked}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        profileData={profileData}
        onProfileUpdate={handleProfileUpdate}
      />
    </div>
  );
}
