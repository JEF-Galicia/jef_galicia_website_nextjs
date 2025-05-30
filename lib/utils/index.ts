// Utility functions for common operations
export * from './api';
export * from './formatting';
export * from './validation';

import { THEME_CONFIG } from '../constants';

/**
 * Theme management utilities
 */
export const themeUtils = {
  /**
   * Set the application theme
   */
  setTheme: (theme: 'light' | 'dark' | 'system'): void => {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(THEME_CONFIG.storageKey, theme);
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System theme
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', isDark);
    }
  },

  /**
   * Get the current theme from localStorage
   */
  getTheme: (): string => {
    if (typeof window === 'undefined') return THEME_CONFIG.defaultTheme;
    return localStorage.getItem(THEME_CONFIG.storageKey) ?? THEME_CONFIG.defaultTheme;
  },

  /**
   * Initialize theme on app load
   */
  initializeTheme: (): void => {
    if (typeof window === 'undefined') return;
    
    const storedTheme = themeUtils.getTheme();
    themeUtils.setTheme(storedTheme as any);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      if (themeUtils.getTheme() === 'system') {
        document.documentElement.classList.toggle('dark', e.matches);
      }
    });
  },
};

/**
 * Formatting utilities
 */
export const formatUtils = {
  /**
   * Capitalize first letter of a string
   */
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  /**
   * Format member count
   */
  formatMemberCount: (count: number): string => {
    return count === 1 ? `${count} membro` : `${count} membros`;
  },

  /**
   * Clean and format email for display
   */
  formatEmail: (email: string): string => {
    return email.toLowerCase().trim();
  },
};

/**
 * URL utilities
 */
export const urlUtils = {
  /**
   * Generate member URL
   */
  getMemberUrl: (email: string): string => {
    return `/about/members/${formatUtils.formatEmail(email)}`;
  },

  /**
   * Generate team URL
   */
  getTeamUrl: (email: string): string => {
    return `/about/teams/${formatUtils.formatEmail(email)}`;
  },

  /**
   * Generate project URL
   */
  getProjectUrl: (email: string): string => {
    return `/projects/${formatUtils.formatEmail(email)}`;
  },
};

/**
 * Validation utilities
 */
export const validationUtils = {
  /**
   * Check if email is valid
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Check if URL is valid
   */
  isValidUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
};
