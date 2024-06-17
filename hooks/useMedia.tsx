import { useState, useEffect } from 'react';
import { fetchMoviesData, fetchTVShowsData, fetchMovieDetails, fetchTVShowDetails } from '@/services/mediaService';
import { fetchGenres, getGenreMap } from '@/services/genreMapper';

export interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  genre_ids: number[];
  genre_names?: string[];
  director?: string;
  runtime?: number;
  release_date?: string;
  first_air_date?: string;
  poster_path?: string;
}

export interface UseMediaHook {
  media: MediaItem[];
  loading: boolean;
  genres: { id: number; name: string }[];
}

export const useMedia = (currentPage: number, selectedGenre: string): UseMediaHook => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchGenres();
        const genreMap = getGenreMap();
        const moviesData = await fetchMoviesData(currentPage);
        const tvShowsData = await fetchTVShowsData(currentPage);

        const mediaWithDetails = await Promise.all(
          [...moviesData, ...tvShowsData].map(async (item) => {
            try {
              const isMovie = 'title' in item;
              const details = isMovie
                ? await fetchMovieDetails(item.id)
                : await fetchTVShowDetails(item.id);

              if (!('genre_ids' in item)) {
                throw new Error(`Item com id ${item.id} não tem genre_ids`);
              }

              const genre_names = item.genre_ids.map((id: number) => genreMap.get(id) || '');
              return { ...item, ...details, genre_names } as MediaItem;
            } catch (error) {
              console.error(`Erro ao buscar detalhes da ${'title' in item ? 'filme' : 'série'} ${item.id}:`, error);
              return null; 
            }
          })
        );

        const filteredMedia = mediaWithDetails.filter((item): item is MediaItem => {
          if (item === null) return false;
          if (selectedGenre) {
            return item.genre_names?.includes(selectedGenre) ?? false;
          }
          return true;
        });

        setMedia(filteredMedia);
      } catch (error) {
        console.error('Erro ao buscar filmes e séries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, selectedGenre]);

  useEffect(() => {
    const loadGenres = async () => {
      await fetchGenres();
      const genreMap = getGenreMap();
      const genreArray = Array.from(genreMap.entries()).map(([id, name]) => ({ id, name }));
      setGenres(genreArray);
    };

    loadGenres();
  }, []);

  return { media, loading, genres };
};
