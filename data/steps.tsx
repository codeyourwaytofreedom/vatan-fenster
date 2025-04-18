import {
  faArrowsAltH,
  faBorderAll,
  faCopyright,
  faCropSimple,
  faFlask,
  faHandHolding,
  faLayerGroup,
  faMaximize,
  faPaintBrush,
  faPaintRoller,
  faPalette,
  faShieldAlt,
  faSignsPost,
  faSun,
  faToolbox,
  faTools,
  faVolumeMute,
  faWindowMaximize,
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
      key: 'colorMid',
      name: 'Color Mid',
      icon: faPalette,
    },
    {
      key: 'sealExt',
      name: 'Seal Ext',
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
  sonnenschutz: [],
  zusätze: [],
};
