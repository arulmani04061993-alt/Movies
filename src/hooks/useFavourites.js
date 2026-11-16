import { useState, useEffect, useCallback, useRef } from 'react';
import { getStoredFavourites, saveStoredFavourites } from '../utils/localStorage';
import { toast } from 'react-toastify';

export const useFavourites = () => {
  const [favouriteIds, setFavouriteIds] = useState(() => getStoredFavourites());
  const favIdsRef = useRef(favouriteIds);

  useEffect(() => {
    favIdsRef.current = favouriteIds;
    saveStoredFavourites(favouriteIds);
  }, [favouriteIds]);

  const isFavourite = useCallback(
    (id) => favouriteIds.includes(id),
    [favouriteIds]
  );

  const toggleFavourite = useCallback((movie) => {
    // Check state outside updater so toast is only called ONCE
    const exists = favIdsRef.current.includes(movie.id);
    const toastId = `fav-toggle-${movie.id}`;

    if (exists) {
      toast.info(`Removed "${movie.title}" from favourites`, {
        toastId: toastId,
        theme: 'dark'
      });
      setFavouriteIds((prev) => prev.filter((id) => id !== movie.id));
    } else {
      toast.success(`Added "${movie.title}" to favourites!`, {
        toastId: toastId,
        theme: 'dark'
      });
      setFavouriteIds((prev) => [...prev, movie.id]);
    }
  }, []);

  const removeFavourite = useCallback((movieId, title) => {
    const toastId = `fav-remove-${movieId}`;
    if (title) {
      toast.info(`Removed "${title}" from favourites`, {
        toastId: toastId,
        theme: 'dark'
      });
    }
    setFavouriteIds((prev) => prev.filter((id) => id !== movieId));
  }, []);

  return {
    favouriteIds,
    isFavourite,
    toggleFavourite,
    removeFavourite,
    count: favouriteIds.length
  };
};
