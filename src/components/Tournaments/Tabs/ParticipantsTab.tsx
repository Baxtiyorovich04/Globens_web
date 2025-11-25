"use client";

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { TournamentParticipant } from '@/types/tournament';
import { FaUsers, FaTrophy, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaMinusCircle } from 'react-icons/fa';
import styles from './ParticipantsTab.module.scss';

interface ParticipantsTabProps {
  participants: TournamentParticipant[];
}

export default function ParticipantsTab({ participants }: ParticipantsTabProps) {
  const t = useTranslations('TournamentDetail');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <FaCheckCircle className={styles.statusIconConfirmed} />;
      case 'eliminated':
        return <FaTimesCircle className={styles.statusIconEliminated} />;
      default:
        return <FaMinusCircle className={styles.statusIconRegistered} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return styles.statusConfirmed;
      case 'eliminated':
        return styles.statusEliminated;
      default:
        return styles.statusRegistered;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return t('statusConfirmed');
      case 'eliminated':
        return t('statusEliminated');
      default:
        return t('statusRegistered');
    }
  };



  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.participantsTab}>
      <div className={styles.tabHeader}>
        <div className={styles.headerInfo}>
          <h2 className={styles.tabTitle}>
            <FaUsers className={styles.titleIcon} />
            {t('participants')} ({participants.length})
          </h2>
          <p className={styles.tabDescription}>
            {t('participantsDescription')}
          </p>
        </div>
        

      </div>

      <div className={styles.participantsGrid}>
        {participants.map((participant) => (
          <div key={participant.id} className={styles.participantCard}>
            <div className={styles.cardHeader}>
              <div className={styles.teamInfo}>
                <div className={styles.teamLogo}>
                  {participant.teamLogo ? (
                    <Image 
                      src={participant.teamLogo} 
                      alt={participant.teamName}
                      width={48}
                      height={48}
                    />
                  ) : (
                    <FaUsers className={styles.defaultLogo} />
                  )}
                </div>
                <div className={styles.teamDetails}>
                  <h3 className={styles.teamName}>{participant.teamName}</h3>
                  <span className={`${styles.status} ${getStatusColor(participant.status)}`}>
                    {getStatusIcon(participant.status)}
                    {getStatusText(participant.status)}
                  </span>
                </div>
              </div>
              
              
            </div>

            <div className={styles.playersList}>
              <h4 className={styles.playersTitle}>{t('players')}:</h4>
              <div className={styles.playersGrid}>
                {participant.players.map((player, index) => (
                  <span key={index} className={styles.playerName}>
                    {player}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <FaTrophy className={styles.statIcon} />
                <span className={styles.statValue}>{participant.points || 0}</span>
                <span className={styles.statLabel}>{t('points')}</span>
              </div>
              
              <div className={styles.statItem}>
                <FaCheckCircle className={styles.statIcon} />
                <span className={styles.statValue}>{participant.wins || 0}</span>
                <span className={styles.statLabel}>{t('wins')}</span>
              </div>
              
              <div className={styles.statItem}>
                <FaTimesCircle className={styles.statIcon} />
                <span className={styles.statValue}>{participant.losses || 0}</span>
                <span className={styles.statLabel}>{t('losses')}</span>
              </div>
            </div>

            <div className={styles.registrationInfo}>
              <FaCalendarAlt className={styles.calendarIcon} />
              <span>{t('registered')}: {formatDate(participant.registrationDate)}</span>
            </div>
          </div>
        ))}
      </div>

      {participants.length === 0 && (
        <div className={styles.emptyState}>
          <FaUsers className={styles.emptyIcon} />
          <h3>{t('noParticipants')}</h3>
          <p>{t('noParticipantsDescription')}</p>
        </div>
      )}
    </div>
  );
}
