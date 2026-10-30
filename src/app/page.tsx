'use client';

import { useState } from 'react';
import Image from 'next/image';
import Map, { Marker, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { landmarks, Landmark } from '@/data/landmarks';

export default function Home() {
  const [selected, setSelected] = useState<Landmark | null>(null);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{ longitude: -122.3321, latitude: 47.6062, zoom: 12 }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
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

        {selected && (
          <Popup
            longitude={selected.coordinates.lng}
            latitude={selected.coordinates.lat}
            onClose={() => setSelected(null)}
            closeOnClick={false}
            anchor="bottom"
          >
            <div style={{ maxWidth: '240px' }}>
              {selected.photo ? (
                <Image
                  src={selected.photo}
                  alt={selected.name}
                  width={220}
                  height={120}
                  style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px', marginBottom: '8px' }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '120px',
                    background: '#e0e0e0',
                    borderRadius: '4px',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#888',
                    fontSize: '12px',
                  }}
                >
                  📷 Photo coming soon
                </div>
              )}
              <h3 style={{ margin: '0 0 4px' }}>{selected.name}</h3>
              <p style={{ fontSize: '13px', color: '#555', margin: '0 0 8px' }}>{selected.address}</p>
              <p style={{ fontSize: '14px', margin: '0 0 8px' }}>{selected.description}</p>
              {selected.localTip && (
                <p style={{ fontSize: '13px', fontStyle: 'italic', margin: '0 0 8px' }}>💡 {selected.localTip}</p>
              )}
              {selected.practicalInfo && (
                <p style={{ fontSize: '12px', color: '#777', margin: 0 }}>{selected.practicalInfo}</p>
              )}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}