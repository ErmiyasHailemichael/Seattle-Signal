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
      <button className={styles.closeButton} onClick={onClose} aria-label="Close">
        ✕
      </button>
      <h2 className={styles.title}>Nearest to you</h2>
      {results.map(({ landmark, distanceMiles }) => (
        <button key={landmark.id} className={styles.item} onClick={() => onSelect(landmark)}>
          <span className={styles.distance}>{distanceMiles.toFixed(1)} mi</span>
          <span className={styles.name}>{landmark.name}</span>
        </button>
      ))}
    </div>
  );
}
