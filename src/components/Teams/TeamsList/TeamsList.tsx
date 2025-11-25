'use client'

import React from 'react';
import { Team } from '@/types/teams';
import Image from 'next/image';
import styles from './TeamsList.module.scss';

interface TeamsListProps {
  teams: Team[];
  onTeamClick: (team: Team) => void;
}

export const TeamsList: React.FC<TeamsListProps> = ({ teams, onTeamClick }) => {
  return (
    <div className={styles.teamsList}>
      <div className={styles.teamsGrid}>
        {teams.map((team) => (
          <div
            key={team.id}
            className={styles.teamCard}
            onClick={() => onTeamClick(team)}
          >
            <div className={styles.teamHeader}>
              <div className={styles.teamAvatar}>
                {team.avatar_url ? (
                  <Image 
                    src={team.avatar_url} 
                    alt={team.name}
                    width={48}
                    height={48}
                    className={styles.avatarImage}
                  />
                ) : (
                  <div className={styles.defaultAvatar}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M23 21V19C23 18.1137 22.7155 17.2358 22.2094 16.5558C21.7033 15.8759 20.9991 15.4279 20.22 15.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 3.13C16.8704 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0218 6.11683 19.0218 7.005C19.0218 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8704 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
              
              <div className={styles.teamMainInfo}>
                <div className={styles.teamNameRow}>
                  <h3 className={styles.teamName}>{team.name}</h3>
                  <div className={styles.membersIcon}>
                    <span className={styles.membersCount}>{team.members_count}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M23 21V19C23 18.1137 22.7155 17.2358 22.2094 16.5558C21.7033 15.8759 20.9991 15.4279 20.22 15.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 3.13C16.8704 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0218 6.11683 19.0218 7.005C19.0218 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8704 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                {team.game_name && (
                  <p className={styles.teamGame}>🎮 {team.game_name}</p>
                )}
              </div>
            </div>
            
            {team.description && (
              <div className={styles.teamDescription}>
                <p>{team.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
