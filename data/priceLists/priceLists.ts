import { WindowStyle } from '@/types/Configurator';
import { priceList_1flugelPlastic } from './1flugel/prices1FlugelPlastic';
import { priceList_1flugelAluminium } from './1flugel/prices1FlugelAluminium';
import { priceList_2flugelPlastic } from './2flugel/prices2FlugelPlastic';
import { priceList_2flugelAluminium } from './2flugel/prices2FlugelAluminium';
import { priceList_3flugelPlastic } from './3flugel/prices3FlugelPlastic';

export const priceLists: Record<
  WindowStyle,
  Record<string, Record<string, Record<number, Record<number, number>>>>
> = {
  flugel1: {
    plastic: priceList_1flugelPlastic,
    aluminium: priceList_1flugelAluminium,
  },
  flugel2: {
    plastic: priceList_2flugelPlastic,
    aluminium: priceList_2flugelAluminium,
  },
  flugel3: {
    plastic: priceList_3flugelPlastic,
    aluminium: {},
  },
  oberlicht: {
    plastic: {},
    aluminium: {},
  },
  unterlicht: {
    plastic: {},
    aluminium: {},
  },
};
