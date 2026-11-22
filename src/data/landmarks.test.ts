import { landmarks } from './landmarks';

const VALID_CATEGORIES = ['viewpoint', 'park', 'historic', 'food', 'landmark'];

// Generous bounding box around greater Seattle
const SEATTLE_BOUNDS = {
  minLat: 47.4,
  maxLat: 47.8,
  minLng: -122.5,
  maxLng: -122.1,
};

describe('landmarks data', () => {
  it('has at least one entry', () => {
    expect(landmarks.length).toBeGreaterThan(0);
  });

  it('has unique ids', () => {
    const ids = landmarks.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('only uses valid categories', () => {
    for (const landmark of landmarks) {
      expect(VALID_CATEGORIES).toContain(landmark.category);
    }
  });

  it('has coordinates within the greater Seattle area', () => {
    for (const landmark of landmarks) {
      expect(landmark.coordinates.lat).toBeGreaterThanOrEqual(SEATTLE_BOUNDS.minLat);
      expect(landmark.coordinates.lat).toBeLessThanOrEqual(SEATTLE_BOUNDS.maxLat);
      expect(landmark.coordinates.lng).toBeGreaterThanOrEqual(SEATTLE_BOUNDS.minLng);
      expect(landmark.coordinates.lng).toBeLessThanOrEqual(SEATTLE_BOUNDS.maxLng);
    }
  });

  it('has a non-empty name, address, and description for every entry', () => {
    for (const landmark of landmarks) {
      expect(landmark.name.trim().length).toBeGreaterThan(0);
      expect(landmark.address.trim().length).toBeGreaterThan(0);
      expect(landmark.description.trim().length).toBeGreaterThan(0);
    }
  });
});
