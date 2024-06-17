import { getMovies, getMovieDetails } from './movies';
import { getTVShows, getTVShowDetails } from './tvShows';

export const fetchMoviesData = async (page: number) => {
  const moviesData = await getMovies(page);
  return moviesData.results;
};

export const fetchMovieDetails = async (id: number) => {
  const movieDetails = await getMovieDetails(id);
  return movieDetails;
};

export const fetchTVShowsData = async (page: number) => {
  const tvShowsData = await getTVShows(page);
  return tvShowsData.results;
};

export const fetchTVShowDetails = async (id: number) => {
  const tvShowDetails = await getTVShowDetails(id);
  return tvShowDetails;
};
