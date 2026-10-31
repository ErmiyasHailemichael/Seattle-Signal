'use client';

import { useState } from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { landmarks, Landmark } from '@/data/landmarks';
import LandmarkSheet from '@/components/LandmarkSheet';
import NearMeList from '@/components/NearMeList';
import { getDistanceMiles } from '@/lib/distance';

const LABEL_MIN_ZOOM = 11;

type NearMeResult = { landmark: Landmark; distanceMiles: number };

export default function Home() {
  const [selected, setSelected] = useState<Landmark | null>(null);
  const [nearMeResults, setNearMeResults] = useState<NearMeResult[] | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [viewState, setViewState] = useState({
    longitude: -122.3321,
    latitude: 47.6062,
    zoom: 12,
  });

  const handleNearMe = () => {
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Location services are not available on this device.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const sorted = landmarks
          .map((landmark) => ({
            landmark,
            distanceMiles: getDistanceMiles(userCoords, landmark.coordinates),
          }))
          .sort((a, b) => a.distanceMiles - b.distanceMiles);

        setSelected(null);
        setNearMeResults(sorted);
      },
      () => {
        setLocationError('Location access denied — showing all spots instead.');
        setNearMeResults(null);
      }
    );
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onClick={() => setSelected(null)}
      >
        {landmarks.map((landmark) => (
          <Marker
            key={landmark.id}
            longitude={landmark.coordinates.lng}
            latitude={landmark.coordinates.lat}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setNearMeResults(null);
              setSelected(landmark);
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
              <span style={{ fontSize: '28px' }}>📍</span>
              {viewState.zoom >= LABEL_MIN_ZOOM && (
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    background: 'white',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {landmark.name}
                </span>
              )}
            </div>
          </Marker>
        ))}
      </Map>

      <button
        onClick={handleNearMe}
        style={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 20,
          background: 'white',
          border: 'none',
          borderRadius: '20px',
          padding: '10px 16px',
          fontSize: '14px',
          fontWeight: 600,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          cursor: 'pointer',
        }}
      >
        📍 Near Me
      </button>

      {locationError && (
        <div
          style={{
            position: 'fixed',
            top: 70,
            right: 16,
            left: 16,
            zIndex: 20,
            background: '#fff3e0',
            color: '#7a4a00',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '13px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          {locationError}
        </div>
      )}

      {nearMeResults && (
        <NearMeList
          results={nearMeResults}
          onSelect={(landmark) => {
            setNearMeResults(null);
            setSelected(landmark);
          }}
          onClose={() => setNearMeResults(null)}
        />
      )}

      <LandmarkSheet landmark={selected} onClose={() => setSelected(null)} />
    </div>
  );
}