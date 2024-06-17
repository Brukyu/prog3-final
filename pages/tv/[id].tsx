import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getTVShowDetails, TVShowDetails as TVShowDetailsType, SeasonDetails } from '@/services/tvShows';
import Header from '@/components/Header';
import Spinner from '@/components/Spinner';
import Season from '@/components/Season';
import styles from '@/styles/MovieDetails.module.css';

const TVShowDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [tvShow, setTVShow] = useState<TVShowDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setLoading(true);
          const tvShowData = await getTVShowDetails(Number(id));
          setTVShow(tvShowData);
        } catch (err) {
          console.error(err);
          setError('Erro ao carregar os detalhes da série.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <div>{error}</div>;
  if (!tvShow) return <div>Série não encontrada</div>;

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.details}>
        <h1 className={styles.title}>{tvShow.name}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
          alt={tvShow.name}
          className={styles.poster}
        />
        <p className={styles.description}>{tvShow.overview || 'Sinopse não disponível.'}</p>
        <p className={styles.info}>Gênero: {tvShow.genres.map(genre => genre.name).join(', ')}</p>
        <p className={styles.info}>Número de temporadas: {tvShow.number_of_seasons}</p>
        <p className={styles.info}>Número de episódios: {tvShow.number_of_episodes}</p>
        <p className={styles.info}>Classificação: {tvShow.vote_average ? `${tvShow.vote_average}/10` : 'Classificação não disponível.'}</p>
        <p className={styles.info}>Ano de estreia: {new Date(tvShow.first_air_date).getFullYear()}</p>
        
        <div className={styles.seasons}>
          {tvShow.seasons.map((season: SeasonDetails) => (
            <Season key={season.id} season={season} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TVShowDetails;
