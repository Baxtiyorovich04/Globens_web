'use client'

import React, { useState, useEffect } from 'react';
import { CreateTeamData } from '@/API/services/teams';
import { gamesClientService } from '@/API/services/gamesClient';
import { GameItem } from '@/types/game';
import styles from './CreateTeamModal.module.scss';

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTeamData) => void;
  isLoading: boolean;
}

export const CreateTeamModal: React.FC<CreateTeamModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading
}) => {
  const [formData, setFormData] = useState({
    name: '',
    game_id: '',
    description: '',
    avatar: null as File | null
  });
  const [games, setGames] = useState<GameItem[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoadingGames, setIsLoadingGames] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadGames();
    }
  }, [isOpen]);

  const loadGames = async () => {
    try {
      setIsLoadingGames(true);
      const response = await gamesClientService.getGames();
      if (response.data) {
        setGames(response.data);
      }
    } catch (error) {
      console.error('Error loading games:', error);
    } finally {
      setIsLoadingGames(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Jamoa nomi kiritilishi shart';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Jamoa nomi kamida 2 ta harf bo\'lishi kerak';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Jamoa nomi 50 ta harfdan ko\'p bo\'lishi mumkin emas';
    }

    if (!formData.game_id) {
      newErrors.game_id = 'O\'yin tanlanishi shart';
    }

    if (!formData.avatar) {
      newErrors.avatar = 'Jamoa avatari tanlanishi shart';
    } else if (formData.avatar) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(formData.avatar.type)) {
        newErrors.avatar = 'Faqat JPEG, PNG yoki WebP formatdagi rasm yuklanishi mumkin';
      } else if (formData.avatar.size > 5 * 1024 * 1024) {
        newErrors.avatar = "Rasm hajmi 5MB dan katta bo'lishi mumkin emas";
      }
    }

    if (formData.description && formData.description.length > 200) {
      newErrors.description = 'Tavsif 200 ta harfdan ko\'p bo\'lishi mumkin emas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        name: formData.name.trim(),
        game_id: formData.game_id,
        avatar: formData.avatar!,
        description: formData.description.trim() || undefined
      });
    }
  };

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleInputChange('avatar', file);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Yangi Jamoa Yaratish</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Jamoa Nomi <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              placeholder="Jamoa nomini kiriting..."
              disabled={isLoading}
            />
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="game_id" className={styles.label}>
              O&apos;yin <span className={styles.required}>*</span>
            </label>
            <select
              id="game_id"
              value={formData.game_id}
              onChange={(e) => handleInputChange('game_id', e.target.value)}
              className={`${styles.select} ${errors.game_id ? styles.inputError : ''}`}
              disabled={isLoading || isLoadingGames}
            >
              <option value="">O&apos;yinni tanlang...</option>
              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.name}
                </option>
              ))}
            </select>
            {errors.game_id && <span className={styles.errorText}>{errors.game_id}</span>}
            {isLoadingGames && <span className={styles.loadingText}>O&apos;yinlar yuklanmoqda...</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="avatar" className={styles.label}>
              Jamoa Avatari <span className={styles.required}>*</span>
            </label>
            <input
              type="file"
              id="avatar"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileChange}
              className={`${styles.fileInput} ${errors.avatar ? styles.inputError : ''}`}
              disabled={isLoading}
            />
            {errors.avatar && <span className={styles.errorText}>{errors.avatar}</span>}
            <p className={styles.helpText}>
              JPEG, PNG yoki WebP format. Maksimal hajm: 5MB
            </p>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Tavsif
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
              placeholder="Jamoa haqida qisqacha ma&apos;lumot..."
              rows={3}
              disabled={isLoading}
            />
            {errors.description && <span className={styles.errorText}>{errors.description}</span>}
            <p className={styles.helpText}>
              {formData.description.length}/200 ta harf
            </p>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              disabled={isLoading}
            >
              Bekor Qilish
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading || !formData.name || !formData.game_id || !formData.avatar}
            >
              {isLoading ? 'Yaratilmoqda...' : 'Jamoa Yaratish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
