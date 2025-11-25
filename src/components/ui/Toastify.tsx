'use client';

import React, { useEffect, useState } from 'react';
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';
import styles from './Toastify.module.scss';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  duration?: number;
}

interface ToastifyProps {
  toast: Toast | null;
  onClose: (id: string) => void;
}

const Toastify: React.FC<ToastifyProps> = ({ toast, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (toast) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose(toast.id), 300);
      }, toast.duration || 5000);

      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <FiCheckCircle size={20} />;
      case 'error':
        return <FiAlertCircle size={20} />;
      case 'info':
        return <FiInfo size={20} />;
      default:
        return <FiInfo size={20} />;
    }
  };

  const getTitle = () => {
    switch (toast.type) {
      case 'success':
        return 'Success';
      case 'error':
        return 'Error';
      case 'info':
        return 'Info';
      default:
        return 'Notification';
    }
  };

  return (
    <div className={`${styles.toastContainer}`}>
      <div
        className={`${styles.toast} ${styles[toast.type]} ${
          isVisible ? styles.toastEnterActive : styles.toastEnter
        }`}
      >
        <div className={styles.toastHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {getIcon()}
            <h4 className={styles.toastTitle}>{getTitle()}</h4>
          </div>
          <button
            className={styles.toastClose}
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onClose(toast.id), 300);
            }}
          >
            <FiX size={16} />
          </button>
        </div>
        <p className={styles.toastMessage}>{toast.message}</p>
      </div>
    </div>
  );
};

export default Toastify; 