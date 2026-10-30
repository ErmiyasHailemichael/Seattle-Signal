'use client';

import { useState } from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { landmarks, Landmark } from '@/data/landmarks';
import LandmarkSheet from '@/components/LandmarkSheet';

export default function Home() {
  const [selected, setSelected] = useState<Landmark | null>(null);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{ longitude: -122.3321, latitude: 47.6062, zoom: 12 }}
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
            <div style={{ fontSize: '28px', cursor: 'pointer' }}>📍</div>
          </Marker>
        ))}
      </Map>

      <LandmarkSheet landmark={selected} onClose={() => setSelected(null)} />
    </div>
  );
}