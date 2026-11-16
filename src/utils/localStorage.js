const FAVOURITES_KEY = 'stackly_favourites_v1';

export const getStoredFavourites = () => {
  try {
    const raw = localStorage.getItem(FAVOURITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load favourites from localStorage:', error);
    return [];
  }
};

export const saveStoredFavourites = (favIds) => {
  try {
    const uniqueIds = Array.from(new Set(favIds));
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(uniqueIds));
  } catch (error) {
    console.error('Failed to save favourites to localStorage:', error);
  }
};
