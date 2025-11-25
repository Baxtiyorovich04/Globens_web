'use client'

import axios from 'axios';
import { API_URL } from '@/utilities/constants';
import { authService } from './auth';

// Team types
export interface TeamMember {
  id: number;
  name: string;
  email: string | null;
  is_captain: boolean;
  is_invited: boolean;
  is_accepted: boolean;
}

export interface Team {
  id: number;
  slug: string;
  name: string;
  avatar_url: string;
  game_id: string;
  game_name: string | null;
  description: string;
  members_count: number;
  members: TeamMember[];
  created_at: string;
  updated_at: string;
}

export interface CreateTeamData {
  name: string;
  game_id: string;
  avatar?: File;
  description?: string;
}


export interface TeamsResponse {
  data: Team[];
  meta?: Record<string, unknown>;
  links?: Record<string, unknown>;
}

export interface CreateTeamResponse {
  data: Team;
}
export interface JoinTeamResponse {
  message: string;
  team: Team;
}


interface AxiosErrorResponse {
  response?: {
    data: unknown;
    status: number;
    statusText: string;
  };
  message?: string;
}


const createTeamsApi = () => {
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

// Create multipart axios instance for file uploads
const createTeamsMultipartApi = () => {
  const token = authService.getAccessToken();
  
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Accept': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    },
    timeout: 30000 // Longer timeout for file uploads
  });
};

export const teamsService = {
  async getTeams(): Promise<TeamsResponse> {
    try {
      const teamsApi = createTeamsApi();
      const response = await teamsApi.get<TeamsResponse>('/teams');
      
      // Log response for debugging
      console.log('GET /teams response:', response);
      
      // Check if response has data
      if (response.data && response.data.data) {
        return response.data;
      }
      
      // If no data in response, return empty teams array
      return {
        data: []
      };
    } catch (error: unknown) {
      console.error('Error in getTeams:', error);
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as AxiosErrorResponse;
        if (axiosError.response?.data) {
          console.log('Axios error response:', axiosError.response.data);
          return axiosError.response.data as TeamsResponse;
        }
      }
      
      return {
        data: []
      };
    }
  },

  async createTeam(data: CreateTeamData): Promise<CreateTeamResponse> {
    try {
      const teamsMultipartApi = createTeamsMultipartApi();
      const formData = new FormData();
      
      formData.append('name', data.name);
      formData.append('game_id', data.game_id);
      
      if (data.avatar) {
        formData.append('avatar', data.avatar);
      }
      
      if (data.description) {
        formData.append('description', data.description);
      }
      
      console.log('Creating team with data:', {
        name: data.name,
        game_id: data.game_id,
        hasAvatar: !!data.avatar,
        description: data.description
      });
      
      const response = await teamsMultipartApi.post<CreateTeamResponse>('/teams', formData);
      
      // Log response for debugging
      console.log('POST /teams response:', response);
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
      
      // Check if response has data
      if (response.data && response.data.data) {
        return response.data;
      }
      
      // If response is successful but no data, create a success response
      if (response.status === 201 || response.status === 200) {
        return {
          data: {
            id: Date.now(), // Temporary ID
            slug: `team-${Date.now()}`,
            name: data.name,
            avatar_url: '',
            game_id: data.game_id,
            game_name: null,
            description: data.description || '',
            members_count: 1,
            members: [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        };
      }
      
      throw new Error('Failed to create team');
    } catch (error: unknown) {
      console.error('Error in createTeam:', error);
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as AxiosErrorResponse;
        if (axiosError.response?.data) {
          console.log('Axios error response:', axiosError.response.data);
          return axiosError.response.data as CreateTeamResponse;
        }
      }
      
      throw error;
    }
  },

  async joinTeam(teamId: number): Promise<JoinTeamResponse> {
    try {
      const teamsApi = createTeamsApi();
      const response = await teamsApi.post<JoinTeamResponse>(`/teams/${teamId}/join`);
      
      console.log('POST /teams/{teamId}/join response:', response);
      
      if (response.data) {
        return response.data;
      }
      
      throw new Error('Failed to join team');
    } catch (error: unknown) {
      console.error('Error in joinTeam:', error);
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as AxiosErrorResponse;
        if (axiosError.response?.data) {
          console.log('Axios error response:', axiosError.response.data);
          throw new Error(axiosError.response.data as string);
        }
      }
      
      throw error;
    }
  }
};
