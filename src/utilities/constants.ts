export const API_URL: string = "https://admin.globens.uz/api/v1";

export const API_ENDPOINTS = {
  NEWS: '/news',
  GAMES: '/games',
  BANNERS: '/banners',
  PROFILE: '/profile',
  SERVERS: '/servers',
  TEAMS: '/teams',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    CONFIRM_PHONE: '/auth/confirm-phone',
    RESEND_OTP: '/auth/resend-otp'
  }
} as const;

export const API_CONFIG = {
    TIMEOUT: 10000,
    COOKIE_EXPIRES: 7,
    COOKIE_OPTIONS: {
        secure: true,
        sameSite: 'strict' as const
    }
} as const;
