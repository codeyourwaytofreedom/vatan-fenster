import {
  faArrowsAltH,
  faBorderAll,
  faCopyright,
  faCropSimple,
  faFlask,
  faLayerGroup,
  faMaximize,
  faShieldAlt,
  faSignsPost,
  faSun,
  faVolumeMute,
  faWindowMaximize,
} from '@fortawesome/free-solid-svg-icons';
import { extraSteps } from './extra_steps';
import { GroupKey, Step } from '@/types/Configurator';

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
  farben: extraSteps,
  verglasung: [
    {
      key: 'glasspaket',
      name: 'Glaspaket',
      icon: faLayerGroup
    },
    {
      key: 'ornament',
      name: 'Ornament',
      icon: faSun,
      yesNo: true
    },
    {
      key: 'sicherheitsverglasung',
      name: 'Sicherheitsverglasung',
      icon: faShieldAlt,
      yesNo: true
    },
    {
      key: 'schallschutz',
      name: 'Schallschutz',
      icon: faVolumeMute,
      yesNo: true
    },
    {
      key: 'sprossen',
      name: 'Sprossen',
      icon: faBorderAll
    },
    {
      key: 'druckausgleichsventil',
      name: 'Druckausgleichsventil',
      icon: faArrowsAltH
    },
  ],
  sonnenschutz: [],
  zusätze: []
};
