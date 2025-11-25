import styles from "@/components/Cards/NewsList/NewsList.module.scss";
import NewsCardSkeleton from "@/components/Cards/news_card/NewsCardSkeleton";
import React from "react";

export default async function NewsListSkeleton({limit}: { limit?: number }) {
    return (
        <div className={styles.newsListContainer}>
            <div className={styles.newsList}>
                {[...Array(limit || 3)].map((_, index) => (
                    <NewsCardSkeleton key={index}/>
                ))}
            </div>
        </div>
    )
}
