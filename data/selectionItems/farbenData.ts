import { SelectionItem } from '@/types/Configurator';

// Common images
import color2 from '@/assets/common/color2.png';
import color3 from '@/assets/common/color3.jpg';
import handle from '@/assets/common/empty.jpg';

// Standard handle images - Standart Serie
import s_weis from '@/assets/configurator/fenstergriffe/standart/001.Standart weiß.webp';
import s_silber from '@/assets/configurator/fenstergriffe/standart/002.Standart silber.webp';
import s_schwarz from '@/assets/configurator/fenstergriffe/standart/003.Standart schwarz.webp';
import s_braun from '@/assets/configurator/fenstergriffe/standart/004.Standart braun.webp';
import s_oliv from '@/assets/configurator/fenstergriffe/standart/005.Standart oliv.webp';

// Standard handle images - Secustik Serie
import sec_weis from '@/assets/configurator/fenstergriffe/standart/006.Secustik weiß.webp';
import sec_silber from '@/assets/configurator/fenstergriffe/standart/007.Secustik silber.webp';
import sec_schwarz from '@/assets/configurator/fenstergriffe/standart/008.Secustik schwarz.webp';
import sec_braun from '@/assets/configurator/fenstergriffe/standart/009.Secustik braun.webp';
import sec_oliv from '@/assets/configurator/fenstergriffe/standart/010.Secustik oliv.webp';
import sec_champ from '@/assets/configurator/fenstergriffe/standart/011.Secustik champagner.webp';
import sec_titan from '@/assets/configurator/fenstergriffe/standart/012.Secustik titan.webp';

// Standard handle images - Eleganz Serie
import el_weis from '@/assets/configurator/fenstergriffe/standart/013.Eleganz weiß.webp';
import el_braun from '@/assets/configurator/fenstergriffe/standart/014.Eleganz braun.webp';
import el_silber from '@/assets/configurator/fenstergriffe/standart/015.Eleganz silber.webp';
import el_oliv from '@/assets/configurator/fenstergriffe/standart/016.Eleganz olive.webp';

// Standard handle images - Dublin Serie
import d_weis from '@/assets/configurator/fenstergriffe/standart/017.Dublin weiß.webp';
import d_silber from '@/assets/configurator/fenstergriffe/standart/018.Dublin silber.webp';
import d_schwarz from '@/assets/configurator/fenstergriffe/standart/019.Dublin schwarz.webp';
import d_braun from '@/assets/configurator/fenstergriffe/standart/020.Dublin braun.webp';
import d_ant from '@/assets/configurator/fenstergriffe/standart/021.Dublin anthrazitgrau.webp';

// Special handle finishes
import m_poliert from '@/assets/configurator/fenstergriffe/standart/022.Messing poliert.webp';
import edelstahl from '@/assets/configurator/fenstergriffe/standart/023.Edelstahl.webp';


const standartFenstergriffeOptions = [
  { key: 's_weis', image: s_weis, name: 'Standart weiß' },
  { key: 's_silber', image: s_silber, name: 'Standart silber' },
  { key: 's_schwarz', image: s_schwarz, name: 'Standart schwarz' },
  { key: 's_braun', image: s_braun, name: 'Standart braun' },
  { key: 's_oliv', image: s_oliv, name: 'Standart oliv' },

  { key: 'sec_weis', image: sec_weis, name: 'Secustik weiß' },
  { key: 'sec_silber', image: sec_silber, name: 'Secustik silber' },
  { key: 'sec_schwarz', image: sec_schwarz, name: 'Secustik schwarz' },
  { key: 'sec_braun', image: sec_braun, name: 'Secustik braun' },
  { key: 'sec_oliv', image: sec_oliv, name: 'Secustik oliv' },
  { key: 'sec_champ', image: sec_champ, name: 'Secustik champagner' },
  { key: 'sec_titan', image: sec_titan, name: 'Secustik titan' },

  { key: 'el_weis', image: el_weis, name: 'Eleganz weiß' },
  { key: 'el_silber', image: el_silber, name: 'Eleganz silber' },
  { key: 'el_braun', image: el_braun, name: 'Eleganz braun' },
  { key: 'el_oliv', image: el_oliv, name: 'Eleganz olive' },

  { key: 'd_weis', image: d_weis, name: 'Dublin weiß' },
  { key: 'd_silber', image: d_silber, name: 'Dublin silber' },
  { key: 'd_schwarz', image: d_schwarz, name: 'Dublin schwarz' },
  { key: 'd_braun', image: d_braun, name: 'Dublin braun' },
  { key: 'd_ant', image: d_ant, name: 'Dublin anthrazitgrau' },

  { key: 'm_poliert', image: m_poliert, name: 'Messing poliert' },
  { key: 'edelstahl', image: edelstahl, name: 'Edelstahl' },
];

// schlüssel handle images
import schl_weis from '../../assets/configurator/fenstergriffe/schlüssel/001.Standart weiß.webp';
import schl_silber from '../../assets/configurator/fenstergriffe/schlüssel/002.Standart silber.webp';
import schl_schwarz from '../../assets/configurator/fenstergriffe/schlüssel/003.Standart schwarz.webp';
import schl_braun from '../../assets/configurator/fenstergriffe/schlüssel/004.Standart braun.webp';
import schl_oliv from '../../assets/configurator/fenstergriffe/schlüssel/005.Standart oliv.webp';
import schl_sec_weis from '../../assets/configurator/fenstergriffe/schlüssel/006.Secustik weiß.webp';
import schl_sec_silber from '../../assets/configurator/fenstergriffe/schlüssel/007.Secustik silber.webp';
import schl_sec_braun from '../../assets/configurator/fenstergriffe/schlüssel/008.Secustik braun.webp';
import schl_sec_champ from '../../assets/configurator/fenstergriffe/schlüssel/009.Secustik champagner.webp';
import schl_sec_titan from '../../assets/configurator/fenstergriffe/schlüssel/010.Secustik titan.webp';
import schl_el_weis from '../../assets/configurator/fenstergriffe/schlüssel/011.Eleganz weiß.webp';
import schl_el_silber from '../../assets/configurator/fenstergriffe/schlüssel/012.Eleganz silber.webp';
import schl_el_braun from '../../assets/configurator/fenstergriffe/schlüssel/013.Eleganz braun.webp';
import schl_el_oliv from '../../assets/configurator/fenstergriffe/schlüssel/014.Eleganz gold_oliv.webp';
import schl_d_weis from '../../assets/configurator/fenstergriffe/schlüssel/015.Dublin weiß.webp';
import schl_d_silber from '../../assets/configurator/fenstergriffe/schlüssel/016.Dublin silber.webp';
import schl_d_schwarz from '../../assets/configurator/fenstergriffe/schlüssel/017.Dublin schwarz.webp';
import schl_d_braun from '../../assets/configurator/fenstergriffe/schlüssel/018.Dublin braun.png';
import schl_d_ant from '../../assets/configurator/fenstergriffe/schlüssel/019.Dublin anthrazit.png';

const schluesselFestergriffeOptions = [
  { key: 'schl_weis', image: schl_weis, name: 'Standart weiß' },
  { key: 'schl_silber', image: schl_silber, name: 'Standart silber' },
  { key: 'schl_schwarz', image: schl_schwarz, name: 'Standart schwarz' },
  { key: 'schl_braun', image: schl_braun, name: 'Standart braun' },
  { key: 'schl_oliv', image: schl_oliv, name: 'Standart oliv' },
  { key: 'schl_sec_weis', image: schl_sec_weis, name: 'Secustik weiß' },
  { key: 'schl_sec_silber', image: schl_sec_silber, name: 'Secustik silber' },
  { key: 'schl_sec_braun', image: schl_sec_braun, name: 'Secustik braun' },
  { key: 'schl_sec_champ', image: schl_sec_champ, name: 'Secustik champagner' },
  { key: 'schl_sec_titan', image: schl_sec_titan, name: 'Secustik titan' },
  { key: 'schl_el_weis', image: schl_el_weis, name: 'Eleganz weiß' },
  { key: 'schl_el_silber', image: schl_el_silber, name: 'Eleganz silber' },
  { key: 'schl_el_braun', image: schl_el_braun, name: 'Eleganz braun' },
  { key: 'schl_el_oliv', image: schl_el_oliv, name: 'Eleganz gold_oliv' },
  { key: 'schl_d_weis', image: schl_d_weis, name: 'Dublin weiß' },
  { key: 'schl_d_silber', image: schl_d_silber, name: 'Dublin silber' },
  { key: 'schl_d_schwarz', image: schl_d_schwarz, name: 'Dublin schwarz' },
  { key: 'schl_d_braun', image: schl_d_braun, name: 'Dublin braun' },
  { key: 'schl_d_ant', image: schl_d_ant, name: 'Dublin anthrazit' },
];

// Druckknopf handle options
import dr_weis from '@/assets/configurator/fenstergriffe/druckknopf/001.Standart weiß.webp';
import dr_silberfarbig from '@/assets/configurator/fenstergriffe/druckknopf/002.Standart silberfarbig.webp';
import dr_schwarz from '@/assets/configurator/fenstergriffe/druckknopf/003.Standart schwarz.webp';
import dr_braun from '@/assets/configurator/fenstergriffe/druckknopf/004.Standart braun.webp';
import dr_oliv from '@/assets/configurator/fenstergriffe/druckknopf/005.Standart gold_oliv.webp';

import dr_sec_weis from '@/assets/configurator/fenstergriffe/druckknopf/006.Secustik weiß.webp';
import dr_sec_silber from '@/assets/configurator/fenstergriffe/druckknopf/007.Secustik silber.webp';
import dr_sec_braun from '@/assets/configurator/fenstergriffe/druckknopf/008.Secustik braun.webp';
import dr_sec_champ from '@/assets/configurator/fenstergriffe/druckknopf/009.Secustik champagner.webp';
import dr_sec_titan from '@/assets/configurator/fenstergriffe/druckknopf/010.Secustik titan.webp';

import dr_d_weis from '@/assets/configurator/fenstergriffe/druckknopf/011.Dublin weiß.webp';
import dr_d_silber from '@/assets/configurator/fenstergriffe/druckknopf/012.Dublin silber.webp';
import dr_d_schwarz from '@/assets/configurator/fenstergriffe/druckknopf/013.Dublin schwarz.webp';
import dr_d_braun from '@/assets/configurator/fenstergriffe/druckknopf/014.Dublin braun.webp';
import dr_d_ant from '@/assets/configurator/fenstergriffe/druckknopf/015.Dublin anthrazit .webp';


const druckknopfFestergriffeOptions = [
  { key: 'dr_weis', image: dr_weis, name: 'Standart weiß' },
  { key: 'dr_silberfarbig', image: dr_silberfarbig, name: 'Standart silberfarbig' },
  { key: 'dr_schwarz', image: dr_schwarz, name: 'Standart schwarz' },
  { key: 'dr_braun', image: dr_braun, name: 'Standart braun' },
  { key: 'dr_oliv', image: dr_oliv, name: 'Standart gold_oliv' },
  { key: 'dr_sec_weis', image: dr_sec_weis, name: 'Secustik weiß' },
  { key: 'dr_sec_silber', image: dr_sec_silber, name: 'Secustik silber' },
  { key: 'dr_sec_braun', image: dr_sec_braun, name: 'Secustik braun' },
  { key: 'dr_sec_champ', image: dr_sec_champ, name: 'Secustik champagner' },
  { key: 'dr_sec_titan', image: dr_sec_titan, name: 'Secustik titan' },
  { key: 'dr_d_weis', image: dr_d_weis, name: 'Dublin weiß' },
  { key: 'dr_d_silber', image: dr_d_silber, name: 'Dublin silber' },
  { key: 'dr_d_schwarz', image: dr_d_schwarz, name: 'Dublin schwarz' },
  { key: 'dr_d_braun', image: dr_d_braun, name: 'Dublin braun' },
  { key: 'dr_d_ant', image: dr_d_ant, name: 'Dublin anthrazit' },
];

// dichtung_aussen images
import lichtgrau from '@/assets/configurator/farben/dichtung_aussen/lichtgrau.webp';
import schwarz from '@/assets/configurator/farben/dichtung_aussen/schwarz.webp';


export const farbenColorExtOptions = [
  {
    name: 'white',
    image: color2,
    key: 'white',
    zoomable: true,
  },
  {
    name: 'Dark Brown',
    image: color2,
    key: 'dark-brown',
    zoomable: true,
  },
  {
    name: 'Whitesmoke',
    image: color2,
    key: 'whitesmoke',
    zoomable: true,
  },
  {
    name: 'Antrasite',
    image: color2,
    key: 'antrasite',
    zoomable: true,
  },
  {
    name: 'Gold',
    image: color2,
    key: 'gold',
    zoomable: true,
  },
  {
    name: 'pink',
    image: color2,
    key: 'pink',
    zoomable: true,
  },
];

export const farbenOptions: Record<string, SelectionItem[]> = {
  colorExt: farbenColorExtOptions,
  colorInt: [
    {
      name: 'white',
      image: color3,
      key: 'white',
    },
    {
      name: 'Dark Brown',
      image: color3,
      key: 'dark-brown',
    },
    {
      name: 'Whitesmoke',
      image: color3,
      key: 'whitesmoke',
    },
    {
      name: 'Antrasite',
      image: color3,
      key: 'antrasite',
    },
    {
      name: 'Gold',
      image: color3,
      key: 'gold',
    },
    {
      name: 'pink',
      image: color3,
      key: 'pink',
    },
  ],
  dichtungAussen: [
    {
      name: 'Lichtgrau',
      image: lichtgrau,
      key: 'lichtgrau',
    },
    {
      name: 'Schwarz',
      image: schwarz,
      key: 'schwarz',
    },
  ],
  dichtungInnen: [
    {
      name: 'Lichtgrau',
      image: lichtgrau,
      key: 'lichtgrau',
    },
    {
      name: 'Schwarz',
      image: schwarz,
      key: 'schwarz',
    },
  ],
  sealInt: [
    {
      name: 'white',
      image: color3,
      key: 'white',
    },
    {
      name: 'Dark Brown',
      image: color3,
      key: 'dark-brown',
    },
    {
      name: 'Whitesmoke',
      image: color3,
      key: 'whitesmoke',
    },
    {
      name: 'Antrasite',
      image: color3,
      key: 'antrasite',
    },
    {
      name: 'Gold',
      image: color3,
      key: 'gold',
    },
    {
      name: 'pink',
      image: color3,
      key: 'pink',
    },
  ],
  fenstergriffe: [
    {
      name: 'Standart',
      image: handle,
      key: 'standart',
    },
    {
      name: 'Mit Druckknopf',
      image: handle,
      key: 'druckknopf',
    },
    {
      name: 'Mit Schlüssel',
      image: handle,
      key: 'schlüssel',
    },
  ],
};

export const fenstergriffeOptions: Record<string, SelectionItem[]> = {
  standart: standartFenstergriffeOptions,
  druckknopf: druckknopfFestergriffeOptions,
  schlüssel: schluesselFestergriffeOptions,
};
