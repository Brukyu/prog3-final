import api from './apiClient';

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  release_date: string;
}

export interface MovieDetails extends Movie {
  overview: string;
  genres: Genre[];
  director: string;
  runtime?: number;
  vote_average?: number;
}

export const getMovies = async (page = 1): Promise<{ results: Movie[] }> => {
  try {
    const year = new Date().getFullYear();
    const response = await api.get(`/discover/movie?primary_release_year=${year}&page=${page}`);
    return {
      ...response.data,
      results: response.data.results.map((movie: Movie) => ({
        ...movie,
        media_type: 'movie',
      })),
    };
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    throw new Error('Erro ao buscar filmes.');
  }
};

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  try {
    const response = await api.get(`/movie/${id}`);
    const creditsResponse = await api.get(`/movie/${id}/credits`);
    const director = creditsResponse.data.crew.find((member: any) => member.job === 'Director');

    return {
      ...response.data,
      director: director ? director.name : 'Desconhecido',
      type: 'Filme',
    };
  } catch (error) {
    console.error(`Erro ao buscar detalhes do filme ${id}:`, error);
    throw new Error('Erro ao buscar detalhes do filme.');
  }
};
