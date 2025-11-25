import { AuthError } from '@/types/auth';

export const getFieldErrors = (error: AuthError): Record<string, string> => {
  const fieldErrors: Record<string, string> = {};
  
  if (error.errors && error.errors.length > 0) {
    error.errors.forEach(err => {
      fieldErrors[err.field] = err.message;
    });
  }
  
  return fieldErrors;
};

export const getGeneralErrorMessage = (error: AuthError): string => {
  if (error.errors && error.errors.length > 0) {
    const fieldErrors = error.errors.map(err => `${err.field}: ${err.message}`).join(', ');
    return `${error.message} ${fieldErrors}`;
  }
  return error.message;
}; 