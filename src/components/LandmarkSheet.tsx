'use client';

import Image from 'next/image';
import { Landmark } from '@/data/landmarks';
import styles from './LandmarkSheet.module.css';

type Props = {
  landmark: Landmark | null;
  onClose: () => void;
};

export default function LandmarkSheet({ landmark, onClose }: Props) {
  if (!landmark) return null;

  return (
    <div className={styles.sheet}>
      <button className={styles.closeButton} onClick={onClose} aria-label="Close">
        ✕
      </button>

      {landmark.photo ? (
        <Image
          src={landmark.photo}
          alt={landmark.name}
          width={400}
          height={160}
          className={styles.photo}
        />
      ) : (
        <div className={styles.photoPlaceholder}>📷 Photo coming soon</div>
      )}

      <h2 className={styles.name}>{landmark.name}</h2>
      <p className={styles.address}>{landmark.address}</p>
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${landmark.coordinates.lat},${landmark.coordinates.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.directionsLink}
      >
        Get Directions →
      </a>
      <p className={styles.description}>{landmark.description}</p>

      {landmark.localTip && <p className={styles.localTip}>💡 {landmark.localTip}</p>}
      {landmark.practicalInfo && <p className={styles.practicalInfo}>{landmark.practicalInfo}</p>}
    </div>
  );
}