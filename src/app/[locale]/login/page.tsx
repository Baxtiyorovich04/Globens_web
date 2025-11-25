"use client";

import React, {useState} from "react";
import {FiEye, FiEyeOff, FiLock, FiUser} from "react-icons/fi";
import styles from "./LoginPage.module.scss";
import Image from "next/image";
import Link from "next/link";
import { authService } from '@/API/services/auth';
import { useToast } from '@/components/ui/ToastContext';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from "next-intl";
import { getFieldErrors, getGeneralErrorMessage } from '@/utilities/errorHandling';
import { AuthError } from '@/types/auth';

export default function LoginPage() {
    const t = useTranslations("LoginPage");
    const locale = useLocale();
    const { showToast } = useToast();
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        persistent: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError("");
        if (fieldErrors[name]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        if (!formData.username) {
            setError(t("usernameRequired"));
            setLoading(false);
            return;
        }

        if (!formData.password) {
            setError(t("passwordRequired"));
            setLoading(false);
            return;
        }
        
        try {
            const response = await authService.login({
                username: formData.username,
                password: formData.password,
                persistent: formData.persistent,
            });

            showToast({
                type: response.message_type,
                title: response.success ? 'Success' : 'Error',
                message: response.message,
                duration: 5000,
            });

            if (response.success) {
                router.push(`/${locale}`);
            }
        } catch (error: unknown) {
            const errorMessage = getGeneralErrorMessage(error as AuthError);
            const fieldSpecificErrors = getFieldErrors(error as AuthError);
            
            showToast({
                type: 'error',
                title: 'Error',
                message: errorMessage,
                duration: 5000,
            });
            
            setError(errorMessage);
            setFieldErrors(fieldSpecificErrors);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginRoot}>
            {/* Background SVG for all screen sizes */}
            <div className={styles.backgroundSvg}>
                <Image
                    src="/assets/imgs/loginRegBg.svg"
                    alt="Background"
                    fill
                    className={styles.svgImage}
                />
            </div>

            {/* Left Panel - Login Form */}
            <div className={styles.leftPanel}>
                <div className={styles.logoBox}>
                    <Link href={`/${locale}`}>
                        <Image
                            src="/assets/icons/Headerlogo.webp"
                            alt="Globens Logo"
                            width={150}
                            height={60}
                            priority
                            unoptimized
                            className={styles.logoImg}
                        />
                    </Link>
                </div>
                
                <div className={styles.formContainer}>
                    <h1 className={styles.formTitle}>{t("welcomeBack")}</h1>
                    
                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        {error && <div className={styles.errorMessage}>{error}</div>}
                        
                        <div className={styles.inputGroup}>
                            <label htmlFor="username">{t("username")}</label>
                            <div className={styles.inputWrapper}>
                                <FiUser className={styles.inputIcon}/>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder={t("username")}
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                    className={`${styles.input} ${fieldErrors.username ? styles.inputError : ''}`}
                                    autoComplete="username"
                                />
                            </div>
                            {fieldErrors.username && (
                                <div className={styles.fieldError}>{fieldErrors.username}</div>
                            )}
                        </div>
                        
                        <div className={styles.inputGroup}>
                            <label htmlFor="password">{t("password")}</label>
                            <div className={styles.inputWrapper}>
                                <FiLock className={styles.inputIcon}/>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder={t("password")}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className={`${styles.input} ${fieldErrors.password ? styles.inputError : ''}`}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={styles.passwordToggle}
                                    tabIndex={-1}
                                >
                                    {showPassword ? <FiEyeOff/> : <FiEye/>}
                                </button>
                            </div>
                            {fieldErrors.password && (
                                <div className={styles.fieldError}>{fieldErrors.password}</div>
                            )}
                        </div>
                        
                        <div className={styles.rememberMe}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="persistent"
                                    checked={formData.persistent}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        persistent: e.target.checked
                                    }))}
                                    className={styles.checkbox}
                                />
                                <span>{t("rememberMe")}</span>
                            </label>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={loading}
                            className={styles.loginButton}
                        >
                            {loading ? t("loggingIn") : t("login")}
                        </button>
                        
                        {/* <div className={styles.orDivider}>
                            <span>{t("orContinue")}</span>
                        </div>
                        
                        <div className={styles.registerPrompt}>
                            {t("notMember")}{" "}
                            <Link href={`/${locale}/register`} className={styles.registerLink}>
                                {t("registerNow")}
                            </Link>
                        </div> */}
                    </form>
                </div>
            </div>
            
            {/* Right Panel - Welcome/Register (hidden on mobile) */}
            <div className={styles.rightPanel}>
                <div className={styles.welcomeContainer}>
                    <div className={styles.welcomeContent}>
                        <h1 className={styles.welcomeTitle}>{t("welcome")}</h1>
                        <p className={styles.welcomeDesc}>{t("gladToSeeYou")}</p>
                        <Link href={`/${locale}/register`} className={styles.registerButton}>
                            {t("registerNow")}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
