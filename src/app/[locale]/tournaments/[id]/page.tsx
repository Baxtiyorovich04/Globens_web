"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { TournamentDetail } from '@/types/tournament';
import { tournamentService } from '@/API/services/tournaments';
import TournamentDetailHero from '@/components/Tournaments/TournamentDetailHero';
import TournamentTabs from '@/components/Tournaments/TournamentTabs';
import TournamentDetailSkeleton from '@/components/Tournaments/TournamentDetailSkeleton';
import styles from './tournamentDetail.module.scss';

export default function TournamentDetailPage() {
  const params = useParams();
  const t = useTranslations('TournamentDetail');
  const [tournament, setTournament] = useState<TournamentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        setLoading(true);
        const id = parseInt(params.id as string);
        

        const tournamentData = tournamentService.getMockTournamentDetail(id);
        setTournament(tournamentData);
        
    
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tournament');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchTournament();
    }
  }, [params.id]);

  if (loading) {
    return <TournamentDetailSkeleton />;
  }

  if (error || !tournament) {
    return (
      <div className={styles.errorContainer}>
        <h2>{t('errorTitle')}</h2>
        <p>{error || t('tournamentNotFound')}</p>
      </div>
    );
  }

  return (
    <div className={styles.tournamentDetailPage}>
      <TournamentDetailHero tournament={tournament} />
      <TournamentTabs tournament={tournament} />
    </div>
  );
}
