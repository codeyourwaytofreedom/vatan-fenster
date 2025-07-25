import { flugel1MinMaxSizesAluminium, flugel1MinMaxSizesPlastic } from './flugel1MinMaxSizes';
import { flugel2MinMaxSizesAluminium, flugel2MinMaxSizesPlastic } from './flugel2MinMaxSizes';
import { flugel3MinMaxSizesPlastic } from './flugel3MinMaxSizes';
import { 
  ProfileTypeForWindowType1,ProfileTypeForWindowType2,
  ProfileTypeForWindowType3,ProfileTypeForWindowType1Aluminium,ProfileTypeForWindowType2Aluminium, 
  } from '@/types/Configurator';


type MinMaxSizeByWindowStyle = 
  ProfileTypeForWindowType1 
  | ProfileTypeForWindowType2 
  | ProfileTypeForWindowType3 
  | ProfileTypeForWindowType1Aluminium 
  | ProfileTypeForWindowType2Aluminium

type MinMaxSizesPack = {
  plastic: {
    flugel1: MinMaxSizeByWindowStyle,
    flugel2: MinMaxSizeByWindowStyle,
    flugel3: MinMaxSizeByWindowStyle
  },
  aluminium: {
    flugel1: MinMaxSizeByWindowStyle,
    flugel2: MinMaxSizeByWindowStyle,
    flugel3: MinMaxSizeByWindowStyle
  }
}

export const minMaxSizes:MinMaxSizesPack = 
  {
    plastic: {
      flugel1: flugel1MinMaxSizesPlastic,
      flugel2: flugel2MinMaxSizesPlastic,
      flugel3: flugel3MinMaxSizesPlastic
    },
    aluminium: {
      flugel1: flugel1MinMaxSizesAluminium,
      flugel2: flugel2MinMaxSizesAluminium,
      flugel3: {} as MinMaxSizeByWindowStyle
    },
  }
