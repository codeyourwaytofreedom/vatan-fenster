import {
  faAngleDown,
  faArrowsAltH,
  faArrowsLeftRight,
  faBars,
  faBorderAll,
  faBrush,
  faColonSign,
  faCopyright,
  faCropSimple,
  faDrawPolygon,
  faEarDeaf,
  faExpandAlt,
  faFlask,
  faGear,
  faHandHolding,
  faLayerGroup,
  faMaximize,
  faPaintBrush,
  faPaintRoller,
  faPalette,
  faRuler,
  faScrewdriver,
  faShapes,
  faShieldAlt,
  faShieldHalved,
  faSignsPost,
  faSmile,
  faSun,
  faToolbox,
  faTools,
  faVolumeMute,
  faWindowMaximize,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import { GroupKey, Step } from '@/types/Configurator';
import StepGlassPaket from '@/components/StepGlassPaket/StepGlassPaket';
import StepSprossen from '@/components/StepSprossen/StepSprossen';
import Fenstergriffe from '@/components/StepFenstergriffe/Fenstergriffe';

export const steps: Record<GroupKey | string, Step[]> = {
  basis: [
    {
      key: 'material',
      name: 'Material',
      icon: faFlask,
    },
    {
      key: 'brand',
      name: 'Hersteller',
      icon: faCopyright,
    },
    {
      key: 'profile',
      name: 'Profil',
      icon: faCropSimple,
    },
    {
      key: 'style',
      name: 'Fensterart',
      icon: faCropSimple,
    },
    {
      key: 'type',
      name: 'Type',
      icon: faSignsPost,
    },
    {
      key: 'cover',
      name: 'Sonnenschutz',
      icon: faWindowMaximize,
    },
    {
      key: 'size',
      name: 'Maß',
      icon: faMaximize,
    },
  ],
  farben: [
    {
      key: 'colorExt',
      name: 'Color Ext',
      icon: faPaintBrush,
    },
    {
      key: 'colorInt',
      name: 'Color-int',
      icon: faPaintRoller,
    },
    {
      key: 'dichtungAussen',
      name: 'Dichtung Aussen',
      icon: faPalette,
    },
    {
      key: 'dichtungInnen',
      name: 'Dichtung Innen',
      icon: faTools,
    },
    {
      key: 'sealInt',
      name: 'Seal Int',
      icon: faToolbox,
    },
    {
      key: 'fenstergriffe',
      name: 'Fenstergriffe',
      icon: faHandHolding,
      component: Fenstergriffe,
    },
  ],
  verglasung: [
    {
      key: 'glasspaket',
      name: 'Glaspaket',
      icon: faLayerGroup,
      component: StepGlassPaket,
    },
    {
      key: 'ornament',
      name: 'Ornament',
      icon: faSun,
    },
    {
      key: 'sicherheitsverglasung',
      name: 'Sicherheitsverglasung',
      icon: faShieldAlt,
    },
    {
      key: 'schallschutz',
      name: 'Schallschutz',
      icon: faVolumeMute,
    },
    {
      key: 'sprossen',
      name: 'Sprossen',
      icon: faBorderAll,
      component: StepSprossen,
    },
    {
      key: 'druckausgleichsventil',
      name: 'Druckausgleichsventil',
      icon: faArrowsAltH,
    },
  ],
  zusätze: [],
  sonnenschutz: [],
};


const _215_175 = [
  {
    key: 'adapter',
    name: 'Adapter',
    icon: faTools,
  },
  {
    key: 'revisionsöffnung',
    name: 'Revisionsöffnung',
    icon: faWrench,
  },
  {
    key: 'lamellenart',
    name: 'Lamellenart',
    icon: faBars,
  },
  {
    key: 'farbeRollladenkasten',
    name: 'Farbe Rollladenkasten',
    icon: faColonSign,
  },
  {
    key: 'farbeRollladenPanzer',
    name: 'Farbe Rollladenpanzer',
    icon: faColonSign,
  },
  {
    key: 'farbeEndschiene',
    name: 'Farbe Endschiene',
    icon: faColonSign,
  },
  {
    key: 'putzträger',
    name: 'Putzträger',
    icon: faBrush,
  },
  {
    key: 'schrägschnitt',
    name: 'Schrägschnitt',
    icon: faAngleDown,
  },
  {
    key: 'antriebsart',
    name: 'Antriebsart',
    icon: faGear,
  },
  {
    key: 'antriebsseite',
    name: 'Antriebsseite',
    icon: faArrowsLeftRight,
  },
  {
    key: 'schallschutzmatte',
    name: 'Schallschutzmatte',
    icon: faEarDeaf,
  },
  {
    key: 'verlängerung',
    name: 'Verlängerung',
    icon: faExpandAlt,
  },
  {
    key: 'rollladen',
    name: 'Rollladen',
    icon: faWindowMaximize,
  },
  {
    key: 'montageartRollladen',
    name: 'Montageart Rollladen',
    icon: faScrewdriver,
  },
  {
    key: 'stahlkonsole',
    name: 'Montageart Stahlkonsole',
    icon: faShieldHalved,
  }
];


export const sonnenschutzStepPacks: Record<
  | 'auf215'
  | 'auf175'
  | 'styroporkasten'
  | 'vorsatzrollladen'
  | 'aufStyroporkasten'
  | 'vorsatzraffstore',
  Step[]
> = {
  auf215: _215_175,
  auf175: _215_175,
  styroporkasten: [
    {
      key: 'kastentiefe',
      name: 'Kastentiefe',
      icon: faRuler,
    },
    {
      key: 'revisionsöffnung',
      name: 'Revisionsöffnung',
      icon: faWrench,
    },
    {
      key: 'lamellenart',
      name: 'Lamellenart',
      icon: faBars,
    },
    {
      key: 'farbeFührungsschiene',
      name: 'Farbe Führungsschiene',
      icon: faColonSign,
    },
    {
      key: 'farbeRollladenPanzer',
      name: 'Farbe Rollladenpanzer',
      icon: faColonSign,
    },
    {
      key: 'farbeEndschiene',
      name: 'Farbe Endschiene',
      icon: faColonSign,
    },
    {
      key: 'putzträger',
      name: 'Putzträger',
      icon: faBrush,
    },
    {
      key: 'schrägschnitt',
      name: 'Schrägschnitt',
      icon: faAngleDown,
    },
    {
      key: 'antriebsart',
      name: 'Antriebsart',
      icon: faGear,
    },
    {
      key: 'antriebsseite',
      name: 'Antriebsseite',
      icon: faArrowsLeftRight,
    },
    {
      key: 'verlängerung',
      name: 'Verlängerung',
      icon: faExpandAlt,
    }
  ],
  vorsatzrollladen: [
    {
      key: 'ki',
      name: 'Kastenform und Insektenschutz',
      icon: faShapes,
    },
    {
      key: 'mk',
      name: 'Maße und Kastenart',
      icon: faDrawPolygon,
    },
  ],
  aufStyroporkasten: [
    {
      key: 'aufStyroporkasten',
      name: 'AufStyroporkasten',
      icon: faSmile,
    },
  ],
  vorsatzraffstore: [
    {
      key: 'vorsatzraffstore',
      name: 'Vorsatzraffstore',
      icon: faSmile,
    },
  ],
};
