import { weightMultiplier } from '@/data/priceLists/sonnenschutz/antriebsartPrices';
import { SelectionItem } from '@/types/Configurator';

type PartitionParams = {
  width: number;
  sectionNumber: number;
  multiWidth: number[];
  sectionMinWidth: number;
  sectionMaxWidth: number;
};

type GurtWeightParams = {
  width: number;
  height: number;
  multiWidth?: number[];
  sectionNumber: number;
  teilungKey: string;
  maxWeightKg?: number;
};

type GurtLamellenOptionsParams = {
  options: SelectionItem[];
  width: number;
  height: number;
  multiWidth?: number[];
  sectionNumber: number;
};

type AntriebsartAvailabilityParams = {
  width: number;
  height: number;
  multiWidth?: number[];
  sectionNumber: number;
  teilungKey: string;
  motorPossible?: boolean;
  kurbelPossible?: boolean;
};

export const getSonnenschutzPartitionPossibilitiesForSection = ({
  width,
  sectionNumber,
  multiWidth,
  sectionMinWidth,
  sectionMaxWidth,
}: PartitionParams): number[] => {
  const sectionValid = (w: number) => w >= sectionMinWidth && w <= sectionMaxWidth;
  const styleKey = sectionNumber === 1 ? 'flugel1' : sectionNumber === 2 ? 'flugel2' : 'flugel3';

  const possibilities: number[] = [];
  if (styleKey === 'flugel1') {
    return sectionValid(width) ? [1] : [];
  }
  if (!multiWidth.length) {
    return [];
  }
  const allSectionsValid = multiWidth.every((w) => sectionValid(w));

  if (sectionValid(width)) {
    possibilities.push(1);
  }

  if (allSectionsValid) {
    if (styleKey === 'flugel2') {
      if (multiWidth[0] === multiWidth[1]) {
        possibilities.push(2);
      }
      if (multiWidth[0] > multiWidth[1]) {
        possibilities.push(21);
      }
      if (multiWidth[1] > multiWidth[0]) {
        possibilities.push(12);
      }
    }
    if (styleKey === 'flugel3') {
      if (multiWidth[0] === multiWidth[1] && multiWidth[1] === multiWidth[2]) {
        possibilities.push(3);
      }
      if (sectionValid(multiWidth[0] + multiWidth[1]) && multiWidth[0] + multiWidth[1] > multiWidth[2]) {
        possibilities.push(21);
      }
      if (sectionValid(multiWidth[1] + multiWidth[2]) && multiWidth[1] + multiWidth[2] > multiWidth[0]) {
        possibilities.push(12);
      }
      possibilities.push(3);
    }
  }

  if (styleKey === 'flugel3') {
    const left2 = multiWidth[0] + multiWidth[1];
    const right1 = multiWidth[2];
    if(sectionValid(left2) && sectionValid(right1)){
      if(left2 === right1){
        possibilities.push(2);
      }
      if(left2 > right1){
        possibilities.push(21);
      }
      if(right1 > left2){
        possibilities.push(12);
      }
    }

    const left1 = multiWidth[0];
    const right2 = multiWidth[1] + multiWidth[2];

    if(sectionValid(left1) && sectionValid(right2)){
      if(left1 === right2){
        possibilities.push(2);
      }
      if(left1 > right2){
        possibilities.push(21);
      }
      if(right2 > left1){
        possibilities.push(12);
      }
    }
  }

  return Array.from(new Set(possibilities));
};

const calculateWeightKg = (width: number, height: number) => {
  const area = (width * height) / 1_000_000;
  return area * weightMultiplier;
};

export const isGurtAllowedForTeilung = ({
  width,
  height,
  multiWidth,
  sectionNumber,
  teilungKey,
  maxWeightKg = 11,
}: GurtWeightParams) => {
  const fits = (widths: number[]) =>
    widths.every((w) => calculateWeightKg(w, height) <= maxWeightKg);

  if (sectionNumber === 1) {
    return teilungKey === '1' ? fits([width]) : false;
  }

  if (!multiWidth || multiWidth.length < sectionNumber) {
    return false;
  }

  if (sectionNumber === 2) {
    if (teilungKey === '1') return fits([width]);
    if (['2', '12', '21'].includes(teilungKey)) {
      return fits([multiWidth[0], multiWidth[1]]);
    }
    return false;
  }

  if (sectionNumber === 3) {
    if (teilungKey === '1') return fits([width]);
    if (teilungKey === '3') return fits([multiWidth[0], multiWidth[1], multiWidth[2]]);
    if (teilungKey === '12') return fits([multiWidth[0], multiWidth[1] + multiWidth[2]]);
    if (teilungKey === '21') return fits([multiWidth[0] + multiWidth[1], multiWidth[2]]);
    if (teilungKey === '2') {
      const left2 = [multiWidth[0], multiWidth[1] + multiWidth[2]];
      const right2 = [multiWidth[0] + multiWidth[1], multiWidth[2]];
      return fits(left2) || fits(right2);
    }
  }

  return false;
};

export const getGurtAllowedLamellenOptions = ({
  options,
  width,
  height,
  multiWidth,
  sectionNumber,
}: GurtLamellenOptionsParams) =>
  options.filter((o) =>
    isGurtAllowedForTeilung({
      width,
      height,
      multiWidth,
      sectionNumber,
      teilungKey: String(o.key),
    })
  );

export const getAntriebsartAvailability = ({
  width,
  height,
  multiWidth,
  sectionNumber,
  teilungKey,
  motorPossible = true,
  kurbelPossible = true,
}: AntriebsartAvailabilityParams) => ({
  gurt: isGurtAllowedForTeilung({
    width,
    height,
    multiWidth,
    sectionNumber,
    teilungKey,
  }),
  motor: motorPossible,
  kurbel: kurbelPossible,
});
