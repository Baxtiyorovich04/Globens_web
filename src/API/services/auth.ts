'use client'

import axios from 'axios';
import { API_URL, API_ENDPOINTS } from '@/utilities/constants';
import { RegisterRequest, LoginRequest, AuthResponse, AuthError, ConfirmPhoneRequest, ResendOtpRequest } from '@/types/auth';

// Define proper types for axios error responses
interface AxiosErrorResponse {
  response?: {
    data: AuthError;
    status: number;
    statusText: string;
  };
}

const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000
});

export const authService = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await authApi.post<AuthResponse>(
        `${API_ENDPOINTS.AUTH.REGISTER}`,
        data
      );
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as AxiosErrorResponse;
        if (axiosError.response?.data) {
          const errorData = axiosError.response.data as AuthError;
          // Format field-specific errors into a readable message
          if (errorData.errors && errorData.errors.length > 0) {
            const fieldErrors = errorData.errors.map(err => `${err.field}: ${err.message}`).join(', ');
            throw {
              ...errorData,
              message: `${errorData.message} ${fieldErrors}`
            };
          }
          throw errorData;
        }
      }
      throw {
        success: false,
        message: 'Network error occurred',
        message_type: 'error' as const
      };
    }
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await authApi.post<AuthResponse>(
        `${API_ENDPOINTS.AUTH.LOGIN}`,
        data
      );
      
   
             if (response.data.success && response.data.data?.token) {
         const token = response.data.data.token;
         document.cookie = `access_token=${token.access_token}; path=/; max-age=${token.expires_in}; secure; samesite=strict`;
         if (token.refresh_token) {
           document.cookie = `refresh_token=${token.refresh_token}; path=/; max-age=${token.refresh_expires_in || 2592000}; secure; samesite=strict`;
         }
         document.cookie = `token_expires_at=${token.expires_in}; path=/; max-age=${token.expires_in}; secure; samesite=strict`;
       }
      
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as AxiosErrorResponse;
        if (axiosError.response?.data) {
          const errorData = axiosError.response.data as AuthError;
          if (errorData.errors && errorData.errors.length > 0) {
            const fieldErrors = errorData.errors.map(err => `${err.field}: ${err.message}`).join(', ');
            throw {
              ...errorData,
              message: `${errorData.message} ${fieldErrors}`
            };
          }
          throw errorData;
        }
      }
             throw {
         success: false,
         message: 'Network error occurred',
         message_type: 'error' as const
       };
     }
   },

   async confirmPhone(data: ConfirmPhoneRequest): Promise<AuthResponse> {
     try {
       const response = await authApi.post<AuthResponse>(
         `${API_ENDPOINTS.AUTH.CONFIRM_PHONE}`,
         data
       );
       
       if (response.data.success && response.data.data?.token) {
         const token = response.data.data.token;
         // Set cookies with secure options
         document.cookie = `access_token=${token.access_token}; path=/; max-age=${token.expires_in}; secure; samesite=strict`;
         if (token.refresh_token) {
           document.cookie = `refresh_token=${token.refresh_token}; path=/; max-age=${token.refresh_expires_in || 2592000}; secure; samesite=strict`;
         }
         document.cookie = `token_expires_in=${token.expires_in}; path=/; max-age=${token.expires_in}; secure; samesite=strict`;
       }
       
       return response.data;
     } catch (error: unknown) {
       if (error && typeof error === 'object' && 'response' in error) {
         const axiosError = error as AxiosErrorResponse;
         if (axiosError.response?.data) {
           const errorData = axiosError.response.data as AuthError;
           if (errorData.errors && errorData.errors.length > 0) {
             const fieldErrors = errorData.errors.map(err => `${err.field}: ${err.message}`).join(', ');
             throw {
               ...errorData,
               message: `${errorData.message} ${fieldErrors}`
             };
           }
           throw errorData;
         }
       }
       throw {
         success: false,
         message: 'Network error occurred',
         message_type: 'error' as const
       };
     }
   },

   async resendOtp(data: ResendOtpRequest): Promise<AuthResponse> {
     try {
       const response = await authApi.post<AuthResponse>(
         `${API_ENDPOINTS.AUTH.RESEND_OTP}`,
         data
       );
       return response.data;
     } catch (error: unknown) {
       if (error && typeof error === 'object' && 'response' in error) {
         const axiosError = error as AxiosErrorResponse;
         if (axiosError.response?.data) {
           const errorData = axiosError.response.data as AuthError;
           if (errorData.errors && errorData.errors.length > 0) {
             const fieldErrors = errorData.errors.map(err => `${err.field}: ${err.message}`).join(', ');
             throw {
               ...errorData,
               message: `${errorData.message} ${fieldErrors}`
             };
           }
           throw errorData;
         }
       }
       throw {
         success: false,
         message: 'Network error occurred',
         message_type: 'error' as const
       };
     }
   },

   logout(): void {
     // Clear all auth cookies
     document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict';
     document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict';
     document.cookie = 'token_expires_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict';
   },

   async logoutApi(): Promise<AuthResponse> {
     try {
       const response = await authApi.post<AuthResponse>(
         `${API_ENDPOINTS.AUTH.LOGOUT}`
       );
       return response.data;
     } catch (error: unknown) {
       if (error && typeof error === 'object' && 'response' in error) {
         const axiosError = error as AxiosErrorResponse;
         if (axiosError.response?.data) {
           const errorData = axiosError.response.data as AuthError;
           throw errorData;
         }
       }
       throw {
         success: false,
         message: 'Network error occurred',
         message_type: 'error' as const
       };
     }
   },

   getAccessToken(): string | null {
     const cookies = document.cookie.split(';');
     const accessTokenCookie = cookies.find(cookie => cookie.trim().startsWith('access_token='));
     return accessTokenCookie ? accessTokenCookie.split('=')[1] : null;
   },

   isAuthenticated(): boolean {
     const token = this.getAccessToken();
     return !!token;
   }
 }; 