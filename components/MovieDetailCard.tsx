// components/MovieDetailCard.tsx
import React from 'react';
import styles from '../styles/MovieDetailCard.module.css';

interface MovieDetailCardProps {
  title: string;
  genres: string;
  director: string;
  duration: string;
  release_date: string;
  synopsis: string;
  rating: number;
  poster_path: string;
  seasons?: Array<{
    season_number: number;
    episodes: Array<{
      episode_number: number;
      title: string;
    }>
  }>;
}

const MovieDetailCard: React.FC<MovieDetailCardProps> = ({ title, genres, director, duration, release_date, synopsis, rating, poster_path, seasons }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <div className={styles.detailCard}>
      <img src={imageUrl} alt={title} className={styles.poster} />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.genres}>Gêneros: {genres}</p>
      <p className={styles.director}>Diretor: {director}</p>
      <p className={styles.duration}>Duração: {duration} minutos</p>
      <p className={styles.release_date}>Ano de lançamento: {new Date(release_date).getFullYear()}</p>
      <p className={styles.synopsis}>Sinopse: {synopsis || 'Sinopse não disponível'}</p>
      <p className={styles.rating}>Classificação: {rating || 'Não classificado'}</p>

      {seasons && seasons.length > 0 && (
        <div className={styles.seasons}>
          <h3>Temporadas</h3>
          {seasons.map(season => (
            <div key={season.season_number} className={styles.season}>
              <h4>Temporada {season.season_number}</h4>
              <ul>
                {season.episodes.map(episode => (
                  <li key={episode.episode_number}>Episódio {episode.episode_number}: {episode.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieDetailCard;
