// Custom hooks for the application
export * from './useCommon';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { themeUtils } from '../utils';
import type { Locale, Theme } from '../types';

/**
 * Custom hook for theme management
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('system');

  useEffect(() => {
    const currentTheme = themeUtils.getTheme() as Theme;
    setThemeState(currentTheme);
    themeUtils.initializeTheme();
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    themeUtils.setTheme(newTheme);
  };

  return { theme, setTheme };
}

/**
 * Custom hook for locale management
 */
export function useLocale() {
  const router = useRouter();
  const locale = (router.locale as Locale) || 'gl';

  const setLocale = (newLocale: Locale) => {
    const { pathname, query, asPath } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return { locale, setLocale };
}

/**
 * Custom hook for client-side only rendering
 */
export function useClientOnly<T>(callback: () => T, fallback: T): T {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? callback() : fallback;
}

/**
 * Custom hook for debounced values
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Custom hook for local storage
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
