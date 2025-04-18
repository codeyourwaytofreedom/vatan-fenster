import { StaticImageData } from 'next/image';
import color from '../assets/color.jpg';
import color2 from '../assets/color2.png';
import color3 from '../assets/color3.jpg';

import placeholder from '../assets/placeholder.png';
import no from '../assets/no.jpeg';
import yes from '../assets/yes.png';

import width from '../assets/width.avif';

import handle from '../assets/empty.jpg';
import cover from '../assets/windowcover.jpg';

import drutex from '../assets/configurator/brands/drutex.svg';

import flugel1 from '../assets/configurator/style/flugel1/1-Flügel.png';
import flugel2 from '../assets/configurator/style/flugel2/2-Flügel.png';
import flugel3 from '../assets/configurator/style/flugel3/3-Flügel.png';
import oberlicht from '../assets/configurator/style/oberlicht/oberlicht.png';
import unterlicht from '../assets/configurator/style/unterlicht/unterlicht.png';

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
import holz from '../assets/configurator/materials/HolzFenster.png';
import holzAlu from '../assets/configurator/materials/HolzAluFenster.png';

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

// standart handle images
import s_weis from '../assets/configurator/fenstergriffe/standart/001.Standart weiß.webp';
import s_silber from '../assets/configurator/fenstergriffe/standart/002.Standart silber.webp';
import s_schwartz from '../assets/configurator/fenstergriffe/standart/003.Standart schwarz.webp';
import s_braun from '../assets/configurator/fenstergriffe/standart/004.Standart braun.webp';
import s_oliv from '../assets/configurator/fenstergriffe/standart/005.Standart oliv.webp';
import sec_weis from '../assets/configurator/fenstergriffe/standart/006.Secustik weiß.webp';
import sec_silber from '../assets/configurator/fenstergriffe/standart/007.Secustik silber.webp';
import sec_braun from '../assets/configurator/fenstergriffe/standart/008.Secustik braun.webp';
import sec_champ from '../assets/configurator/fenstergriffe/standart/009.Secustik champagner.webp';
import sec_titan from '../assets/configurator/fenstergriffe/standart/010.Secustik titan.webp';
import el_weis from '../assets/configurator/fenstergriffe/standart/011.Eleganz weiß.webp';
import el_silber from '../assets/configurator/fenstergriffe/standart/012.Eleganz silber.webp';
import el_braun from '../assets/configurator/fenstergriffe/standart/013.Eleganz braun.webp';
import el_oliv from '../assets/configurator/fenstergriffe/standart/014.Eleganz olive.webp';
import d_weis from '../assets/configurator/fenstergriffe/standart/015.Dublin weiß.webp';
import d_silber from '../assets/configurator/fenstergriffe/standart/016.Dublin silber.webp';
import d_schwartz from '../assets/configurator/fenstergriffe/standart/017.Dublin schwarz.webp';
import d_braun from '../assets/configurator/fenstergriffe/standart/018.Dublin braun.webp';
import d_ant from '../assets/configurator/fenstergriffe/standart/019.Dublin anthrazitgrau.webp';

const standartFestergriffeOptions = [
  { key: 's_weis', image: s_weis, name: 'Standart weiß' },
  { key: 's_silber', image: s_silber, name: 'Standart silber' },
  { key: 's_schwartz', image: s_schwartz, name: 'Standart schwarz' },
  { key: 's_braun', image: s_braun, name: 'Standart braun' },
  { key: 's_oliv', image: s_oliv, name: 'Standart oliv' },
  { key: 'sec_weis', image: sec_weis, name: 'Secustik weiß' },
  { key: 'sec_silber', image: sec_silber, name: 'Secustik silber' },
  { key: 'sec_braun', image: sec_braun, name: 'Secustik braun' },
  { key: 'sec_champ', image: sec_champ, name: 'Secustik champagner' },
  { key: 'sec_titan', image: sec_titan, name: 'Secustik titan' },
  { key: 'el_weis', image: el_weis, name: 'Eleganz weiß' },
  { key: 'el_silber', image: el_silber, name: 'Eleganz silber' },
  { key: 'el_braun', image: el_braun, name: 'Eleganz braun' },
  { key: 'el_oliv', image: el_oliv, name: 'Eleganz olive' },
  { key: 'd_weis', image: d_weis, name: 'Dublin weiß' },
  { key: 'd_silber', image: d_silber, name: 'Dublin silber' },
  { key: 'd_schwartz', image: d_schwartz, name: 'Dublin schwarz' },
  { key: 'd_braun', image: d_braun, name: 'Dublin braun' },
  { key: 'd_ant', image: d_ant, name: 'Dublin anthrazitgrau' },
];

// schlüssel handle images
import schl_weis from '../assets/configurator/fenstergriffe/schlüssel/001.Standart weiß.webp';
import schl_silber from '../assets/configurator/fenstergriffe/schlüssel/002.Standart silber.webp';
import schl_schwarz from '../assets/configurator/fenstergriffe/schlüssel/003.Standart schwarz.webp';
import schl_braun from '../assets/configurator/fenstergriffe/schlüssel/004.Standart braun.webp';
import schl_oliv from '../assets/configurator/fenstergriffe/schlüssel/005.Standart oliv.webp';
import schl_sec_weis from '../assets/configurator/fenstergriffe/schlüssel/006.Secustik weiß.webp';
import schl_sec_silber from '../assets/configurator/fenstergriffe/schlüssel/007.Secustik silber.webp';
import schl_sec_braun from '../assets/configurator/fenstergriffe/schlüssel/008.Secustik braun.webp';
import schl_sec_champ from '../assets/configurator/fenstergriffe/schlüssel/009.Secustik champagner.webp';
import schl_sec_titan from '../assets/configurator/fenstergriffe/schlüssel/010.Secustik titan.webp';
import schl_el_weis from '../assets/configurator/fenstergriffe/schlüssel/011.Eleganz weiß.webp';
import schl_el_silber from '../assets/configurator/fenstergriffe/schlüssel/012.Eleganz silber.webp';
import schl_el_braun from '../assets/configurator/fenstergriffe/schlüssel/013.Eleganz braun.webp';
import schl_el_oliv from '../assets/configurator/fenstergriffe/schlüssel/014.Eleganz gold_oliv.webp';
import schl_d_weis from '../assets/configurator/fenstergriffe/schlüssel/015.Dublin weiß.webp';
import schl_d_silber from '../assets/configurator/fenstergriffe/schlüssel/016.Dublin silber.webp';
import schl_d_schwarz from '../assets/configurator/fenstergriffe/schlüssel/017.Dublin schwarz.webp';
import schl_d_braun from '../assets/configurator/fenstergriffe/schlüssel/018.Dublin braun.png';
import schl_d_ant from '../assets/configurator/fenstergriffe/schlüssel/019.Dublin anthrazit.png';

const schluesselFestergriffeOptions = [
  { key: 'schl_weis', image: schl_weis, name: 'Standart weiß' },
  { key: 'schl_silber', image: schl_silber, name: 'Standart silber' },
  { key: 'schl_schwarz', image: schl_schwarz, name: 'Standart schwarz' },
  { key: 'schl_braun', image: schl_braun, name: 'Standart braun' },
  { key: 'schl_oliv', image: schl_oliv, name: 'Standart oliv' },
  { key: 'schl_sec_weis', image: schl_sec_weis, name: 'Secustik weiß' },
  { key: 'schl_sec_silber', image: schl_sec_silber, name: 'Secustik silber' },
  { key: 'schl_sec_braun', image: schl_sec_braun, name: 'Secustik braun' },
  { key: 'schl_sec_champ', image: schl_sec_champ, name: 'Secustik champagner' },
  { key: 'schl_sec_titan', image: schl_sec_titan, name: 'Secustik titan' },
  { key: 'schl_el_weis', image: schl_el_weis, name: 'Eleganz weiß' },
  { key: 'schl_el_silber', image: schl_el_silber, name: 'Eleganz silber' },
  { key: 'schl_el_braun', image: schl_el_braun, name: 'Eleganz braun' },
  { key: 'schl_el_oliv', image: schl_el_oliv, name: 'Eleganz gold_oliv' },
  { key: 'schl_d_weis', image: schl_d_weis, name: 'Dublin weiß' },
  { key: 'schl_d_silber', image: schl_d_silber, name: 'Dublin silber' },
  { key: 'schl_d_schwarz', image: schl_d_schwarz, name: 'Dublin schwarz' },
  { key: 'schl_d_braun', image: schl_d_braun, name: 'Dublin braun' },
  { key: 'schl_d_ant', image: schl_d_ant, name: 'Dublin anthrazit' },
];

// druckknopf handle options

import dr_weis from '../assets/configurator/fenstergriffe/druckknopf/001.Standart weiß.webp';
import dr_silberfarbig from '../assets/configurator/fenstergriffe/druckknopf/002.Standart silberfarbig.webp';
import dr_schwarz from '../assets/configurator/fenstergriffe/druckknopf/003.Standart schwarz.webp';
import dr_braun from '../assets/configurator/fenstergriffe/druckknopf/004.Standart braun.webp';
import dr_oliv from '../assets/configurator/fenstergriffe/druckknopf/005.Standart gold_oliv.webp';
import dr_sec_weis from '../assets/configurator/fenstergriffe/druckknopf/006.Secustik weiß.webp';
import dr_sec_silber from '../assets/configurator/fenstergriffe/druckknopf/007.Secustik silber.webp';
import dr_sec_braun from '../assets/configurator/fenstergriffe/druckknopf/008.Secustik braun.webp';
import dr_sec_champ from '../assets/configurator/fenstergriffe/druckknopf/009.Secustik champagner.webp';
import dr_sec_titan from '../assets/configurator/fenstergriffe/druckknopf/010.Secustik titan.webp';
import dr_d_weis from '../assets/configurator/fenstergriffe/druckknopf/011.Dublin weiß.webp';
import dr_d_silber from '../assets/configurator/fenstergriffe/druckknopf/012.Dublin silber.webp';
import dr_d_schwarz from '../assets/configurator/fenstergriffe/druckknopf/013.Dublin schwarz.webp';
import dr_d_braun from '../assets/configurator/fenstergriffe/druckknopf/014.Dublin braun.webp';
import dr_d_ant from '../assets/configurator/fenstergriffe/druckknopf/015.Dublin anthrazit .webp';

const druckknopfFestergriffeOptions = [
  { key: 'dr_weis', image: dr_weis, name: 'Standart weiß' },
  { key: 'dr_silberfarbig', image: dr_silberfarbig, name: 'Standart silberfarbig' },
  { key: 'dr_schwarz', image: dr_schwarz, name: 'Standart schwarz' },
  { key: 'dr_braun', image: dr_braun, name: 'Standart braun' },
  { key: 'dr_oliv', image: dr_oliv, name: 'Standart gold_oliv' },
  { key: 'dr_sec_weis', image: dr_sec_weis, name: 'Secustik weiß' },
  { key: 'dr_sec_silber', image: dr_sec_silber, name: 'Secustik silber' },
  { key: 'dr_sec_braun', image: dr_sec_braun, name: 'Secustik braun' },
  { key: 'dr_sec_champ', image: dr_sec_champ, name: 'Secustik champagner' },
  { key: 'dr_sec_titan', image: dr_sec_titan, name: 'Secustik titan' },
  { key: 'dr_d_weis', image: dr_d_weis, name: 'Dublin weiß' },
  { key: 'dr_d_silber', image: dr_d_silber, name: 'Dublin silber' },
  { key: 'dr_d_schwarz', image: dr_d_schwarz, name: 'Dublin schwarz' },
  { key: 'dr_d_braun', image: dr_d_braun, name: 'Dublin braun' },
  { key: 'dr_d_ant', image: dr_d_ant, name: 'Dublin anthrazit' },
];

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
  disabled?: boolean;
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

export const farbenOptions: Record<string, SelectionItem[]> = {
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
  fenstergriffe: [
    {
      name: 'Standart',
      image: handle,
      key: 'standart',
    },
    {
      name: 'Mit Druckknopf',
      image: handle,
      key: 'druckknopf',
    },
    {
      name: 'Mit Schlüssel',
      image: handle,
      key: 'schlüssel',
    },
  ],
};

export const fenstergriffeOptions: Record<string, SelectionItem[]> = {
  standart: standartFestergriffeOptions,
  druckknopf: druckknopfFestergriffeOptions,
  schlüssel: schluesselFestergriffeOptions,
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
  {
    key: 'holz',
    name: 'Holz',
    image: holz,
    disabled: true,
  },
  {
    key: 'holzalu',
    name: 'Holz-Aluminium',
    image: holzAlu,
    disabled: true,
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
  fenstergriffe: 'standart',
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
  { key: 'colorExt', items: farbenOptions.colorExt },
  { key: 'colorInt', items: farbenOptions.colorInt },
  { key: 'colorMid', items: farbenOptions.colorMid },
  { key: 'sealExt', items: farbenOptions.sealExt },
  { key: 'sealInt', items: farbenOptions.sealInt },
  { key: 'fenstergriffe', items: farbenOptions.fenstergriffe },
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
  colorExt: farbenOptions.colorExt[0],
  colorInt: farbenOptions.colorInt[0],
  colorMid: farbenOptions.colorMid[0],
  sealExt: farbenOptions.sealExt[0],
  sealInt: farbenOptions.sealInt[0],
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
