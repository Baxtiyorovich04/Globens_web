'use client'

import React from 'react';
import { Team } from '@/API/services/teams';
import Image from 'next/image';
import styles from './TeamCard.module.scss';

interface TeamCardProps {
  team: Team;
  onClick?: (team: Team) => void;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(team);
    }
  };

  return (
    <div className={styles.teamCard} onClick={handleClick}>
      {/* Glassmorphism background layer */}
      <div className={styles.glassLayer}></div>
      
      {/* Glowing border effect */}
      <div className={styles.glowBorder}></div>
      
      {/* Team Avatar Section */}
      <div className={styles.avatarSection}>
        <div className={styles.avatarContainer}>
          <Image
            src={team.avatar_url || '/assets/imgs/default-avatar.jpg'}
            alt={team.name}
            width={120}
            height={120}
            className={styles.teamAvatar}
          />
          <div className={styles.avatarGlow}></div>
        </div>
      </div>
      
      {/* Team Information Section */}
      <div className={styles.teamInfo}>
        <h3 className={styles.teamName}>{team.name}</h3>
        
        <div className={styles.gameInfo}>
          <div className={styles.gameIcon}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
          </div>
          <span className={styles.gameTitle}>
            {team.game_name || 'O&apos;yin nomi yo&apos;q'}
          </span>
        </div>
        
        <div className={styles.membersInfo}>
          <div className={styles.membersIcon}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-3.7 3.7c-.28.28-.65.44-1.04.44H8c-.8 0-1.54.37-2.01 1L3 16.5V22h17zm-7-6c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
            </svg>
          </div>
          <span className={styles.membersCount}>
            {team.members_count} a&apos;zo
          </span>
        </div>
      </div>
      
      {/* Team ID Badge */}
      <div className={styles.teamIdBadge}>
        <span className={styles.badgeText}>ID: {team.id}</span>
      </div>
      
      {/* Team Description */}
      {team.description && (
        <div className={styles.teamDescription}>
          <p>{team.description}</p>
        </div>
      )}
      
      {/* Hover effect overlay */}
      <div className={styles.hoverOverlay}></div>
    </div>
  );
};
