import { describe, expect, it } from 'vitest';

import { getSonnenschutzPartitionPossibilitiesForSection } from '@/utils/sonnenschutzPartition';

const baseParams = {
  sectionMinWidth: 800,
  sectionMaxWidth: 2200,
};

describe('getSonnenschutzPartitionPossibilitiesForSection', () => {
  it('returns [1] for flugel1 within limits', () => {
    const result = getSonnenschutzPartitionPossibilitiesForSection({
      width: 1000,
      sectionNumber: 1,
      multiWidth: [],
      ...baseParams,
    });
    expect(result).toEqual([1]);
  });

  it('returns [] for flugel1 outside limits', () => {
    const result = getSonnenschutzPartitionPossibilitiesForSection({
      width: 300,
      sectionNumber: 1,
      multiWidth: [],
      ...baseParams,
    });
    expect(result).toEqual([]);
  });

  it('handles flugel2 with equal widths', () => {
    const result = getSonnenschutzPartitionPossibilitiesForSection({
      width: 1600,
      sectionNumber: 2,
      multiWidth: [800, 800],
      ...baseParams,
    });
    expect(result).toEqual([1, 2]);
  });

  it('handles flugel2 with left wider', () => {
    const result = getSonnenschutzPartitionPossibilitiesForSection({
      width: 1800,
      sectionNumber: 2,
      multiWidth: [1000, 800],
      ...baseParams,
    });
    expect(result).toEqual([1, 21]);
  });

  it('handles flugel2 with right wider', () => {
    const result = getSonnenschutzPartitionPossibilitiesForSection({
      width: 1800,
      sectionNumber: 2,
      multiWidth: [800, 1000],
      ...baseParams,
    });
    expect(result).toEqual([1, 12]);
  });

  it('handles flugel3 with all equal widths invalid', () => {
    const result = getSonnenschutzPartitionPossibilitiesForSection({
      width: 2100,
      sectionNumber: 3,
      multiWidth: [700, 700, 700],
      ...baseParams,
    });
    expect(result).toEqual([1]);
  });

    it('handles flugel3 with all equal widths valid', () => {
    const result = getSonnenschutzPartitionPossibilitiesForSection({
      width: 2100,
      sectionNumber: 3,
      multiWidth: [900, 900, 900],
      ...baseParams,
    });
    expect(result).toEqual([1, 3, 21, 12]);
  });

  it('handles flugel3 with 12/21 possibilities', () => {
    const result = getSonnenschutzPartitionPossibilitiesForSection({
      width: 3000,
      sectionNumber: 3,
      multiWidth: [900, 900, 1200],
      ...baseParams,
    });
    expect(result).toEqual([21, 12, 3]);
  });

  it('handles flugel3 with 2-part symmetric split', () => {
    const result = getSonnenschutzPartitionPossibilitiesForSection({
      width: 3000,
      sectionNumber: 3,
      multiWidth: [750, 750, 1500],
      ...baseParams,
    });
    expect(result).toEqual([2]);
  });
});
