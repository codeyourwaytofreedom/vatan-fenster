import {
  faCopyright,
  faCropSimple,
  faFlask,
  faMaximize,
  faSignsPost,
} from '@fortawesome/free-solid-svg-icons';
import { extraSteps } from './extra_steps';

export const steps = {
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
      key: 'size',
      name: 'Maß',
      icon: faMaximize,
    },
  ],
  farben: extraSteps,
};
