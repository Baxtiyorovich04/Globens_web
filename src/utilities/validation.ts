export const validatePhone = (phone: string): boolean => {
  // Uzbek phone number format: +998XXXXXXXXX
  const phoneRegex = /^\+998[0-9]{9}$/;
  return phoneRegex.test(phone);
};

export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' };
  }
  return { isValid: true, message: '' };
};

export const validateUsername = (username: string): { isValid: boolean; message: string } => {
  if (username.length < 3) {
    return { isValid: false, message: 'Username must be at least 3 characters long' };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { isValid: false, message: 'Username can only contain letters, numbers, and underscores' };
  }
  return { isValid: true, message: '' };
};

export const validateFullName = (fullName: string): { isValid: boolean; message: string } => {
  if (fullName.length < 2) {
    return { isValid: false, message: 'Full name must be at least 2 characters long' };
  }
  return { isValid: true, message: '' };
}; 