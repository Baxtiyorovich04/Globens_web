"use client";
import styles from "./header.module.scss";

import Link from "next/link";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

const navLinks = [
  { href: '/news', key: 'news' },
  // { href: '/magazin', key: 'magazin' },
  { href: '/tournaments', key: 'tournaments' },
  { href: '/teams', key: 'teams' },
  { href: '/about', key: 'about' },
  { href: '/servers', key: 'services' },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Header');
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const isActive = (href: string) => {
    // Remove locale from pathname for comparison
    const currentPath = pathname.replace(new RegExp(`^/${locale}`), '');
    if (href === '/') return currentPath === '/';
    return currentPath === href || currentPath.startsWith(href + '/');
  };

  const handleLanguageChange = () => {
    const languages = ['uz', 'ru', 'en'];
    const currentIndex = languages.indexOf(locale);
    const nextLang = languages[(currentIndex + 1) % languages.length];
    
    // Get current path without locale
    const currentPath = pathname.replace(new RegExp(`^/${locale}`), '');
    const newPath = `/${nextLang}${currentPath}`;
    router.push(newPath);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`${styles.header}${scrolled ? ' ' + styles.scrolled : ''}`}>
        <div className={styles.header_container}>
          <div className={styles.header_logo}>
            <Link href={`/${locale}`}>
              <Image
                src="/assets/icons/logo.svg"
                alt={t('logoAlt')}
                width={50}
                height={50}
                priority
                unoptimized
              />
            </Link>
            <Link href={`/${locale}`}>
              <h3>Globens</h3>
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className={styles.header_links}>
            {navLinks.map(link => (
              <Link
                key={link.key}
                href={`/${locale}${link.href}`}
                className={`${styles.nav_item} ${isActive(link.href) ? styles.active : ''}`}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          {/* Desktop Language Switcher and Profile - Hidden on mobile */}
          <div className={styles.header_right}>
            <LanguageSwitcher />
            <Link href={`/${locale}/profile`} className={styles.profile_button}>
              <FaUser size={20} />
            </Link>
          </div>

          {/* Mobile Menu Button - Only visible on mobile */}
          <button 
            className={styles.mobile_menu_button}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" fill="currentColor"/>
            </svg>
          </button>

          {/* Mobile Globe Button - Only visible on mobile */}
          <button 
            className={styles.mobile_globe_button}
            onClick={handleLanguageChange}
            aria-label="Change language"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`${styles.mobile_menu_overlay} ${isMenuOpen ? styles.open : ''}`}
        onClick={closeMenu}
      />

      {/* Mobile Sidebar Menu */}
      <div className={`${styles.mobile_menu} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.menu_header}>
          <div className={styles.menu_logo}>
            <Link href={`/${locale}`} onClick={closeMenu}>
              <Image
                src="/assets/icons/logo.svg"
                alt={t('logoAlt')}
                width={40}
                height={40}
                priority
                unoptimized
              />
            </Link>
            <Link href={`/${locale}`} onClick={closeMenu}>
              <h3>Globens</h3>
            </Link>
          </div>
          <button 
            className={styles.close_button}
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 19 17.59 13.41 12z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        <nav className={styles.mobile_nav_links}>
          {navLinks.map(link => (
            <Link
              key={link.key}
              href={`/${locale}${link.href}`}
              className={`${styles.mobile_nav_item} ${isActive(link.href) ? styles.active : ''}`}
              onClick={closeMenu}
            >
              {t(link.key)}
            </Link>
          ))}
          <Link
            href={`/${locale}/profile`}
            className={`${styles.mobile_nav_item} ${isActive('/profile') ? styles.active : ''}`}
            onClick={closeMenu}
          >
            <FaUser size={18} />
            {t('profile')}
          </Link>
        </nav>

        <div className={styles.mobile_menu_bottom}>
          <button 
            className={styles.mobile_globe_button}
            onClick={handleLanguageChange}
            aria-label="Change language"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
