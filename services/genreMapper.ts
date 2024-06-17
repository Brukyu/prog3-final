import api from './apiClient';

let genreMap = new Map<number, string>();

export const fetchGenres = async () => {
  try {
    const response = await api.get('/genre/movie/list', {
      params: {
        language: 'pt-BR',
      },
    });

    genreMap.clear();
    response.data.genres.forEach((genre: { id: number; name: string }) => {
      genreMap.set(genre.id, genre.name);
    });
  } catch (error) {
    console.error(error);
  }
};

export const getGenreName = (id: number): string => {
  return genreMap.get(id) || 'Desconhecido';
};

export const getGenreMap = () => genreMap; 
