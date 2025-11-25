'use server'

import {notFound} from 'next/navigation';
import {GameDetailResponse, GamesResponse} from '@/types/game';
import {API_ENDPOINTS} from "@/utilities/constants";
import {createServerApi} from "@/API";

export async function getGames(page: number = 1, perPage: number = 15): Promise<GamesResponse> {
    const api = await createServerApi();

    try {
        return (await api.get<GamesResponse>(API_ENDPOINTS.GAMES, {
            params: {
                page,
                per_page: perPage
            }
        })).data;
    } catch (error: unknown) {
        console.error('Error fetching games:', error);
        
        // Handle 523 error specifically
        if (error && typeof error === 'object' && 'response' in error && 
            error.response && typeof error.response === 'object' && 'status' in error.response &&
            error.response.status === 523) {
            console.error('Server is unreachable (523). Backend server may be down.');
            // Return empty data structure to prevent app crash
            return {
                data: [],
                current_page: 1,
                per_page: perPage,
                total: 0
            };
        }
        
        throw error;
    }
}

export async function getGameBySlug(slug: string): Promise<GameDetailResponse> {
    const api = await createServerApi();

    try {
        return (await api.get<GameDetailResponse>(API_ENDPOINTS.GAMES + `/${slug}`)).data;
    } catch (error: unknown) {
        console.error('Error fetching game details:', error);
        
        if (error && typeof error === 'object' && 'response' in error && 
            error.response && typeof error.response === 'object' && 'status' in error.response &&
            error.response.status === 523) {
            console.error('Server is unreachable (523). Backend server may be down.');
            notFound();
        }
        
        notFound();
    }
}
