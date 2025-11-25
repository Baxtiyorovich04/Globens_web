'use client'

import axios from 'axios';
import { API_URL, API_ENDPOINTS } from '@/utilities/constants';

// Define types for server data based on the API response
export interface ServerData {
  id: number;
  url: string;
  game_id: number;
  game_name: string;
  name: string;
  name_uz: string;
  name_ru: string;
  name_en: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  created_at: string;
  updated_at: string;
  // Client-side only properties
  ping?: number;
  favorite?: boolean;
}

export interface ServersResponse {
  data: ServerData[];
  meta: {
    current_page: number[];
    last_page: number[];
    per_page: number[];
    total: number[];
    from: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    to: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

// Define proper types for axios error responses
interface AxiosErrorResponse {
  response?: {
    data: {
      success: boolean;
      message: string;
      message_type: 'success' | 'error' | 'info';
      errors?: Array<{
        field: string;
        message: string;
      }>;
    };
    status: number;
    statusText: string;
  };
}

// Create axios instance
const createServersApi = () => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    timeout: 10000
  });
};

export const serversService = {
  async getServers(page: number = 1): Promise<ServersResponse> {
    try {
      const serversApi = createServersApi();
      const response = await serversApi.get<ServersResponse>(
        `${API_ENDPOINTS.SERVERS}?page=${page}`
      );
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as AxiosErrorResponse;
        if (axiosError.response?.data) {
          throw axiosError.response.data;
        }
      }
      throw {
        success: false,
        message: 'Network error occurred',
        message_type: 'error' as const
      };
    }
  }
};
