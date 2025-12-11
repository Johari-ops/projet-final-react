// hooks/useLocalStorage.tsx
import { useState, useEffect } from 'react';

function getStorageValue<T>(key: string, defaultValue: T): T {
  const saved = localStorage.getItem(key);
  if (saved === null) {
    return defaultValue;
  }
  try {
    return JSON.parse(saved) as T;
  } catch {
    return defaultValue;
  }
}

export const useLocalStorage = <T,>(key: string, defaultValue: T): [T, (value: T | ((prev: T) => T)) => void] => {
  const [value, setValue] = useState<T>(() => getStorageValue<T>(key, defaultValue));

  useEffect(() => {
    // Ne stocke pas les valeurs vides pour les strings
    if (typeof value === 'string' && value === '') {
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
