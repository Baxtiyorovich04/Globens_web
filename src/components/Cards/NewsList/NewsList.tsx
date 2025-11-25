"use client";

import React, { use, useTransition, Suspense } from "react";
import NewsCard from "../news_card/newsCard";
import NewsCardSkeleton from "../news_card/NewsCardSkeleton";
import styles from "./NewsList.module.scss";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import type { PaginationLink } from "@/types/news";
import { NewsItem } from "@/types/news";
import type { NewsListProps } from "@/types/newsList";
import { useIsMobile } from "@/hooks/useIsMobile";
import Image from "next/image";


const NewsListSkeleton: React.FC<{ limit?: number }> = ({ limit = 6 }) => {
  const skeletonCount = limit || 6;
  
  return (
    <div className={styles.newsListContainer}>
      <div className={styles.newsList}>
        {[...Array(skeletonCount)].map((_, index) => (
          <article key={index} className={styles.newsSkeletonWrapper}>
            <NewsCardSkeleton />
          </article>
        ))}
      </div>
    </div>
  );
};

// Main news list content component
const NewsListContent: React.FC<NewsListProps> = ({
  newsResource,
  limit,
  showMoreButton,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("NewsList");
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const isMobile = useIsMobile();

  const currentPage = Number(searchParams.get("page")) || 1;

  const news = use(newsResource);
  const pagination = news.meta;
  const displayedNews = limit ? news.data.slice(0, limit) : news.data;

  const handlePageChange = (url: string | null) => {
    if (!url) return;
    try {
      const urlObj = new URL(url, window.location.origin);
      const page = urlObj.searchParams.get("page");
      if (page) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page);
        startTransition(() => {
          router.push(`?${params.toString()}`);
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Show skeleton during transitions
  if (isPending) {
    return <NewsListSkeleton limit={limit} />;
  }

  // If no news data, show skeleton
  if (!news.data || news.data.length === 0) {
    return <NewsListSkeleton limit={limit} />;
  }

  return (
    <div className={styles.newsListContainer}>
      <div className={styles.newsList}>
        {displayedNews.map((item: NewsItem) => (
          <article key={item.id}>
            <NewsCard news={item} />
          </article>
        ))}
      </div>

      {!limit && pagination && pagination.links && (
        <nav
          className={styles.paginationWrapper}
          role="navigation"
          aria-label="Pagination Navigation"
        >
          <div className={styles.pagination}>
            <button
              className={`${styles.pageNav} ${
                pagination.links[0]?.url === null ? styles.disabled : ""
              }`}
              onClick={() => handlePageChange(pagination.links[0]?.url)}
              disabled={pagination.links[0]?.url === null}
              aria-label={t("pagination.prev")}
            >
              <Image
                src="/assets/icons/arrow-left-p.svg"
                alt="Previous"
                width={20}
                height={20}
              />
            </button>

            {!isMobile && (
              <>
                {pagination.links
                  .slice(1, -1)
                  .map((link: PaginationLink, index: number) => {
                    if (link.label === "...") {
                      return (
                        <span
                          key={index}
                          className={styles.pageItem}
                          style={{
                            cursor: "default",
                            background: "none",
                            border: "none",
                          }}
                        >
                          ...
                        </span>
                      );
                    }

                    const isActive = Number(link.label) === currentPage;

                    return (
                      <button
                        key={index}
                        onClick={() => handlePageChange(link.url)}
                        className={`${styles.pageItem} ${
                          isActive ? styles.active : ""
                        }`}
                        disabled={isActive}
                        aria-label={t("pagination.page", {
                          label: link.label,
                        })}
                      >
                        {link.label}
                      </button>
                    );
                  })}
              </>
            )}

            <button
              className={`${styles.pageNav} ${
                pagination.links[pagination.links.length - 1]?.url === null
                  ? styles.disabled
                  : ""
              }`}
              onClick={() =>
                handlePageChange(
                  pagination.links[pagination.links.length - 1]?.url
                )
              }
              disabled={
                pagination.links[pagination.links.length - 1]?.url === null
              }
              aria-label={t("pagination.next")}
            >
              <Image
                src="/assets/icons/arrow-right-p.svg"
                alt="Next"
                width={20}
                height={20}
              />
            </button>
          </div>
        </nav>
      )}

      {showMoreButton && (
        <Link href={`/${locale}/news`} className={styles.viewAllButton}>
          {t("viewAllText")}
        </Link>
      )}
    </div>
  );
};

// Main export with Suspense wrapper
const NewsList: React.FC<NewsListProps> = (props) => {
  return (
    <Suspense fallback={<NewsListSkeleton limit={props.limit} />}>
      <NewsListContent {...props} />
    </Suspense>
  );
};

export default NewsList;
