"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { TournamentMatch } from '@/types/tournament';
import { FaGamepad, FaCheckCircle, FaClock, FaPlay, FaFilter } from 'react-icons/fa';
import styles from './MatchesTab.module.scss';

interface MatchesTabProps {
  matches: TournamentMatch[];
}

export default function MatchesTab({ matches }: MatchesTabProps) {
  const t = useTranslations('TournamentDetail');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'live' | 'scheduled'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'stage'>('date');

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

  const getStageText = (stage: string) => {
    switch (stage) {
      case 'quarter_finals':
        return t('quarterFinals');
      case 'semi_finals':
        return t('semiFinals');
      case 'final':
        return t('grandFinal');
      case 'group_stage':
        return t('groupStage');
      default:
        return stage;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredMatches = matches.filter(match => {
    if (filterStatus === 'all') return true;
    return match.status === filterStatus;
  });

  const sortedMatches = [...filteredMatches].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.matchDate).getTime() - new Date(a.matchDate).getTime();
    } else {
      return a.stage.localeCompare(b.stage);
    }
  });

  const statusCounts = {
    all: matches.length,
    completed: matches.filter(m => m.status === 'completed').length,
    live: matches.filter(m => m.status === 'live').length,
    scheduled: matches.filter(m => m.status === 'scheduled').length
  };

  return (
    <div className={styles.matchesTab}>
      <div className={styles.tabHeader}>
        <div className={styles.headerInfo}>
          <h2 className={styles.tabTitle}>
            <FaGamepad className={styles.titleIcon} />
            {t('allMatches')} ({matches.length})
          </h2>
          <p className={styles.tabDescription}>
            {t('matchesDescription')}
          </p>
        </div>
      </div>

      <div className={styles.controlsSection}>
        <div className={styles.filterControls}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              <FaFilter className={styles.filterIcon} />
              {t('filterByStatus')}:
            </label>
            <div className={styles.statusFilters}>
              {(['all', 'completed', 'live', 'scheduled'] as const).map((status) => (
                <button
                  key={status}
                  className={`${styles.statusFilter} ${filterStatus === status ? styles.active : ''}`}
                  onClick={() => setFilterStatus(status)}
                >
                  {getMatchStatusIcon(status === 'all' ? 'scheduled' : status)}
                  <span>{status === 'all' ? t('all') : getMatchStatusText(status)}</span>
                  <span className={styles.statusCount}>({statusCounts[status]})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.sortControls}>
          <label className={styles.sortLabel}>{t('sortBy')}:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as 'date' | 'stage')}
            className={styles.sortSelect}
          >
            <option value="date">{t('sortByDate')}</option>
            <option value="stage">{t('sortByStage')}</option>
          </select>
        </div>
      </div>

      <div className={styles.matchesGrid}>
        {sortedMatches.map((match) => (
          <div key={match.id} className={styles.matchCard}>
            <div className={styles.matchHeader}>
              <div className={styles.matchInfo}>
                <span className={`${styles.matchStatus} ${getMatchStatusColor(match.status)}`}>
                  {getMatchStatusIcon(match.status)}
                  {getMatchStatusText(match.status)}
                </span>
                <span className={styles.matchStage}>{getStageText(match.stage)}</span>
              </div>
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
                <span>{t('winner')}: {match.winner === match.team1.id ? match.team1.name : match.team2.name}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {sortedMatches.length === 0 && (
        <div className={styles.emptyState}>
          <FaGamepad className={styles.emptyIcon} />
          <h3>{t('noMatches')}</h3>
          <p>{t('noMatchesDescription')}</p>
        </div>
      )}
    </div>
  );
}
