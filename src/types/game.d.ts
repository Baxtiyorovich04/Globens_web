import {LinksResponse, PaginationResponse} from "@/types/global";

export interface GameItem {
    id: number;
    name: string;
    description: string;
    slug: string;
    image_url: string;
    created_at: string;
    updated_at: string;
}

export interface Game {
    id: number;
    image: string;
    title: string;
    description: string;
    slug: string;
    rating?: number;
    playerCount?: number;
    genres?: string[];
}

export interface GameList {
    data: GameItem[];
    meta: PaginationResponse;
    links: LinksResponse;
}

export interface GameDetail {
    id: number;
    name: string;
    description: string;
    slug: string;
    image_url: string;
    created_at: string;
    updated_at: string;
}

export interface GameDetailResponse {
    data: GameDetail;
}

export interface GamesResponse {
    data: GameItem[];
    current_page: number;
    per_page: number;
    total: number;
}
