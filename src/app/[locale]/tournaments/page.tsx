import styles from "./tournaments.module.scss";
import {getTranslations} from "next-intl/server";
import {FaCalendarAlt, FaGamepad, FaTrophy, FaUsers} from "react-icons/fa";
import {BsFillTicketFill} from "react-icons/bs";
import Link from "next/link";

export default async function TournamentsPage() {
    const t = await getTranslations("TournamentsPage");
    // Tournament data
    const activeTournaments = [
        {
            id: 1,
            name: t("globensChampionship"),
            game: t("cs2"),
            prize: "$50,000",
            teams: 32,
            startDate: "2023-11-15",
            status: t("ongoing")
        },
        {
            id: 2,
            name: t("valorantWinterCup"),
            game: t("valorant"),
            prize: "$25,000",
            teams: 16,
            startDate: "2023-12-01",
            status: t("upcoming")
        },
        {
            id: 3,
            name: t("minecraftBuildBattle"),
            game: t("minecraft"),
            prize: "$10,000",
            teams: 8,
            startDate: "2023-11-20",
            status: t("upcoming")
        }
    ];

    return (
        <div className={styles.tournamentsPage}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>{t("heroTitle")}</h1>
                    <p className={styles.heroSubtitle}>
                        {t("heroSubtitle")}
                    </p>
                </div>
                <div className={styles.heroOverlay}></div>
            </section>

            {/* Active Tournaments Section */}
            <section className={styles.tournamentsSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>
                        <FaTrophy/> {t("activeTournaments")}
                    </h2>
                    <div className={styles.tournamentsGrid}>
                        {activeTournaments.map((tournament) => (
                            <Link key={tournament.id} href={`/tournaments/${tournament.id}`} className={styles.tournamentCard}>
                                <div className={styles.tournamentHeader}>
                                    <h3 className={styles.tournamentName}>{tournament.name}</h3>
                                    <span className={`${styles.tournamentStatus} ${
                                        tournament.status === t("ongoing") ? styles.ongoing : styles.upcoming
                                    }`}>
                    {tournament.status}
                  </span>
                                </div>
                                <div className={styles.tournamentDetails}>
                                    <div className={styles.detailItem}>
                                        <FaGamepad/>
                                        <span>{tournament.game}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <FaUsers/>
                                        <span>{tournament.teams} {t("teams")}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <FaCalendarAlt/>
                                        <span>{tournament.startDate}</span>
                                    </div>
                                </div>
                                <div className={styles.tournamentPrize}>
                                    <span>{t("prizePool")}</span>
                                    <span className={styles.prizeAmount}>{tournament.prize}</span>
                                </div>
                                <div className={styles.registerButton}>
                                    <BsFillTicketFill/> {t("viewDetails")}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tournament Bracket Section */}
            {/*<section className={styles.bracketSection}>*/}
            {/*    <div className={styles.container}>*/}
            {/*        <h2 className={styles.sectionTitle}>*/}
            {/*            <FaTrophy/> {t("championshipBracket")}*/}
            {/*        </h2>*/}

            {/*        <div className={styles.bracketContainer}>*/}
            {/*            /!* Quarter Finals *!/*/}
            {/*            <div className={styles.bracketColumn}>*/}
            {/*                <h3 className={styles.bracketTitle}>{t("quarterFinals")}</h3>*/}
            {/*                {bracketData.quarterFinals.map((match) => (*/}
            {/*                    <div key={match.id} className={styles.matchCard}>*/}
            {/*                        <div className={`${styles.team} ${*/}
            {/*                            match.winner === match.team1.name ? styles.winner : ''*/}
            {/*                        }`}>*/}
            {/*                            <span className={styles.teamName}>{match.team1.name}</span>*/}
            {/*                            <span className={styles.teamScore}>{match.team1.score}</span>*/}
            {/*                        </div>*/}
            {/*                        <div className={`${styles.team} ${*/}
            {/*            match.winner === match.team2.name ? styles.winner : ''*/}
            {/*        }`}>*/}
            {/*                            <span className={styles.teamName}>{match.team2.name}</span>*/}
            {/*                            <span className={styles.teamScore}>{match.team2.score}</span>*/}
            {/*                        </div>*/}
            {/*                        <div className={styles.matchConnector}></div>*/}
            {/*                    </div>*/}
            {/*                ))}*/}
            {/*            </div>*/}

            {/*            /!* Lines connecting to Semi Finals *!/*/}
            {/*            <div className={styles.connectorLines}>*/}
            {/*                <div className={styles.line}></div>*/}
            {/*                <div className={styles.line}></div>*/}
            {/*                <div className={styles.line}></div>*/}
            {/*                <div className={styles.line}></div>*/}
            {/*            </div>*/}

            {/*            /!* Semi Finals *!/*/}
            {/*            <div className={styles.bracketColumn}>*/}
            {/*                <h3 className={styles.bracketTitle}>{t("semiFinals")}</h3>*/}
            {/*                {bracketData.semiFinals.map((match) => (*/}
            {/*                    <div key={match.id} className={styles.matchCard}>*/}
            {/*                        <div className={styles.team}>*/}
            {/*        <span className={styles.teamName}>*/}
            {/*          {match.team1.name || "TBD"}*/}
            {/*        </span>*/}
            {/*                            <span className={styles.teamScore}>{match.team1.score}</span>*/}
            {/*                        </div>*/}
            {/*                        <div className={styles.team}>*/}
            {/*        <span className={styles.teamName}>*/}
            {/*          {match.team2.name || "TBD"}*/}
            {/*        </span>*/}
            {/*                            <span className={styles.teamScore}>{match.team2.score}</span>*/}
            {/*                        </div>*/}
            {/*                        <div className={styles.matchConnector}></div>*/}
            {/*                    </div>*/}
            {/*                ))}*/}
            {/*            </div>*/}

            {/*            /!* Lines connecting to Final *!/*/}
            {/*            <div className={styles.connectorLines}>*/}
            {/*                <div className={styles.line}></div>*/}
            {/*                <div className={styles.line}></div>*/}
            {/*            </div>*/}

            {/*            /!* Final *!/*/}
            {/*            <div className={styles.bracketColumn}>*/}
            {/*                <h3 className={styles.bracketTitle}>{t("grandFinal")}</h3>*/}
            {/*                <div className={styles.matchCard}>*/}
            {/*                    <div className={styles.team}>*/}
            {/*      <span className={styles.teamName}>*/}
            {/*        {bracketData.final.team1.name || "TBD"}*/}
            {/*      </span>*/}
            {/*                            <span className={styles.teamScore}>{bracketData.final.team1.score}</span>*/}
            {/*                    </div>*/}
            {/*                    <div className={styles.team}>*/}
            {/*      <span className={styles.teamName}>*/}
            {/*        {bracketData.final.team2.name || "TBD"}*/}
            {/*      </span>*/}
            {/*                            <span className={styles.teamScore}>{bracketData.final.team2.score}</span>*/}
            {/*                    </div>*/}
            {/*                    <div className={styles.championCrown}>*/}
            {/*                        <FaTrophy/>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
        </div>
    );
}