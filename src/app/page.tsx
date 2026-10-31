'use client';

import { useState } from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { landmarks, Landmark } from '@/data/landmarks';
import LandmarkSheet from '@/components/LandmarkSheet';

const LABEL_MIN_ZOOM = 11;

export default function Home() {
  const [selected, setSelected] = useState<Landmark | null>(null);
  const [viewState, setViewState] = useState({
    longitude: -122.3321,
    latitude: 47.6062,
    zoom: 12,
  });

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

      <LandmarkSheet landmark={selected} onClose={() => setSelected(null)} />
    </div>
  );
}