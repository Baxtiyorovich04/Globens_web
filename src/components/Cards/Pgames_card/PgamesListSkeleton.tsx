import React from 'react';
import PgamesSkeleton from './PgamesSkeleton';
import styles from './Pgames.module.scss';

export default function PgamesListSkeleton({limit}: { limit?: number }) {
    return (
        <div className={styles.card_container}>
            {[...Array(limit || 3)].map((_, index) => (
                <PgamesSkeleton key={index}/>
            ))}
        </div>
    );
} 