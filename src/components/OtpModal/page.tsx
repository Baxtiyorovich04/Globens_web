"use client";
import React, {useRef, useState} from "react";
import styles from "./OtpModal.module.scss";
import { authService } from '@/API/services/auth';
import { useToast } from '@/components/ui/ToastContext';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from "next-intl";

interface OtpModalProps {
  onCancel?: () => void;
  phone: string;
  username: string;
}

export default function OtpModal({onCancel, phone, username}: OtpModalProps) {
    const t = useTranslations("OtpModal");
    const locale = useLocale();
    const { showToast } = useToast();
    const router = useRouter();
    const inputs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
    const [code, setCode] = React.useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (idx: number, value: string) => {
        if (!/^[0-9]?$/.test(value)) return;
        const newCode = [...code];
        newCode[idx] = value;
        setCode(newCode);
        setError(""); 
        if (value && idx < 5) {
            inputs[idx + 1].current?.focus();
        }
    };

    const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[idx] && idx > 0) {
            inputs[idx - 1].current?.focus();
        }
    };

    const handleConfirm = async () => {
        const otpCode = code.join("");
        if (otpCode.length !== 6) {
            setError(t("enterCompleteCode"));
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await authService.confirmPhone({
                phone: phone,
                otp: otpCode
            });

            showToast({
                type: response.message_type,
                title: response.success ? 'Success' : 'Error',
                message: response.message,
                duration: 5000,
            });

            if (response.success) {
                // Redirect to home page on successful confirmation
                router.push(`/${locale}`);
            }
                } catch (error: unknown) {
          const errorMessage = error && typeof error === 'object' && 'message' in error 
            ? (error as { message: string }).message 
            : t("confirmationFailed");
          showToast({
            type: 'error',
            title: 'Error',
            message: errorMessage,
            duration: 5000,
          });
          setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setResendLoading(true);
        setError("");

        try {
            const response = await authService.resendOtp({
                username: username,
                phone: phone
            });

            showToast({
                type: response.message_type,
                title: 'Success',
                message: response.message,
                duration: 5000,
            });

            // Clear the OTP input fields
            setCode(["", "", "", "", "", ""]);
            inputs[0].current?.focus();
                } catch (error: unknown) {
          const errorMessage = error && typeof error === 'object' && 'message' in error 
            ? (error as { message: string }).message 
            : t("resendFailed");
          showToast({
            type: 'error',
            title: 'Error',
            message: errorMessage,
            duration: 5000,
          });
          setError(errorMessage);
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalBody}>
                <div className={styles.modalTitle}>{t("confirmWithCode")}</div>
                <div className={styles.modalSubtitle}>
                    {t("enterCodeSent")} {phone}
                </div>
                {error && <div className={styles.errorMessage}>{error}</div>}
                <div className={styles.otpInputs}>
                    {code.map((v, i) => (
                        <input
                            key={i}
                            ref={inputs[i]}
                            className={styles.otpInput}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={v}
                            onChange={e => handleChange(i, e.target.value)}
                            onKeyDown={e => handleKeyDown(i, e)}
                            disabled={loading}
                            placeholder=""
                        />
                    ))}
                </div>
                <div className={styles.buttonRow}>
                    <button 
                        className={styles.confirmBtn} 
                        onClick={handleConfirm}
                        disabled={loading || code.join("").length !== 6}
                    >
                        {loading ? t("confirming") : t("confirm")}
                    </button>
                    <button 
                        className={styles.cancelBtn} 
                        onClick={onCancel}
                        disabled={loading}
                    >
                        {t("cancel")}
                    </button>
                </div>
                <div className={styles.resendSection}>
                    <button 
                        className={styles.resendBtn}
                        onClick={handleResendOtp}
                        disabled={resendLoading || loading}
                    >
                        {resendLoading ? t("sending") : t("resendCode")}
                    </button>
                </div>
            </div>
        </div>
    );
}
