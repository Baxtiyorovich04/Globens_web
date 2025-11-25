"use client";

import React, { use, useEffect, useRef, useState } from "react";
import styles from "./banner.module.scss";
import { BannersResponse } from "@/types/banner";

export default function BannerCarousel({
  bannerResource,
}: {
  bannerResource: Promise<BannersResponse>;
}) {
  const response = use(bannerResource);
  const banners = response.data;
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const bannerCount = banners.length > 3 ? 3 : banners.length;

  useEffect(() => {
    if (bannerCount <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerCount);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [bannerCount]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % bannerCount);
      }, 4000);
    }
  };

  const currentBanner = banners[currentIndex];

  return (
    <div className={styles.bannerContainer}>
      <a
        href={currentBanner.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.bannerLink}
        style={{ display: "block", textDecoration: "none", color: "inherit" }}
      >
        <div
          className={styles.bannerImage}
          style={{ 
            backgroundImage: `url(${currentBanner.image_url})`,
            transition: "all 0.5s ease-in-out"
          }}
        >
          <div className={styles.bannerContent}>
            <h2 className={styles.title}>{currentBanner.title}</h2>
            <p className={styles.description}>{currentBanner.description}</p>
          </div>
        </div>
      </a>
      <div className={styles.carouselDots}>
        {banners.slice(0, 3).map((_, dotIndex) => (
          <span
            key={dotIndex}
            className={
              dotIndex === currentIndex
                ? styles.carouselDotActive
                : styles.carouselDot
            }
            onClick={() => handleDotClick(dotIndex)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
    </div>
  );
}
