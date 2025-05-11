import _1_1 from '../../assets/configurator/style/unterlicht/substyles/1 Flügel unten - 1 Flügel oben.png';
import _1_2 from '../../assets/configurator/style/unterlicht/substyles/2 Flügel unten -  1 Flügel oben.png';
import _1_3 from '../../assets/configurator/style/unterlicht/substyles/3 Flügel unten -  1 Flügel oben.png';

import _2_1 from '../../assets/configurator/style/unterlicht/substyles/1 Flügel unten -  2 Flügel oben.png';
import _2_2 from '../../assets/configurator/style/unterlicht/substyles/2 Flügel unten -  2 Flügel oben.png';
import _2_3 from '../../assets/configurator/style/unterlicht/substyles/3 Flügel unten -  2 Flügel oben.png';

import _3_1 from '../../assets/configurator/style/unterlicht/substyles/1 Flügel unten -  3 Flügel oben.png';
import _3_2 from '../../assets/configurator/style/unterlicht/substyles/2 Flügel unten -  3 Flügel oben.png';
import _3_3 from '../../assets/configurator/style/unterlicht/substyles/3 Flügel unten -  3 Flügel oben.png';

import { flugel1_oben, flugel1_unten } from './flugel1';
import { flugel2_oben, flugel2_unten } from './flugel2';
import { flugel3_oben, flugel3_unten } from './flugel3';

export const unterlicht_substyle = [
  {
    name: '1 Flügel oben - 1 Flügel unten',
    image: _1_1,
    key: '_1_1',
    children: {
      oben: flugel1_oben,
      unten: flugel1_unten,
    },
  },
  {
    name: '1 Flügel oben - 2 Flügel unten',
    image: _1_2,
    key: '_1_2',
    children: {
      oben: flugel2_oben,
      unten: flugel1_unten,
    },
  },
  {
    name: '1 Flügel oben - 3 Flügel unten',
    image: _1_3,
    key: '_1_3',
    children: {
      oben: flugel3_oben,
      unten: flugel1_unten,
    },
  },
  {
    name: '2 Flügel oben - 1 Flügel unten',
    image: _2_1,
    key: '_2_1',
    children: {
      oben: flugel1_oben,
      unten: flugel2_unten,
    },
  },
  {
    name: '2 Flügel oben - 2 Flügel unten',
    image: _2_2,
    key: '_2_2',
    children: {
      oben: flugel2_oben,
      unten: flugel2_unten,
    },
  },
  {
    name: '2 Flügel oben - 3 Flügel unten',
    image: _2_3,
    key: '_2_3',
    children: {
      oben: flugel3_oben,
      unten: flugel2_unten,
    },
  },

  {
    name: '3 Flügel oben - 1 Flügel unten',
    image: _3_1,
    key: '_3_1',
    children: {
      oben: flugel1_oben,
      unten: flugel3_unten,
    },
  },
  {
    name: '3 Flügel oben - 2 Flügel unten',
    image: _3_2,
    key: '_3_2',
    children: {
      oben: flugel2_oben,
      unten: flugel3_unten,
    },
  },
  {
    name: '3 Flügel oben - 3 Flügel unten',
    image: _3_3,
    key: '_3_3',
    children: {
      oben: flugel3_oben,
      unten: flugel3_unten,
    },
  },
];
