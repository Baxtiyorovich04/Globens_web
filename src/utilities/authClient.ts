'use client';

/**
 * Client-side function to check if a user is logged in
 * @returns {boolean} True if the user is logged in, false otherwise
 */
export const isUserLoggedIn = (): boolean => {
  const cookies = document.cookie.split(';');
  const accessTokenCookie = cookies.find(cookie => cookie.trim().startsWith('access_token='));
  return !!accessTokenCookie;
};