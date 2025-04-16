import { SelectionItem } from '../configuration_options';

import fest_fest_fest_o from '../../assets/configurator/style/flugel3/oben/F+F+F.png';
import ff_ff_ff_o from '../../assets/configurator/style/flugel3/oben/FF+FF+FF.png';
import kipp_kipp_kipp_o from '../../assets/configurator/style/flugel3/oben/K+K+K.png';
import dreh_kipp_fest_dreh_kipp_o from '../../assets/configurator/style/flugel3/oben/DKL+F+DKR.png';
import dreh_kipp_dreh_links_dreh_kipp_pfosten_o from '../../assets/configurator/style/flugel3/oben/DKL+DL+DKR(Pfosten).png';
import dreh_kipp_dreh_rechts_dreh_kipp_pfosten_o from '../../assets/configurator/style/flugel3/oben/DKL+DR+DKR(Pfosten).png';
import dreh_kipp_dreh_links_dreh_kipp_stulp_o from '../../assets/configurator/style/flugel3/oben/DKL+DL+DKR(Stulp).png';
import dreh_kipp_dreh_rechts_dreh_kipp_stulp_o from '../../assets/configurator/style/flugel3/oben/DKL+DR+DKR(Stulp).png';

export const flugel3_oben: SelectionItem[] = [
  {
    name: 'Fest + Fest + Fest ',
    image: fest_fest_fest_o,
    key: 'fest_fest_fest_o',
    sectionNumber: 3,
  },
  {
    name: 'Fester Flügel + Fester Flügel + Fester Flügel',
    image: ff_ff_ff_o,
    key: 'ff_ff_ff_o',
    sectionNumber: 3,
  },
  {
    name: 'Kipp + Kipp + Kipp',
    image: kipp_kipp_kipp_o,
    key: 'kipp_kipp_kipp_o',
    handleNumber: 3,
    sectionNumber: 3,
  },
  {
    name: 'Dreh-Kipp + Fest + Dreh Kipp',
    image: dreh_kipp_fest_dreh_kipp_o,
    key: 'dreh_kipp_fest_dreh_kipp_o',
    handleNumber: 2,
    sectionNumber: 3,
  },
  {
    name: 'Dreh-Kipp + Dreh links + Dreh Kipp (pfosten)',
    image: dreh_kipp_dreh_links_dreh_kipp_pfosten_o,
    key: 'dreh_kipp_dreh_links_dreh_kipp_pfosten_o',
    handleNumber: 3,
    sectionNumber: 3,
  },
  {
    name: 'Dreh-Kipp + Dreh rechts + Dreh Kipp (pfosten)',
    image: dreh_kipp_dreh_rechts_dreh_kipp_pfosten_o,
    key: 'dreh_kipp_dreh_rechts_dreh_kipp_pfosten_o',
    handleNumber: 3,
    sectionNumber: 3,
  },
  {
    name: 'Dreh-Kipp + Dreh links + Dreh Kipp (stulp)',
    image: dreh_kipp_dreh_links_dreh_kipp_stulp_o,
    key: 'dreh_kipp_dreh_links_dreh_kipp_stulp_o',
    handleNumber: 3,
    sectionNumber: 3,
  },
  {
    name: 'Dreh-Kipp + Dreh rechts + Dreh Kipp (stulp)',
    image: dreh_kipp_dreh_rechts_dreh_kipp_stulp_o,
    key: 'dreh_kipp_dreh_rechts_dreh_kipp_stulp_o',
    handleNumber: 3,
    sectionNumber: 3,
  },
];

import fest_fest_fest_u from '../../assets/configurator/style/flugel3/unten/F+F+F.png';
import ff_ff_ff_u from '../../assets/configurator/style/flugel3/unten/FF+FF+FF.png';
import kipp_kipp_kipp_u from '../../assets/configurator/style/flugel3/unten/K+K+K.png';
import dreh_kipp_fest_fest_u from '../../assets/configurator/style/flugel3/unten/DKL+F+F.png';
import fest_fest_dreh_kipp_u from '../../assets/configurator/style/flugel3/unten/F+F+DKR.png';
import fest_dreh_kipp_links_fest_u from '../../assets/configurator/style/flugel3/unten/F+DKL+F.png';
import fest_dreh_kipp_rechts_fest_u from '../../assets/configurator/style/flugel3/unten/F+DKR+F.png';
import dreh_kipp_fest_dreh_kipp_u from '../../assets/configurator/style/flugel3/unten/DKL+F+DKR.png';
import dreh_kipp_dreh_links_dreh_kipp_pfosten_u from '../../assets/configurator/style/flugel3/unten/DKL+DL+DKR(Pfosten).png';
import dreh_kipp_dreh_rechts_dreh_kipp_pfosten_u from '../../assets/configurator/style/flugel3/unten/DKL+DR+DKR(Pfosten).png';
import dreh_kipp_dreh_links_dreh_kipp_stulp_u from '../../assets/configurator/style/flugel3/unten/DKL+DL+DKR(Stulp).png';
import dreh_kipp_dreh_rechts_dreh_kipp_stulp_u from '../../assets/configurator/style/flugel3/unten/DKL+DR+DKR(Stulp).png';

export const flugel3_unten: SelectionItem[] = [
  {
    name: 'Fest + Fest + Fest',
    image: fest_fest_fest_u,
    key: 'fest_fest_fest_u',
    sectionNumber: 3,
  },
  {
    name: 'Fester Flügel + Fester Flügel + Fester Flügel',
    image: ff_ff_ff_u,
    key: 'ff_ff_ff_u',
    sectionNumber: 3,
  },
  {
    name: 'Kipp + Kipp + Kipp',
    image: kipp_kipp_kipp_u,
    key: 'kipp_kipp_kipp_u',
    handleNumber: 3,
    sectionNumber: 3,
  },
  {
    name: 'Dreh-Kipp + Fest + Fest',
    image: dreh_kipp_fest_fest_u,
    key: 'dreh_kipp_fest_fest_u',
    handleNumber: 1,
    sectionNumber: 3,
  },
  {
    name: 'Fest + Fest + Dreh-Kipp',
    image: fest_fest_dreh_kipp_u,
    key: 'fest_fest_dreh_kipp_u',
    handleNumber: 1,
    sectionNumber: 3,
  },
  {
    name: 'Fest + Dreh-Kipp Links + Fest',
    image: fest_dreh_kipp_links_fest_u,
    key: 'fest_dreh_kipp_links_fest_u',
    handleNumber: 1,
    sectionNumber: 3,
  },
  {
    name: 'Fest + Dreh-Kipp Rechts + Fest',
    image: fest_dreh_kipp_rechts_fest_u,
    key: 'fest_dreh_kipp_rechts_fest_u',
    handleNumber: 1,
    sectionNumber: 3,
  },
  {
    name: 'Dreh-Kipp + Fest + Dreh-Kipp',
    image: dreh_kipp_fest_dreh_kipp_u,
    key: 'dreh_kipp_fest_dreh_kipp_u',
    handleNumber: 2,
    sectionNumber: 3,
  },
  {
    name: 'Dreh-Kipp + Dreh links + Dreh-Kipp (Pfosten)',
    image: dreh_kipp_dreh_links_dreh_kipp_pfosten_u,
    key: 'dreh_kipp_dreh_links_dreh_kipp_pfosten_u',
    handleNumber: 3,
    sectionNumber: 3,
  },
  {
    name: 'Dreh-Kipp + Dreh rechts + Dreh-Kipp (Pfosten)',
    image: dreh_kipp_dreh_rechts_dreh_kipp_pfosten_u,
    key: 'dreh_kipp_dreh_rechts_dreh_kipp_pfosten_u',
    handleNumber: 3,
    sectionNumber: 3,
  },
  {
    name: 'Dreh-Kipp + Dreh links + Dreh-Kipp (Stulp)',
    image: dreh_kipp_dreh_links_dreh_kipp_stulp_u,
    key: 'dreh_kipp_dreh_links_dreh_kipp_stulp_u',
    handleNumber: 3,
    sectionNumber: 3,
  },
  {
    name: 'Dreh-Kipp + Dreh rechts + Dreh-Kipp (Stulp)',
    image: dreh_kipp_dreh_rechts_dreh_kipp_stulp_u,
    key: 'dreh_kipp_dreh_rechts_dreh_kipp_stulp_u',
    handleNumber: 3,
    sectionNumber: 3,
  },
];
