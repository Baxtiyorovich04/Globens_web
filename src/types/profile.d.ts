export interface ProfileUpdateData {
    name: string;
    email: string;
    password?: string;
    password_confirmation?: string;
}

export interface ProfileResponse {
    message: string;
    user: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        created_at: string;
        updated_at: string;
    };
} 