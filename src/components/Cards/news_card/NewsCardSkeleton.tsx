import React from 'react';
import styles from './NewsCardSkeleton.module.scss';

const NewsCardSkeleton: React.FC = () => {
    return (
        <div className={styles.newsCardSkeleton}>
            <div className={styles.newsCardSkeleton__image}></div>
            <div className={styles.newsCardSkeleton__content}>
                <div className={styles.newsCardSkeleton__title}></div>
                <div className={styles.newsCardSkeleton__description}></div>
                <div className={styles.newsCardSkeleton__icon}></div>
            </div>
        </div>
    );
};

export default NewsCardSkeleton; 