"use client";

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { TournamentMatch } from '@/types/tournament';
import { FaTrophy, FaGamepad, FaCheckCircle, FaClock, FaPlay } from 'react-icons/fa';
import styles from './BracketTab.module.scss';

interface BracketTabProps {
  brackets: {
    quarterFinals: TournamentMatch[];
    semiFinals: TournamentMatch[];
    final: TournamentMatch[];
  };
}

export default function BracketTab({ brackets }: BracketTabProps) {
  const t = useTranslations('TournamentDetail');

  const getMatchStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className={styles.statusIconCompleted} />;
      case 'live':
        return <FaPlay className={styles.statusIconLive} />;
      default:
        return <FaClock className={styles.statusIconScheduled} />;
    }
  };

  const getMatchStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return styles.statusCompleted;
      case 'live':
        return styles.statusLive;
      default:
        return styles.statusScheduled;
    }
  };

  const getMatchStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return t('matchCompleted');
      case 'live':
        return t('matchLive');
      default:
        return t('matchScheduled');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uz-UZ', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderMatch = (match: TournamentMatch) => (
    <div key={match.id} className={styles.matchCard}>
      <div className={styles.matchHeader}>
        <span className={`${styles.matchStatus} ${getMatchStatusColor(match.status)}`}>
          {getMatchStatusIcon(match.status)}
          {getMatchStatusText(match.status)}
        </span>
        <span className={styles.matchDate}>{formatDate(match.matchDate)}</span>
      </div>
      
      <div className={styles.matchContent}>
        <div className={`${styles.team} ${match.winner === match.team1.id ? styles.winner : ''}`}>
          <div className={styles.teamInfo}>
            <span className={styles.teamName}>{match.team1.name}</span>
            {match.team1.logo && (
              <Image 
                src={match.team1.logo} 
                alt={match.team1.name} 
                className={styles.teamLogo}
                width={32}
                height={32}
              />
            )}
          </div>
          <span className={styles.teamScore}>{match.team1.score}</span>
        </div>
        
        <div className={styles.matchDivider}>
          <span className={styles.vsText}>VS</span>
        </div>
        
        <div className={`${styles.team} ${match.winner === match.team2.id ? styles.winner : ''}`}>
          <div className={styles.teamInfo}>
            <span className={styles.teamName}>{match.team2.name}</span>
            {match.team2.logo && (
              <Image 
                src={match.team2.logo} 
                alt={match.team2.name} 
                className={styles.teamLogo}
                width={32}
                height={32}
              />
            )}
          </div>
          <span className={styles.teamScore}>{match.team2.score}</span>
        </div>
      </div>
      
      {match.winner && (
        <div className={styles.winnerIndicator}>
          <FaTrophy className={styles.trophyIcon} />
          <span>{t('winner')}: {match.winner === match.team1.id ? match.team1.name : match.team2.name}</span>
        </div>
      )}
    </div>
  );

  const renderBracketStage = (matches: TournamentMatch[], title: string, icon: React.ReactNode) => {
    if (matches.length === 0) return null;
    
    return (
      <div className={styles.bracketStage}>
        <div className={styles.stageHeader}>
          {icon}
          <h3 className={styles.stageTitle}>{title}</h3>
          <span className={styles.matchCount}>({matches.length} {t('matches')})</span>
        </div>
        
        <div className={styles.stageMatches}>
          {matches.map((match) => renderMatch(match))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.bracketTab}>
      <div className={styles.tabHeader}>
        <div className={styles.headerInfo}>
          <h2 className={styles.tabTitle}>
            <FaGamepad className={styles.titleIcon} />
            {t('tournamentBracket')}
          </h2>
          <p className={styles.tabDescription}>
            {t('bracketDescription')}
          </p>
        </div>
      </div>

      <div className={styles.bracketContainer}>
        {renderBracketStage(brackets.quarterFinals, t('quarterFinals'), <FaGamepad className={styles.stageIcon} />)}
        {renderBracketStage(brackets.semiFinals, t('semiFinals'), <FaGamepad className={styles.stageIcon} />)}
        {renderBracketStage(brackets.final, t('grandFinal'), <FaTrophy className={styles.stageIcon} />)}
        
        {brackets.quarterFinals.length === 0 && 
         brackets.semiFinals.length === 0 && 
         brackets.final.length === 0 && (
          <div className={styles.emptyState}>
            <FaGamepad className={styles.emptyIcon} />
            <h3>{t('noBrackets')}</h3>
            <p>{t('noBracketsDescription')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
