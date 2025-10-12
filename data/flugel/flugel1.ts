import fest_o from '../../assets/configurator/style/flugel1/oben/F.png';
import fester_flugel_o from '../../assets/configurator/style/flugel1/oben/FF.png';
import dreh_links_o from '../../assets/configurator/style/flugel1/oben/DL.png';
import dreh_rechts_o from '../../assets/configurator/style/flugel1/oben/DR.png';
import kipp_o from '../../assets/configurator/style/flugel1/oben/K.png';
import dreh_kipp_links_o from '../../assets/configurator/style/flugel1/oben/DKL.png';
import dreh_kipp_rechts_o from '../../assets/configurator/style/flugel1/oben/DKR.png';

import fest_u from '../../assets/configurator/style/flugel1/unten/F.png';
import fester_flugel_u from '../../assets/configurator/style/flugel1/unten/FF.png';
import dreh_links_u from '../../assets/configurator/style/flugel1/unten/DL.png';
import dreh_rechts_u from '../../assets/configurator/style/flugel1/unten/DR.png';
import kipp_u from '../../assets/configurator/style/flugel1/unten/K.png';
import dreh_kipp_links_u from '../../assets/configurator/style/flugel1/unten/DKL.png';
import dreh_kipp_rechts_u from '../../assets/configurator/style/flugel1/unten/DKR.png';
import { SelectionItem } from '@/types/Configurator';

export const flugel1_oben: SelectionItem[] = [
  {
    name: 'Fest',
    image: fest_o,
    key: 'F',
    thin: true
  },
  {
    name: 'Fester Flügel',
    image: fester_flugel_o,
    key: 'FF',
    thin: true
  },
  {
    name: 'Dreh Links',
    image: dreh_links_o,
    key: 'DL',
    handleNumber: 1,
    thin: true
  },
  {
    name: 'Dreh Rechts',
    image: dreh_rechts_o,
    key: 'DR',
    handleNumber: 1,
    thin: true
  },
  {
    name: 'Kipp',
    image: kipp_o,
    key: 'K',
    handleNumber: 1,
    thin: true
  },
  {
    name: 'Dreh Kipp Links',
    image: dreh_kipp_links_o,
    key: 'DKL',
    handleNumber: 1,
    thin: true

  },
  {
    name: 'Dreh Kipp Rechts',
    image: dreh_kipp_rechts_o,
    key: 'DKR',
    handleNumber: 1,
    thin: true
  },
];

export const flugel1_unten: SelectionItem[] = [
  {
    name: 'Fest',
    image: fest_u,
    key: 'F',
  },
  {
    name: 'Fester Flügel',
    image: fester_flugel_u,
    key: 'FF',
  },
  {
    name: 'Dreh Links',
    image: dreh_links_u,
    key: 'DL',
    handleNumber: 1,
  },
  {
    name: 'Dreh Rechts',
    image: dreh_rechts_u,
    key: 'DR',
    handleNumber: 1,
  },
  {
    name: 'Kipp',
    image: kipp_u,
    key: 'K',
    handleNumber: 1,
  },
  {
    name: 'Dreh Kipp Links',
    image: dreh_kipp_links_u,
    key: 'DKL',
    handleNumber: 1,
  },
  {
    name: 'Dreh Kipp Rechts',
    image: dreh_kipp_rechts_u,
    key: 'DKL',
    handleNumber: 1,
  },
];
