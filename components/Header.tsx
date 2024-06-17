import React, { useState } from 'react';
import styles from '../styles/Header.module.css';

interface Genre {
  id: number;
  name: string;
}

interface HeaderProps {
  genres?: Genre[]; // Opcional
  selectedGenre?: string; // Opcional
  setSelectedGenre?: (genre: string) => void; // Opcional
}

const Header: React.FC<HeaderProps> = ({ genres = [], selectedGenre = '', setSelectedGenre }) => {
  const [showMember, setShowMember] = useState(false);

  const toggleMember = () => {
    setShowMember(!showMember);
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.title}>CineUmbrella</h1>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.right}>
        {genres.length > 0 && setSelectedGenre && (
          <div className={styles.genreDropdown}>
            <button className={styles.genreButton}>▼ Gêneros</button>
            <div className={styles.genreDropdownContent}>
              {genres.map((genre) => (
                <a key={genre.id} onClick={() => setSelectedGenre(genre.name)}>
                  {genre.name}
                </a>
              ))}
            </div>
          </div>
        )}
        <div className={styles.genreDropdown}>
          <button className={styles.genreButton} onClick={toggleMember}>
            ▼ Integrante
          </button>
          {showMember && (
            <div className={styles.genreDropdownContent}>
              <a>Bruno Igor da Silva</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
