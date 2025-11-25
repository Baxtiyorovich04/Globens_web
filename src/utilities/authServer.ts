import { cookies } from 'next/headers';

/**
 * Server-side function to check if a user is logged in
 * @returns {boolean} True if the user is logged in, false otherwise
 */
export const isUserLoggedIn = async (): Promise<boolean> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token');
    return !!accessToken;
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
};
