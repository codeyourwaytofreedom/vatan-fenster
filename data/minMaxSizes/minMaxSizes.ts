import { flugel1MinMaxSizesAluminium, flugel1MinMaxSizesPlastic } from './flugel1MinMaxSizes';
import { flugel2MinMaxSizesAluminium, flugel2MinMaxSizesPlastic } from './flugel2MinMaxSizes';
import { flugel3MinMaxSizesPlastic } from './flugel3MinMaxSizes';

export const minMaxSizes = 
  {
    plastic: {
      flugel1: flugel1MinMaxSizesPlastic,
      flugel2: flugel2MinMaxSizesPlastic,
      flugel3: flugel3MinMaxSizesPlastic
    },
    aluminium: {
      flugel1: flugel1MinMaxSizesAluminium,
      flugel2: flugel2MinMaxSizesAluminium
    },
  }
