"use server";

import styles from "../home.module.scss";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { getNews } from "@/API/services/news";
import { Suspense } from "react";
import RelatedNewsCarousel from "@/components/Cards/RelatedNewsCarousel/RelatedNewsCarousel";
import RelatedNewsCarouselSkeleton from "@/components/Cards/RelatedNewsCarousel/RelatedNewsCarouselSkeleton";
import Pgames from "@/components/Cards/Pgames_card/Pgames";
import PgamesListSkeleton from "@/components/Cards/Pgames_card/PgamesListSkeleton";
import BannerCarousel from "@/components/banners/Banner";
import BannerSkeleton from "@/components/banners/BannerSkeleton";
import { getGames } from "@/API/services/games";
import { getBanners } from "@/API/services/banners";
import Image from "next/image";
import { isUserLoggedIn } from "@/utilities/authServer";

export default async function ClientHomePage() {
  const t = await getTranslations("HomePage");
  const locale = await getLocale();
  const news = getNews();
  const games = getGames();
  const banners = getBanners();
  const isLoggedIn = await isUserLoggedIn();

  return (
    <main className={styles.mainContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.backgroundSpheres}>
          <svg className={styles.sphere} width="408" height="426" viewBox="0 0 408 426" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_f_5_198)">
              <path d="M184.711 103.562C243.531 117.68 319.626 216.07 305.486 274.985C291.346 333.9 192.325 331.029 133.504 316.911C74.6835 302.794 38.463 243.589 52.6032 184.675C66.7435 125.76 125.89 89.4446 184.711 103.562Z" fill="#7B61FF" />
            </g>
            <defs>
              <filter id="filter0_f_5_198" x="-50.4561" y="0.517212" width="457.66" height="424.918" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_5_198" />
              </filter>
            </defs>
          </svg>
          <svg className={styles.sphere} width="408" height="426" viewBox="0 0 408 426" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_f_5_198)">
              <path d="M184.711 103.562C243.531 117.68 319.626 216.07 305.486 274.985C291.346 333.9 192.325 331.029 133.504 316.911C74.6835 302.794 38.463 243.589 52.6032 184.675C66.7435 125.76 125.89 89.4446 184.711 103.562Z" fill="#7B61FF" />
            </g>
            <defs>
              <filter id="filter0_f_5_198" x="-50.4561" y="0.517212" width="457.66" height="424.918" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_5_198" />
              </filter>
            </defs>
          </svg>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroTitleBox}>
            <h1 className={styles.heroTitle}>{t("herotitle")}</h1>
            <p className={styles.heroDescription}>{t("titledes")}</p>
            <div className={styles.heroButtons}>
              {!isLoggedIn && (
                <>
                  <Link className={styles.primaryButton} href={`/${locale}/login`}>
                    {t("loginbtn")}
                  </Link>
                  <Link className={styles.secondaryButton} href={`/${locale}/register`}>
                    {t("registerbtn")}
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className={styles.gamepadSection}>
            <div className={styles.gamepadContainer}>
              <Image
                src="/assets/imgs/homePageGamePad.svg"
                alt="Gaming Controller"
                width={400}
                height={400}
                className={styles.gamepad}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Banner Carousel */}
      <section className={styles.bannerSection}>
        <Suspense fallback={<BannerSkeleton />}>
          <BannerCarousel bannerResource={banners} />
        </Suspense>
      </section>

      {/* News Section */}
      <section className={styles.newsSection}>
        <Suspense fallback={<RelatedNewsCarouselSkeleton itemsPerView={3} />}>
          <RelatedNewsCarousel newsResource={news} />
        </Suspense>
      </section>

      {/* Popular Games Section */}
      <section className={styles.popularGamesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t("popularGamesTitle")}</h2>
          <Link href={`/${locale}/games`} className={styles.viewAllLink}>
            {t("viewAllText")}
          </Link>
        </div>
        <Suspense fallback={<PgamesListSkeleton limit={3} />}>
          <Pgames gameResource={games} />
        </Suspense>
      </section>
    </main>
  );
}
