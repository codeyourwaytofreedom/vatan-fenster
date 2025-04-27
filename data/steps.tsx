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
  faCubes,
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
  faSnowflake,
  faSun,
  faToolbox,
  faTools,
  faVolumeMute,
  faWindowMaximize,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import { GroupKey, Step } from '@/types/Configurator';
import StepSprossen from '@/components/StepSprossen/StepSprossen';
import Fenstergriffe from '@/components/StepFenstergriffe/Fenstergriffe';
import PlaceHolder from '@/components/PlaceHolder/PlaceHolder';
import DoubleStepper from '@/components/DoubleStepper/DoubleStepper';
import {
  _215_175_antriebsartProps,
  _215_175_LamelleatProps,
  _215_175_putzträgerProps,
  aufStyroporkasten_farbeFührungsschieneProps,
  styroporkasten_antriebsartProps,
  styroporkasten_LamelleatProps,
  vorsatzrollladen_putzträgerProps,
} from './configuration_options';
import StepVerlängerung from '@/components/StepVerlängerung/StepVerlängerung';

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
      //component: StepGlassPaket,
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

const _215_175: Step[] = [
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
    component: DoubleStepper,
    props: { ..._215_175_LamelleatProps, configurationKey: 'lamellenart' },
  },
  {
    key: 'farbeRollladenkasten',
    name: 'Farbe Rollladenkasten',
    icon: faColonSign,
    component: PlaceHolder,
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
    name: 'Putzträger & Putzschiene',
    icon: faBrush,
    component: DoubleStepper,
    props: {
      ..._215_175_putzträgerProps,
      configurationKey: 'putzträger',
    },
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
    component: DoubleStepper,
    props: {
      configurationKey: 'antriebsart',
      ..._215_175_antriebsartProps,
    },
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
    component: StepVerlängerung,
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
  },
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
      key: 'kastentiefeStyroporkasten',
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
      component: DoubleStepper,
      props: {
        ...styroporkasten_LamelleatProps,
        configurationKey: 'lamellenart',
      },
    },
    {
      key: 'farbeFührungsschiene',
      name: 'Farbe Führungsschiene',
      icon: faColonSign,
      component: PlaceHolder,
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
      key: 'putzträgerStyroporkasten',
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
      component: DoubleStepper,
      props: {
        ...styroporkasten_antriebsartProps,
        configurationKey: 'antriebsart',
      },
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
      component: StepVerlängerung,
    },
  ],
  vorsatzrollladen: [
    {
      key: 'kastenform',
      name: 'Kastenform und Insektenschutz',
      icon: faShapes,
    },
    {
      key: 'mk',
      name: 'Maße und Kastenart',
      icon: faDrawPolygon,
      component: PlaceHolder,
    },
    {
      key: 'lamellenartVorsatzrollladen',
      name: 'Lamellenart',
      icon: faBars,
    },
    {
      key: 'farbeRollladenkasten',
      name: 'Farbe Rollladenkasten',
      icon: faColonSign,
      component: PlaceHolder,
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
      component: DoubleStepper,
      props: {
        configurationKey: 'putzträger',
        ...vorsatzrollladen_putzträgerProps,
      },
    },
    {
      key: 'montageartVorsatzrollladen',
      name: 'Montageart',
      icon: faScrewdriver,
    },
    {
      key: 'antriebsart',
      name: 'Antriebsart',
      icon: faGear,
      component: DoubleStepper,
      props: {
        configurationKey: 'antriebsart',
        ...vorsatzrollladen_putzträgerProps,
      },
    },
    {
      key: 'antriebsseite',
      name: 'Antriebsseite',
      icon: faArrowsLeftRight,
    },
  ],
  aufStyroporkasten: [
    {
      key: 'kastentiefeAufStyroporkasten',
      name: 'Kastentiefe',
      icon: faRuler,
    },
    {
      key: 'lamellenartAufStyroporkasten',
      name: 'Lamellenart',
      icon: faBars,
    },
    {
      key: 'farbeRaffstorelamelleAufStyroporkasten',
      name: 'Farbe Raffstorelamelle',
      icon: faBars,
    },
    {
      key: 'farbeEndschieneAufStyroporkasten',
      name: 'Farbe Endschiene',
      icon: faColonSign,
    },
    {
      key: 'farbeFührungsschiene',
      name: 'Farbe Führungsschiene',
      icon: faColonSign,
      component: DoubleStepper,
      props: {
        configurationKey: 'farbeFührungsschiene',
        ...aufStyroporkasten_farbeFührungsschieneProps,
      },
    },
    {
      key: 'antriebsartAufStyroporkasten',
      name: 'Antriebsart',
      icon: faGear,
    },
    {
      key: 'antriebsseite',
      name: 'Antriebsseite',
      icon: faArrowsLeftRight,
    },
    {
      key: 'kastendämmungAufStyroporkasten',
      name: 'Kastendämmung',
      icon: faSnowflake,
    },
    {
      key: 'putzschieneAufStyroporkasten',
      name: 'Putzschiene',
      icon: faCubes,
    },
    {
      key: 'führungsschieneAufStyroporkasten',
      name: 'Führungsschiene',
      icon: faColonSign,
    },
  ],
  vorsatzraffstore: [
    {
      key: 'empty',
      name: 'Empty',
      icon: faSmile,
    },
  ],
};
