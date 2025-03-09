import { StaticImageData } from 'next/image';
import color from '../assets/color.jpg';
import color2 from '../assets/color2.png';
import color3 from '../assets/color3.jpg';

import handle from '../assets/handle.webp';
import cover from '../assets/windowcover.jpg';
import nein from '../assets/nein.jpg';

import drutex from '../assets/configurator/brands/drutex.svg';

import flugel1 from '../assets/configurator/style/flugel1/1-Flügel.webp';
import flugel2 from '../assets/configurator/style/flugel2/2-Flügel.webp';
import flugel3 from '../assets/configurator/style/flugel3/3-Flügel.webp';
import oberlicht from '../assets/configurator/style/oberlicht/oberlicht.webp';
import unterlicht from '../assets/configurator/style/unterlicht/unterlicht.webp';

import Iglo5 from '../assets/configurator/profiles/drutex/plastic/Iglo5.webp';
import Iglo5Classic from '../assets/configurator/profiles/drutex/plastic/Iglo5Classic.webp';
import Iglo5Energy from '../assets/configurator/profiles/drutex/plastic/Iglo5Energy.webp';
import Iglo5EnergyClassic from '../assets/configurator/profiles/drutex/plastic/Iglo5EnergyClassic.webp';
import IgloLight from '../assets/configurator/profiles/drutex/plastic/IgloLight.webp';

import MB45 from '../assets/configurator/profiles/drutex/aluminium/MB45.webp';
import MB70 from '../assets/configurator/profiles/drutex/aluminium/MB70.webp';
import MB70HI from '../assets/configurator/profiles/drutex/aluminium/MB70HI.webp';
import MB86NSI from '../assets/configurator/profiles/drutex/aluminium/MB86NSI.webp';

import plastic from '../assets/configurator/materials/plastic.png';
import aluminum from '../assets/configurator/materials/ali.webp';

import { flugel1_unten } from './flugel/flugel1';
import { flugel2_unten } from './flugel/flugel2';
import { flugel3_unten } from './flugel/flugel3';
import { oberlicht_substyle } from './flugel/oberlicht_substyle';
import { unterlicht_substyle } from './flugel/unterlicht_substyle';
import { Config, Size } from '@/types/Configurator';

type Image = StaticImageData;

export type SubStyleOptions = {
  oberlicht: SelectionItem[];
  unterlicht: SelectionItem[];
};

export type SelectionItem = {
  key: string;
  name: string;
  image: Image;
  isActive?: boolean;
  handleNumber?: number;
  children?: {
    profile?: {
      'Kunststoff (PVC)': SelectionItem[];
      Aluminium: SelectionItem[];
    };
    type?: SelectionItem[];
    style?: SelectionItem[];
    substyle?: SelectionItem[];
    oben?: SelectionItem[];
    unten?: SelectionItem[];
  };
};

export const extraOptionsMock = {
  colorExt: [
    {
      name: 'white',
      image: color2,
      key: 'white',
    },
    {
      name: 'Dark Brown',
      image: color2,
      key: 'dark-brown',
    },
    {
      name: 'Whitesmoke',
      image: color2,
      key: 'whitesmoke',
    },
    {
      name: 'Antrasite',
      image: color2,
      key: 'antrasite',
    },
    {
      name: 'Gold',
      image: color2,
      key: 'gold',
    },
    {
      name: 'pink',
      image: color2,
      key: 'pink',
    },
  ],
  colorInt: [
    {
      name: 'white',
      image: color3,
      key: 'white',
    },
    {
      name: 'Dark Brown',
      image: color3,
      key: 'dark-brown',
    },
    {
      name: 'Whitesmoke',
      image: color3,
      key: 'whitesmoke',
    },
    {
      name: 'Antrasite',
      image: color3,
      key: 'antrasite',
    },
    {
      name: 'Gold',
      image: color3,
      key: 'gold',
    },
    {
      name: 'pink',
      image: color3,
      key: 'pink',
    },
  ],
  colorMid: [
    {
      name: 'white',
      image: color,
      key: 'white',
    },
    {
      name: 'Dark Brown',
      image: color,
      key: 'dark-brown',
    },
    {
      name: 'Whitesmoke',
      image: color,
      key: 'whitesmoke',
    },
    {
      name: 'Antrasite',
      image: color,
      key: 'antrasite',
    },
    {
      name: 'Gold',
      image: color,
      key: 'gold',
    },
    {
      name: 'pink',
      image: color,
      key: 'pink',
    },
  ],
  sealExt: [
    {
      name: 'white',
      image: color2,
      key: 'white',
    },
    {
      name: 'Dark Brown',
      image: color2,
      key: 'dark-brown',
    },
    {
      name: 'Whitesmoke',
      image: color2,
      key: 'whitesmoke',
    },
    {
      name: 'Antrasite',
      image: color2,
      key: 'antrasite',
    },
    {
      name: 'Gold',
      image: color2,
      key: 'gold',
    },
    {
      name: 'pink',
      image: color2,
      key: 'pink',
    },
  ],
  sealInt: [
    {
      name: 'white',
      image: color3,
      key: 'white',
    },
    {
      name: 'Dark Brown',
      image: color3,
      key: 'dark-brown',
    },
    {
      name: 'Whitesmoke',
      image: color3,
      key: 'whitesmoke',
    },
    {
      name: 'Antrasite',
      image: color3,
      key: 'antrasite',
    },
    {
      name: 'Gold',
      image: color3,
      key: 'gold',
    },
    {
      name: 'pink',
      image: color3,
      key: 'pink',
    },
  ],
  handle: [
    {
      name: 'H-83274',
      image: handle,
      key: 'H-83274',
    },
    {
      name: 'H-85375',
      image: handle,
      key: 'H-85375',
    },
    {
      name: 'H-12748',
      image: handle,
      key: 'H-12748',
    }
  ],
};

type GenericItem = SelectionItem;

export const materials: GenericItem[] = [
  {
    key: 'plastic',
    name: 'Kunststoff (PVC)',
    image: plastic,
  },
  {
    key: 'aluminum',
    name: 'Aluminium',
    image: aluminum,
  },
];

export const brands: GenericItem[] = [
  {
    key: 'drutex',
    name: 'Drutex',
    image: drutex,
    isActive: true,
    children: {
      profile: {
        'Kunststoff (PVC)': [
          {
            key: 'Iglo_5',
            name: 'Iglo 5',
            image: Iglo5,
          },
          {
            key: 'Iglo_5_Classic',
            name: 'Iglo 5 Classic',
            image: Iglo5Classic,
          },
          {
            key: 'Iglo_Energy',
            name: 'Iglo Energy',
            image: Iglo5Energy,
          },
          {
            key: 'Iglo_Energy_Classic',
            name: 'Iglo Energy Classic',
            image: Iglo5EnergyClassic,
          },
          {
            key: 'Iglo_Light',
            name: 'Iglo Light',
            image: IgloLight,
          },
        ],
        Aluminium: [
          {
            key: 'MB45',
            name: 'MB45',
            image: MB45,
          },
          {
            key: 'MB70',
            name: 'MB70',
            image: MB70,
          },
          {
            key: 'MB70HI',
            name: 'MB70HI',
            image: MB70HI,
          },
          {
            key: 'MB86NSI',
            name: 'MB86NSI',
            image: MB86NSI,
          },
        ],
      },
    },
  },
  /*     {
        name: 'Schüco',
        image: schuco,
        isActive: false
    },
    {
        name: 'Gealan',
        image: gealan,
        isActive: false
    },
    {
        name: 'Veka',
        image: veka,
        isActive: false
    },
    {
        name: 'Aluplast',
        image: aluplast,
        isActive: false
    } */
];

export const windowStyles: GenericItem[] = [
  {
    name: '1. Flügel',
    image: flugel1,
    key: 'flugel1',
    children: {
      type: flugel1_unten,
    },
  },
  {
    name: '2. Flügel',
    image: flugel2,
    key: 'flugel2',
    children: {
      type: flugel2_unten,
    },
  },
  {
    name: '3. Flügel',
    image: flugel3,
    key: 'flugel3',
    children: {
      type: flugel3_unten,
    },
  },
  {
    key: 'oberlicht',
    name: 'Oberlicht',
    image: oberlicht,
  },
  {
    key: 'unterlicht',
    name: 'Unterlicht',
    image: unterlicht,
  },
];

export const subStyleOptions: SubStyleOptions = {
  oberlicht: oberlicht_substyle,
  unterlicht: unterlicht_substyle,
};

export const covers: SelectionItem[] = [
  {
    key: 'nein',
    name: 'Nein',
    image: nein,
  },
  {
    key: 'cover1',
    name: 'Aufsatzrollladen',
    image: cover,
  },
];

// initial deafult configuration

export const initialConfiguration: Config = {
  material: materials[0],
  brand: brands[0],
  profile: brands[0].children!.profile!['Kunststoff (PVC)'][0],
  style: windowStyles[0],
  type: windowStyles[0].children!.type![0]!,
  cover: covers[0],
  size: true,
  colorExt: extraOptionsMock.colorExt[0],
  colorInt: extraOptionsMock.colorInt[0],
  colorMid: extraOptionsMock.colorMid[0],
  sealExt: extraOptionsMock.sealExt[0],
  sealInt: extraOptionsMock.sealInt[0],
};

export const initialSubstyle = {
  option: null,
  oben: null,
  unten: null,
};

export const initialSize: Size = {
  w: 1000,
  h: 700,
  h_unten: 800,
};

export const initialExtraConfig = {
  colorExt: 'white',
  colorInt: 'white',
  colorMid: 'white',
  sealExt: 'white',
  sealInt: 'white',
  handle: 'H-83274',
};

export const categoryItems = [
  { key: 'material', items: materials },
  { key: 'brand', items: brands },
  { key: 'style', items: windowStyles },
  { key: 'cover', items: covers },
  { key: 'colorExt', items: extraOptionsMock.colorExt },
  { key: 'colorInt', items: extraOptionsMock.colorInt },
  { key: 'colorMid', items: extraOptionsMock.colorMid },
  { key: 'sealExt', items: extraOptionsMock.sealExt },
  { key: 'sealInt', items: extraOptionsMock.sealInt },
  { key: 'handle', items: extraOptionsMock.handle },
];
