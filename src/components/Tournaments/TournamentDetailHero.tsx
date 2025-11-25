"use client";


import { useTranslations } from 'next-intl';
import { TournamentDetail } from '@/types/tournament';
import { FaCalendarAlt, FaGamepad, FaTrophy, FaUsers, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { BsFillTicketFill } from 'react-icons/bs';
import styles from './TournamentDetailHero.module.scss';

interface TournamentDetailHeroProps {
  tournament: TournamentDetail;
}

export default function TournamentDetailHero({ tournament }: TournamentDetailHeroProps) {
  const t = useTranslations('TournamentDetail');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return styles.ongoing;
      case 'upcoming':
        return styles.upcoming;
      case 'completed':
        return styles.completed;
      default:
        return styles.upcoming;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ongoing':
        return t('statusOngoing');
      case 'upcoming':
        return t('statusUpcoming');
      case 'completed':
        return t('statusCompleted');
      default:
        return status;
    }
  };

  return (
    <div className={styles.heroSection}>
      <div className={styles.heroBackground}>
      </div>
      
      <div className={styles.heroContent}>
        <div className={styles.container}>
          <div className={styles.tournamentHeader}>
            <div className={styles.tournamentInfo}>
              <div className={styles.statusBadge}>
                <span className={`${styles.status} ${getStatusColor(tournament.status)}`}>
                  {getStatusText(tournament.status)}
                </span>
              </div>
              
              <h1 className={styles.tournamentTitle}>{tournament.name}</h1>
              
              <div className={styles.gameInfo}>
                <FaGamepad className={styles.gameIcon} />
                <span>{tournament.game}</span>
              </div>
            </div>
            
            <div className={styles.prizeSection}>
              <div className={styles.prizeAmount}>
                <FaTrophy className={styles.trophyIcon} />
                <span>{tournament.prize}</span>
              </div>
              <p className={styles.prizeLabel}>{t('prizePool')}</p>
            </div>
          </div>
          
          <div className={styles.tournamentStats}>
            <div className={styles.statItem}>
              <FaUsers className={styles.statIcon} />
              <div className={styles.statContent}>
                <span className={styles.statValue}>{tournament.teams}</span>
                <span className={styles.statLabel}>{t('registeredTeams')}</span>
              </div>
            </div>
            
            <div className={styles.statItem}>
              <FaCalendarAlt className={styles.statIcon} />
              <div className={styles.statContent}>
                <span className={styles.statValue}>{formatDate(tournament.startDate)}</span>
                <span className={styles.statLabel}>{t('startDate')}</span>
              </div>
            </div>
            
            <div className={styles.statItem}>
              <FaMapMarkerAlt className={styles.statIcon} />
              <div className={styles.statContent}>
                <span className={styles.statValue}>{tournament.location}</span>
                <span className={styles.statLabel}>{t('location')}</span>
              </div>
            </div>
            
            <div className={styles.statItem}>
              <FaClock className={styles.statIcon} />
              <div className={styles.statContent}>
                <span className={styles.statValue}>{tournament.format}</span>
                <span className={styles.statLabel}>{t('format')}</span>
              </div>
            </div>
          </div>
          
          <div className={styles.descriptionSection}>
            <p className={styles.description}>{tournament.description}</p>
          </div>
          
                     <div className={styles.actionSection}>
             <button 
               className={styles.registerButton}
               onClick={() => window.open('https://store.steampowered.com/login/', '_blank')}
             >
               <BsFillTicketFill className={styles.buttonIcon} />
               {t('registerNow')}
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
