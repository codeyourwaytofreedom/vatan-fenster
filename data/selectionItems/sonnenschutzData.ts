import { SelectionItem } from '@/types/Configurator';

import soon from '@/assets/common/soon.jpg';
import no from '@/assets/common/no.jpeg';
import yes from '@/assets/common/yes.png';
import { farbenAussenInnenOptions } from './farbenData';

// sonnenschutz items for all sonnenschutz categories
export const sonnenschutzItems: Record<
  | 'adapter'
  | 'revisionsöffnung'
  | 'lamellenart'
  | 'lamellenartVorsatzrollladen'
  | 'farbeRollladenkasten'
  | 'farbeRollladenPanzer'
  | 'farbeEndschiene'
  | 'putzträger'
  | 'putzträgerStyroporkasten'
  | 'schrägschnitt'
  | 'antriebsart'
  | 'antriebsseite'
  | 'schallschutzmatte'
  | 'verlängerung'
  | 'rollladen'
  | 'montageartRollladen'
  | 'stahlkonsole'
  | 'kastentiefeStyroporkasten'
  | 'kastenform'
  | 'kastentiefeAufStyroporkasten'
  | 'lamellenartAufStyroporkasten'
  | 'farbeRaffstorelamelleAufStyroporkasten'
  | 'farbeEndschieneAufStyroporkasten'
  | 'antriebsartAufStyroporkasten'
  | 'kastendämmungAufStyroporkasten'
  | 'putzschieneAufStyroporkasten'
  | 'führungsschieneAufStyroporkasten'
  | 'montageartVorsatzrollladen',
  SelectionItem[]
> = {
  adapter: [
    {
      key: 'adapt1',
      name: 'Adapter für Profil: Iglo 5,Iglo 5 Classic, Iglo Light',
      image: soon,
    },
    {
      key: 'adapt2',
      name: 'Adapter für Profil: Iglo Energy,Iglo Energy Classic, Iglo EDGE',
      image: soon,
    },
    {
      key: 'adapt3',
      name: 'Adapter universal für sonstige Syteme: Aluminium und diverse weitere Hersteller',
      image: soon,
    },
  ],
  revisionsöffnung: [
    {
      key: 'rvu',
      name: 'Revision von unten',
      image: soon,
    },
    {
      key: 'rvdsi',
      name: 'Revision von der Seite (innen)',
      image: soon,
    },
    {
      key: 'rvu_i',
      name: 'Revision von unten + Insektenschutz',
      image: soon,
    },
    {
      key: 'rvdsi_i',
      name: 'Revision von der Seite (innen) + Insektenschutz',
      image: soon,
    },
    {
      key: 'p_ms',
      name: 'Pflicht (mecburi secenek)',
      image: soon,
    },
  ],
  lamellenart: [
    {
      key: 'l37',
      name: 'Lamelle: 37mm ALU',
      image: soon,
    },
    {
      key: 'ot',
      name: 'Ohne Teilung',
      image: soon,
    },
    {
      key: '2t',
      name: '2 Teilung',
      image: soon,
    },
    {
      key: '2tlkrl',
      name: '2 Teilung links kurz rechts lang',
      image: soon,
    },
    {
      key: '2tllrk',
      name: '2 Teilung links lang rechts kurz',
      image: soon,
    },
    {
      key: '3t',
      name: '3 Teilung',
      image: soon,
    },
  ],
  lamellenartVorsatzrollladen: [
    { key: 'alu_37mm', name: '37mm Alu', image: soon },
    { key: 'alu_42mm', name: '42mm Alu', image: soon },
    { key: 'alu_55mm', name: '55mm Alu', image: soon },
  ],
  farbeRollladenkasten: [
    {
      key: 'default',
      name: 'Nein = Weiß',
      image: soon,
    },
  ],
  farbeRollladenPanzer: [
    { key: 'silber', name: 'Silber', image: soon },
    { key: 'weiss', name: 'Weiß', image: soon },
    { key: 'grau', name: 'Grau', image: soon },
    { key: 'braun', name: 'Braun', image: soon },
    { key: 'dunkelbraun', name: 'Dunkelbraun', image: soon },
    { key: 'golden_oak', name: 'Golden Oak', image: soon },
    { key: 'nussbaum', name: 'Nussbaum', image: soon },
    { key: 'anthrazit', name: 'Anthrazit', image: soon },
    { key: 'moosgruen', name: 'Moosgrün', image: soon },
    { key: 'braun_metallic', name: 'Braun Metallic', image: soon },
    { key: 'grau_aluminium', name: 'Grau Aluminium', image: soon },
    { key: 'reine', name: 'Reine', image: soon },
  ],
  farbeEndschiene: [
    { key: 'silber', name: 'Silber', image: soon },
    { key: 'weiss', name: 'Weiß', image: soon },
    { key: 'grau', name: 'Grau', image: soon },
    { key: 'braun', name: 'Braun', image: soon },
    { key: 'dunkelbraun', name: 'Dunkelbraun', image: soon },
    { key: 'golden_oak', name: 'Golden Oak', image: soon },
    { key: 'nussbaum', name: 'Nussbaum', image: soon },
    { key: 'anthrazit', name: 'Anthrazit', image: soon },
    { key: 'moosgruen', name: 'Moosgrün', image: soon },
    { key: 'braun_metallic', name: 'Braun Metallic', image: soon },
    { key: 'grau_aluminium', name: 'Grau Aluminium', image: soon },
    { key: 'reine', name: 'Reine', image: soon },
  ],
  putzträger: [
    { key: 'nein', name: 'Nein', image: soon },
    { key: 'innen', name: 'Innen', image: soon },
    { key: 'aussen', name: 'Außen', image: soon },
    { key: 'beidseitig', name: 'Beidseitig', image: soon },
  ],
  putzträgerStyroporkasten: [
    {
      key: 'kunststoff',
      name: 'Putzleiste innen + außen Kunststoff',
      image: soon,
    },
    {
      key: 'kunststoff_alu',
      name: 'Putzleiste innen Kunststoff + außen ALU',
      image: soon,
    },
  ],
  schrägschnitt: [
    { key: 'nein', name: 'Nein', image: soon },
    { key: '5grad', name: '5°', image: soon },
    { key: '7grad', name: '7°', image: soon },
  ],
  antriebsart: [
    { key: 'gurt', name: 'Gurt' },
    { key: 'motor', name: 'Motor' },
    { key: 'kurbel', name: 'Kurbel' },
    { key: 'pflicht', name: 'Pflicht' },
  ],
  antriebsseite: [
    { key: 'links', name: 'Links', image: soon },
    { key: 'rechts', name: 'Rechts', image: soon },
  ],
  schallschutzmatte: [
    { key: 'nein', name: 'Nein', image: no },
    { key: 'ja', name: 'Ja', image: yes },
  ],
  verlängerung: [],
  rollladen: [
    { key: 'nein', name: 'Nein', image: no },
    { key: 'ja', name: 'Ja', image: yes },
  ],
  montageartRollladen: [
    { key: 'mrf', name: 'Montage des Rollladenkastens auf dem Fenster', image: soon },
    { key: 'mrv', name: 'Montage des Rollladenkastens bündig mit der Verbreiterung', image: soon },
  ],
  stahlkonsole: [
    { key: 'nein', name: 'Nein', image: no },
    { key: 'ja', name: 'Ja', image: yes },
  ],
  kastentiefeStyroporkasten: [
    { key: '300', name: '300mm', image: soon },
    { key: '365', name: '365mm', image: soon },
  ],
  kastenform: [
    {
      key: '45',
      name: 'Kasten: 45 Grad',
      image: soon,
    },
    {
      key: 'round',
      name: 'Kasten: Rund',
      image: soon,
    },
    {
      key: '90',
      name: 'Kasten: Unterputz 90 Grad',
      image: soon,
    },
    {
      key: '45-insect',
      name: 'Kasten: 45 Grad mit Insektenschutz',
      image: soon,
    },
    {
      key: 'round-insect',
      name: 'Kasten: Rund mit Insektenschutz',
      image: soon,
    },
    {
      key: '90-insect',
      name: 'Kasten: Unterputz 90 Grad mit Insektenschutz',
      image: soon,
    },
  ],
  kastentiefeAufStyroporkasten: [
    { key: 'c260x275', name: '260x275mm', image: soon },
    { key: 'c300', name: '300mm', image: soon },
    { key: 'c365', name: '365mm', image: soon },
    { key: 'c425', name: '425mm', image: soon },
  ],
  lamellenartAufStyroporkasten: [
    { key: 'c380', name: 'C380', image: soon },
    { key: 's90', name: 'S90', image: soon },
    { key: 'z90', name: 'Z90', image: soon },
  ],
  farbeRaffstorelamelleAufStyroporkasten: [
    { key: 'ral7016', name: 'RAL 7016 Matt', image: soon },
    { key: 'ral9005', name: 'RAL 9005 Matt', image: soon },
    { key: 'ral9006', name: 'RAL 9006 Matt', image: soon },
    { key: 'ral9007', name: 'RAL 9007 Matt', image: soon },
    { key: 'ral9016', name: 'RAL 9016 Matt', image: soon },
    { key: 'db703', name: 'DB 703', image: soon },
    { key: 'nachral', name: 'Nach RAL', image: soon },
  ],
  farbeEndschieneAufStyroporkasten: [
    { key: 'ral7016', name: 'RAL 7016 Matt', image: soon },
    { key: 'ral9005', name: 'RAL 9005 Matt', image: soon },
    { key: 'ral9006', name: 'RAL 9006 Matt', image: soon },
    { key: 'ral9007', name: 'RAL 9007 Matt', image: soon },
    { key: 'ral9016', name: 'RAL 9016 Matt', image: soon },
    { key: 'db703', name: 'DB 703', image: soon },
    { key: 'nachral', name: 'Nach RAL', image: soon },
  ],
  antriebsartAufStyroporkasten: [
    {
      key: 'j406_wt_protect',
      name: 'Motor Somfy J406 6/24 WT Protect',
    },
    {
      key: 'j406_io_protect',
      name: 'Motor Somfy J406 6/24 IO Protect',
    },
    {
      key: 'j406_io_smoove',
      name: 'Motor Somfy J406 6/24 iO PROTECT + SOMFY Smoove 1 iO Pure',
    },
    {
      key: 'j406_io_smoove_situo1',
      name: 'Motor Somfy J406 6/24 iO PROTECT + Smoove 1 iO Pure + Situo 1 Variation iO Pure',
    },
    {
      key: 'j406_io_smoove_situo5',
      name: 'Motor Somfy J406 6/24 iO PROTECT + Smoove 1 iO Pure + Situo 5 Variationen AM iO Pure',
    },
  ],
  kastendämmungAufStyroporkasten: [
    { key: 'uk_0423', name: 'Standard : UK 0,423', image: soon },
    { key: 'uk_0256', name: 'UK 0,256', image: soon },
    { key: 'uk_0320', name: 'Standard : UK 0,320', image: soon },
    { key: 'uk_0218', name: 'UK 0,218', image: soon },
  ],
  putzschieneAufStyroporkasten: [{ key: 'ausseenAlu', name: 'Außen Alu', image: soon }],
  führungsschieneAufStyroporkasten: [{ key: 'zf88', name: 'Führungsschiene ZF 88mm', image: soon }],
  montageartVorsatzrollladen: [
    {
      key: 'linksroller_mauerwerk',
      name: 'Auf das Mauerwerk - Linksroller',
      image: soon,
    },
    {
      key: 'rechtsroller_leibung',
      name: 'In die Laibung - Rechtsroller',
      image: soon,
    },
  ],
};

// category and subcategory items for steps with DoubleStepper component

export const _215_175_LamelleatProps = {
  categoryItems: [
    {
      key: 'l37',
      name: 'Lamelle: 37mm ALU',
      image: soon,
    },
  ],
  subCategoryItems: {
    l37: [
      {
        key: 'ot',
        name: 'Ohne Teilung',
        image: soon,
      },
      {
        key: '2t',
        name: '2 Teilung',
        image: soon,
      },
      {
        key: '2tlkrl',
        name: '2 Teilung links kurz rechts lang',
        image: soon,
      },
      {
        key: '2tllrk',
        name: '2 Teilung links lang rechts kurz',
        image: soon,
      },
      {
        key: '3t',
        name: '3 Teilung',
        image: soon,
      },
    ],
  },
};

const optionsForPutzträgerSubcategories = [
  {
    key: 'ppa',
    name: 'Putzträger+Putzl eiste Alu',
    image: soon,
  },
  {
    key: 'p',
    name: 'Putzträger',
    image: soon,
  },
  {
    key: 'pAlu',
    name: 'Putzleiste Alu',
    image: soon,
  },
];

export const _215_175_putzträgerProps = {
  categoryItems: [
    {
      key: 'nein',
      name: 'Nein',
      image: no,
    },
    {
      key: 'innen',
      name: 'Innen',
      image: soon,
    },
    {
      key: 'aussen',
      name: 'Außen',
      image: soon,
    },
    {
      key: 'beideseitig',
      name: 'Beideseitig',
      image: soon,
    },
  ],
  subCategoryItems: {
    nein: [],
    innen: optionsForPutzträgerSubcategories,
    aussen: optionsForPutzträgerSubcategories,
    beideseitig: optionsForPutzträgerSubcategories,
  },
};

export const _215_175_antriebsartProps = {
  categoryItems: [
    {
      key: 'gurt',
      name: 'Gurt',
    },
    {
      key: 'motor',
      name: 'Motor',
    },
    {
      key: 'kurbel',
      name: 'Kurbel',
    },
  ],
  subCategoryItems: {
    gurt: [
      {
        key: 'gWeiß',
        name: 'Gurtwickler Weiß',
        image: soon,
      },
      {
        key: 'gBraun',
        name: 'Gurtwickler Braun',
        image: soon,
      },
      {
        key: 'eWeiß',
        name: 'Einlassgurtwickler 14mm Weiß',
        image: soon,
      },
    ],
    motor: [
      {
        key: 'mhsg',
        name: 'Motor mit Hinderniserkenn ung (Somfy Gruppe)',
        image: soon,
      },
      {
        key: 'mshsg',
        name: 'Motor mit Schalter und Hinderniserkenn ung (Somfy Gruppe)',
        image: soon,
      },
      {
        key: 'mmshssg',
        name: 'Motor mit Schlüsselschalter und Hinderniserkenn ung (Somfy Gruppe)',
        image: soon,
      },
      {
        key: 'fmsh',
        name: 'Funk Motor Somfy RS 100 iO mit Hinderniserkenn ung',
        image: soon,
      },
      {
        key: 'fmshs1',
        name: 'Funk Motor Somfy RS 100 iO mit Hinderniserkennu ng + Situo 1 pure',
        image: soon,
      },
      {
        key: 'fmshs1s',
        name: 'Funk Motor Somfy RS 100 iO mit Hinderniserkenn ung + Situo 1 pure + Smoove',
        image: soon,
      },
    ],
    kurbel: [
      {
        key: 'gks',
        name: 'Getriebe mit Kurbel (starr)',
        image: soon,
      },
      {
        key: 'gak',
        name: 'Getriebe mit abnehmbarer Kurbel',
        image: soon,
      },
    ],
  },
};

export const _215_175_farbeRollladenkasten = {
  categoryItems: [
    {
      key: 'ffa',
      name: 'Farbe der Führungsschiene anpassen',
      image: soon,
    },
    {
      key: 'ffkaa',
      name: 'Farbe der Führungsschienen und Kastenfarbe (außen) anpassen',
      image: soon,
    },
    {
      key: 'ffkba',
      name: 'Farbe der Führungsschienen und Kastenfarbe (beidseitig) anpassen',
      image: soon,
    },
  ],
  subCategoryItems: {
    ffa: farbenAussenInnenOptions,
    ffkaa: farbenAussenInnenOptions,
    ffkba: farbenAussenInnenOptions,
  },
};

export const styroporkasten_LamelleatProps = {
  categoryItems: [
    {
      key: 'l37',
      name: 'Lamelle: 37mm ALU',
      image: soon,
    },
  ],
  subCategoryItems: {
    l37: [
      {
        key: 'ot',
        name: 'Ohne Teilung',
        image: soon,
      },
      {
        key: '2t',
        name: '2 Teilung',
        image: soon,
      },
      {
        key: '2tlkrl',
        name: '2 Teilung links kurz rechts lang',
        image: soon,
      },
      {
        key: '2tllrk',
        name: '2 Teilung links lang rechts kurz',
        image: soon,
      },
      {
        key: '3t',
        name: '3 Teilung',
        image: soon,
      },
    ],
  },
};

export const styroporkasten_antriebsartProps = {
  categoryItems: [
    {
      key: 'motor',
      name: 'Motor',
    },
  ],
  subCategoryItems: {
    motor: [
      {
        key: 'mhsg',
        name: 'Motor mit Hinderniserkenn ung (Somfy Gruppe)',
        image: soon,
      },
      {
        key: 'mshsg',
        name: 'Motor mit Schalter und Hinderniserkenn ung (Somfy Gruppe)',
        image: soon,
      },
      {
        key: 'mmshssg',
        name: 'Motor mit Schlüsselschalter und Hinderniserkenn ung (Somfy Gruppe)',
        image: soon,
      },
      {
        key: 'fmsh',
        name: 'Funk Motor Somfy RS 100 iO mit Hinderniserkenn ung',
        image: soon,
      },
      {
        key: 'fmshs1',
        name: 'Funk Motor Somfy RS 100 iO mit Hinderniserkennu ng + Situo 1 pure',
        image: soon,
      },
      {
        key: 'fmshs1s',
        name: 'Funk Motor Somfy RS 100 iO mit Hinderniserkenn ung + Situo 1 pure + Smoove',
        image: soon,
      },
    ],
  },
};

export const vorsatzrollladen_putzträgerProps = {
  categoryItems: [
    {
      key: 'nein',
      name: 'Nein',
      image: no,
    },
    {
      key: 'aussen',
      name: 'Außen',
      image: soon,
    },
  ],
  subCategoryItems: {
    nein: [],
    aussen: [
      {
        key: 'p',
        name: 'Putzträger',
        image: soon,
      },
    ],
  },
};

export const vorsatzrollladen_antriebsartProps = {
  categoryItems: [
    {
      key: 'gurt',
      name: 'Gurt',
    },
    {
      key: 'motor',
      name: 'Motor',
    },
    {
      key: 'kurbel',
      name: 'Kurbel',
    },
  ],
  subCategoryItems: {
    gurt: [
      {
        key: 'gwn',
        name: 'Gurtwickler Weiß mit Nylonschnur',
        image: soon,
      },
      {
        key: 'gbn',
        name: 'Gurtwickler Braun mit Nylonschnur',
        image: soon,
      },
      {
        key: 'gw',
        name: 'Gurtwickler Weiß',
        image: soon,
      },
      {
        key: 'gb',
        name: 'Gurtwickler Braun',
        image: soon,
      },
      {
        key: 'e14w',
        name: 'Einlassgurtwickler 14mm Weiß',
        image: soon,
      },
    ],
    motor: [
      {
        key: 'mhsg',
        name: 'Motor mit Hinderniserkenn ung (Somfy Gruppe)',
        image: soon,
      },
      {
        key: 'mshsg',
        name: 'Motor mit Schalter und Hinderniserkenn ung (Somfy Gruppe)',
        image: soon,
      },
      {
        key: 'mmshssg',
        name: 'Motor mit Schlüsselschalter und Hinderniserkenn ung (Somfy Gruppe)',
        image: soon,
      },
      {
        key: 'fmsh',
        name: 'Funk Motor Somfy RS 100 iO mit Hinderniserkenn ung',
        image: soon,
      },
      {
        key: 'fmshs1',
        name: 'Funk Motor Somfy RS 100 iO mit Hinderniserkennu ng + Situo 1 pure',
        image: soon,
      },
      {
        key: 'fmshs1s',
        name: 'Funk Motor Somfy RS 100 iO mit Hinderniserkenn ung + Situo 1 pure + Smoove',
        image: soon,
      },
    ],
    kurbel: [
      {
        key: 'gks',
        name: 'Getriebe mit Kurbel (starr)',
        image: soon,
      },
      {
        key: 'gak',
        name: 'Getriebe mit abnehmbarer Kurbel',
        image: soon,
      },
    ],
  },
};

export const aufStyroporkasten_farbeFührungsschieneProps = {
  categoryItems: [
    {
      key: 'nein',
      name: 'Nein',
      image: no,
    },
    {
      key: 'yes',
      name: 'Farbe der Führungsschiene anpassen',
      image: yes,
    },
  ],
  subCategoryItems: {
    nein: [],
    yes: [
      { key: 'ral7016', name: 'RAL 7016 Matt', image: soon },
      { key: 'ral9005', name: 'RAL 9005 Matt', image: soon },
      { key: 'ral9006', name: 'RAL 9006 Matt', image: soon },
      { key: 'ral9007', name: 'RAL 9007 Matt', image: soon },
      { key: 'ral9016', name: 'RAL 9016 Matt', image: soon },
      { key: 'db703', name: 'DB 703', image: soon },
      { key: 'nachral', name: 'Nach RAL', image: soon },
    ],
  },
};
