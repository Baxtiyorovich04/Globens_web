"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CreateTeamModal } from "../CreateTeamModal/CreateTeamModal";
import { TeamsList } from "../TeamsList/TeamsList";
import { CreateTeamData, Team } from "@/types/teams";
import { teamsService } from "@/API/services/teams";
import { useToast } from "@/components/ui/ToastContext";
import { useTranslations } from "next-intl";
import styles from "./TeamsSection.module.scss";

export const TeamsSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [joinTeamId, setJoinTeamId] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const { showToast } = useToast();
  const t = useTranslations("TeamsPage");

  const loadTeams = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await teamsService.getTeams();

      if (response.data && Array.isArray(response.data)) {
        setTeams(response.data);
      } else {
        setTeams([]);
      }
    } catch (error) {
      console.error("Error loading teams:", error);
      setTeams([]);
      showToast({
        type: "error",
        title: t("error"),
        message: t("teamsLoadError"),
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  }, [showToast, t]);

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  const handleCreateTeam = async (data: CreateTeamData) => {
    try {
      setIsSubmitting(true);

      const response = await teamsService.createTeam(data);

      if (response.data) {
        // Muvaffaqiyatli xabar
        showToast({
          type: "success",
          title: t("success"),
          message: t("teamCreated"),
          duration: 5000,
        });

        // Modalni yopish
        setIsModalOpen(false);

        // Jamoalar ro'yxatini yangilash
        await loadTeams();
      } else {
        throw new Error(t("teamNotCreated"));
      }
    } catch (error) {
      console.error("Error creating team:", error);
      showToast({
        type: "error",
        title: t("error"),
        message: t("createTeamError"),
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleJoinTeam = async () => {
    if (!joinTeamId.trim()) {
      showToast({
        type: "error",
        title: t("error"),
        message: t("teamJoinError"),
        duration: 5000,
      });
      return;
    }

    try {
      setIsJoining(true);
      const response = await teamsService.joinTeam(parseInt(joinTeamId));

      showToast({
        type: "success",
        title: t("success"),
        message: response.message || t("teamJoinSuccess"),
        duration: 5000,
      });

      setJoinTeamId('');
      // Teams ro'yxatini yangilash
      await loadTeams();
    } catch (error: unknown) {
      console.error("Error joining team:", error);
      const errorMessage = error instanceof Error ? error.message : t("teamJoinFailed");
      showToast({
        type: "error",
        title: t("error"),
        message: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsJoining(false);
    }
  };

  const handleTeamClick = (team: Team) => {
    // Jamoa haqida batafsil ma'lumot ko'rsatish yoki jamoa sahifasiga o'tish
    console.log("Team clicked:", team);
    showToast({
      type: "info",
      title: t("teamSelected"),
      message: t("teamSelectedMessage", { name: team.name }),
      duration: 3000,
    });
  };

  return (
    <section className={styles.teamsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{t("title")}</h2>
          <div className={styles.actions}>
            {/* Jamoa qo&apos;shilish input va tugma */}
            <div className={styles.joinTeamSection}>
              <input
                type="text"
                placeholder={t("joinTeamPlaceholder")}
                value={joinTeamId}
                onChange={(e) => setJoinTeamId(e.target.value)}
                className={styles.joinTeamInput}
                disabled={isJoining}
              />
              <button 
                className={styles.joinTeamButton}
                onClick={handleJoinTeam}
                disabled={isJoining || !joinTeamId.trim()}
              >
                <span className={styles.buttonText}>{isJoining ? t("joining") : t("joinTeamButton")}</span>
                <span className={styles.buttonIcon}>🤝</span>
              </button>
            </div>

            <button
              className={styles.createTeamButton}
              onClick={() => setIsModalOpen(true)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5V19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.teamsContent}>
          {isLoading ? (
            <div className={styles.loadingState}>
              <div className={styles.loadingSpinner}></div>
              <p>{t("loading")}</p>
            </div>
          ) : teams.length > 0 ? (
            <TeamsList teams={teams} onTeamClick={handleTeamClick} />
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M23 21V19C23 18.1137 22.7155 17.2358 22.2094 16.5558C21.7033 15.8759 20.9991 15.4279 20.22 15.22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 3.13C16.8704 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0218 6.11683 19.0218 7.005C19.0218 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8704 10.6597 16 10.88"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>{t("emptyTitle")}</h3>
              <p>{t("emptySubtext")}</p>
              <button
                className={styles.emptyStateButton}
                onClick={() => setIsModalOpen(true)}
              >
                {t("emptyButton")}
              </button>
            </div>
          )}
        </div>
      </div>

      <CreateTeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTeam}
        isLoading={isSubmitting}
      />
    </section>
  );
};
