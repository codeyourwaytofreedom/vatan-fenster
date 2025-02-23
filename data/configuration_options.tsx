import { StaticImageData } from 'next/image';
import dummy from '../assets/placeholder.jpg';

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

import plastic from '../assets/configurator/materials/plastic.jpeg';
import aluminum from '../assets/configurator/materials/aluminum.jpeg';

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

export const categoryItems = [
  { key: 'material', items: materials },
  { key: 'brand', items: brands },
  { key: 'style', items: windowStyles },
];

// initial deafult configuration

export const initialConfiguration: Config = {
  material: 'Kunststoff (PVC)',
  brand: 'Drutex',
  profile: 'Iglo 5',
  style: '1. Flügel',
  type: 'Fest',
  size: true,
};

export const initialSize: Size = {
  w: 1000,
  h: 700,
  h_unten: 800,
};

export const extraOptionsMock = {
  color: [
    {
      name: 'Dark Brown',
      image: dummy,
      key: 'dark-brown',
    },
    {
      name: 'Whitesmoke',
      image: dummy,
      key: 'whitesmoke',
    },
    {
      name: 'Antrasite',
      image: dummy,
      key: 'antrasite',
    },
    {
      name: 'Gold',
      image: dummy,
      key: 'gold',
    },
    {
      name: 'pink',
      image: dummy,
      key: 'pink',
    },
  ],
  tint: [
    {
      name: '10%',
      image: dummy,
      key: '10',
    },
    {
      name: '20%',
      image: dummy,
      key: '20',
    },
    {
      name: '30%',
      image: dummy,
      key: '30',
    },
    {
      name: '50%',
      image: dummy,
      key: '50',
    },
    {
      name: '75%',
      image: dummy,
      key: '75',
    },
  ],
  handle: [
    {
      name: 'H-83274',
      image: dummy,
      key: 'H-83274',
    },
    {
      name: 'H-85375',
      image: dummy,
      key: 'H-85375',
    },
    {
      name: 'H-12748',
      image: dummy,
      key: 'H-12748',
    },
    {
      name: 'H-94798',
      image: dummy,
      key: 'H-94798',
    },
    {
      name: 'H-36783',
      image: dummy,
      key: 'H-36783',
    },
  ],
};
