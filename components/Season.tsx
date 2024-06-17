import { useState } from 'react';
import styles from '../styles/Season.module.css';

export interface Genre {
  id: number;
  name: string;
}

export interface Episode {
  id: number;
  episode_number: number;
  name: string;
  overview: string;
}

export interface SeasonDetails {
  id: number;
  name: string;
  episode_count: number;
  episodes: Episode[];
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  genres: Genre[];
  number_of_seasons: number;
  number_of_episodes: number;
  vote_average: number;
  first_air_date: string;
  seasons: SeasonDetails[];
}

interface SeasonProps {
  season: SeasonDetails;
}

const Season: React.FC<SeasonProps> = ({ season }) => {
  const [showEpisodes, setShowEpisodes] = useState(false);

  return (
    <div className={styles.season}>
      <h2 onClick={() => setShowEpisodes(!showEpisodes)} className={styles.seasonTitle}>
        {season.name} ({season.episode_count} episódios)
      </h2>
      {showEpisodes && (
        <div className={styles.episodes}>
          {season.episodes.map((episode) => (
            <div key={episode.id} className={styles.episode}>
              <p>
                <strong>{episode.episode_number}. {episode.name}</strong>
              </p>
              <p>{episode.overview}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Season;
