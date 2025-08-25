import { SelectionItem } from '@/types/Configurator';

// Common images
import color3 from '@/assets/common/color3.jpg';

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

const standartFenstergriffeOptions: SelectionItem[] = [
  { key: 's_weis', image: s_weis, name: 'Standart weiß', zoomable: true },
  { key: 's_silber', image: s_silber, name: 'Standart silber', zoomable: true },
  { key: 's_schwarz', image: s_schwarz, name: 'Standart schwarz', zoomable: true },
  { key: 's_braun', image: s_braun, name: 'Standart braun', zoomable: true },
  { key: 's_oliv', image: s_oliv, name: 'Standart oliv', zoomable: true },

  { key: 'sec_weis', image: sec_weis, name: 'Secustik weiß', zoomable: true },
  { key: 'sec_silber', image: sec_silber, name: 'Secustik silber', zoomable: true },
  { key: 'sec_schwarz', image: sec_schwarz, name: 'Secustik schwarz', zoomable: true },
  { key: 'sec_braun', image: sec_braun, name: 'Secustik braun', zoomable: true },
  { key: 'sec_oliv', image: sec_oliv, name: 'Secustik oliv', zoomable: true },
  { key: 'sec_champ', image: sec_champ, name: 'Secustik champagner', zoomable: true },
  { key: 'sec_titan', image: sec_titan, name: 'Secustik titan', zoomable: true },

  { key: 'el_weis', image: el_weis, name: 'Eleganz weiß', zoomable: true },
  { key: 'el_silber', image: el_silber, name: 'Eleganz silber', zoomable: true },
  { key: 'el_braun', image: el_braun, name: 'Eleganz braun', zoomable: true },
  { key: 'el_oliv', image: el_oliv, name: 'Eleganz olive', zoomable: true },

  { key: 'd_weis', image: d_weis, name: 'Dublin weiß', zoomable: true },
  { key: 'd_silber', image: d_silber, name: 'Dublin silber', zoomable: true },
  { key: 'd_schwarz', image: d_schwarz, name: 'Dublin schwarz', zoomable: true },
  { key: 'd_braun', image: d_braun, name: 'Dublin braun', zoomable: true },
  { key: 'd_ant', image: d_ant, name: 'Dublin anthrazitgrau', zoomable: true },

  { key: 'm_poliert', image: m_poliert, name: 'Messing poliert', zoomable: true },
  { key: 'edelstahl', image: edelstahl, name: 'Edelstahl', zoomable: true },
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
  { key: 'schl_weis', image: schl_weis, name: 'Standart weiß', zoomable: true },
  { key: 'schl_silber', image: schl_silber, name: 'Standart silber', zoomable: true },
  { key: 'schl_schwarz', image: schl_schwarz, name: 'Standart schwarz', zoomable: true },
  { key: 'schl_braun', image: schl_braun, name: 'Standart braun', zoomable: true },
  { key: 'schl_oliv', image: schl_oliv, name: 'Standart oliv', zoomable: true },
  { key: 'schl_sec_weis', image: schl_sec_weis, name: 'Secustik weiß', zoomable: true },
  { key: 'schl_sec_silber', image: schl_sec_silber, name: 'Secustik silber', zoomable: true },
  { key: 'schl_sec_braun', image: schl_sec_braun, name: 'Secustik braun', zoomable: true },
  { key: 'schl_sec_champ', image: schl_sec_champ, name: 'Secustik champagner', zoomable: true },
  { key: 'schl_sec_titan', image: schl_sec_titan, name: 'Secustik titan', zoomable: true },
  { key: 'schl_el_weis', image: schl_el_weis, name: 'Eleganz weiß', zoomable: true },
  { key: 'schl_el_silber', image: schl_el_silber, name: 'Eleganz silber', zoomable: true },
  { key: 'schl_el_braun', image: schl_el_braun, name: 'Eleganz braun', zoomable: true },
  { key: 'schl_el_oliv', image: schl_el_oliv, name: 'Eleganz gold_oliv', zoomable: true },
  { key: 'schl_d_weis', image: schl_d_weis, name: 'Dublin weiß', zoomable: true },
  { key: 'schl_d_silber', image: schl_d_silber, name: 'Dublin silber', zoomable: true },
  { key: 'schl_d_schwarz', image: schl_d_schwarz, name: 'Dublin schwarz', zoomable: true },
  { key: 'schl_d_braun', image: schl_d_braun, name: 'Dublin braun', zoomable: true },
  { key: 'schl_d_ant', image: schl_d_ant, name: 'Dublin anthrazit', zoomable: true },
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
  { key: 'dr_weis', image: dr_weis, name: 'Standart weiß', zoomable: true },
  { key: 'dr_silberfarbig', image: dr_silberfarbig, name: 'Standart silberfarbig', zoomable: true },
  { key: 'dr_schwarz', image: dr_schwarz, name: 'Standart schwarz', zoomable: true },
  { key: 'dr_braun', image: dr_braun, name: 'Standart braun', zoomable: true },
  { key: 'dr_oliv', image: dr_oliv, name: 'Standart gold_oliv', zoomable: true },
  { key: 'dr_sec_weis', image: dr_sec_weis, name: 'Secustik weiß', zoomable: true },
  { key: 'dr_sec_silber', image: dr_sec_silber, name: 'Secustik silber', zoomable: true },
  { key: 'dr_sec_braun', image: dr_sec_braun, name: 'Secustik braun', zoomable: true },
  { key: 'dr_sec_champ', image: dr_sec_champ, name: 'Secustik champagner', zoomable: true },
  { key: 'dr_sec_titan', image: dr_sec_titan, name: 'Secustik titan', zoomable: true },
  { key: 'dr_d_weis', image: dr_d_weis, name: 'Dublin weiß', zoomable: true },
  { key: 'dr_d_silber', image: dr_d_silber, name: 'Dublin silber', zoomable: true },
  { key: 'dr_d_schwarz', image: dr_d_schwarz, name: 'Dublin schwarz', zoomable: true },
  { key: 'dr_d_braun', image: dr_d_braun, name: 'Dublin braun', zoomable: true },
  { key: 'dr_d_ant', image: dr_d_ant, name: 'Dublin anthrazit', zoomable: true },
];

// dichtung_aussen images
import lichtgrau from '@/assets/configurator/farben/dichtung_aussen/lichtgrau.webp';
import schwarz from '@/assets/configurator/farben/dichtung_aussen/schwarz.webp';

import Anthrazitgrau_1701605_167 from '@/assets/configurator/farben/farbeAussen/001.Anthrazitgrau_(1701605-167).jpg';
import Basaltgrau_701205_167 from '@/assets/configurator/farben/farbeAussen/002.Basaltgrau_(701205-167).jpg';
import Quarzgrau_703905_167 from '@/assets/configurator/farben/farbeAussen/003.Quarzgrau_(703905-167).jpg';
import Schokobraun_887505_167 from '@/assets/configurator/farben/farbeAussen/004.Schokobraun_(887505-167).jpg';
import Eiche_dunkel_2052089_167 from '@/assets/configurator/farben/farbeAussen/005.Eiche_dunkel_(2052089-167).jpg';
import Golden_Oak_2178001_167 from '@/assets/configurator/farben/farbeAussen/006.Golden_Oak_(2178001-167).jpg';
import Anthrazitgrau_glatt_701605_097 from '@/assets/configurator/farben/farbeAussen/007.Anthrazitgrau_glatt_(701605-097).jpg';
import Anthrazitgrau_ulti_matt_504700_47 from '@/assets/configurator/farben/farbeAussen/008.Anthrazitgrau_ulti_matt_(504700-47).jpg';
//import Anthrazitgrau_stylo_F436_4003 from '@/assets/configurator/farben/farbeAussen/009.Anthrazitgrau_stylo_(F436-4003).webp';
import Schwarz_ulti_matt_504700_047 from '@/assets/configurator/farben/farbeAussen/010.Schwarz_ulti_matt_(504700-047).jpg';
import Jet_Black_F4766062 from '@/assets/configurator/farben/farbeAussen/011.Jet_Black_(F4766062).jpg';
import Basaltgrau_glatt_701205_097 from '@/assets/configurator/farben/farbeAussen/012.Basaltgrau_glatt_(701205-097).jpg';
import Quarzgrau_glatt_703905_097 from '@/assets/configurator/farben/farbeAussen/013.Quarzgrau_glatt_(703905-097).jpg';
import Betongrau_glatt_702305_167 from '@/assets/configurator/farben/farbeAussen/014.Betongrau_glatt_(702305-167).jpg';
import Piryt_001_195 from '@/assets/configurator/farben/farbeAussen/015.Piryt_(001-195).jpg';
import Grau_715505_167 from '@/assets/configurator/farben/farbeAussen/016.Grau_(715505-167).jpg';
import Lichtgrau_725105_167 from '@/assets/configurator/farben/farbeAussen/017.Lichtgrau_(725105-167).jpg';
import Schiefergrau_glatt_0040_097 from '@/assets/configurator/farben/farbeAussen/018.Schiefergrau_glatt_(0040-097).jpg';
import DB703_Eisenglimmer_Schiefer_65002_097 from '@/assets/configurator/farben/farbeAussen/019.DB703_Eisenglimmer_Schiefer_(65002-097).jpg';
import Crowen_Platin_93001_195 from '@/assets/configurator/farben/farbeAussen/020.Crowen_Platin_(93001-195).jpg';
import Schwarzbraun_851805_167 from '@/assets/configurator/farben/farbeAussen/021.Schwarzbraun_(851805-167).jpg';
import Mahagoni_2097013_167 from '@/assets/configurator/farben/farbeAussen/022.Mahagoni_(2097013-167).jpg';
import Macore_3162002_167 from '@/assets/configurator/farben/farbeAussen/023.Macore_(3162002-167).jpg';
import Nussbaum_2178007_167 from '@/assets/configurator/farben/farbeAussen/024.Nussbaum_(2178007-167).jpg';
import Winchester_49240015_148 from '@/assets/configurator/farben/farbeAussen/025.Winchester(49240015-148).jpg';
import Streifen_Douglasie_3152009_167 from '@/assets/configurator/farben/farbeAussen/026.Streifen_Douglasie_(3152009-167).jpg';
import Oregon_2115008_167 from '@/assets/configurator/farben/farbeAussen/027.Oregon_(2115008-167).jpg';
import Eiche_Natur_3118076_167 from '@/assets/configurator/farben/farbeAussen/028.Eiche_Natur_(3118076-167).jpg';
import Turner_Oak_F470_3001 from '@/assets/configurator/farben/farbeAussen/029.Turner_Oak_(F470-3001).jpg';
import Scheffield_Oak_light_F456_3081 from '@/assets/configurator/farben/farbeAussen/030.Scheffield_Oak_light_(F456-3081).jpg';
import Dunkelgruen_612505_167 from '@/assets/configurator/farben/farbeAussen/031.Dunkelgrün_(612505-167).jpg';
import Moosgruen_600505_167 from '@/assets/configurator/farben/farbeAussen/032.Moosgrün_(600505-167).jpg';
import Dunkelrot_308105_167 from '@/assets/configurator/farben/farbeAussen/033.Dunkelrot_(308105-167).jpg';
import Cremeweiss_137905_167 from '@/assets/configurator/farben/farbeAussen/034.Cremeweiss_(137905-167).jpg';
import Weiss_FX_915205_168 from '@/assets/configurator/farben/farbeAussen/035.Weiss_FX_(915205-168).jpg';
import Weiss_Sand_ulti_matt_PX9152 from '@/assets/configurator/farben/farbeAussen/036.Weiss_Sand_ulti_matt_(PX9152).webp';
import Turner_Oak_Walnuss_470_3004 from '@/assets/configurator/farben/farbeAussen/037.Turner_Oak_Walnuss_(470-3004).jpg';
import Turner_Oak_Toffee_470_3004 from '@/assets/configurator/farben/farbeAussen/038.Turner_Oak_Toffee_(470-3004).jpg';
import Graphit_Sand_matt_436_6023 from '@/assets/configurator/farben/farbeAussen/039.Graphit_Sand_matt_(436-6023).jpg';
import Bronze_mattex_470_1029 from '@/assets/configurator/farben/farbeAussen/040.Bronze_mattex_(470-1029).jpg';

export const farbenAussenInnenOptions: SelectionItem[] = [
  {
    name: 'Weiss (ohne Dekorfarbe)',
    key: 'weiss',
    image: color3,
    colorCode: '0'
  },
  {
    name: 'Anthrazitgrau',
    image: Anthrazitgrau_1701605_167,
    key: 'anthrazitgrau_1701605_167',
    zoomable: true,
    colorCode: '1701605_167',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Basaltgrau',
    image: Basaltgrau_701205_167,
    key: 'basaltgrau_701205_167',
    zoomable: true,
    colorCode: '701205_167',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Quarzgrau',
    image: Quarzgrau_703905_167,
    key: 'quarzgrau_703905_167',
    zoomable: true,
    colorCode: '703905_167',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Schokobraun',
    image: Schokobraun_887505_167,
    key: 'schokobraun_887505_167',
    zoomable: true,
    colorCode: '887505_167',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Eiche dunkel',
    image: Eiche_dunkel_2052089_167,
    key: 'eiche_dunkel_2052089_167',
    zoomable: true,
    colorCode: '2052089_167',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Golden Oak',
    image: Golden_Oak_2178001_167,
    key: 'golden_oak_2178001_167',
    zoomable: true,
    colorCode: '2178001_167',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Anthrazitgrau glatt',
    image: Anthrazitgrau_glatt_701605_097,
    key: 'anthrazitgrau_glatt_701605_097',
    zoomable: true,
    colorCode: '701605_097',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Anthrazitgrau ulti matt',
    image: Anthrazitgrau_ulti_matt_504700_47,
    key: 'anthrazitgrau_ulti_matt_504700_47',
    zoomable: true,
    colorCode: '504700_47',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  // no price multiplier available yet for this
  // to be activated later on
/*   {
    name: 'Anthrazitgrau stylo',
    image: Anthrazitgrau_stylo_F436_4003,
    key: 'anthrazitgrau_stylo_f436_4003',
    zoomable: true,
    colorCode: 'F436_4003',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  }, */
  {
    name: 'Schwarz ulti matt',
    image: Schwarz_ulti_matt_504700_047,
    key: 'schwarz_ulti_matt_504700_047',
    zoomable: true,
    colorCode: '504700_047',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Jet Black',
    image: Jet_Black_F4766062,
    key: 'jet_black_f4766062',
    zoomable: true,
    colorCode: 'F4766062',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Basaltgrau glatt',
    image: Basaltgrau_glatt_701205_097,
    key: 'basaltgrau_glatt_701205_097',
    zoomable: true,
    colorCode: '701205_097',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Quarzgrau glatt',
    image: Quarzgrau_glatt_703905_097,
    key: 'quarzgrau_glatt_703905_097',
    zoomable: true,
    colorCode: '703905_097',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Betongrau glatt',
    image: Betongrau_glatt_702305_167,
    key: 'betongrau_glatt_702305_167',
    zoomable: true,
    colorCode: '702305_167',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Piryt',
    image: Piryt_001_195,
    key: 'piryt_001_195',
    zoomable: true,
    colorCode: '001_195',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Grau',
    image: Grau_715505_167,
    key: 'grau_715505_167',
    zoomable: true,
    colorCode: '715505_167',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Lichtgrau',
    image: Lichtgrau_725105_167,
    key: 'lichtgrau_725105_167',
    zoomable: true,
    colorCode: '725105_167',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Schiefergrau glatt',
    image: Schiefergrau_glatt_0040_097,
    key: 'schiefergrau_glatt_0040_097',
    zoomable: true,
    colorCode: '0040_097',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'DB703 Eisenglimmer Schiefer',
    image: DB703_Eisenglimmer_Schiefer_65002_097,
    key: 'db703_eisenglimmer_schiefer_65002_097',
    zoomable: true,
    colorCode: '65002_097',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Crowen Platin',
    image: Crowen_Platin_93001_195,
    key: 'crowen_platin_93001_195',
    zoomable: true,
    colorCode: '93001_195',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Schwarzbraun',
    image: Schwarzbraun_851805_167,
    key: 'schwarzbraun_851805_167',
    zoomable: true,
    colorCode: '851805_167',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Mahagoni',
    image: Mahagoni_2097013_167,
    key: 'mahagoni_2097013_167',
    zoomable: true,
    colorCode: '2097013_167',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Macore',
    image: Macore_3162002_167,
    key: 'macore_3162002_167',
    zoomable: true,
    colorCode: '3162002_167',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Nussbaum',
    image: Nussbaum_2178007_167,
    key: 'nussbaum_2178007_167',
    zoomable: true,
    colorCode: '2178007_167',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Winchester',
    image: Winchester_49240015_148,
    key: 'winchester_49240015_148',
    zoomable: true,
    colorCode: '49240015_148',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Streifen Douglasie',
    image: Streifen_Douglasie_3152009_167,
    key: 'streifen_douglasie_3152009_167',
    zoomable: true,
    colorCode: '3152009_167',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Oregon',
    image: Oregon_2115008_167,
    key: 'oregon_2115008_167',
    zoomable: true,
    colorCode: '2115008_167',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Eiche Natur',
    image: Eiche_Natur_3118076_167,
    key: 'eiche_natur_3118076_167',
    zoomable: true,
    colorCode: '3118076_167',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Turner Oak',
    image: Turner_Oak_F470_3001,
    key: 'turner_oak_f470_3001',
    zoomable: true,
    colorCode: 'F470_3001',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Scheffield Oak light',
    image: Scheffield_Oak_light_F456_3081,
    key: 'scheffield_oak_light_f456_3081',
    zoomable: true,
    colorCode: 'F456_3081',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Dunkelgrün',
    image: Dunkelgruen_612505_167,
    key: 'dunkelgruen_612505_167',
    zoomable: true,
    colorCode: '612505_167',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Moosgrün',
    image: Moosgruen_600505_167,
    key: 'moosgruen_600505_167',
    zoomable: true,
    colorCode: '600505_167',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Dunkelrot',
    image: Dunkelrot_308105_167,
    key: 'dunkelrot_308105_167',
    zoomable: true,
    colorCode: '308105_167',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Cremeweiss',
    image: Cremeweiss_137905_167,
    key: 'cremeweiss_137905_167',
    zoomable: true,
    colorCode: '137905_167',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Weiss FX',
    image: Weiss_FX_915205_168,
    key: 'weiss_fx_915205_168',
    zoomable: true,
    colorCode: '915205_168',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Weiss Sand ulti matt',
    image: Weiss_Sand_ulti_matt_PX9152,
    key: 'weiss_sand_ulti_matt_px9152',
    zoomable: true,
    colorCode: 'PX9152',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Turner Oak Walnuss',
    image: Turner_Oak_Walnuss_470_3004,
    key: 'turner_oak_walnuss_470_9036',
    zoomable: true,
    colorCode: '470_9036',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Turner Oak Toffee',
    image: Turner_Oak_Toffee_470_3004,
    key: 'turner_oak_toffee_470_3004',
    zoomable: true,
    colorCode: '470_3004',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Graphit Sand matt',
    image: Graphit_Sand_matt_436_6023,
    key: 'graphit_sand_matt_436_6023',
    zoomable: true,
    colorCode: '436_6023',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
  {
    name: 'Bronze mattex',
    image: Bronze_mattex_470_1029,
    key: 'bronze_mattex_470_1029',
    zoomable: true,
    colorCode: '470_1029',
    details: 'Dummy details for the Dekorfarben Aussen Options',
  },
];

export const farbenOptions: Record<string, SelectionItem[]> = {
  colorExt: farbenAussenInnenOptions,
  colorInt: farbenAussenInnenOptions,
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
      name: 'Lichtgrau abgerundet',
      image: lichtgrau,
      key: 'lichtgraua',
    },
    {
      name: 'Lichtgrau eckig',
      image: lichtgrau,
      key: 'lichtgraue',
    },
    {
      name: 'Schwarz abgerundet',
      image: schwarz,
      key: 'schwarza',
    },
    {
      name: 'Schwarz eckig',
      image: schwarz,
      key: 'schwarze',
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
      key: 'standart',
    },
    {
      name: 'Mit Druckknopf',
      key: 'druckknopf',
    },
    {
      name: 'Mit Schlüssel',
      key: 'schlüssel',
    },
  ],
};

export const fenstergriffeOptions: Record<string, SelectionItem[]> = {
  standart: standartFenstergriffeOptions,
  druckknopf: druckknopfFestergriffeOptions,
  schlüssel: schluesselFestergriffeOptions,
};
