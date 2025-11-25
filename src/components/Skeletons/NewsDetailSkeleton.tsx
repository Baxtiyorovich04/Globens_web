import React from 'react';
import styles from './NewsDetailSkeleton.module.scss';

const NewsDetailSkeleton: React.FC = () => {
    return (
        <div className={styles.skeletonContainer}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonDate}></div>
            <div className={styles.skeletonContent}>
                <div className={styles.skeletonTextLine}></div>
                <div className={styles.skeletonTextLine}></div>
                <div className={styles.skeletonTextLine}></div>
                <div className={styles.skeletonTextLineHalf}></div>
            </div>
            <div className={styles.skeletonContent}>
                <div className={styles.skeletonTextLine}></div>
                <div className={styles.skeletonTextLine}></div>
                <div className={styles.skeletonTextLine}></div>
                <div className={styles.skeletonTextLine}></div>
                <div className={styles.skeletonTextLine}></div>
                <div className={styles.skeletonTextLineHalf}></div>
            </div>
        </div>
    );
};

export default NewsDetailSkeleton; 