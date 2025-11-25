"use client";

import React, {useState} from 'react';
import Link from 'next/link';
import {FiEye, FiEyeOff, FiLock, FiPhone, FiUser} from 'react-icons/fi';
import styles from './RegisterPage.module.scss';
import Image from 'next/image';
import OtpModal from '@/components/OtpModal/page';
import { useTranslations, useLocale } from "next-intl";
import { authService } from '@/API/services/auth';
import { useToast } from '@/components/ui/ToastContext';

import { validatePhone, validatePassword, validateUsername, validateFullName } from '@/utilities/validation';
import { getFieldErrors, getGeneralErrorMessage } from '@/utilities/errorHandling';
import { AuthError } from '@/types/auth';

export default function RegisterPage() {
  const t = useTranslations("RegisterPage");
  const locale = useLocale();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showOtp, setShowOtp] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError('');
   
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
    setError('');

  
    if (!validatePhone(formData.phone)) {
      setError('Please enter a valid Uzbek phone number (+998XXXXXXXXX)');
      setLoading(false);
      return;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.message);
      setLoading(false);
      return;
    }

    const usernameValidation = validateUsername(formData.username);
    if (!usernameValidation.isValid) {
      setError(usernameValidation.message);
      setLoading(false);
      return;
    }

    const fullNameValidation = validateFullName(formData.full_name);
    if (!fullNameValidation.isValid) {
      setError(fullNameValidation.message);
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t("passwordsNoMatch"));
      setLoading(false);
      return;
    }

    try {
      const response = await authService.register({
        phone: formData.phone,
        full_name: formData.full_name,
        username: formData.username,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });

      showToast({
        type: response.message_type,
        title: response.success ? 'Success' : 'Error',
        message: response.message,
        duration: 5000,
      });

      if (response.success) {
        setShowOtp(true);
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
    <>
      {showOtp && (
        <OtpModal
          onCancel={() => setShowOtp(false)}
          phone={formData.phone}
          username={formData.username}
        />
      )}
      <div className={styles.registerRoot}>
        <div className={styles.backgroundSvg}>
          <Image
            src="/assets/imgs/loginRegBg.svg"
            alt="Background"
            fill
            className={styles.svgImage}
          />
        </div>

      
        <div className={styles.leftPanel}>
          <div className={styles.welcomeContainer}>
            <div className={styles.welcomeContent}>
              <h1 className={styles.welcomeTitle}>{t("welcome")}</h1>
              <p className={styles.welcomeDesc}>{t("joinUs")}</p>
              <Link href={`/${locale}/login`} className={styles.loginButton}>
                {t("login")}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Right Panel - Register Form */}
        <div className={styles.rightPanel}>
          <div className={styles.logoBox}>
            <Link href={`/${locale}`}>
              <Image
                src="/assets/icons/Headerlogo.webp"
                alt="Globens Logo"
                width={180}
                height={60}
                priority
                unoptimized
                className={styles.logoImg}
              />
            </Link>
          </div>
          
          <div className={styles.formContainer}>
            <h1 className={styles.formTitle}>{t("createAccount")}</h1>
            
            <form onSubmit={handleSubmit} className={styles.registerForm}>
              {error && <div className={styles.errorMessage}>{error}</div>}
              
              <div className={styles.inputGroup}>
                <label htmlFor="full_name">{t("fullName")}</label>
                <div className={styles.inputWrapper}>
                  <FiUser className={styles.inputIcon} />
                  <input
                    type="text"
                    name="full_name"
                    id="full_name"
                    placeholder={t("fullName")}
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                    className={`${styles.input} ${fieldErrors.full_name ? styles.inputError : ''}`}
                    autoComplete="name"
                  />
                </div>
                {fieldErrors.full_name && (
                  <div className={styles.fieldError}>{fieldErrors.full_name}</div>
                )}
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="username">{t("username")}</label>
                <div className={styles.inputWrapper}>
                  <FiUser className={styles.inputIcon} />
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
                <label htmlFor="phone">{t("phone")}</label>
                <div className={styles.inputWrapper}>
                  <FiPhone className={styles.inputIcon} />
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="+998 90 123 45 67"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className={`${styles.input} ${fieldErrors.phone ? styles.inputError : ''}`}
                    autoComplete="tel"
                  />
                </div>
                {fieldErrors.phone && (
                  <div className={styles.fieldError}>{fieldErrors.phone}</div>
                )}
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="password">{t("password")}</label>
                <div className={styles.inputWrapper}>
                  <FiLock className={styles.inputIcon} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    placeholder={t("password")}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className={`${styles.input} ${fieldErrors.password ? styles.inputError : ''}`}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.passwordToggle}
                    tabIndex={-1}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <div className={styles.fieldError}>{fieldErrors.password}</div>
                )}
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword">{t("confirmPassword")}</label>
                <div className={styles.inputWrapper}>
                  <FiLock className={styles.inputIcon} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder={t("confirmPassword")}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className={`${styles.input} ${fieldErrors.password_confirmation ? styles.inputError : ''}`}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={styles.passwordToggle}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {fieldErrors.password_confirmation && (
                  <div className={styles.fieldError}>{fieldErrors.password_confirmation}</div>
                )}
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={styles.registerButton}
              >
                {loading ? t("registering") : t("register")}
              </button>
              
              {/* <div className={styles.loginPrompt}>
                {t("alreadyAccount")}{" "}
                <Link href={`/${locale}/login`} className={styles.loginLink}>
                  {t("login")}
                </Link>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
} 