import api from "./apiClient";

export interface Genre {
  id: number;
  name: string;
}

export interface Episode {
  id: number;
  episode_number: number;
  name: string;
  overview: string;
  still_path?: string;
}

export interface SeasonDetails {
  id: number;
  season_number: number;
  name: string;
  episode_count: number;
  episodes: Episode[];
}

export interface TVShow {
  id: number;
  name: string;
  poster_path: string;
  overview: string;
  genres: Genre[];
  number_of_seasons: number;
  number_of_episodes: number;
  vote_average: number;
  first_air_date: string;
}

export interface TVShowDetails extends TVShow {
  seasons: SeasonDetails[];
  type: string;
}

export const getTVShows = async (page = 1): Promise<{ results: TVShow[] }> => {
  try {
    const year = new Date().getFullYear();
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;
    const response = await api.get(`/discover/tv?first_air_date.gte=${startDate}&first_air_date.lte=${endDate}&page=${page}`);
    return {
      ...response.data,
      results: response.data.results.map((tvShow: TVShow) => ({
        ...tvShow,
        media_type: 'tv',
      })),
    };
  } catch (error) {
    console.error('Erro ao buscar séries de TV:', error);
    throw new Error('Erro ao buscar séries de TV.');
  }
};

export const getTVShowDetails = async (id: number): Promise<TVShowDetails> => {
  try {
    const response = await api.get(`/tv/${id}`);
    const seasons = await Promise.all(
      response.data.seasons.map(async (season: SeasonDetails) => {
        const seasonDetails = await api.get(`/tv/${id}/season/${season.season_number}`);
        return {
          ...seasonDetails.data,
          episodes: seasonDetails.data.episodes.map((episode: Episode) => ({
            ...episode,
            overview: episode.overview || 'Descrição não disponível.'
          }))
        };
      })
    );
    return {
      ...response.data,
      seasons,
      type: 'Série',
    };
  } catch (error) {
    console.error(`Erro ao buscar detalhes da série de TV ${id}:`, error);
    throw new Error('Erro ao buscar detalhes da série de TV.');
  }
};
