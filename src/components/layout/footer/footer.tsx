"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.scss";
import { useTranslations, useLocale } from "next-intl";
import { FaInstagram, FaTelegramPlane, FaYoutube } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { usePathname } from "next/navigation";

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const pathname = usePathname();
  
  
  const isNewsPage = pathname.includes('/news');
  const footerClassName = isNewsPage ? `${styles.footer} ${styles.newsFooter}` : styles.footer;

  const sections = [
    // {
    //   title: t("quickLinks.title"),
    //   links: [
    //     { label: t("quickLinks.shop"), href: "#" },
    //     { label: t("quickLinks.eSport"), href: "#" },
    //     { label: t("quickLinks.licensing"), href: "#" },
    //   ], 
    // },
    // {
    //   title: t("company.title"),
    //   links: [
    //     { label: t("company.products"), href: "#" },
    //     { label: t("company.appsGames"), href: "#" },
    //     { label: t("company.features"), href: "#" },
    //   ],
    // },
    {
      title: t("help.title"),
      links: [
        { label: t("help.about"), href: `/${locale}/about` },
        // { label: t("help.support"), href: "#" },
        { label: t("help.contactUs"), href: "#" },
      ],
    },
    // {
    //   title: t("resources.title"),
    //   links: [
    //     { label: t("resources.youtubePlaylist"), href: "#" },
    //     { label: t("resources.howToBlog"), href: "#" },
    //     { label: t("resources.termsConditions"), href: "#" },
    //   ],
    // },
  ];

  const socialLinks = [
    { icon: <FaInstagram />, href: "#", key: "instagram" },
    { icon: <FaTelegramPlane />, href: "#", key: "telegram" },
    { icon: <FaYoutube />, href: "#", key: "youtube" },
    { icon: <RiTwitterXLine />, href: "#", key: "twitter-x" },
  ];

  return (
    <footer className={footerClassName}>
      <div className={styles.container}>
        {/* Desktop Layout */}
        <div className={styles.desktopLayout}>
          <div className={styles.brand}>
            <Link href={`/${locale}`} className={styles.logo}>
              <Image
                src="/assets/icons/logo.svg"
                alt="Globens Logo"
                width={40}
                height={40}
                priority
              />
              <span>Globens</span>
            </Link>

            <div className={styles.socials}>
              {socialLinks.map((social) => (
                <a
                  key={social.key}
                  href={social.href}
                  className={styles.social}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <p className={styles.copyright}>{t("copyright")}</p>
          </div>

          <div className={styles.links}>
            {sections.map((section) => (
              <div key={section.title} className={styles.section}>
                <h4>{section.title}</h4>
                {section.links.map((link) => (
                  <Link key={link.label} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className={styles.mobileLayout}>
          {/* Logo at top */}
          <div className={styles.mobileLogo}>
            <Link href={`/${locale}`} className={styles.logo}>
              <Image
                src="/assets/icons/logo.svg"
                alt="Globens Logo"
                width={40}
                height={40}
                priority
              />
              <span>Globens</span>
            </Link>
          </div>

          {/* Links with h4 left, a tags right */}
          <div className={styles.mobileLinks}>
            {sections.map((section) => (
              <div key={section.title} className={styles.mobileSection}>
                <h4>{section.title}</h4>
                <div className={styles.mobileLinksList}>
                  {section.links.map((link) => (
                    <Link key={link.label} href={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Social icons and copyright at bottom */}
          <div className={styles.mobileBottom}>
            <div className={styles.socials}>
              {socialLinks.map((social) => (
                <a
                  key={social.key}
                  href={social.href}
                  className={styles.social}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className={styles.copyright}>{t("copyright")}</p>
          </div>
        </div>
      </div>
      <Image
        className={styles.footerText}
        src="/assets/imgs/footerText.svg"
        alt="Globens Logo"
        width={1192}
        height={233}
        priority
      />
    </footer>
  );
}
