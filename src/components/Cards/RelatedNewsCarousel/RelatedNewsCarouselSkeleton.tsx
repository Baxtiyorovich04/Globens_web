import React from 'react';
import styles from './RelatedNewsCarousel.module.scss';
import NewsCardSkeleton from '@/components/Cards/news_card/NewsCardSkeleton';

interface RelatedNewsCarouselSkeletonProps {
  itemsPerView?: number;
}

const RelatedNewsCarouselSkeleton: React.FC<RelatedNewsCarouselSkeletonProps> = ({ 
  itemsPerView = 3 
}) => {
  return (
    <div className={styles.relatedNews}>
      <div className={styles.relatedNewsHeader}>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.relatedNewsControls}>
          <div className={`${styles.arrowButton} ${styles.skeletonButton}`}></div>
          <div className={`${styles.arrowButton} ${styles.skeletonButton}`}></div>
        </div>
      </div>
      <div className={styles.relatedNewsCards}>
        <div className={styles.carouselTrack}>
          {[...Array(itemsPerView)].map((_, index) => (
            <div 
              key={index} 
              className={styles.relatedNewsCardWrapper}
              style={{
                flex: `0 0 calc(${100 / itemsPerView}% - 16px)`,
              }}
            >
              <NewsCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedNewsCarouselSkeleton; 