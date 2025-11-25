"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { TournamentDetail } from '@/types/tournament';
import { FaUsers, FaGamepad, FaChartBar } from 'react-icons/fa';
import styles from './TournamentTabs.module.scss';
import ParticipantsTab from './Tabs/ParticipantsTab';
import BracketTab from './Tabs/BracketTab';
import MatchesTab from './Tabs/MatchesTab';


interface TournamentTabsProps {
  tournament: TournamentDetail;
}

type TabType = 'participants' | 'bracket' | 'matches';

export default function TournamentTabs({ tournament }: TournamentTabsProps) {
  const t = useTranslations('TournamentDetail');
  const [activeTab, setActiveTab] = useState<TabType>('participants');

  const tabs = [
    {
      id: 'participants' as TabType,
      label: t('participants'),
      icon: FaUsers,
      count: tournament.participants.length
    },
    {
      id: 'bracket' as TabType,
      label: t('bracket'),
      icon: FaGamepad,
      count: tournament.matches.length
    },
    {
      id: 'matches' as TabType,
      label: t('matches'),
      icon: FaChartBar,
      count: tournament.matches.length
    },

  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'participants':
        return <ParticipantsTab participants={tournament.participants} />;
      case 'bracket':
        return <BracketTab brackets={tournament.brackets} />;
      case 'matches':
        return <MatchesTab matches={tournament.matches} />;

      default:
        return <ParticipantsTab participants={tournament.participants} />;
    }
  };

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsHeader}>
        <div className={styles.tabsList}>
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <IconComponent className={styles.tabIcon} />
                <span className={styles.tabLabel}>{tab.label}</span>
                {tab.count > 0 && (
                  <span className={styles.tabCount}>{tab.count}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className={styles.tabContent}>
        {renderTabContent()}
      </div>
    </div>
  );
}
