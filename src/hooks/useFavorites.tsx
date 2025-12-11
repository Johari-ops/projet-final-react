// hooks/useFavorites.tsx
import { useLocalStorage } from './useLocalStorage';

interface UseFavoritesReturn {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  removeFavorite: (id: string) => void;
}

export const useFavorites = (storageKey: string): UseFavoritesReturn => {
  const [favorites, setFavorites] = useLocalStorage<string[]>(storageKey, []);

  const toggleFavorite = (id: string): void => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]));
  };

  const isFavorite = (id: string): boolean => {
    return favorites.includes(id);
  };

  const removeFavorite = (id: string): void => {
    setFavorites((prev) => prev.filter((favId) => favId !== id));
  };

  return { favorites, toggleFavorite, isFavorite, removeFavorite };
};
