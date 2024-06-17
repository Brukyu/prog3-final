import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';
import { useMedia, UseMediaHook } from '@/hooks/useMedia';
import '../styles/globals.css';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedGenre, setSelectedGenre] = useState<string>('');

  const { media, loading, genres }: UseMediaHook = useMedia(currentPage, selectedGenre);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <Header genres={genres} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
      <div className="movie-grid">
        {media.map((item) => (
          <Link href={`/${item.title ? 'movie' : 'tv'}/${item.id}`} key={item.id}>
            <MovieCard
              title={item.title || item.name || 'Não Disponível'}
              type={item.title ? 'movie' : 'tv'} 
              genre={item.genre_names?.join(', ') || 'Não Disponível'}
              director={item.director || 'Não Disponível'}
              duration={item.runtime?.toString() || 'N/A'}
              release_date={item.release_date || item.first_air_date || 'N/A'}
              poster_path={item.poster_path || ''}
            />
          </Link>
        ))}
      </div>
      <div className="pagination-buttons">
        <button onClick={handlePreviousPage}>Anterior</button>
        <button onClick={handleNextPage}>Próximo</button>
      </div>
    </div>
  );
}
