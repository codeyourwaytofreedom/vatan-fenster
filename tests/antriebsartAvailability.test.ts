import { describe, expect, it } from 'vitest';

import { getAntriebsartAvailability } from '@/utils/sonnenschutzPartition';

describe('getAntriebsartAvailability', () => {
  it('1334-1333-1333, height 2000, teilung 3', () => {
    const availability = getAntriebsartAvailability({
      width: 4000,
      height: 2000,
      sectionNumber: 3,
      multiWidth: [1334, 1333, 1333],
      teilungKey: '3',
    });
    expect(availability.gurt).toBe(true);
    expect(availability.kurbel).toBe(true);
    expect(availability.motor).toBe(true);
  });

  it('1100-1100-1800, height 2000, teilung 21', () => {
    const availability = getAntriebsartAvailability({
      width: 4000,
      height: 2000,
      sectionNumber: 3,
      multiWidth: [1100, 1100, 1800],
      teilungKey: '21',
    });
    expect(availability.gurt).toBe(false);
    expect(availability.kurbel).toBe(true);
    expect(availability.motor).toBe(true);
  });

  it('width 2200, height 2685, teilung 1', () => {
    const availability = getAntriebsartAvailability({
      width: 2200,
      height: 2685,
      sectionNumber: 1,
      teilungKey: '1',
    });
    expect(availability.gurt).toBe(false);
    expect(availability.kurbel).toBe(false);
    expect(availability.motor).toBe(true);
  });

  it('1500-1500, height 2000, teilung 2', () => {
    const availability = getAntriebsartAvailability({
      width: 3000,
      height: 2000,
      sectionNumber: 2,
      multiWidth: [1500, 1500],
      teilungKey: '2',
    });
    expect(availability.gurt).toBe(true);
    expect(availability.kurbel).toBe(true);
    expect(availability.motor).toBe(true);
  });

  it('2000-1000, height 2000, teilung 21', () => {
    const availability = getAntriebsartAvailability({
      width: 3000,
      height: 2000,
      sectionNumber: 2,
      multiWidth: [2000, 1000],
      teilungKey: '21',
    });
    expect(availability.gurt).toBe(false);
    expect(availability.kurbel).toBe(true);
    expect(availability.motor).toBe(true);
  });
});
