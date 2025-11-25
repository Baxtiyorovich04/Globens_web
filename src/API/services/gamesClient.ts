'use client'

import axios from 'axios';
import { API_URL } from '@/utilities/constants';
import { authService } from './auth';
import { GameItem, GamesResponse } from '@/types/game';

// Create axios instance with authentication
const createGamesApi = () => {
  const token = authService.getAccessToken();
  
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    },
    timeout: 10000
  });
};

export const gamesClientService = {
  async getGames(page: number = 1, perPage: number = 100): Promise<GamesResponse> {
    try {
      const gamesApi = createGamesApi();
      const response = await gamesApi.get<GamesResponse>('/games', {
        params: {
          page,
          per_page: perPage
        }
      });
      return response.data;
    } catch (error: unknown) {
      console.error('Error fetching games:', error);
      
      // Return empty data structure to prevent app crash
      return {
        data: [],
        current_page: 1,
        per_page: perPage,
        total: 0
      };
    }
  },

  async getGameBySlug(slug: string): Promise<GameItem | null> {
    try {
      const gamesApi = createGamesApi();
      const response = await gamesApi.get<{ data: GameItem }>(`/games/${slug}`);
      return response.data.data;
    } catch (error: unknown) {
      console.error('Error fetching game details:', error);
      return null;
    }
  }
};
