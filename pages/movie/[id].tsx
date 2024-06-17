import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getMovieDetails, MovieDetails } from '@/services/movies';
import Header from '@/components/Header';
import Spinner from '@/components/Spinner';
import styles from '@/styles/MovieDetails.module.css';

const MovieDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setLoading(true);
          const movieData = await getMovieDetails(Number(id));
          setMovie(movieData);
        } catch (err) {
          console.error(err);
          setError('Erro ao carregar os detalhes do filme.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>Filme não encontrado</div>;

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.details}>
        <h1 className={styles.title}>{movie.title}</h1>
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title} 
          className={styles.poster} 
        />
        <p className={styles.description}>{movie.overview || 'Sinopse não disponível.'}</p>
        <p className={styles.info}>Gênero: {movie.genres.map(genre => genre.name).join(', ')}</p>
        <p className={styles.info}>Diretor: {movie.director}</p>
        <p className={styles.info}>Duração: {movie.runtime ? `${movie.runtime} minutos` : 'Duração não disponível.'}</p>
        <p className={styles.info}>Classificação: {movie.vote_average ? `${movie.vote_average}/10` : 'Classificação não disponível.'}</p>
        <p className={styles.info}>Ano de lançamento: {new Date(movie.release_date).getFullYear()}</p>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
