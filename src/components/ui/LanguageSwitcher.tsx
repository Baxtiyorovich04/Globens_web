'use client';
import {useEffect, useRef, useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {useLocale} from 'next-intl';
import styles from './LanguageSwitcher.module.scss';

const LanguageSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages = [
        {code: 'uz', name: 'Oʻzbekcha'},
        {code: 'ru', name: 'Русский'},
        {code: 'en', name: 'English'}
    ];

    const changeLang = (lng: string) => {
        // Get current path without locale
        const currentPath = pathname.replace(new RegExp(`^/${locale}`), '');
        const newPath = `/${lng}${currentPath}`;
        router.push(newPath);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.languageSwitcher} ref={dropdownRef}>
            <button
                className={styles.triggerButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Language selector"
                aria-expanded={isOpen}
            >
        <span className={styles.currentLang}>
          {languages.find(lang => lang.code === locale)?.name}
        </span>
                <span className={`${styles.arrow} ${isOpen ? styles.open : ''}`}>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
            </button>

            <div className={`${styles.dropdownMenu} ${isOpen ? styles.open : ''}`}>
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => changeLang(lang.code)}
                        className={`${styles.menuItem} ${locale === lang.code ? styles.active : ''}`}
                        aria-current={locale === lang.code}
                    >
                        <span className={styles.langName}>{lang.name}</span>
                        <span className={styles.langCode}>{lang.code.toUpperCase()}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageSwitcher;