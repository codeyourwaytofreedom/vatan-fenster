import { SelectionItem, SubStyleOptions } from '@/types/Configurator';

// Brands
import drutex from '@/assets/configurator/brands/drutex.svg';

// Common images
import no from '@/assets/common/no.jpeg';

// Styles
import flugel1 from '@/assets/configurator/style/flugel1/1-Flügel.png';
import flugel2 from '@/assets/configurator/style/flugel2/2-Flügel.png';
import flugel3 from '@/assets/configurator/style/flugel3/3-Flügel.png';
import oberlicht from '@/assets/configurator/style/oberlicht/oberlicht.png';
import unterlicht from '@/assets/configurator/style/unterlicht/unterlicht.png';

// Profiles - Plastic (Drutex)
import Iglo5 from '@/assets/configurator/profiles/drutex/plastic/Iglo5.webp';
import Iglo5Classic from '@/assets/configurator/profiles/drutex/plastic/Iglo5Classic.webp';
import Iglo5Energy from '@/assets/configurator/profiles/drutex/plastic/Iglo5Energy.webp';
import Iglo5EnergyClassic from '@/assets/configurator/profiles/drutex/plastic/Iglo5EnergyClassic.webp';
import IgloLight from '@/assets/configurator/profiles/drutex/plastic/IgloLight.webp';

// Profiles - Aluminium (Drutex)
import MB45 from '@/assets/configurator/profiles/drutex/aluminium/MB45.webp';
import MB70 from '@/assets/configurator/profiles/drutex/aluminium/MB70.webp';
import MB70HI from '@/assets/configurator/profiles/drutex/aluminium/MB70HI.webp';
import MB86NSI from '@/assets/configurator/profiles/drutex/aluminium/MB86NSI.webp';

// Materials
import plastic from '@/assets/configurator/materials/KunststoffFenster.png';
import aluminum from '@/assets/configurator/materials/AluminiumFenster.png';
import holz from '@/assets/configurator/materials/HolzFenster.png';
import holzAlu from '@/assets/configurator/materials/HolzAluFenster.png';

// Substyles
import { flugel1_unten } from '.././flugel/flugel1';
import { flugel2_unten } from '.././flugel/flugel2';
import { flugel3_unten } from '.././flugel/flugel3';

import { oberlicht_substyle } from '.././flugel/oberlicht_substyle';
import { unterlicht_substyle } from '.././flugel/unterlicht_substyle';

// Sonnenschutz
import Aufsatzrolladen_215_225 from '@/assets/configurator/sonnenschutz/001.Aufsatzrolladen_215_225.png';
import Aufsatzrolladen_175 from '@/assets/configurator/sonnenschutz/002.Aufsatzrolladen_175.png';
import Aufsatzrolladen_Styroporkasten from '@/assets/configurator/sonnenschutz/003.Aufsatzrolladen_(Styroporkasten).png';
import Vorsatzrollladen from '@/assets/configurator/sonnenschutz/004.Vorsatzrollladen.png';
import Aufsatzraffstore_Styroporkasten from '@/assets/configurator/sonnenschutz/005.Aufsatzraffstore_(Styroporkasten).png';
import Vorsatzraffstore from '@/assets/configurator/sonnenschutz/006.Vorsatzraffstore.png';

const dummyDetail = 'This is the detailed info about this card...';

export const materials: SelectionItem[] = [
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

export const brands: SelectionItem[] = [
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
            details: dummyDetail,
          },
          {
            key: 'Iglo_5_Classic',
            name: 'Iglo 5 Classic',
            image: Iglo5Classic,
            details: dummyDetail,
          },
          {
            key: 'Iglo_Energy',
            name: 'Iglo Energy',
            image: Iglo5Energy,
            details: dummyDetail,
          },
          {
            key: 'Iglo_Energy_Classic',
            name: 'Iglo Energy Classic',
            image: Iglo5EnergyClassic,
            details: dummyDetail,
          },
          {
            key: 'Iglo_Light',
            name: 'Iglo Light',
            image: IgloLight,
            details: dummyDetail,
          },
        ],
        Aluminium: [
          {
            key: 'MB45',
            name: 'MB45',
            image: MB45,
            details: dummyDetail,
          },
          {
            key: 'MB70',
            name: 'MB70',
            image: MB70,
            details: dummyDetail,
          },
          {
            key: 'MB70HI',
            name: 'MB70HI',
            image: MB70HI,
            details: dummyDetail,
          },
          {
            key: 'MB86NSI',
            name: 'MB86NSI',
            image: MB86NSI,
            details: dummyDetail,
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

export const windowStyles: SelectionItem[] = [
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

export const covers: (SelectionItem & { height?: number })[] = [
  {
    key: 'nein',
    name: 'Nein',
    image: no,
    details: dummyDetail,
  },
  {
    key: 'auf215',
    name: 'Aufsatzrollladen\n215mm (PVC Kasten)',
    image: Aufsatzrolladen_215_225,
    details: dummyDetail,
    height: 215,
  },
  {
    key: 'auf175',
    name: 'Aufsatzrollladen\n175mm (PVC Kasten)',
    image: Aufsatzrolladen_175,
    details: dummyDetail,
    height: 175,
  },
  {
    key: 'styroporkasten',
    name: 'Aufsatzrollladen\n(Styroporkasten)',
    image: Aufsatzrolladen_Styroporkasten,
    details: dummyDetail,
    height: 150,
  },
  {
    key: 'vorsatzrollladen',
    name: 'Vorsatzrollladen',
    image: Vorsatzrollladen,
    details: dummyDetail,
  },
  {
    key: 'aufStyroporkasten',
    name: 'Aufsatzraffstore\n(Styroporkasten)',
    image: Aufsatzraffstore_Styroporkasten,
    details: dummyDetail,
    height: 150,
  },
  {
    key: 'vorsatzraffstore',
    name: 'Vorsatzraffstore',
    image: Vorsatzraffstore,
    details: dummyDetail,
  },
];

export const subStyleOptions: SubStyleOptions = {
  oberlicht: oberlicht_substyle,
  unterlicht: unterlicht_substyle,
};
