'use client';

import {useEffect, useState, useRef, useCallback, JSX} from 'react';
import styles from "./servers.module.scss";
import { useTranslations } from 'next-intl';
import { FaGamepad, FaHeart, FaSignal, FaSpinner, FaServer } from "react-icons/fa";
import { SiCounterstrike, SiValorant } from "react-icons/si";
import { serversService, ServerData } from '@/API/services/servers';

// Helper function to get game icon based on game name
const getGameIcon = (gameName: string) => {
    const lowerGameName = gameName.toLowerCase();
    if (lowerGameName.includes('counter') || lowerGameName.includes('cs')) {
        return <SiCounterstrike />;
    } else if (lowerGameName.includes('valorant')) {
        return <SiValorant />;
    }
    return <FaGamepad />;
};

// Helper function to generate random ping between 20 and 60
const generateRandomPing = () => Math.floor(Math.random() * 41) + 20;

// Helper function to generate random interval between 1 and 5 seconds
const generateRandomInterval = () => (Math.floor(Math.random() * 5) + 1) * 1000;

export default function ServersPage() {
    const t = useTranslations('ServersPage');
    const [servers, setServers] = useState<(ServerData & { ping: number, icon: JSX.Element })[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef<IntersectionObserver | null>(null);
    const lastServerElementRef = useCallback((node: HTMLDivElement | null) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    // Fetch servers on initial load and when page changes
    useEffect(() => {
        const fetchServers = async () => {
            try {
                setLoading(true);
                const response = await serversService.getServers(page);

                // Process server data to add ping and icon
                const processedServers = response.data.map(server => ({
                    ...server,
                    ping: generateRandomPing(),
                    icon: getGameIcon(server.game_name),
                    favorite: false // Default to not favorite
                }));

                setServers(prev => page === 1 ? processedServers : [...prev, ...processedServers]);
                setHasMore(response.data.length > 0 && response.meta.current_page[0] < response.meta.last_page[0]);
            } catch (error) {
                console.error('Error fetching servers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServers();
    }, [page]);

    // Update ping values periodically
    useEffect(() => {
        const pingIntervals: { [key: number]: NodeJS.Timeout } = {};

        servers.forEach(server => {
            pingIntervals[server.id] = setInterval(() => {
                setServers(prevServers => 
                    prevServers.map(s => 
                        s.id === server.id ? { ...s, ping: generateRandomPing() } : s
                    )
                );
            }, generateRandomInterval());
        });

        return () => {
            // Clean up intervals on unmount
            Object.values(pingIntervals).forEach(interval => clearInterval(interval));
        };
    }, [servers]);

    return (
        <div className={styles.serversPage}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>{t('heroTitle')}</h1>
                    <p className={styles.heroSubtitle}>
                        {t('heroSubtitle')}
                    </p>
                </div>
                <div className={styles.heroOverlay}></div>
            </section>

            {/* Server Browser Section */}
            <section className={styles.serversSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>
                            <FaGamepad/> {t('availableServers')}
                        </h2>
                    </div>

                    <div className={styles.serverList}>
                        {servers.length === 0 && !loading && (
                            <div className={styles.emptyState}>
                                <FaServer />
                                <p>{t('noServers')}</p>
                                <span>{t('checkLater')}</span>
                            </div>
                        )}

                        {/* Skeleton loaders while initial loading */}
                        {loading && page === 1 && Array.from({ length: 3 }).map((_, index) => (
                            <div key={`skeleton-${index}`} className={styles.skeletonCard}>
                                <div className={styles.skeletonIcon}></div>
                                <div className={styles.skeletonInfo}>
                                    <div className={styles.skeletonName}></div>
                                    <div className={styles.skeletonGame}></div>
                                    <div className={styles.skeletonDescription}></div>
                                </div>
                                <div className={styles.skeletonStats}>
                                    <div className={styles.skeletonStat}></div>
                                    <div className={styles.skeletonButton}></div>
                                </div>
                            </div>
                        ))}

                        {servers.map((server, index) => {
                            const isLastElement = index === servers.length - 1;
                            return (
                                <div 
                                    key={server.id} 
                                    className={styles.serverCard}
                                    ref={isLastElement ? lastServerElementRef : null}
                                >
                                    <div className={styles.serverIcon}>{server.icon}</div>
                                    <div className={styles.serverInfo}>
                                        <h3 className={styles.serverName}>
                                            {server.name}
                                            {server.favorite && (
                                                <span className={styles.favoriteIcon}>
                                                    <FaHeart/>
                                                </span>
                                            )}
                                        </h3>
                                        <p className={styles.gameName}>{server.game_name}</p>
                                        <p className={styles.description}>
                                            {server.description_en || server.description_ru || server.description_uz}
                                        </p>
                                    </div>
                                    <div className={styles.serverStats}>
                                        <div className={styles.stat}>
                                            <FaSignal/> {server.ping}ms
                                        </div>
                                        <a 
                                            href={server.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className={styles.joinButton}
                                        >
                                            {t('joinServer')}
                                        </a>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Loading indicator for pagination */}
                        {loading && page > 1 && (
                            <div className={styles.loadingIndicator}>
                                <FaSpinner />
                                {t('loading')}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
