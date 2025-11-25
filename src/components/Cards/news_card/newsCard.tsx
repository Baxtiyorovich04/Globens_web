import React from 'react';
import styles from './newsCard.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import type {NewsItem} from '@/types/news';

const NewsCard: React.FC<{news: NewsItem}> = ({news}) => {
    const locale = useLocale();
    
    return (
        <Link href={`/${locale}/news/${news.slug}`} className={styles.newsCard}>
            <div className={styles.newsCard__imageWrapper}>
                <Image
                    src={news.image_url}
                    alt={news.title}
                    width={400}
                    height={300}
                    className={styles.newsCard__image}
                    priority={false}
                    style={{ aspectRatio: '4/3' }}
                />
            </div>
            <div className={styles.newsCard__content}>
                <div className={styles.newsCard__glowEffect}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ flex: 1 }}>
                        <h3 className={styles.newsCard__title}>{news.title}</h3>
                        {news.summary && <p className={styles.newsCard__description}>{news.summary}</p>}
                    </div>
                    <Image
                        src="/assets/icons/news_detail_arrow.svg"
                        alt="Read more"
                        width={20}
                        height={20}
                        className={styles.newsCard__icon}
                    />
                </div>
            </div>
        </Link>
    );
};

export default NewsCard;