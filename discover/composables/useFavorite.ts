export interface UseFavoritesReturn {
  /**
   * Favorite deal ids.
   */
  favorites: Readonly<Ref<readonly number[]>>;

  /**
   * Add or remove an id from favorites.
   */
  toggle: (id: number) => void;

  /**
   * Check whether the id is in favorites.
   */
  isFavorite: (id: number) => boolean;
}

export function useFavorites(): UseFavoritesReturn {
  const favorites = useState<number[]>('favorites', () => []);

  const toggle = (id: number) => {
    if (favorites.value.includes(id)) {
      favorites.value = favorites.value.filter((x) => x !== id);
    } else {
      favorites.value = [...favorites.value, id];
    }
  };

  const isFavorite = (id: number) => favorites.value.includes(id);

  return {
    favorites: readonly(favorites),
    toggle,
    isFavorite,
  };
}
