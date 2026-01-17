import fest_fest_o from '../../assets/configurator/style/flugel2/oben/F+F.png';
import fester_flugel_fester_flugel_o from '../../assets/configurator/style/flugel2/oben/FF+FF.png';
import kipp_kipp_o from '../../assets/configurator/style/flugel2/oben/K+K.png';
import dreh_kip_fest_o from '../../assets/configurator/style/flugel2/oben/DKL+F.png';
import fest_dreh_kipp_o from '../../assets/configurator/style/flugel2/oben/F+DKR.png';
import dreh_dreh_kipp_pfosten_o from '../../assets/configurator/style/flugel2/oben/DL+DKR(Pfosten).png';
import dreh_kipp_dreh_pfosten_o from '../../assets/configurator/style/flugel2/oben/DKL+DR(Pfosten).png';
import dreh_kipp_dreh_kipp_pfosten_o from '../../assets/configurator/style/flugel2/oben/DKL+DR(Pfosten).png';
import dreh_dreh_kipp_stulp_o from '../../assets/configurator/style/flugel2/oben/DL+DKR(Stulp).png';
import dreh_kipp_dreh_stulp_o from '../../assets/configurator/style/flugel2/oben/DKL+DR(Stulp).png';

export const flugel2_oben: SelectionItem[] = [
  {
    name: 'Fest + Fest',
    image: fest_fest_o,
    key: 'F_F',
    sectionNumber: 2,
    sections: ['F', 'F'],
    thin: true,
  },
  {
    name: 'Fester Flügel + Fester Flügel',
    image: fester_flugel_fester_flugel_o,
    key: 'FF_FF',
    sectionNumber: 2,
    sections: ['FF', 'FF'],
    thin: true,
  },
  {
    name: 'Kipp + Kipp',
    image: kipp_kipp_o,
    key: 'K_K',
    handleNumber: 2,
    sectionNumber: 2,
    sections: ['K', 'K'],
    thin: true,
  },
  {
    name: 'Dreh-Kipp + Fest',
    image: dreh_kip_fest_o,
    key: 'DK_F',
    handleNumber: 1,
    sectionNumber: 2,
    sections: ['DK', 'F'],
    thin: true,
  },
  {
    name: 'Fest + Dreh-Kipp',
    image: fest_dreh_kipp_o,
    key: 'F_DK',
    handleNumber: 1,
    sectionNumber: 2,
    sections: ['F', 'DK'],
    thin: true,
  },
  {
    name: 'Dreh + Dreh-Kipp (pfosten)',
    image: dreh_dreh_kipp_pfosten_o,
    key: 'D_DK_POS',
    handleNumber: 2,
    sectionNumber: 2,
    sections: ['DL', 'DKR'],
    thin: true,
  },
  {
    name: 'Dreh-Kipp + Dreh (Pfosten)',
    image: dreh_kipp_dreh_pfosten_o,
    key: 'DK_D_POS',
    handleNumber: 2,
    sectionNumber: 2,
    sections: ['DKL', 'DR'],
    thin: true,
  },
  {
    name: 'Dreh-Kipp + Dreh-Kipp (pfosten)',
    image: dreh_kipp_dreh_kipp_pfosten_o,
    key: 'DK_DK_POS',
    handleNumber: 2,
    sectionNumber: 2,
    sections: ['DKL', 'DKR'],
    thin: true,
  },
  {
    name: 'Dreh + Dreh-Kipp(Stulp)',
    image: dreh_dreh_kipp_stulp_o,
    key: 'D_DK_STULP',
    handleNumber: 2,
    sectionNumber: 2,
    sections: ['DL', 'DKR', 'LINE'],
    thin: true,
  },
  {
    name: 'Dreh-Kipp + Dreh (Stulp)',
    image: dreh_kipp_dreh_stulp_o,
    key: 'DK_D_STULP',
    handleNumber: 2,
    sectionNumber: 2,
    sections: ['DKL', 'DR', 'LINE'],
    thin: true,
  },
];

import fest__fest_u from '../../assets/configurator/style/flugel2/unten/F+F.png';
import fester_flugel_fester_flugel_u from '../../assets/configurator/style/flugel2/unten/FF+FF.png';
import kipp_kipp_u from '../../assets/configurator/style/flugel2/unten/K+K.png';
import dreh_kip_fest_u from '../../assets/configurator/style/flugel2/unten/DKL+F.png';
import fest_dreh_kipp_u from '../../assets/configurator/style/flugel2/unten/F+DKR.png';
import dreh_dreh_kipp_pfosten_u from '../../assets/configurator/style/flugel2/unten/DL+DKR (Pfosten).png';
import dreh_kipp_dreh_pfosten_u from '../../assets/configurator/style/flugel2/unten/DKL+DR (Pfosten).png';
import dreh_kipp_dreh_kipp_pfosten_u from '../../assets/configurator/style/flugel2/unten/DKL+DKR (Pfosten).png';
import dreh_kipp_dreh_stulp_u from '../../assets/configurator/style/flugel2/unten/DKL+DR (Stulp).png';
import dreh_dreh_kipp_stulp_u from '../../assets/configurator/style/flugel2/unten/DL+DKR (Stulp).png';
import { SelectionItem } from '@/types/Configurator';

export const flugel2_unten: SelectionItem[] = [
  {
    name: 'Fest + Fest',
    image: fest__fest_u,
    key: 'F_F',
    sectionNumber: 2,
    sections: ['F', 'F'],
  },
  {
    name: 'Fester Flügel + Fester Flügel',
    image: fester_flugel_fester_flugel_u,
    key: 'FF_FF',
    sectionNumber: 2,
    sections: ['FF', 'FF'],
  },
  {
    name: 'Kipp + Kipp',
    image: kipp_kipp_u,
    key: 'K_K',
    handleNumber: 2,
    sectionNumber: 2,
    sections: ['K', 'K'],
  },
  {
    name: 'Dreh-Kipp + Fest',
    image: dreh_kip_fest_u,
    key: 'DK_F',
    handleNumber: 1,
    sectionNumber: 2,
    sections: ['DK', 'F'],
  },
  {
    name: 'Fest + Dreh-Kipp',
    image: fest_dreh_kipp_u,
    key: 'F_DK',
    handleNumber: 1,
    sectionNumber: 2,
    sections: ['F', 'DK'],
  },
  {
    name: 'Dreh + Dreh-Kipp (pfosten)',
    image: dreh_dreh_kipp_pfosten_u,
    key: 'D_DK_POS',
    handleNumber: 2,
    sectionNumber: 2,
    sections: ['DL', 'DKR'],
  },
  {
    name: 'Dreh-Kipp + Dreh (Pfosten)',
    image: dreh_kipp_dreh_pfosten_u,
    key: 'DK_D_POS',
    handleNumber: 2,
    sectionNumber: 2,
    sections: ['DKL', 'DR'],
  },
  {
    name: 'Dreh-Kipp + Dreh-Kipp (pfosten)',
    image: dreh_kipp_dreh_kipp_pfosten_u,
    key: 'DK_DK_POS',
    handleNumber: 2,
    sectionNumber: 2,
    sections: ['DKL', 'DKR'],
  },
  {
    name: 'Dreh + Dreh-Kipp(Stulp)',
    image: dreh_dreh_kipp_stulp_u,
    key: 'D_DK_STULP',
    handleNumber: 1,
    sectionNumber: 2,
    sections: ['DL', 'DKR', 'LINE'],
  },
  {
    name: 'Dreh-Kipp + Dreh (Stulp)',
    image: dreh_kipp_dreh_stulp_u,
    key: 'DK_D_STULP',
    handleNumber: 1,
    sectionNumber: 2,
    sections: ['DKL', 'DR', 'LINE'],
  },
];
