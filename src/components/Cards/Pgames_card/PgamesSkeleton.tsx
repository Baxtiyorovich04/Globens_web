import React from 'react';
import styles from './PgamesSkeleton.module.scss';

const PgamesSkeleton = () => {
    return (
        <div className={styles.skeleton_card}>
            <div className={styles.skeleton_image}></div>
            <div className={`${styles.skeleton_text_line} ${styles.skeleton_title}`}></div>
            <div className={`${styles.skeleton_text_line} ${styles.skeleton_description}`}></div>
            <div className={styles.skeleton_button}></div>
        </div>
    );
};

export default PgamesSkeleton; 