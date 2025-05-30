/**
 * Validation utilities for form inputs and data
 */

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength;
};

export type ValidationRule = {
  validate: (value: string) => boolean;
  message: string;
};

export const createValidationRules = {
  required: (message = 'This field is required'): ValidationRule => ({
    validate: validateRequired,
    message,
  }),
  
  email: (message = 'Please enter a valid email address'): ValidationRule => ({
    validate: validateEmail,
    message,
  }),
  
  minLength: (length: number, message?: string): ValidationRule => ({
    validate: (value: string) => validateMinLength(value, length),
    message: message || `Minimum length is ${length} characters`,
  }),
  
  maxLength: (length: number, message?: string): ValidationRule => ({
    validate: (value: string) => validateMaxLength(value, length),
    message: message || `Maximum length is ${length} characters`,
  }),
  
  url: (message = 'Please enter a valid URL'): ValidationRule => ({
    validate: validateUrl,
    message,
  }),
};

export const validateField = (value: string, rules: ValidationRule[]): string | null => {
  for (const rule of rules) {
    if (!rule.validate(value)) {
      return rule.message;
    }
  }
  return null;
};
