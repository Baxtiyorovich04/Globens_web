'use client'

import axios from 'axios';
import { API_URL, API_ENDPOINTS } from '@/utilities/constants';
import { authService } from './auth';

// Define types for profile data
export interface ProfileData {
  username: string;
  phone: string;
  status: string;
  full_name: string;
  avatar: string; // API response da "avatar" field bor
  email: string;
}

export interface ProfileUpdateData {
  full_name?: string;
  username?: string;
  email?: string;
  phone?: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  message_type: 'success' | 'error' | 'info';
  data?: ProfileData;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

// Define proper types for axios error responses
interface AxiosErrorResponse {
  response?: {
    data: ProfileResponse;
    status: number;
    statusText: string;
  };
}

// Create axios instance with authentication
const createProfileApi = () => {
  const token = authService.getAccessToken();
  
  if (!token) {
    throw new Error('Authentication token not found');
  }
  
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    timeout: 15000 // Increased timeout
  });
};

// Create multipart axios instance for file uploads
const createProfileMultipartApi = () => {
  const token = authService.getAccessToken();
  
  if (!token) {
    throw new Error('Authentication token not found');
  }
  
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    timeout: 30000 // Longer timeout for file uploads
  });
};

export const profileService = {
  async getProfile(): Promise<ProfileResponse> {
    try {
      // Check authentication first
      if (!authService.isAuthenticated()) {
        throw {
          success: false,
          message: 'Siz tizimga kirmagansiz',
          message_type: 'error' as const
        };
      }

      const profileApi = createProfileApi();
      const response = await profileApi.get<ProfileResponse>(
        `${API_ENDPOINTS.PROFILE}/me`
      );
      
      if (response.data.success && response.data.data) {
        return response.data;
      } else {
        throw {
          success: false,
          message: response.data.message || 'Profil ma\'lumotlari topilmadi',
          message_type: 'error' as const
        };
      }
    } catch (error: unknown) {
      console.error('Profile API error:', error);
      
      // Handle axios errors
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as AxiosErrorResponse;
        if (axiosError.response?.data) {
          // Check for authentication errors
          if (axiosError.response.status === 401 || axiosError.response.status === 403) {
            throw {
              success: false,
              message: 'Sizning sessiyangiz tugagan. Iltimos, qaytadan tizimga kiring.',
              message_type: 'error' as const
            };
          }
          throw axiosError.response.data;
        }
      }
      
      // Handle network errors
      if (error && typeof error === 'object' && 'message' in error) {
        const errorObj = error as { message: string; code?: string };
        if (errorObj.message === 'Authentication token not found') {
          throw {
            success: false,
            message: 'Siz tizimga kirmagansiz',
            message_type: 'error' as const
          };
        }
        if (errorObj.message === 'Network Error' || errorObj.code === 'NETWORK_ERROR') {
          throw {
            success: false,
            message: 'Internet aloqasi yo\'q. Iltimos, internet aloqasini tekshiring.',
            message_type: 'error' as const
          };
        }
        if (errorObj.code === 'ECONNABORTED' || errorObj.message.includes('timeout')) {
          throw {
            success: false,
            message: 'Server javob bermayapti. Iltimos, keyinroq urinib ko\'ring.',
            message_type: 'error' as const
          };
        }
      }
      
      throw {
        success: false,
        message: 'Profil ma\'lumotlarini yuklashda xatolik yuz berdi',
        message_type: 'error' as const
      };
    }
  },

  async updateProfile(data: ProfileUpdateData): Promise<ProfileResponse> {
    try {
      // Check authentication first
      if (!authService.isAuthenticated()) {
        throw {
          success: false,
          message: 'Siz tizimga kirmagansiz',
          message_type: 'error' as const
        };
      }

      const profileApi = createProfileApi();
      const response = await profileApi.put<ProfileResponse>(
        `${API_ENDPOINTS.PROFILE}/me`,
        data
      );
      
      if (response.data.success) {
        return response.data;
      } else {
        throw {
          success: false,
          message: response.data.message || 'Profil yangilanmadi',
          message_type: 'error' as const
        };
      }
    } catch (error: unknown) {
      console.error('Profile update error:', error);
      
      // Handle axios errors
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as AxiosErrorResponse;
        if (axiosError.response?.data) {
          // Check for authentication errors
          if (axiosError.response.status === 401 || axiosError.response.status === 403) {
            throw {
              success: false,
              message: 'Sizning sessiyangiz tugagan. Iltimos, qaytadan tizimga kiring.',
              message_type: 'error' as const
            };
          }
          // Check for validation errors
          if (axiosError.response.status === 422) {
            const errorData = axiosError.response.data;
            if (errorData.errors && errorData.errors.length > 0) {
              const fieldErrors = errorData.errors.map(err => `${err.field}: ${err.message}`).join(', ');
              throw {
                success: false,
                message: `Ma\'lumotlar noto\'g\'ri: ${fieldErrors}`,
                message_type: 'error' as const
              };
            }
          }
          throw axiosError.response.data;
        }
      }
      
      // Handle other errors
      if (error && typeof error === 'object' && 'message' in error) {
        const errorObj = error as { message: string };
        if (errorObj.message === 'Authentication token not found') {
          throw {
            success: false,
            message: 'Siz tizimga kirmagansiz',
            message_type: 'error' as const
          };
        }
      }
      
      throw {
        success: false,
        message: 'Profil yangilashda xatolik yuz berdi',
        message_type: 'error' as const
      };
    }
  },

  async uploadAvatar(file: File): Promise<ProfileResponse> {
    try {
      // Check authentication first
      if (!authService.isAuthenticated()) {
        throw {
          success: false,
          message: 'Siz tizimga kirmagansiz',
          message_type: 'error' as const
        };
      }

      const profileMultipartApi = createProfileMultipartApi();
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await profileMultipartApi.post<ProfileResponse>(
        `${API_ENDPOINTS.PROFILE}/avatar`,
        formData
      );
      
      if (response.data.success) {
        return response.data;
      } else {
        throw {
          success: false,
          message: response.data.message || 'Avatar yuklanmadi',
          message_type: 'error' as const
        };
      }
    } catch (error: unknown) {
      console.error('Avatar upload error:', error);
      
      // Handle axios errors
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as AxiosErrorResponse;
        if (axiosError.response?.data) {
          // Check for authentication errors
          if (axiosError.response.status === 401 || axiosError.response.status === 403) {
            throw {
              success: false,
              message: 'Sizning sessiyangiz tugagan. Iltimos, qaytadan tizimga kiring.',
              message_type: 'error' as const
            };
          }
          // Check for validation errors
          if (axiosError.response.status === 422) {
            const errorData = axiosError.response.data;
            if (errorData.errors && errorData.errors.length > 0) {
              const fieldErrors = errorData.errors.map(err => `${err.field}: ${err.message}`).join(', ');
              throw {
                success: false,
                message: `Avatar yuklashda xatolik: ${fieldErrors}`,
                message_type: 'error' as const
              };
            }
          }
          throw axiosError.response.data;
        }
      }
      
      // Handle other errors
      if (error && typeof error === 'object' && 'message' in error) {
        const errorObj = error as { message: string; code?: string };
        if (errorObj.message === 'Authentication token not found') {
          throw {
            success: false,
            message: 'Siz tizimga kirmagansiz',
            message_type: 'error' as const
          };
        }
        if (errorObj.message === 'Network Error' || errorObj.code === 'NETWORK_ERROR') {
          throw {
            success: false,
            message: 'Internet aloqasi yo\'q. Iltimos, internet aloqasini tekshiring.',
            message_type: 'error' as const
          };
        }
        if (errorObj.code === 'ECONNABORTED' || errorObj.message.includes('timeout')) {
          throw {
            success: false,
            message: 'Server javob bermayapti. Iltimos, keyinroq urinib ko\'ring.',
            message_type: 'error' as const
          };
        }
      }
      
      throw {
        success: false,
        message: 'Avatar yuklashda xatolik yuz berdi',
        message_type: 'error' as const
      };
    }
  },

  async deleteAvatar(): Promise<ProfileResponse> {
    try {
      const profileApi = createProfileApi();
      const response = await profileApi.delete<ProfileResponse>(
        `${API_ENDPOINTS.PROFILE}/avatar`
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