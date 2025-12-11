// hooks/useLocalStorage.tsx
import { useState, useEffect } from 'react';

function getStorageValue<T>(key: string, defaultValue: T): T {
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      return JSON.parse(saved) as T;
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
}

export const useLocalStorage = <T,>(key: string, defaultValue: T): [T, (value: T | ((prev: T) => T)) => void] => {
  const [value, setValue] = useState<T>(() => getStorageValue<T>(key, defaultValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
