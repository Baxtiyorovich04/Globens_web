import React from 'react';
import styles from './banner.module.scss';

export default function BannerSkeleton() {
    return (
        <div className={styles.skeletonBannerContainer}>
            <div className={styles.skeletonBannerContent}>
                <div className={styles.skeletonTitle}/>
                <div className={styles.skeletonDescription}/>
            </div>
            <div className={styles.skeletonDots}>
                {[0, 1, 2].map((dotIndex) => (
                    <span key={dotIndex} className={styles.skeletonDot}/>
                ))}
            </div>
        </div>
    );
} 