"use client";

import React, { useState, useRef, use, useEffect, Suspense } from "react";
import { FiArrowLeft } from "react-icons/fi";
import NewsCard from "@/components/Cards/news_card/newsCard";
import NewsCardSkeleton from "@/components/Cards/news_card/NewsCardSkeleton";
import styles from "./RelatedNewsCarousel.module.scss";
import type { NewsItem } from "@/types/news";

interface RelatedNewsCarouselProps {
  newsResource: Promise<{ data: NewsItem[] }>;
  title?: string;
  itemsPerView?: number;
}

// Loading skeleton component for the carousel
const RelatedNewsCarouselSkeleton: React.FC<{ itemsPerView: number }> = ({ itemsPerView }) => {
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

// Main carousel component
const RelatedNewsCarouselContent: React.FC<RelatedNewsCarouselProps> = ({ 
  newsResource, 
  title = "Qo'shimcha yangiliklar",
  itemsPerView = 3
}) => {
  const newsData = use(newsResource);
  const news = newsData.data;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responsiveItemsPerView, setResponsiveItemsPerView] = useState(itemsPerView);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setResponsiveItemsPerView(1);
      } else if (window.innerWidth <= 768) {
        setResponsiveItemsPerView(2);
      } else if (window.innerWidth <= 1024) {
        setResponsiveItemsPerView(3);
      } else {
        setResponsiveItemsPerView(itemsPerView);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView]);

  const maxIndex = Math.max(0, news.length - responsiveItemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  // If no news data, show skeleton
  if (!news || news.length === 0) {
    return <RelatedNewsCarouselSkeleton itemsPerView={itemsPerView} />;
  }

  return (
    <div className={styles.relatedNews}>
      <div className={styles.relatedNewsHeader}>
        <h3>{title}</h3>
        <div className={styles.relatedNewsControls}>
          <button 
            className={`${styles.arrowButton} ${!canGoPrev ? styles.disabled : ''}`}
            onClick={handlePrev}
            disabled={!canGoPrev}
          >
            <FiArrowLeft />
          </button>
          <button 
            className={`${styles.arrowButton} ${!canGoNext ? styles.disabled : ''}`}
            onClick={handleNext}
            disabled={!canGoNext}
          >
            <FiArrowLeft style={{ transform: "rotate(180deg)" }} />
          </button>
        </div>
      </div>
      <div className={styles.relatedNewsCards} ref={carouselRef}>
        <div 
          className={styles.carouselTrack}
          style={{
            transform: `translateX(-${currentIndex * (100 / responsiveItemsPerView)}%)`,
          }}
        >
          {news.map((item) => (
            <div 
              key={item.id} 
              className={styles.relatedNewsCardWrapper}
              style={{
                flex: `0 0 calc(${100 / responsiveItemsPerView}% - 16px)`,
              }}
            >
              <NewsCard news={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main export with Suspense wrapper
export default function RelatedNewsCarousel(props: RelatedNewsCarouselProps) {
  return (
    <Suspense fallback={<RelatedNewsCarouselSkeleton itemsPerView={props.itemsPerView || 3} />}>
      <RelatedNewsCarouselContent {...props} />
    </Suspense>
  );
} 