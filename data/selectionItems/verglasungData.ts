import { SelectionItem } from '@/types/Configurator';

import no from '@/assets/common/no.jpeg';
import yes from '@/assets/common/yes.png';
import placeholder from '@/assets/common/placeholder.png';
import width from '@/assets/common/width.avif';
import color2 from '@/assets/common/color2.png';

// Verglasung Glasspaket
import _2fv from '@/assets/configurator/verglasung/glasspaket/2-f-v.webp';
import _2fvwk from '@/assets/configurator/verglasung/glasspaket/2-f-v-w-k.webp';
import _3fv from '@/assets/configurator/verglasung/glasspaket/3-f-v.webp';
import _3fvwk from '@/assets/configurator/verglasung/glasspaket/3-f-v-w-k.webp';

// Verglasung Ornament
import ab4 from '@/assets/configurator/verglasung/ornament/ab4.webp';
import ab6 from '@/assets/configurator/verglasung/ornament/ab6.webp';
import ag4 from '@/assets/configurator/verglasung/ornament/ag4.webp';
import m from '@/assets/configurator/verglasung/ornament/m.webp';
import oc from '@/assets/configurator/verglasung/ornament/oc.webp';
import ochin from '@/assets/configurator/verglasung/ornament/ochin.webp';
import od from '@/assets/configurator/verglasung/ornament/od.webp';
import omc from '@/assets/configurator/verglasung/ornament/omc.webp';
import os from '@/assets/configurator/verglasung/ornament/os.webp';
import osil from '@/assets/configurator/verglasung/ornament/osil.webp';
import rb6 from '@/assets/configurator/verglasung/ornament/osil.webp'; // Note: same path as osil

// Verglasung Schallschutz
import _36 from '@/assets/configurator/verglasung/schallschutz/36.webp';
import _38 from '@/assets/configurator/verglasung/schallschutz/36.webp'; // Note: same path as _36

// Sprossen pattern types
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

// Warme Kante
import wk1 from '@/assets/configurator/verglasung/schallschutz/warmenkante/001.Weiß RAL9016.webp';
import wk2 from '@/assets/configurator/verglasung/schallschutz/warmenkante/002.Lichtgrau RAL7035.webp';
import wk3 from '@/assets/configurator/verglasung/schallschutz/warmenkante/003.Grau RAL9023.webp';
import wk4 from '@/assets/configurator/verglasung/schallschutz/warmenkante/004.Schwarz RAL 9005.webp';
import wk5 from '@/assets/configurator/verglasung/schallschutz/warmenkante/005.Hellbraun RAL8003.webp';
import wk6 from '@/assets/configurator/verglasung/schallschutz/warmenkante/006.Braun RAL8014.webp';


export const verglasung = {
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

export const warmenKante = [
  {
    key: 'wk1',
    name: 'Weiß RAL9016',
    image: wk1,
  },
  {
    key: 'wk2',
    name: 'Lichtgrau RAL7035',
    image: wk2,
  },
  {
    key: 'wk3',
    name: 'Grau RAL9023',
    image: wk3,
  },
  {
    key: 'wk4',
    name: 'Schwarz RAL9005',
    image: wk4,
  },
  {
    key: 'wk5',
    name: 'Hellbraun RAL8003',
    image: wk5,
  },
  {
    key: 'wk6',
    name: 'Braun RAL8014',
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
