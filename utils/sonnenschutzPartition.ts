type PartitionParams = {
  width: number;
  sectionNumber: number;
  multiWidth: number[];
  sectionMinWidth: number;
  sectionMaxWidth: number;
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

    const _2_1_Possible = sectionValid(left2) && sectionValid(right1) && right1 === left2;

    const left1 = multiWidth[0];
    const right2 = multiWidth[1] + multiWidth[2];

    const _1_2_Possible = sectionValid(left1) && sectionValid(right2) && left1 === right2;

    if (_1_2_Possible || _2_1_Possible) {
      possibilities.push(2);
    }
  }

  return possibilities;
};
