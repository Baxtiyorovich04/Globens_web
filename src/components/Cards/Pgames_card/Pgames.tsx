"use client";

import styles from "./Pgames.module.scss";
import Image from "next/image";
import {GamesResponse} from "@/types/game";
import {use} from "react";
import {useTranslations, useLocale} from "next-intl";
import Link from "next/link";

const StarIcon = () => (
    <svg width="16" height="16" fill="#FFD700" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
);

interface PgamesProps {
    gameResource: Promise<GamesResponse>;
}

export default function Pgames({gameResource}: PgamesProps) {
    const gamesResponse = use(gameResource);
    const games = gamesResponse.data;
    const t = useTranslations("Pgames");
    const locale = useLocale();

    const numberOfSkeletons = 3;
    const truncateDescription = (description: string, maxLength: number) =>
        description.length > maxLength
            ? description.substring(0, maxLength) + "..."
            : description;

    return (
        <div className={styles.card_container}>
            {games.length === 0
                ? Array.from({length: numberOfSkeletons}).map((_, index) => (
                    <div key={index} className={styles.card}>
                        Loading...
                    </div>
                ))
                : games.map((game) => (
                    <div key={game.id} className={styles.card}>
                        <div className={styles.image_container}>
                            <Image
                                src={game.image_url}
                                alt={game.name}
                                width={400}
                                height={300}
                                className={styles.card_image}
                            />
                            <div className={styles.rating_badge}>
                                <StarIcon/>
                                <span>4.8 {t("rating")}</span>
                            </div>
                        </div>
                        <div className={styles.card_content}>
                            <h3 className={styles.card_title}>{game.name}</h3>
                            <p className={styles.card_description}>
                                {truncateDescription(game.description, 100)}
                            </p>
                            <div className={styles.game_stats}>
                                <div className={styles.genres}>
                                    <span className={styles.genre_tag}>Action</span>
                                    <span className={styles.genre_tag}>Adventure</span>
                                </div>
                            </div>
                            <Link href={`/${locale}/games/${game.slug}`} className={styles.card_button}>
                                {t("explore")}
                            </Link>
                        </div>
                    </div>
                ))}
        </div>
    );
}
