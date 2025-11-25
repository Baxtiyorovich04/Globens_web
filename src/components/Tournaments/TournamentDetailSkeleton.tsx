"use client";

import styles from './TournamentDetailSkeleton.module.scss';

export default function TournamentDetailSkeleton() {
  return (
    <div className={styles.skeletonContainer}>
      {/* Hero Section Skeleton */}
      <div className={styles.heroSkeleton}>
        <div className={styles.heroBackgroundSkeleton}></div>
        <div className={styles.heroContentSkeleton}>
          <div className={styles.containerSkeleton}>
            <div className={styles.headerSkeleton}>
              <div className={styles.statusBadgeSkeleton}></div>
              <div className={styles.titleSkeleton}></div>
              <div className={styles.gameInfoSkeleton}></div>
            </div>
            
            <div className={styles.prizeSectionSkeleton}>
              <div className={styles.prizeAmountSkeleton}></div>
              <div className={styles.prizeLabelSkeleton}></div>
            </div>
            
            <div className={styles.statsSkeleton}>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className={styles.statItemSkeleton}>
                  <div className={styles.statIconSkeleton}></div>
                  <div className={styles.statContentSkeleton}>
                    <div className={styles.statValueSkeleton}></div>
                    <div className={styles.statLabelSkeleton}></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={styles.descriptionSkeleton}></div>
            <div className={styles.actionButtonSkeleton}></div>
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className={styles.tabsSkeleton}>
        <div className={styles.tabsHeaderSkeleton}>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className={styles.tabButtonSkeleton}></div>
          ))}
        </div>
        
        <div className={styles.tabContentSkeleton}>
          <div className={styles.contentHeaderSkeleton}>
            <div className={styles.contentTitleSkeleton}></div>
            <div className={styles.contentDescriptionSkeleton}></div>
          </div>
          
          <div className={styles.contentGridSkeleton}>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className={styles.gridItemSkeleton}>
                <div className={styles.itemHeaderSkeleton}>
                  <div className={styles.itemIconSkeleton}></div>
                  <div className={styles.itemTitleSkeleton}></div>
                </div>
                <div className={styles.itemContentSkeleton}>
                  <div className={styles.itemTextSkeleton}></div>
                  <div className={styles.itemTextSkeleton}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
