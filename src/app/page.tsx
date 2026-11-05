'use client';

import { useState, useRef, useMemo, useCallback } from 'react';
import Map, { Marker, MapRef } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import Supercluster from 'supercluster';
import { landmarks, Landmark } from '@/data/landmarks';
import LandmarkSheet from '@/components/LandmarkSheet';
import NearMeList from '@/components/NearMeList';
import { getDistanceMiles } from '@/lib/distance';

const LABEL_MIN_ZOOM = 11;

type NearMeResult = { landmark: Landmark; distanceMiles: number };
type LandmarkPointProps = { landmarkId: string };

export default function Home() {
  const [selected, setSelected] = useState<Landmark | null>(null);
  const [nearMeResults, setNearMeResults] = useState<NearMeResult[] | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [viewState, setViewState] = useState({
    longitude: -122.3321,
    latitude: 47.6062,
    zoom: 12,
  });
  const [bounds, setBounds] = useState<[number, number, number, number] | null>(null);

  const mapRef = useRef<MapRef>(null);

  const clusterIndex = useMemo(() => {
    const index = new Supercluster<LandmarkPointProps>({ radius: 60, maxZoom: 16 });
    index.load(
      landmarks.map((landmark) => ({
        type: 'Feature',
        properties: { landmarkId: landmark.id },
        geometry: {
          type: 'Point',
          coordinates: [landmark.coordinates.lng, landmark.coordinates.lat],
        },
      }))
    );
    return index;
  }, []);

  const updateBounds = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    const b = map.getBounds();
    if (!b) return;
    setBounds([b.getWest(), b.getSouth(), b.getEast(), b.getNorth()]);
  }, []);

  const clusters = useMemo(() => {
    if (!bounds) return [];
    return clusterIndex.getClusters(bounds, Math.floor(viewState.zoom));
  }, [clusterIndex, bounds, viewState.zoom]);

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
        ref={mapRef}
        {...viewState}
        onMove={(evt) => {
          setViewState(evt.viewState);
          updateBounds();
        }}
        onLoad={updateBounds}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onClick={() => setSelected(null)}
      >
        {clusters.map((feature) => {
          const [longitude, latitude] = feature.geometry.coordinates;
          const isCluster = 'cluster' in feature.properties && feature.properties.cluster;

          if (isCluster) {
            const { cluster_id: clusterId, point_count: pointCount } = feature.properties as {
              cluster_id: number;
              point_count: number;
            };

            return (
              <Marker
                key={`cluster-${clusterId}`}
                longitude={longitude}
                latitude={latitude}
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  const expansionZoom = Math.min(
                    clusterIndex.getClusterExpansionZoom(clusterId),
                    20
                  );
                  setViewState((v) => ({
                    ...v,
                    longitude,
                    latitude,
                    zoom: expansionZoom,
                  }));
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: '#2563eb',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '14px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
                    cursor: 'pointer',
                    border: '2px solid white',
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }

          const landmarkId = (feature.properties as LandmarkPointProps).landmarkId;
          const landmark = landmarks.find((l) => l.id === landmarkId);
          if (!landmark) return null;

          return (
            <Marker
              key={landmark.id}
              longitude={longitude}
              latitude={latitude}
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
          );
        })}
      </Map>
      <a
        href="/status"
        style={{
          position: 'fixed',
          bottom: 16,
          left: 16,
          zIndex: 20,
          background: 'white',
          borderRadius: '20px',
          padding: '8px 14px',
          fontSize: '13px',
          fontWeight: 600,
          color: '#333',
          textDecoration: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        🟢 Status
      </a>
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