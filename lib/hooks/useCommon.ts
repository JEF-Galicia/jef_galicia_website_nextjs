/**
 * Custom hooks for the JEF Galicia application
 */

import { useState, useEffect, useCallback } from 'react';
import { themeUtils } from '../utils';

/**
 * Hook for managing theme state
 */
export const useTheme = () => {
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = themeUtils.getTheme() as 'light' | 'dark' | 'system';
    setThemeState(storedTheme);
    themeUtils.initializeTheme();
  }, []);

  const setTheme = useCallback((newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme);
    themeUtils.setTheme(newTheme);
  }, []);

  return {
    theme,
    setTheme,
    mounted,
  };
};

/**
 * Hook for handling form state and validation
 */
export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationRules?: Partial<Record<keyof T, (value: any) => string | null>>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const setFieldTouched = useCallback((field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const validateField = useCallback((field: keyof T) => {
    if (!validationRules?.[field]) return null;
    
    const error = validationRules[field]!(values[field]);
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
    }
    return error;
  }, [values, validationRules]);

  const validateForm = useCallback(() => {
    if (!validationRules) return true;
    
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(validationRules).forEach(field => {
      const key = field as keyof T;
      const error = validationRules[key]!(values[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules]);

  const handleSubmit = useCallback(async (
    onSubmit: (values: T) => Promise<void> | void
  ) => {
    setIsSubmitting(true);
    
    try {
      const isValid = validateForm();
      if (!isValid) return;
      
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    validateField,
    validateForm,
    handleSubmit,
    reset,
  };
};

/**
 * Hook for managing local storage state
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
};

/**
 * Hook for handling async operations
 */
export const useAsync = <T, E = Error>(
  asyncFunction: () => Promise<T>,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);
  const [loading, setLoading] = useState(true);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await asyncFunction();
      setData(result);
    } catch (err) {
      setError(err as E);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    execute();
  }, [execute]);

  return {
    data,
    error,
    loading,
    refetch: execute,
  };
};

/**
 * Hook for debouncing values
 */
export const useDebounce = <T>(value: T, delay: number) => {
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
};
