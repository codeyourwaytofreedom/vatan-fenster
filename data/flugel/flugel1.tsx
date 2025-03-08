import { SelectionItem } from '../configuration_options';

import fest_o from '../../assets/configurator/style/flugel1/oben/001.Fest.webp';
import fester_flugel_o from '../../assets/configurator/style/flugel1/oben/002.Fester Flügel.webp';
import dreh_links_o from '../../assets/configurator/style/flugel1/oben/003.Dreh links.webp';
import dreh_rechts_o from '../../assets/configurator/style/flugel1/oben/004.Dreh rechts.webp';
import kipp_o from '../../assets/configurator/style/flugel1/oben/005.Kipp.webp';
import dreh_kipp_links_o from '../../assets/configurator/style/flugel1/oben/006.Dreh-Kipp links.webp';
import dreh_kipp_rechts_o from '../../assets/configurator/style/flugel1/oben/006.Dreh-Kipp links.webp';

import fest_u from '../../assets/configurator/style/flugel1/unten/001.Fest.webp';
import fester_flugel_u from '../../assets/configurator/style/flugel1/unten/002.Fester Flügel.webp';
import dreh_links_u from '../../assets/configurator/style/flugel1/unten/003.Dreh Links.webp';
import dreh_rechts_u from '../../assets/configurator/style/flugel1/unten/004.Dreh Rechts.webp';
import kipp_u from '../../assets/configurator/style/flugel1/unten/005.Kipp.webp';
import dreh_kipp_links_u from '../../assets/configurator/style/flugel1/unten/006.Dreh-Kipp links.webp';
import dreh_kipp_rechts_u from '../../assets/configurator/style/flugel1/unten/006.Dreh-Kipp links.webp';

export const flugel1_oben: SelectionItem[] = [
  {
    name: 'Fest',
    image: fest_o,
    key: 'fest_o',
  },
  {
    name: 'Fester Flügel',
    image: fester_flugel_o,
    key: 'fester_flugel_o',
  },
  {
    name: 'Dreh Links',
    image: dreh_links_o,
    key: 'dreh_links_o',
    handleNumber: 1
  },
  {
    name: 'Dreh Rechts',
    image: dreh_rechts_o,
    key: 'dreh_rechts_o',
    handleNumber: 1
  },
  {
    name: 'Kipp',
    image: kipp_o,
    key: 'kipp_o',
    handleNumber: 1
  },
  {
    name: 'Dreh Kipp Links',
    image: dreh_kipp_links_o,
    key: 'dreh_kipp_links_o',
    handleNumber: 1
  },
  {
    name: 'Dreh Kipp Rechts',
    image: dreh_kipp_rechts_o,
    key: 'dreh_kipp_rechts_o',
    handleNumber: 1
  },
];

export const flugel1_unten: SelectionItem[] = [
  {
    name: 'Fest',
    image: fest_u,
    key: 'fest_u',
  },
  {
    name: 'Fester Flügel',
    image: fester_flugel_u,
    key: 'fester_flugel_u',
  },
  {
    name: 'Dreh Links',
    image: dreh_links_u,
    key: 'dreh_links_u',
    handleNumber: 1
  },
  {
    name: 'Dreh Rechts',
    image: dreh_rechts_u,
    key: 'dreh_rechts_u',
    handleNumber: 1
  },
  {
    name: 'Kipp',
    image: kipp_u,
    key: 'kipp_u',
    handleNumber: 1
  },
  {
    name: 'Dreh Kipp Links',
    image: dreh_kipp_links_u,
    key: 'dreh_kipp_links_u',
    handleNumber: 1
  },
  {
    name: 'Dreh Kipp Rechts',
    image: dreh_kipp_rechts_u,
    key: 'dreh_kipp_rechts_u',
    handleNumber: 1
  },
];
