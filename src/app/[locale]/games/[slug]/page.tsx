'use server'

import {getGameBySlug} from '@/API/services/games';
import styles from '../gamesDetail.module.scss';
import Image from 'next/image';
import {  FaStar, FaUsers } from 'react-icons/fa';
import { getLocale } from 'next-intl/server';
import Breadcrumb from '@/components/ui/Breadcrumb';

interface GameDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const { slug } = await params;
  const locale = await getLocale();

    const game = (await getGameBySlug(slug)).data;

  const breadcrumbItems = [
    { label: 'Games', href: `/${locale}` },
    { label: game.name, href: '', isActive: true }
  ];

  return (
    <main className={styles.mainContainer}>
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
          <div className={styles.heroTitleBox}>
            <div className={styles.breadcrumbContainer}>
              <Breadcrumb items={breadcrumbItems} />
            </div>
            <h1 className={styles.heroTitle}>
              <span className={styles.titleGradient}>{game.name}</span>
            </h1>
            <div className={styles.gameMeta}>
              <span className={styles.metaItem}>
                <FaStar className={styles.metaIcon} /> 4.8/5
              </span>
              <span className={styles.metaItem}>
                <FaUsers className={styles.metaIcon} /> 1.2M Players
              </span>

            </div>
            <p className={styles.heroDescription}>{game.description}</p>
          
          </div>
          <div className={styles.gameImageContainer}>
            <Image 
              src={game.image_url} 
              alt={game.name} 
              width={500} 
              height={350} 
              className={styles.gameImage} 
            />
            <div className={styles.imageGlow}></div>
          </div>
        </div>
      </section>
    </main>
  );
}
