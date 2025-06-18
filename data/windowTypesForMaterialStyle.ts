import { WindowStyle } from '@/types/Configurator';

export const windowTypesForMaterialStyle: Record<WindowStyle, Record<string, string[]>> = {
  flugel1: {
    plastic: ['F', 'FF', 'K', 'DR', 'DL', 'DKL', 'DKR'],
    aluminium: ['F', 'K', 'DR', 'DL', 'DKL', 'DKR'],
  },
  flugel2: {
    plastic: ['D_DK_POS', 'D_DK_STULP', 'DK_D_POS', 'DK_D_STULP', 'DK_DK_POS', 'DK_F', 'F_DK'],
    aluminium: ['D_DK_POS', 'D_DK_STULP', 'DK_D_POS', 'DK_D_STULP'],
  },
  flugel3: {
    plastic: ['DK_DL_DK_POS', 'DK_DL_DK_STULP', 'DK_DR_DK_POS', 'DK_DR_DK_STULP', 'DK_F_DK'],
    aluminium: [],
  },
  oberlicht: {},
  unterlicht: {},
};

export const windowStylesForProfile: Record<string, WindowStyle[]> = {
  MB45: ['flugel1', 'flugel2'],
  MB70: ['flugel1', 'flugel2'],
  MB70HI: ['flugel1', 'flugel2'],
  MB86NSI: ['flugel1', 'flugel2'],
  I5: ['flugel1', 'flugel2', 'flugel3', 'oberlicht', 'unterlicht'],
  I5C: ['flugel1', 'flugel2', 'flugel3', 'oberlicht', 'unterlicht'],
  IE: ['flugel1', 'flugel2', 'flugel3', 'oberlicht', 'unterlicht'],
  IEC: ['flugel1', 'flugel2', 'flugel3', 'oberlicht', 'unterlicht'],
  IL: ['flugel1', 'flugel2', 'flugel3', 'oberlicht', 'unterlicht'],
};
