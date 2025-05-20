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
import StepVerlängerung from '@/components/StepVerlängerung/StepVerlängerung';
import {
  _215_175_antriebsartProps,
  _215_175_farbeRollladenkasten,
  _215_175_LamelleatProps,
  _215_175_putzträgerProps,
  aufStyroporkasten_farbeFührungsschieneProps,
  styroporkasten_antriebsartProps,
  styroporkasten_LamelleatProps,
  vorsatzrollladen_antriebsartProps,
  vorsatzrollladen_putzträgerProps,
} from './selectionItems/sonnenschutzData';
import YesNoSelector from '@/components/YesNoSelector/YesNoSelector';
import StepRahmenverbreiterung from '@/components/StepRahmenverbreiterung/StepRahmenverbreiterung';
import { yesNoOptions } from './configurationData';
import empty from '@/assets/common/empty.jpg';

export const steps: Record<GroupKey | string, Step[]> = {
  basis: [
    {
      key: 'material',
      name: 'Material',
      icon: faFlask,
      withHoverZoom: true,
    },
    {
      key: 'brand',
      name: 'Hersteller',
      icon: faCopyright,
      withHoverZoom: true,
    },
    {
      key: 'profile',
      name: 'Profil',
      icon: faCropSimple,
      withHoverZoom: true,
    },
    {
      key: 'style',
      name: 'Fensterart',
      icon: faCropSimple,
      withoutDetails: true,
    },
    {
      key: 'type',
      name: 'Type',
      icon: faSignsPost,
      withoutDetails: true,
    },
    {
      key: 'cover',
      name: 'Sonnenschutz',
      icon: faWindowMaximize,
      withHoverZoom: true,
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
      name: 'Dekorfarbe außen',
      icon: faPaintBrush,
      withoutDetails: true,
    },
    {
      key: 'colorInt',
      name: 'Dekorfarbe innen',
      icon: faPaintRoller,
      withoutDetails: true,
    },
    {
      key: 'sealInt',
      name: 'Kernfarbe',
      icon: faToolbox,
      withHoverZoom: true,
      withoutDetails: true,
    },
    {
      key: 'dichtungAussen',
      name: 'Dichtungsfarbe außen',
      icon: faPalette,
      withHoverZoom: true,
      withoutDetails: true,
    },
    {
      key: 'dichtungInnen',
      name: 'Dichtungsfarbe innen & Form',
      icon: faTools,
      withHoverZoom: true,
      withoutDetails: true,
    },
    {
      key: 'fenstergriffe',
      name: 'Fenstergriff',
      icon: faHandHolding,
      withHoverZoom: true,
      withoutDetails: true,
      component: Fenstergriffe,
    },
  ],
  verglasung: [
    {
      key: 'glasspaket',
      name: 'Glaspaket',
      icon: faLayerGroup,
      withHoverZoom: true,
      withoutDetails: true,
    },
    {
      key: 'ornament',
      name: 'Ornament & Sicherheitsglas',
      icon: faSun,
      withHoverZoom: true,
      withoutDetails: true,
    },
    {
      key: 'sicherheitsverglasung',
      name: 'Sicherheitsverglasung',
      icon: faShieldAlt,
      withHoverZoom: true,
      withoutDetails: true,
    },
    {
      key: 'schallschutz',
      name: 'Schallschutz',
      icon: faVolumeMute,
      withHoverZoom: true,
      withoutDetails: true,
    },
    {
      key: 'sprossen',
      name: 'Sprossen',
      icon: faBorderAll,
      component: StepSprossen,
      withHoverZoom: true,
      withoutDetails: true,
    },
    {
      key: 'druckausgleichsventil',
      name: 'Druckausgleichsventil',
      icon: faArrowsAltH,
      withHoverZoom: true,
      withoutDetails: true,
    },
  ],
  zusatze: [
    {
      key: 'sicherheitsbeschlage',
      name: 'Sicherheitsbeschlage',
      icon: faSun,
      component: DoubleStepper,
      withoutDetails: true,
      props: {
        label: 'Möchten Sie Sicherheitsbeschläge hinzufügen?',
        subCategoryItems: {
          ja: [
            {
              key: 'test1',
              name: 'Test1',
              image: empty,
            },
            {
              key: 'test2',
              name: 'Test2',
              image: empty,
            },
          ],
          nein: [],
        },
        categoryItems: yesNoOptions,
        configurationKey: 'sicherheitsbeschlage',
      },
    },
    {
      key: 'verdecktLiegenderBeschlag',
      name: 'Verdeckt Liegender Beschlag',
      icon: faSun,
      component: YesNoSelector,
      withoutDetails: true,
      props: {
        label: 'Möchten Sie verdeckt liegende Beschläge hinzufügen?',
      },
    },
    {
      key: 'dünneSchweißnahtVPerfect',
      name: 'Schweißnaht',
      icon: faSun,
      component: YesNoSelector,
      withoutDetails: true,
      props: {
        label: 'Möchten Sie für das Kunststoffprofil eine dünne Schweißnaht?',
      },
    },
    {
      key: 'reedKontakt',
      name: 'Verschlussüberwachung Reedkontakt',
      icon: faSun,
      component: YesNoSelector,
      withoutDetails: true,
      props: {
        label: 'Möchten Sie Reedkontakte hinzufügen?',
      },
    },
    {
      key: 'montagevorbohrungen',
      name: 'Montagevorbohrungen',
      icon: faSun,
      component: YesNoSelector,
      withoutDetails: true,
      props: {
        label: 'Möchten Sie Montagevorbohrungen hinzufügen?',
      },
    },
    {
      key: 'lüftungssysteme',
      name: 'Lüftungssysteme',
      icon: faSun,
      component: DoubleStepper,
      withoutDetails: true,
      props: {
        label: 'Möchten Sie ein Lüftungssystem hinzufügen?',
        subCategoryItems: {
          ja: [
            {
              key: 'test1',
              name: 'Lüftungssysteme1',
              image: empty,
            },
            {
              key: 'test2',
              name: 'Lüftungssysteme2',
              image: empty,
            },
          ],
          nein: [],
        },
        categoryItems: yesNoOptions,
        configurationKey: 'lüftungssysteme',
      },
    },
    {
      key: 'rahmenverbreiterung',
      name: 'Rahmenverbreiterung',
      icon: faSun,
      component: StepRahmenverbreiterung,
      withoutDetails: true,
    },
    /*     {
      key: 'rahmenverbreiterungAuswahlen',
      name: 'Rahmenverbreiterung Auswählen',
      icon: faSun,
      component: StepRahmenverbreiterungAuswahlen,
      withoutDetails: true,
    }, */
  ],
  sonnenschutz: [],
};

const _215_175: Step[] = [
  {
    key: 'adapter',
    name: 'Adapter',
    icon: faTools,
    withHoverZoom: true,
  },
  {
    key: 'revisionsöffnung',
    name: 'Revisionsöffnung',
    icon: faWrench,
    withHoverZoom: true,
  },
  {
    key: 'lamellenart',
    name: 'Lamellenart',
    icon: faBars,
    withHoverZoom: true,
    component: DoubleStepper,
    props: { ..._215_175_LamelleatProps, configurationKey: 'lamellenart' },
  },
  {
    key: 'farbeRollladenkasten',
    name: 'Farbe Rollladenkasten',
    icon: faColonSign,
    component: DoubleStepper,
    props: {
      ..._215_175_farbeRollladenkasten,
      configurationKey: 'farbeRollladenkasten',
    },
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
    withHoverZoom: true,
    props: {
      ..._215_175_putzträgerProps,
      configurationKey: 'putzträger',
    },
  },
  {
    key: 'schrägschnitt',
    name: 'Schrägschnitt',
    icon: faAngleDown,
    withHoverZoom: true,
  },
  {
    key: 'antriebsart',
    name: 'Antriebsart',
    icon: faGear,
    withHoverZoom: true,
    withoutDetails: true,
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
    withHoverZoom: true,
  },
  {
    key: 'schallschutzmatte',
    name: 'Schallschutzmatte',
    icon: faEarDeaf,
    withHoverZoom: true,
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
    withHoverZoom: true,
  },
  {
    key: 'montageartRollladen',
    name: 'Montageart Rollladen',
    icon: faScrewdriver,
    withHoverZoom: true,
  },
  {
    key: 'stahlkonsole',
    name: 'Montageart Stahlkonsole',
    icon: faShieldHalved,
    withHoverZoom: true,
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
      withHoverZoom: true,
    },
    {
      key: 'revisionsöffnung',
      name: 'Revisionsöffnung',
      icon: faWrench,
      withHoverZoom: true,
    },
    {
      key: 'lamellenart',
      name: 'Lamellenart',
      icon: faBars,
      withHoverZoom: true,
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
      withHoverZoom: true,
    },
    {
      key: 'schrägschnitt',
      name: 'Schrägschnitt',
      icon: faAngleDown,
      withHoverZoom: true,
    },
    {
      key: 'antriebsart',
      name: 'Antriebsart',
      icon: faGear,
      withHoverZoom: true,
      withoutDetails: true,
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
      withHoverZoom: true,
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
      withHoverZoom: true,
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
      withHoverZoom: true,
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
      withHoverZoom: true,
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
      withHoverZoom: true,
    },
    {
      key: 'antriebsart',
      name: 'Antriebsart',
      icon: faGear,
      component: DoubleStepper,
      withHoverZoom: true,
      withoutDetails: true,
      props: {
        configurationKey: 'antriebsart',
        ...vorsatzrollladen_antriebsartProps,
      },
    },
    {
      key: 'antriebsseite',
      name: 'Antriebsseite',
      icon: faArrowsLeftRight,
      withHoverZoom: true,
    },
  ],
  aufStyroporkasten: [
    {
      key: 'kastentiefeAufStyroporkasten',
      name: 'Kastentiefe',
      icon: faRuler,
      withHoverZoom: true,
    },
    {
      key: 'lamellenartAufStyroporkasten',
      name: 'Lamellenart',
      icon: faBars,
      withHoverZoom: true,
    },
    {
      key: 'farbeRaffstorelamelleAufStyroporkasten',
      name: 'Farbe Raffstorelamelle',
      icon: faBars,
      withHoverZoom: true,
    },
    {
      key: 'farbeEndschieneAufStyroporkasten',
      name: 'Farbe Endschiene',
      icon: faColonSign,
      withHoverZoom: true,
    },
    {
      key: 'farbeFührungsschiene',
      name: 'Farbe Führungsschiene',
      icon: faColonSign,
      withHoverZoom: true,
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
      withHoverZoom: true,
      withoutDetails: true,
    },
    {
      key: 'antriebsseite',
      name: 'Antriebsseite',
      icon: faArrowsLeftRight,
      withHoverZoom: true,
    },
    {
      key: 'kastendämmungAufStyroporkasten',
      name: 'Kastendämmung',
      icon: faSnowflake,
      withHoverZoom: true,
    },
    {
      key: 'putzschieneAufStyroporkasten',
      name: 'Putzschiene',
      icon: faCubes,
      withHoverZoom: true,
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
