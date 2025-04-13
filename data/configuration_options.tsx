import { StaticImageData } from 'next/image';
import color from '../assets/color.jpg';
import color2 from '../assets/color2.png';
import color3 from '../assets/color3.jpg';

import placeholder from '../assets/placeholder.png';
import no from '../assets/no.jpeg';
import yes from '../assets/yes.png';

import width from '../assets/width.avif';

import handle from '../assets/handle.webp';
import cover from '../assets/windowcover.jpg';

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

import plastic from '../assets/configurator/materials/KunststoffFenster.png';
import aluminum from '../assets/configurator/materials/AluminiumFenster.png';
/* import holz from '../assets/configurator/materials/HolzFenster.png';
import holzAlu from '../assets/configurator/materials/HolzAluFenster.png'; */

// Verglasun Glasspaket
import _2fv from '../assets/configurator/verglasung/glasspaket/2-f-v.webp';
import _2fvwk from '../assets/configurator/verglasung/glasspaket/2-f-v-w-k.webp';
import _3fv from '../assets/configurator/verglasung/glasspaket/3-f-v.webp';
import _3fvwk from '../assets/configurator/verglasung/glasspaket/3-f-v-w-k.webp';

// Verglasun Ornament
import ab4 from '../assets/configurator/verglasung/ornament/ab4.webp';
import ab6 from '../assets/configurator/verglasung/ornament/ab6.webp';
import ag4 from '../assets/configurator/verglasung/ornament/ag4.webp';
import m from '../assets/configurator/verglasung/ornament/m.webp';
import oc from '../assets/configurator/verglasung/ornament/oc.webp';
import ochin from '../assets/configurator/verglasung/ornament/ochin.webp';
import od from '../assets/configurator/verglasung/ornament/od.webp';
import omc from '../assets/configurator/verglasung/ornament/omc.webp';
import os from '../assets/configurator/verglasung/ornament/os.webp';
import osil from '../assets/configurator/verglasung/ornament/osil.webp';
import rb6 from '../assets/configurator/verglasung/ornament/osil.webp';

// Verglasun Schallschutz
import _36 from '../assets/configurator/verglasung/schallschutz/36.webp';
import _38 from '../assets/configurator/verglasung/schallschutz/36.webp';

import { flugel1_unten } from './flugel/flugel1';
import { flugel2_unten } from './flugel/flugel2';
import { flugel3_unten } from './flugel/flugel3';
import { oberlicht_substyle } from './flugel/oberlicht_substyle';
import { unterlicht_substyle } from './flugel/unterlicht_substyle';
import { Config, Size } from '@/types/Configurator';
import { ReactNode } from 'react';

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
  colors?: SelectionItem[];
  zoomable?: boolean;
  sectionNumber?: number;
  component?: ReactNode;
  items?: SelectionItem[];
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

export const extraOptionsMock: Record<string, SelectionItem[]> = {
  colorExt: [
    {
      name: 'white',
      image: color2,
      key: 'white',
      zoomable: true,
    },
    {
      name: 'Dark Brown',
      image: color2,
      key: 'dark-brown',
      zoomable: true,
    },
    {
      name: 'Whitesmoke',
      image: color2,
      key: 'whitesmoke',
      zoomable: true,
    },
    {
      name: 'Antrasite',
      image: color2,
      key: 'antrasite',
      zoomable: true,
    },
    {
      name: 'Gold',
      image: color2,
      key: 'gold',
      zoomable: true,
    },
    {
      name: 'pink',
      image: color2,
      key: 'pink',
      zoomable: true,
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
    },
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
  /*   {
    key: 'holz',
    name: 'Holz',
    image: holz,
  },
  {
    key: 'holzalu',
    name: 'Holz-Aluminium',
    image: holzAlu,
  }, */
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
    image: no,
  },
  {
    key: 'cover1',
    name: 'Aufsatzrollladen',
    image: cover,
  },
];

export const initialSubstyle = {
  option: null,
  oben: null,
  unten: null,
};

export const initialSize: Size = {
  w: 1000,
  h: 1000,
};

export const initialExtraConfig = {
  colorExt: 'white',
  colorInt: 'white',
  colorMid: 'white',
  sealExt: 'white',
  sealInt: 'white',
  handle: 'H-83274',
};

const verglasung = {
  glasspaket: [
    {
      key: '2-f-v',
      name: '2-fach Verglasung',
      image: _2fv,
    },
    {
      key: '2-f-v-w-k',
      name: '2-fach Verglasung (warme Kante)',
      image: _2fvwk,
    },
    {
      key: '3-f-v',
      name: '3-fach Verglasung',
      image: _3fv,
    },
    {
      key: '3-f-v-w-k',
      name: '3-fach Verglasung (warme Kante)',
      image: _3fvwk,
    },
  ],
  ornament: [
    {
      key: 'nein',
      name: 'Nein',
      image: no,
    },
    {
      key: 'rb6',
      name: 'Reflektofloat: Braun 6',
      image: rb6,
    },
    {
      key: 'ab6',
      name: 'Antisol: Blau 6',
      image: ab6,
    },
    {
      key: 'ab4',
      name: 'Antisol: Braun 4',
      image: ab4,
    },
    {
      key: 'ag4',
      name: 'Antisol: Grün 4',
      image: ag4,
    },
    {
      key: 'oc',
      name: 'Ornamentglas: Cathedral',
      image: oc,
    },
    {
      key: 'od',
      name: 'Ornamentglas: Delta',
      image: od,
    },
    {
      key: 'os',
      name: 'Ornamentglas: Streifen',
      image: os,
    },
    {
      key: 'm',
      name: 'Milchglas: (Sicherheitsglas mit matter Folie)',
      image: m,
    },
    {
      key: 'omc',
      name: 'Ornamentglas: Master-Carre',
      image: omc,
    },
    {
      key: 'osil',
      name: 'Ornamentglas: Silvit',
      image: osil,
    },
    {
      key: 'ochin',
      name: 'Ornamentglas: Chinchilla',
      image: ochin,
    },
  ],
  sicherheitsverglasung: [
    {
      key: 'nein',
      name: 'Nein',
      image: no,
    },
    {
      key: 'sver1',
      name: 'Außen: VSG 6mm (Verbundsicherheitsglas)',
      image: placeholder,
    },
    {
      key: 'sver2',
      name: 'Innen: VSG 6mm (Verbundsicherheitsglas)',
      image: placeholder,
    },
    {
      key: 'sver3',
      name: 'Außen: VSG 6mm + Innen: VSG 6mm (Verbundsicherheitsglas)',
      image: placeholder,
    },
    {
      key: 'sver4',
      name: 'Außen: VSG 8mm (Verbundsicherheitsglas)',
      image: placeholder,
    },
    {
      key: 'sver5',
      name: 'Innen: VSG 8mm (Verbundsicherheitsglas)',
      image: placeholder,
    },
    {
      key: 'sver6',
      name: 'Außen: VSG 6mm + Innen: VSG 8mm (Verbundsicherheitsglas)',
      image: placeholder,
    },
    {
      key: 'sver7',
      name: 'Außen: ESG 6mm + Innen: ESG 6mm (Einscheibensicherheitsglas)',
      image: placeholder,
    },
    {
      key: 'sver8',
      name: 'Außen: ESG 6mm (Einscheibensicherheitsglas)',
      image: placeholder,
    },
  ],
  schallschutz: [
    {
      key: 'nein',
      name: 'Nein',
      image: no,
    },
    {
      key: '36',
      name: '36db',
      image: _36,
    },
    {
      key: '38',
      name: '38db',
      image: _38,
    },
  ],
  sprossen: [],
  druckausgleichsventil: [
    {
      key: 'nein',
      name: 'Nein',
      image: no,
    },
    {
      key: 'ja',
      name: 'Ja',
      image: yes,
    },
  ],
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
  { key: 'glasspaket', items: verglasung.glasspaket },
  { key: 'ornament', items: verglasung.ornament },
  { key: 'sicherheitsverglasung', items: verglasung.sicherheitsverglasung },
  { key: 'schallschutz', items: verglasung.schallschutz },
  { key: 'sprossen', items: [] },
  { key: 'druckausgleichsventil', items: verglasung.druckausgleichsventil },
];

// initial deafult configuration

export const initialConfiguration: Config = {
  material: materials[0],
  brand: brands[0],
  profile: brands[0].children!.profile!['Kunststoff (PVC)'][0],
  style: windowStyles[0],
  type: windowStyles[0].children!.type![0]!,
  cover: covers[0],
  size: initialSize,
  colorExt: extraOptionsMock.colorExt[0],
  colorInt: extraOptionsMock.colorInt[0],
  colorMid: extraOptionsMock.colorMid[0],
  sealExt: extraOptionsMock.sealExt[0],
  sealInt: extraOptionsMock.sealInt[0],
  glasspaket: verglasung.glasspaket[0],
  glasspaketWarmeKante: 'Nein',
  ornament: verglasung.ornament[0],
  sicherheitsverglasung: verglasung.sicherheitsverglasung[0],
  schallschutz: verglasung.schallschutz[0],
  sprossen: 'Nein',
  druckausgleichsventil: verglasung.druckausgleichsventil[0],
};

import wk1 from '../assets/configurator/verglasung/schallschutz/warmenkante/wk1.webp';
import wk2 from '../assets/configurator/verglasung/schallschutz/warmenkante/wk2.webp';
import wk3 from '../assets/configurator/verglasung/schallschutz/warmenkante/wk3.webp';
import wk4 from '../assets/configurator/verglasung/schallschutz/warmenkante/wk4.webp';
import wk5 from '../assets/configurator/verglasung/schallschutz/warmenkante/wk5.webp';
import wk6 from '../assets/configurator/verglasung/schallschutz/warmenkante/wk6.webp';

export const warmenKante = [
  {
    key: 'wk1',
    name: 'Swisspacer Ultimate Schwarz',
    image: wk1,
  },
  {
    key: 'wk2',
    name: 'Swisspacer Ultimate Grau',
    image: wk2,
  },
  {
    key: 'wk3',
    name: 'Swisspacer Ultimate Braun',
    image: wk3,
  },

  {
    key: 'wk4',
    name: 'Schwarz RAL 9005',
    image: wk4,
  },
  {
    key: 'wk5',
    name: 'Swisspacer Ultimate Dunkelgrau RAL 9023',
    image: wk5,
  },
  {
    key: 'wk6',
    name: 'Swisspacer Ultimate Dunkelbraun RAL 8014',
    image: wk6,
  },
];

export const sprossenItems: Record<
  'innenliegende' | 'aufgesetzte',
  { key: string; value: string }[]
> = {
  innenliegende: [
    {
      key: '8',
      value: '8',
    },
    {
      key: '18',
      value: '18',
    },
    {
      key: '26',
      value: '26',
    },
    {
      key: '45',
      value: '45',
    },
  ],
  aufgesetzte: [
    {
      key: '27',
      value: '27',
    },
    {
      key: '45',
      value: '45',
    },
    {
      key: '65',
      value: '65',
    },
  ],
};

import type1 from '@/assets/configurator/verglasung/sprossen/pattern/typ01.webp';
import type2 from '@/assets/configurator/verglasung/sprossen/pattern/typ02.webp';
import type3 from '@/assets/configurator/verglasung/sprossen/pattern/typ03.webp';
import type4 from '@/assets/configurator/verglasung/sprossen/pattern/typ04.webp';
import type5 from '@/assets/configurator/verglasung/sprossen/pattern/typ05.webp';
import type6 from '@/assets/configurator/verglasung/sprossen/pattern/typ06.webp';
import type7 from '@/assets/configurator/verglasung/sprossen/pattern/typ07.webp';
import type8 from '@/assets/configurator/verglasung/sprossen/pattern/typ08.webp';
import type9 from '@/assets/configurator/verglasung/sprossen/pattern/typ09.webp';
import type10 from '@/assets/configurator/verglasung/sprossen/pattern/typ10.webp';
import type11 from '@/assets/configurator/verglasung/sprossen/pattern/typ11.webp';
import type12 from '@/assets/configurator/verglasung/sprossen/pattern/typ12.webp';
import type13 from '@/assets/configurator/verglasung/sprossen/pattern/typ13.webp';
import type14 from '@/assets/configurator/verglasung/sprossen/pattern/typ14.webp';

export const sprossenPatterns = [
  {
    key: 'type1',
    name: 'Type 1',
    image: type1,
  },
  {
    key: 'type2',
    name: 'Type 2',
    image: type2,
  },
  {
    key: 'type3',
    name: 'Type 3',
    image: type3,
  },
  {
    key: 'type4',
    name: 'Type 4',
    image: type4,
  },
  {
    key: 'type5',
    name: 'Type 5',
    image: type5,
  },
  {
    key: 'type6',
    name: 'Type 6',
    image: type6,
  },
  {
    key: 'type7',
    name: 'Type 7',
    image: type7,
  },
  {
    key: 'type8',
    name: 'Type 8',
    image: type8,
  },
  {
    key: 'type9',
    name: 'Type 9',
    image: type9,
  },
  {
    key: 'type10',
    name: 'Type 10',
    image: type10,
  },
  {
    key: 'type11',
    name: 'Type 11',
    image: type11,
  },
  {
    key: 'type12',
    name: 'Type 12',
    image: type12,
  },
  {
    key: 'type13',
    name: 'Type 13',
    image: type13,
  },
  {
    key: 'type14',
    name: 'Type 14',
    image: type14,
  },
];

export const sprossenCards: SelectionItem[] = [
  {
    key: 'nein',
    name: 'Nein',
    image: no,
  },
  {
    key: 'is',
    name: 'Innenliegen Sprossen',
    image: yes,
    items: [
      {
        key: '8',
        name: '8',
        image: width,
        colors: [
          { key: 'white', name: 'Weiß', image: color2 },
          { key: 'silver-matt', name: 'Silber matt', image: color2 },
          { key: 'gold', name: 'Gold', image: color2 },
        ],
      },
      {
        key: '18',
        name: '18',
        image: width,
        colors: [
          { key: 'white', name: 'Weiß', image: color2 },
          { key: 'gold', name: 'Gold', image: color2 },
          { key: 'golden-oak', name: 'Golden oak', image: color2 },
          { key: 'eiche-dunkel', name: 'Eiche Dunkel', image: color2 },
          { key: 'mahagoni', name: 'Mahagoni', image: color2 },
          { key: 'nussbaum', name: 'Nussbaum', image: color2 },
          { key: 'schwarzbraun', name: 'Schwarzbraun', image: color2 },
          { key: 'schokobraun', name: 'Schokobraun', image: color2 },
          { key: 'macore', name: 'Macore', image: color2 },
          { key: 'winchester', name: 'Winchester', image: color2 },
          { key: 'anthrazitgrau', name: 'Anthrazitgrau', image: color2 },
        ],
      },
      {
        key: '26',
        name: '26',
        image: width,
        colors: [
          { key: 'white', name: 'Weiß', image: color2 },
          { key: 'gold', name: 'Gold', image: color2 },
          { key: 'golden-oak', name: 'Golden oak', image: color2 },
          { key: 'eiche-dunkel', name: 'Eiche Dunkel', image: color2 },
          { key: 'mahagoni', name: 'Mahagoni', image: color2 },
          { key: 'nussbaum', name: 'Nussbaum', image: color2 },
          { key: 'schwarzbraun', name: 'Schwarzbraun', image: color2 },
          { key: 'schokobraun', name: 'Schokobraun', image: color2 },
          { key: 'macore', name: 'Macore', image: color2 },
          { key: 'winchester', name: 'Winchester', image: color2 },
          { key: 'anthrazitgrau', name: 'Anthrazitgrau', image: color2 },
        ],
      },
      {
        key: '45',
        name: '45',
        image: width,
        colors: [{ key: 'white', name: 'Weiß', image: color2 }],
      },
    ],
  },
  {
    key: 'as',
    name: 'Aufgesetzte Sprossen',
    image: yes,
    items: [
      {
        key: '27',
        name: '27',
        image: width,
        colors: [{ key: 'white', name: 'Weiß', image: color2 }],
      },
      {
        key: '45',
        name: '45',
        image: width,
        colors: [{ key: 'white', name: 'Weiß', image: color2 }],
      },
      {
        key: '65',
        name: '65',
        image: width,
        colors: [{ key: 'white', name: 'Weiß', image: color2 }],
      },
    ],
  },
];
