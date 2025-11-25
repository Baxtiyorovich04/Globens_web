"use client";

import { useTranslations } from 'next-intl';
import { FaTrophy, FaMedal, FaUsers } from 'react-icons/fa';
import styles from './PrizeTab.module.scss';

interface PrizeTabProps {
  prize: string;
  maxTeams: number;
  currentTeams: number;
  prizes?: {
    first: string;
    second: string;
    third: string;
  };
}

export default function PrizeTab({ prize, maxTeams, currentTeams, prizes }: PrizeTabProps) {
  const t = useTranslations('TournamentDetail');

  const defaultPrizes = {
    first: prize,
    second: prize ? `$${Math.floor(parseInt(prize.replace(/[^0-9]/g, '')) * 0.3)}` : '$0',
    third: prize ? `$${Math.floor(parseInt(prize.replace(/[^0-9]/g, '')) * 0.2)}` : '$0'
  };

  const finalPrizes = prizes || defaultPrizes;

  return (
    <div className={styles.prizeTab}>
      <div className={styles.tabHeader}>
        <div className={styles.headerInfo}>
          <h2 className={styles.tabTitle}>
            <FaTrophy className={styles.titleIcon} />
            {t('prizePool')}
          </h2>
          <p className={styles.tabDescription}>
            {t('prizeDescription')}
          </p>
        </div>
      </div>

      <div className={styles.prizeContainer}>
        <div className={styles.mainPrize}>
          <div className={styles.prizeCard}>
            <FaTrophy className={styles.mainPrizeIcon} />
            <h3 className={styles.prizeTitle}>{t('grandPrize')}</h3>
            <div className={styles.prizeAmount}>{finalPrizes.first}</div>
            <p className={styles.prizeDescription}>
              {t('grandPrizeDescription')}
            </p>
          </div>
        </div>

        <div className={styles.prizeGrid}>
          <div className={styles.prizeCard}>
            <FaMedal className={styles.secondPrizeIcon} />
            <h4 className={styles.prizeTitle}>{t('secondPlace')}</h4>
            <div className={styles.prizeAmount}>{finalPrizes.second}</div>
          </div>

          <div className={styles.prizeCard}>
            <FaMedal className={styles.thirdPrizeIcon} />
            <h4 className={styles.prizeTitle}>{t('thirdPlace')}</h4>
            <div className={styles.prizeAmount}>{finalPrizes.third}</div>
          </div>
        </div>

        <div className={styles.participationInfo}>
          <div className={styles.infoCard}>
            <FaUsers className={styles.infoIcon} />
            <div className={styles.infoContent}>
              <h4>{t('teamLimit')}</h4>
              <p>{t('currentTeams')}: {currentTeams} / {maxTeams}</p>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill} 
                  style={{ width: `${(currentTeams / maxTeams) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.prizeRules}>
          <h3>{t('prizeRules')}</h3>
          <ul>
            <li>{t('prizeRule1')}</li>
            <li>{t('prizeRule2')}</li>
            <li>{t('prizeRule3')}</li>
            <li>{t('prizeRule4')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
