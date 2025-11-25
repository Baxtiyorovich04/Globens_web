"use client";

import styles from "./about.module.scss";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
  const t = useTranslations("AboutPage");
  const whyChooseRef = useRef<HTMLElement>(null);
  const timelineProgressRef = useRef<HTMLDivElement>(null);


  const features = [
    {
      icon: "/assets/icons/PremgameIcon.svg",
      title: t("premiumGaming"),
      description: t("premiumGamingDesc"),
    },
    {
      icon: "/assets/icons/teamIcon.svg",
      title: t("vibrantCommunity"),
      description: t("vibrantCommunityDesc"),
    },
    {
      icon: "/assets/icons/CompataiveIcon.svg",
      title: t("competitivePlay"),
      description: t("competitivePlayDesc"),
    },
    {
      icon: "/assets/icons/GlobusIcon.svg",
      title: t("globalReach"),
      description: t("globalReachDesc"),
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.active);
          } else {
            entry.target.classList.remove(styles.active);
          }
        });
      },
      { threshold: 0.5 }
    );

    const cards = whyChooseRef.current?.querySelectorAll(
      `.${styles.featureCard}`
    );
    cards?.forEach((card) => observer.observe(card));

    return () => cards?.forEach((card) => observer.unobserve(card));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = whyChooseRef.current;
      const progressEl = timelineProgressRef.current;
      if (!section || !progressEl) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollPercent = (viewportHeight - rect.top) / rect.height;
      const progress = Math.min(100, Math.max(0, scrollPercent * 100));

      progressEl.style.height = `${progress}%`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.aboutPage}>
      <motion.section
        className={styles.heroSection}
      >
        <Image
          src="/assets/imgs/rightEffect.svg"
          alt=""
          width={500}
          height={500}
          className={styles.rheroEffect}
        />
        <Image
          src="/assets/imgs/leftEffect.svg"
          alt=""
          width={500}
          height={500}
          className={styles.lheroEffect}
        />
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              className={styles.heroGamepad}
              src="/assets/imgs/bgGamePad.svg"
              alt="Gamepad"
              width={405}
              height={377}
              priority
            />
          </motion.div>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {t("heroTitle")}
          </motion.h1>
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {t("heroSubtitle")}
          </motion.p>
        </div>
      </motion.section>

      <motion.section
        className={styles.whyChooseSection}
        ref={whyChooseRef}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <h2 className={styles.sectionTitle}>
          {t("whyChoose")}
        </h2>
        <div className={styles.featuresContainer}>
          <div className={styles.timeline}>
            <div
              className={styles.timelineProgress}
              ref={timelineProgressRef}
            ></div>
            {features.map((_, idx) => (
              <div key={idx} className={styles.timelineDot}></div>
            ))}
          </div>
          <div className={styles.cardsColumn}>
            {features.map((feature, idx) => (
              <div key={feature.title} className={styles.featureRow}>
                {idx % 2 === 0 ? (
                  <motion.div
                    className={`${styles.featureCard} ${styles.left}`}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
                    whileHover={{
                      scale: 1.07,
                      boxShadow: "0 0 40px 0 #7b61ff",
                      background:
                        "radial-gradient(65.41% 65.41% at 44.89% 16.89%, #7b61ff 0%, #624ecc 50%, #4a3a99 100%)",
                    }}
                    style={{ position: 'relative' }}
                  >
                    <motion.div
                      className={styles.featureIcon}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={80}
                        height={80}
                      />
                    </motion.div>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>
                  </motion.div>
                ) : (
                  <div className={styles.empty}></div>
                )}
                <div className={styles.timelineSpacer}></div>
                {idx % 2 !== 0 ? (
                  <motion.div
                    className={`${styles.featureCard} ${styles.right}`}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
                    whileHover={{
                      scale: 1.07,
                      boxShadow: "0 0 40px 0 #7b61ff",
                      background:
                        "radial-gradient(65.41% 65.41% at 44.89% 16.89%, #7b61ff 0%, #624ecc 50%, #4a3a99 100%)",
                    }}
                    style={{ position: 'relative' }}
                  >
                    <motion.div
                      className={styles.featureIcon}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={80}
                        height={80}
                      />
                    </motion.div>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>
                  </motion.div>
                ) : (
                  <div className={styles.empty}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className={styles.CyberWomenSec}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Image
            src="/assets/imgs/cyberWoman.svg"
            alt="CyberWomen"
            width={727}
            height={555}
          />
        </motion.div>
        <motion.div
          className={styles.CyberWomenContent}
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1 className={styles.CyberWomenTitle}>Globens</h1>
          <h3>{t("about")}</h3>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
