"use server";

import React from "react";
import { getNewsDetail, getNews } from "@/API/services/news";
import styles from "./NewsDetail.module.scss";
import { FiCalendar } from "react-icons/fi";
import Breadcrumb from "@/components/ui/Breadcrumb";
import RelatedNewsCarousel from "@/components/Cards/RelatedNewsCarousel/RelatedNewsCarousel";
import type { NewsItem } from "@/types/news";
import { getLocale } from 'next-intl/server';

import Image from "next/image";
import {Viewer} from "@/components/lexical/viewer";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const locale = await getLocale();

  const newsItem = (await getNewsDetail(slug)).data;

  let relatedNews: NewsItem[] = [];
  try {
    const relatedNewsResponse = (await getNews(1, 6)).data;
    relatedNews = relatedNewsResponse.filter((item) => item.slug !== slug);
  } catch (error) {
    console.error("Error fetching related news:", error);
    relatedNews = [];
  }

  return (
    <div className={styles.newsDetailPage}>
      <Breadcrumb
        items={[
          { label: "Home", href: `/${locale}` },
          { label: "News", href: `/${locale}/news` },
          { label: newsItem.title, isActive: true },
        ]}
      />
      
      <div className={styles.news_detail_hero}>
        {/* Desktop effects - hidden on mobile */}
        <Image
          className={styles.left_effect}
          src="/assets/imgs/leftEffect.svg"
          alt="left_effect"
          width={450}
          height={238}
        />

        <Image
          src={newsItem.image_url}
          alt={newsItem.title}
          width={990}
          height={445}
          className={styles.news_detail_hero_image}
          priority
        />
        
        <Image
          className={styles.right_effect}
          src="/assets/imgs/rightEffect.svg"
          alt="right_effect"
          width={450}
          height={238}
        />
      </div>
      
      <div className={styles.news_calendar}>
        <FiCalendar />
        <p>2025-08-01</p>
      </div>

      <div className={styles.newsContent}>
        <h1 className={styles.newsTitle}>{newsItem.title}</h1>
        <div className={styles.newsText}>
          <div className={styles.newsContent}>
            <Viewer editorState={newsItem.content}/>
          </div>
        </div>
      </div>

      {relatedNews.length > 0 && (
        <RelatedNewsCarousel 
          newsResource={Promise.resolve({ data: relatedNews })} 
          itemsPerView={3} 
        />
      )}
    </div>
  );
}
