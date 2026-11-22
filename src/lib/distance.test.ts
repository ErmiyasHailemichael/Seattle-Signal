import { getDistanceMiles } from './distance';

describe('getDistanceMiles', () => {
  it('returns 0 for identical coordinates', () => {
    const point = { lat: 47.6062, lng: -122.3321 };
    expect(getDistanceMiles(point, point)).toBeCloseTo(0, 5);
  });

  it('calculates a known distance between two Seattle landmarks correctly', () => {
    // Pike Place Market to Space Needle, roughly 1 mile apart
    const pikePlace = { lat: 47.6094076, lng: -122.34183580000001 };
    const spaceNeedle = { lat: 47.6205063, lng: -122.3492774 };

    const distance = getDistanceMiles(pikePlace, spaceNeedle);

    expect(distance).toBeGreaterThan(0.5);
    expect(distance).toBeLessThan(1.5);
  });

  it('is symmetric — distance from A to B equals B to A', () => {
    const a = { lat: 47.6062, lng: -122.3321 };
    const b = { lat: 47.6205063, lng: -122.3492774 };

    expect(getDistanceMiles(a, b)).toBeCloseTo(getDistanceMiles(b, a), 10);
  });
});
