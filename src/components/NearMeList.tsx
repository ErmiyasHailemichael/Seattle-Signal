'use client';

import { Landmark } from '@/data/landmarks';
import styles from './NearMeList.module.css';

type Result = { landmark: Landmark; distanceMiles: number };

type Props = {
  results: Result[];
  onSelect: (landmark: Landmark) => void;
  onClose: () => void;
};

export default function NearMeList({ results, onSelect, onClose }: Props) {
  return (
    <div className={styles.sheet}>
      <div className={styles.header}>
        <h2 className={styles.title}>Nearest to you</h2>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>
      <div className={styles.row}>
        {results.map(({ landmark, distanceMiles }) => (
          <button key={landmark.id} className={styles.card} onClick={() => onSelect(landmark)}>
            <div className={styles.photo}>
              {landmark.photo ? (
                <img src={landmark.photo} alt={landmark.name} className={styles.photoImg} />
              ) : (
                <span className={styles.placeholder}>📍</span>
              )}
            </div>
            <span className={styles.name}>{landmark.name}</span>
            <span className={styles.distance}>{distanceMiles.toFixed(1)} mi</span>
          </button>
        ))}
      </div>
    </div>
  );
}