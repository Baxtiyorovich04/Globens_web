"use client";

import React, { useState, useRef, useCallback } from 'react';
import { FaUser, FaCamera, FaTimes, FaSpinner } from 'react-icons/fa';
import { useToast } from '@/components/ui/ToastContext';
import { profileService, ProfileData } from '@/API/services/profile';
import { API_URL } from '@/utilities/constants';
import Image from 'next/image';
import styles from './ProfileEditModal.module.scss';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: ProfileData;
  onProfileUpdate: (updatedData: ProfileData) => void;
}

export default function ProfileEditModal({
  isOpen,
  onClose,
  profileData,
  onProfileUpdate
}: ProfileEditModalProps) {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    full_name: profileData.full_name || '',
    username: profileData.username || '',
    email: profileData.email || '',
    phone: profileData.phone || ''
  });
  
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when modal opens/closes or profile data changes
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        full_name: profileData.full_name || '',
        username: profileData.username || '',
        email: profileData.email || '',
        phone: profileData.phone || ''
      });
      setAvatarFile(null);
      setAvatarPreview(null);
      setErrors({});
    }
  }, [isOpen, profileData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        showToast({
          type: 'error',
          title: 'Xatolik',
          message: 'Faqat rasm fayllarini yuklashingiz mumkin',
          duration: 3000,
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showToast({
          type: 'error',
          title: 'Xatolik',
          message: 'Rasm hajmi 5MB dan katta bo&apos;lishi mumkin emas',
          duration: 3000,
        });
        return;
      }

      setAvatarFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'To&apos;liq ism kiritilishi shart';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Foydalanuvchi nomi kiritilishi shart';
    }


    if (formData.email && formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Noto&apos;g&apos;ri email formati';
    }

    if (formData.phone && !/^\+?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Noto&apos;g&apos;ri telefon raqami';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // First update profile data
      const profileResponse = await profileService.updateProfile(formData);
      
      if (!profileResponse.success) {
        throw new Error(profileResponse.message || 'Profil yangilanmadi');
      }

      // Then upload avatar if selected
      if (avatarFile) {
        const avatarResponse = await profileService.uploadAvatar(avatarFile);
        
        if (!avatarResponse.success) {
          throw new Error(avatarResponse.message || 'Avatar yuklanmadi');
        }
      }

      // Get updated profile data
      const updatedProfileResponse = await profileService.getProfile();
      
      if (updatedProfileResponse.success && updatedProfileResponse.data) {
        onProfileUpdate(updatedProfileResponse.data);
        
        showToast({
          type: 'success',
          title: 'Muvaffaqiyatli',
          message: 'Profil muvaffaqiyatli yangilandi',
          duration: 3000,
        });
        
        onClose();
      }
    } catch (error: unknown) {
      let errorMessage = 'Profil yangilanmadi';
      
      if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = (error as { message: string }).message || errorMessage;
      }
      
      showToast({
        type: 'error',
        title: 'Xatolik',
        message: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = useCallback(() => {
    if (!isLoading) {
      onClose();
    }
  }, [isLoading, onClose]);

  // Close modal on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            <FaUser /> Profilni tahrirlash
          </h2>
          <button 
            className={styles.closeButton}
            onClick={handleClose}
            disabled={isLoading}
            aria-label="Yopish"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarContainer}>
              <Image
                src={
                  avatarPreview || (
                    profileData.avatar
                      ? (profileData.avatar.startsWith('http')
                        ? profileData.avatar
                        : `${API_URL}${profileData.avatar}`)
                      : "/assets/imgs/default-avatar.jpg"
                  )
                }
                alt="Avatar"
                width={120}
                height={120}
                className={styles.avatar}
                onError={() => {
                  // Next.js Image komponenti uchun onError ishlatilmaydi
                  // Default avatar avtomatik ko'rsatiladi
                }}
              />
              <button
                type="button"
                className={styles.avatarEditButton}
                onClick={triggerFileInput}
                disabled={isLoading}
              >
                <FaCamera />
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className={styles.hiddenFileInput}
            />
            <p className={styles.avatarHint}>
              Rasm hajmi 5MB dan katta bo&apos;lishi mumkin emas
            </p>
          </div>

          <div className={styles.formFields}>
            <div className={styles.formGroup}>
              <label htmlFor="full_name" className={styles.label}>
                To&apos;liq ism
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.full_name ? styles.inputError : ''}`}
                placeholder="To&apos;liq ismingizni kiriting"
                disabled={isLoading}
              />
              {errors.full_name && (
                <span className={styles.errorText}>{errors.full_name}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.label}>
                Foydalanuvchi nomi
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
                placeholder="Foydalanuvchi nomingizni kiriting"
                disabled={isLoading}
              />
              {errors.username && (
                <span className={styles.errorText}>{errors.username}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email (ixtiyoriy)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="Email manzilingizni kiriting (ixtiyoriy)"
                disabled={isLoading}
              />
              {errors.email && (
                <span className={styles.errorText}>{errors.email}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                Telefon raqam (ixtiyoriy)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                placeholder="Telefon raqamingizni kiriting"
                disabled={isLoading}
              />
              {errors.phone && (
                <span className={styles.errorText}>{errors.phone}</span>
              )}
            </div>
          </div>

          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleClose}
              disabled={isLoading}
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className={styles.spinner} />
                  Saqlanmoqda...
                </>
              ) : (
                'Saqlash'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
