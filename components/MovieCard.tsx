import React from 'react';
import styles from '../styles/MovieCard.module.css';

interface MovieCardProps {
  title: string;
  genre: string;
  director: string;
  duration: string;
  release_date: string;
  poster_path: string;
  type: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, genre, director, duration, release_date, poster_path, type }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

const mapTypeToDisplay = (type: string): string => {
    switch (type) {
      case 'movie':
        return 'Filme';
      case 'tv':
        return 'Série';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={title} className={styles.poster} />
      <div className={styles.details}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.type}>Tipo: {mapTypeToDisplay(type)}</p> {}
          <p className={styles.genre}>Gênero: {genre}</p>
          <p className={styles.director}>Diretor: {director}</p>
          <p className={styles.duration}>Duração: {duration} minutos</p>
        </div>
        <footer>
          <p className={styles.releaseDate}>Ano de lançamento: {new Date(release_date).getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default MovieCard;
