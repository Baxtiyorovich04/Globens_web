"use client";

import NewsList from "@/components/Cards/NewsList/NewsList";
import styles from "./NewsPage.module.scss";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { getNews } from "@/API/services/news";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { NewsItem } from "@/types/news";
import type { ApiListResponse } from "@/types/global";

// Move initial state outside component to avoid dependency issues
const initialNewsState: ApiListResponse<NewsItem> = {
    data: [],
    links: {
        first: "",
        last: "",
        prev: null,
        next: null
    },
    meta: {
        current_page: 1,
        from: 0,
        last_page: 1,
        links: [],
        path: "",
        per_page: 15,
        to: 0,
        total: 0
    }
};

// Loading skeleton for the entire news page
const NewsPageSkeleton: React.FC = () => {
    const t = useTranslations("NewsPage");
    
    return (
        <main className={styles.newsPage}>
            <motion.section className={styles.NewsHero}>
                <Image
                    src="/assets/imgs/rightEffect.svg"
                    alt=""
                    width={500}
                    height={500}
                    className={styles.rheroEffect}
                />
                <Image
                    src="/assets/imgs/leftEffect.svg"
                    alt=""
                    width={500}
                    height={500}
                    className={styles.lheroEffect}
                />
                <div className={styles.heroContent}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <Image
                            className={styles.heroGamepad}
                            src="/assets/imgs/bgGamePad.svg"
                            alt="Gamepad"
                            width={405}
                            height={377}
                            priority
                        />
                    </motion.div>
                    <motion.h1
                        className={styles.heroTitle}
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        {t("newsTitle")}
                    </motion.h1>
                </div>
            </motion.section>
            <div className={styles.container} style={{ background: "#020106" }}>
                <NewsList newsResource={Promise.resolve(initialNewsState)} />
            </div>
        </main>
    );
};

// Main news page content
const NewsPageContent: React.FC = () => {
    const t = useTranslations("NewsPage");
    const searchParams = useSearchParams();
    
    const [newsResource, setNewsResource] = useState<Promise<ApiListResponse<NewsItem>>>(Promise.resolve(initialNewsState));
    const [error, setError] = useState<string | null>(null);

    const currentPage = Number(searchParams.get('page')) || 1;
    const currentPerPage = Number(searchParams.get('perPage')) || 15;

    useEffect(() => {
        const loadNews = async () => {
            setError(null);
            
            try {
                const news = await getNews(currentPage, currentPerPage);
                setNewsResource(Promise.resolve(news));
            } catch (error) {
                console.error('Error loading news:', error);
                setError('Failed to load news. Please try again.');
                setNewsResource(Promise.resolve(initialNewsState));
            }
        };
        
        loadNews();
    }, [currentPage, currentPerPage]); 

    // Show error state
    if (error) {
        return (
            <main className={styles.newsPage}>
                <motion.section className={styles.NewsHero}>
                    <Image
                        src="/assets/imgs/rightEffect.svg"
                        alt=""
                        width={500}
                        height={500}
                        className={styles.rheroEffect}
                    />
                    <Image
                        src="/assets/imgs/leftEffect.svg"
                        alt=""
                        width={500}
                        height={500}
                        className={styles.lheroEffect}
                    />
                    <div className={styles.heroContent}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <Image
                                className={styles.heroGamepad}
                                src="/assets/imgs/bgGamePad.svg"
                                alt="Gamepad"
                                width={405}
                                height={377}
                                priority
                            />
                        </motion.div>
                        <motion.h1
                            className={styles.heroTitle}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            {t("newsTitle")}
                        </motion.h1>
                    </div>
                </motion.section>
                <div className={styles.container} style={{ background: "#020106" }}>
                    <div className={styles.errorContainer}>
                        <p className={styles.errorMessage}>{error}</p>
                        <button 
                            className={styles.retryButton}
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.newsPage}>
            <motion.section className={styles.NewsHero}>
                <Image
                    src="/assets/imgs/rightEffect.svg"
                    alt=""
                    width={500}
                    height={500}
                    className={styles.rheroEffect}
                />
                <Image
                    src="/assets/imgs/leftEffect.svg"
                    alt=""
                    width={500}
                    height={500}
                    className={styles.lheroEffect}
                />
                <div className={styles.heroContent}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <Image
                            className={styles.heroGamepad}
                            src="/assets/imgs/bgGamePad.svg"
                            alt="Gamepad"
                            width={405}
                            height={377}
                            priority
                        />
                    </motion.div>
                    <motion.h1
                        className={styles.heroTitle}
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        {t("newsTitle")}
                    </motion.h1>
                </div>
            </motion.section>
            <div className={styles.container} style={{ background: "#020106" }}>
                <NewsList newsResource={newsResource}/>
            </div>
        </main>
    );
};

// Main export with Suspense wrapper
export default function NewsPage() {
    return (
        <Suspense fallback={<NewsPageSkeleton />}>
            <NewsPageContent />
        </Suspense>
    );
}
