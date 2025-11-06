import {
  auf215_withInsektenschutz,
  auf215_withoutInsektenschutz,
} from '@/pages/api/prices/sonnenschutz/auf215/auf215';
import { SonnenschutzKey } from '@/types/Configurator';

export const sonnenschutzPriceLists: Record<
  SonnenschutzKey,
  {
    withoutInsektenschutz: Record<number, Record<number, number>>;
    withInsektenschutz: Record<number, Record<number, number>>;
  }
> = {
  auf215: {
    withoutInsektenschutz: auf215_withoutInsektenschutz,
    withInsektenschutz: auf215_withInsektenschutz,
  },
  auf175: { withoutInsektenschutz: {}, withInsektenschutz: {} },
  styroporkasten150: { withoutInsektenschutz: {}, withInsektenschutz: {} },
  vorsatzrollladen: { withoutInsektenschutz: {}, withInsektenschutz: {} },
  aufStyroporkasten150: { withoutInsektenschutz: {}, withInsektenschutz: {} },
  vorsatzraffstore: { withoutInsektenschutz: {}, withInsektenschutz: {} },
  nein: { withoutInsektenschutz: {}, withInsektenschutz: {} },
};
