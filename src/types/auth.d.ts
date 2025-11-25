export interface RegisterRequest {
  phone: string;
  full_name: string;
  username: string;
  password: string;
  password_confirmation: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  persistent?: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  message_type: 'info' | 'error' | 'success';
  data?: {
    user?: {
      username: string;
      phone: string;
      status: string;
      full_name: string;
    };
    token?: {
      type: string;
      access_token: string;
      expires_in: number;
      refresh_token?: string;
      refresh_expires_in?: number;
    };
  };
}

export interface AuthError {
  success: false;
  message: string;
  message_type: 'error';
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export interface ConfirmPhoneRequest {
  phone: string;
  otp: string;
}

export interface ResendOtpRequest {
  username?: string;
  phone?: string;
} 