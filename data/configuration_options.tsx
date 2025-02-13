import { StaticImageData } from 'next/image';

import drutex from '../assets/configurator/brands/drutex.svg';
/* import schuco from '../assets/configurator/brands/schuco.png';
import gealan from '../assets/configurator/brands/gealan.webp';
import veka from '../assets/configurator/brands/veka.png';
import aluplast from '../assets/configurator/brands/aluplast.png'; */

import img from '../assets/img.jpg';

import fensterart from '../assets/configurator/type/fensterart.png';

import flugel1 from '../assets/configurator/style/flugel1/1-Flügel.webp';
import flugel2 from '../assets/configurator/style/flugel2/2-Flügel.webp';
import flugel3 from '../assets/configurator/style/flugel3/3-Flügel.webp';
import oberlicht from '../assets/configurator/style/oberlicht/oberlicht.webp';
import unterlicht from '../assets/configurator/style/unterlicht/unterlicht.webp';


import Iglo5 from '../assets/configurator/profiles/drutex/plastic/Iglo5.webp';
import Iglo5Classic from '../assets/configurator/profiles/drutex/plastic/Iglo5Classic.webp';
import Iglo5Energy from '../assets/configurator/profiles/drutex/plastic/Iglo5Energy.webp';
import Iglo5EnergyClassic from '../assets/configurator/profiles/drutex/plastic/Iglo5EnergyClassic.webp';
import IgloLight from '../assets/configurator/profiles/drutex/plastic/IgloLight.webp';

import MB45 from '../assets/configurator/profiles/drutex/aluminium/MB45.webp';
import MB70 from '../assets/configurator/profiles/drutex/aluminium/MB70.webp';
import MB70HI from '../assets/configurator/profiles/drutex/aluminium/MB70HI.webp';
import MB86NSI from '../assets/configurator/profiles/drutex/aluminium/MB86NSI.webp';

import plastic from '../assets/configurator/materials/plastic.jpeg';
import aluminum from '../assets/configurator/materials/aluminum.jpeg'

/* import aluminum from '../assets/configurator/materials/aluminum.jpeg';
import wood from '../assets/configurator/materials/wood.jpg'; */


import ff_unten from '../assets/configurator/type/flugel_1/001.Fest.webp';
import fl_unten from '../assets/configurator/type/flugel_1/002.Fester Flügel.webp';
import dl_unten from '../assets/configurator/type/flugel_1/003.Dreh Links.webp';
import dr__unten from '../assets/configurator/type/flugel_1/004.Dreh Rechts.webp';
import kipp__unten from '../assets/configurator/type/flugel_1/005.Kipp.webp';
import dkl__unten from '../assets/configurator/type/flugel_1/006.Dreh-Kipp links.webp';
import dkr__unten from '../assets/configurator/type/flugel_1/007.Dreh-Kipp rechts.webp';

import f_oben from '../assets/configurator/style/oberlicht/flugel1_oben_flugel1_unten/Öffnungsrichtung_oben/001.Fest.webp';
//import ff_oben from '../assets/configurator/style/oberlicht/flugel1_oben_flugel1_unten/Öffnungsrichtung_oben/002.Fester Flügel.webp';
import dl_oben from '../assets/configurator/style/oberlicht/flugel1_oben_flugel1_unten/Öffnungsrichtung_oben/003.Dreh links.webp';
import dr_oben from '../assets/configurator/style/oberlicht/flugel1_oben_flugel1_unten/Öffnungsrichtung_oben/004.Dreh rechts.webp';
import dkl__oben from '../assets/configurator/style/oberlicht/flugel1_oben_flugel1_unten/Öffnungsrichtung_oben/006.Dreh-Kipp links.webp';
import dkr__oben from '../assets/configurator/style/oberlicht/flugel1_oben_flugel1_unten/Öffnungsrichtung_oben/007.Dreh-Kipp rechts.webp';


import ff from '../assets/configurator/type/flugel_2/001.Fest + Fest .webp';
import ffl_ffl from '../assets/configurator/type/flugel_2/002.Fester Flügel + Fester Flügel.webp';
import kipp_kipp from '../assets/configurator/type/flugel_2/003.Kipp + Kipp.webp';
import dreh_kipp_fest from '../assets/configurator/type/flugel_2/004.Dreh-Kipp + Fest.webp';
import fest_dreh_kipp from '../assets/configurator/type/flugel_2/005.Fest + Dreh-Kipp.webp';
import dreh_kipp_dreh_pfos from '../assets/configurator/type/flugel_2/006.Dreh-Kipp + Dreh (Pfosten).webp';
import dreh_dreh_kipp_pfos from '../assets/configurator/type/flugel_2/007.Dreh + Dreh-Kipp (Pfosten).webp';
import dreh_kipp_dreh_kipp_pfos from '../assets/configurator/type/flugel_2/008.Dreh-Kipp + Dreh-Kipp (Pfosten).webp';
import dreh_dreh_kipp_stulp from '../assets/configurator/type/flugel_2/010.Dreh + Dreh-Kipp (Stulp).webp';


import fff from '../assets/configurator/type/flugel3/001.Fest + Fest + Fest.webp';
import ff_ff_ff from '../assets/configurator/type/flugel3/002.Fester Flügel + Fester Flügel + Fester Flügel.webp';
import kkk from '../assets/configurator/type/flugel3/003.Kipp + Kipp + Kipp.webp';
import dkff from '../assets/configurator/type/flugel3/004.Dreh-Kipp + Fest + Fest .webp';
import ffdk from '../assets/configurator/type/flugel3/005.Fest + Fest + Dreh-Kipp .webp';
import fdklf from '../assets/configurator/type/flugel3/006.Fest + Dreh-Kipp Links + Fest .webp';
import fdkrf from '../assets/configurator/type/flugel3/007.Fest + Dreh-Kipp Rechts + Fest .webp';
import dkfdk from '../assets/configurator/type/flugel3/008.Dreh-Kipp + Fest + Dreh-Kipp.webp';
import dkdldkp from '../assets/configurator/type/flugel3/009.Dreh-Kipp + Dreh links + Dreh-Kipp (Pfosten).webp';
import dkdrdkp from '../assets/configurator/type/flugel3/010.Dreh-Kipp + Dreh rechts + Dreh-Kipp (Pfosten).webp';
import dkdldks from '../assets/configurator/type/flugel3/011.Dreh-Kipp + Dreh links + Dreh-Kipp (Stulp).webp';
import dkdrdks from '../assets/configurator/type/flugel3/012.Dreh-Kipp + Dreh rechts + Dreh-Kipp (Stulp).webp';


type Image = StaticImageData;

export type SubStyleOptions = {
    oberlicht: SelectionItem[],
    unterlicht: SelectionItem[]
}

export type SelectionItem = {
    key: string;
    name: string;
    image: Image;
    isActive?: boolean;
    children?: {
        profile?: {
            'Kunststoff (PVC)': SelectionItem[],
            'Aluminium': SelectionItem[]
        };
        type?: SelectionItem [];
        style?: SelectionItem [];
        substyle?: SelectionItem[];
        oben?: SelectionItem[];
        unten?: SelectionItem[];
    };
}

type GenericItem = SelectionItem;

export const materials:GenericItem[] = [
    {
        key: 'plastic',
        name: 'Kunststoff (PVC)',
        image: plastic,
    },
    {
        key: 'aluminum',
        name: 'Aluminium',
        image: aluminum,
    }
/*     {
        name: 'Aluminium',
        image: aluminum,
        isActive: false
    },
    {
        name: 'Holz',
        image: wood,
        isActive: false
    },
    {
        name: 'Kunststoff/Aluminium',
        image: aluminum,
        isActive: false
    },
    {
        name: 'Holz/Aluminium',
        image: wood,
        isActive: false
    } */
]

export const brands:GenericItem[] = [
    {
        key: 'drutex',
        name: 'Drutex',
        image: drutex,
        isActive: true,
        children: {
            profile: {
                'Kunststoff (PVC)': [
                    {
                        key: 'Iglo_5',
                        name: 'Iglo 5',
                        image: Iglo5,
                    },
                    {
                        key: 'Iglo_5_Classic',
                        name: 'Iglo 5 Classic',
                        image: Iglo5Classic
                    },
                    {
                        key: 'Iglo_Energy',
                        name: 'Iglo Energy',
                        image: Iglo5Energy
                    },
                    {
                        key: 'Iglo_Energy_Classic',
                        name: 'Iglo Energy Classic',
                        image: Iglo5EnergyClassic
                    },
                    {
                        key: 'Iglo_Light',
                        name: 'Iglo Light',
                        image: IgloLight
                    }
                ],
                'Aluminium': [
                    {
                        key: 'MB45',
                        name: 'MB45',
                        image: MB45,
                    },
                    {
                        key: 'MB70',
                        name: 'MB70',
                        image: MB70,
                    },
                    {
                        key: 'MB70HI',
                        name: 'MB70HI',
                        image: MB70HI,
                    },
                    {
                        key: 'MB86NSI',
                        name: 'MB86NSI',
                        image: MB86NSI,
                    }
                ]
            }
        },
    },
/*     {
        name: 'Schüco',
        image: schuco,
        isActive: false
    },
    {
        name: 'Gealan',
        image: gealan,
        isActive: false
    },
    {
        name: 'Veka',
        image: veka,
        isActive: false
    },
    {
        name: 'Aluplast',
        image: aluplast,
        isActive: false
    } */
]

export const windowStyles: GenericItem[] = [
    {
        name: '1. Flügel',
        image: flugel1,
        key: 'flugel1',
        children: {
            type: [
                {
                    name: 'Fest',
                    image: ff_unten,
                    key: 'fest1'
                },
                {
                    name: 'Fester Flügel',
                    image: fl_unten,
                    key: 'fester-flugel1'
                },
                {
                    name: 'Dreh-Kipp links',
                    image: dkl__unten,
                    key: 'dreh-kipp-links1'
                },
                {
                    name: 'Dreh-Kipp rechts',
                    image: dkr__unten,
                    key: 'dreh-kipp-rechts1'
                },
                {
                    name: 'Kipp',
                    image: kipp__unten,
                    key: 'kipp1'
                },
                {
                    name: 'Dreh links',
                    image: dl_unten,
                    key: 'dreh-links1'
                },
                {
                    name: 'Dreh rechts',
                    image: dr__unten,
                    key: 'dreh-rechts1'
                }
            ]
        }
    },
    {
        name: '2. Flügel',
        image: flugel2,
        key: 'flugel2',
        children: {
            type: [
                {
                    name: 'Fest + Fest',
                    image: ff,
                    key: 'fest-fest2'
                },
                {
                    name: 'Fester Flüger + Fester Flügel',
                    image: ffl_ffl,
                    key: 'fester-flugel2'
                },
                {
                    name: 'Dreh-Kipp + Dreh-Kipp (Pfosten)',
                    image: dreh_kipp_dreh_kipp_pfos,
                    key: 'dreh-kipp-pfosten2'
                },
                {
                    name: 'Dreh + Dreh-Kipp (Stulp)',
                    image: dreh_dreh_kipp_stulp,
                    key: 'dreh-kipp-stulp2'
                },
                {
                    name: 'Fest + Dreh-Kipp',
                    image: fest_dreh_kipp,
                    key: 'fest-dreh-kipp2'
                },
                {
                    name: 'Dreh-Kipp + Fest',
                    image: dreh_kipp_fest,
                    key: 'dreh-kipp-fest2'
                },
                {
                    name: 'Dreh + Dreh-Kipp (Pfosten)',
                    image: dreh_dreh_kipp_pfos,
                    key: 'dreh-dreh-kipp-pfosten2'
                },
                {
                    name: 'Dreh-Kipp + Dreh (Pfosten)',
                    image: dreh_kipp_dreh_pfos,
                    key: 'dreh-kipp-dreh-pfosten2'
                },
                {
                    name: 'Kipp + Kipp',
                    image: kipp_kipp,
                    key: 'kipp-kipp2'
                }
            ]
        }
    },
    {
        name: '3. Flügel',
        image: flugel3,
        key: 'flugel3',
        children: {
            type: [
                {
                    name: 'Fest + Fest + Fest',
                    image: fff,
                    key: 'fest-fest-fest3'
                },
                {
                    name: 'Fester Flügel + Fester Flügel + Fester Flügel',
                    image: ff_ff_ff,
                    key: 'fester-flugel3'
                },
                {
                    name: 'Kipp + Kipp + Kipp',
                    image: kkk,
                    key: 'kipp-kipp-kipp3'
                },
                {
                    name: 'Dreh-Kipp + Fest + Fest',
                    image: dkff,
                    key: 'dreh-kipp-fest-fest3'
                },
                {
                    name: 'Fest + Fest + Dreh-Kipp',
                    image: ffdk,
                    key: 'fest-fest-dreh-kipp3'
                },
                {
                    name: 'Fest + Dreh-Kipp links + Fest',
                    image: fdklf,
                    key: 'fest-dreh-kipp-links-fest3'
                },
                {
                    name: 'Fest + Dreh-Kipp rechts + Fest',
                    image: fdkrf,
                    key: 'fest-dreh-kipp-rechts-fest3'
                },
                {
                    name: 'Dreh-Kipp + Fest + Dreh-Kipp',
                    image: dkfdk,
                    key: 'dreh-kipp-fest-dreh-kipp3'
                },
                {
                    name: 'Dreh-Kipp + Dreh links + Dreh-Kipp (Pfosten)',
                    image: dkdldkp,
                    key: 'dreh-kipp-dreh-links-pfosten3'
                },
                {
                    name: 'Dreh-Kipp + Dreh rechts + Dreh-Kipp (Pfosten)',
                    image: dkdrdkp,
                    key: 'dreh-kipp-dreh-rechts-pfosten3'
                },
                {
                    name: 'Dreh-Kipp + Dreh links + Dreh-Kipp (Stulp)',
                    image: dkdldks,
                    key: 'dreh-kipp-dreh-links-stulp3'
                },
                {
                    name: 'Dreh-Kipp + Dreh rechts + Dreh-Kipp (Stulp)',
                    image: dkdrdks,
                    key: 'dreh-kipp-dreh-rechts-stulp3'
                }
            ]
        }
    },
    {
        key: 'oberlicht',
        name: 'Oberlicht',
        image: oberlicht,
        children: {
            substyle: [
                {
                    name: '1 Flügel oben - 1 Flügel unten',
                    image: fensterart,
                    key: 'flugel1_oben_flugel1_unten'
                },
                {
                    name: '1 Flügel oben - 2 Flügel unten',
                    image: fensterart,
                    key: 'flugel1_oben_flugel2_unten'
                },
                {
                    name: '1 Flügel oben - 3 Flügel unten',
                    image: fensterart,
                    key: 'flugel1_oben_flugel3_unten'
                },
                {
                    name: '2 Flügel oben - 1 Flügel unten',
                    image: fensterart,
                    key: 'flugel2_oben_flugel1_unten'
                },
                {
                    name: '2 Flügel oben - 2 Flügel unten',
                    image: fensterart,
                    key: 'flugel2_oben_flugel2_unten'
                }
            ]
        }
    },
    {
        key: 'unterlicht',
        name: 'Unterlicht',
        image: unterlicht,
    }
];


export const subStyleOptions: SubStyleOptions = {
    oberlicht: [
        {
            name: '1 Flügel Oben - 1 Flügen Unten',
            image: img,
            key: '1F01FU',
            children: {
                oben: [
                    {
                        key: 'f_oben',
                        name: 'Fest',
                        image: f_oben
                    },
                    {
                        key: 'ff_oben',
                        name: 'Fester Flügel',
                        image: f_oben
                    },
                    {
                        key: 'dl_oben',
                        name: 'Dreh Links',
                        image: dl_oben
                    },
                    {
                        key: 'dr_oben',
                        name: 'Dreh Rechts',
                        image: dr_oben
                    },
                    {
                        key: 'dkl_oben',
                        name: 'Dreh-Kipp Links',
                        image: dkl__oben
                    },
                    {
                        key: 'dkr_oben',
                        name: 'Dreh-Kipp Rechts',
                        image: dkr__oben
                    }
                ],
                unten: [
                    {
                        key: 'f',
                        name: 'Fest',
                        image: ff_unten
                    },
                    {
                        key: 'ff',
                        name: 'Fester Flügel',
                        image: ff
                    },
                    {
                        key: 'dl',
                        name: 'Dreh Links',
                        image: dl_unten
                    },
                    {
                        key: 'dr',
                        name: 'Dreh Rechts',
                        image: dr__unten
                    },
                    {
                        key: 'dkl',
                        name: 'Dreh-Kipp Links',
                        image: dkl__unten
                    },
                    {
                        key: 'dkr',
                        name: 'Dreh-Kipp Rechts',
                        image: dkr__unten
                    }
                ]
            }
        },
        {
            name: '1 Flügel Oben - 2 Flügen Unten',
            image: img,
            key: '1F02FU'
        },
        {
            name: '1 Flügel Oben - 3 Flügen Unten',
            image: img,
            key: '1F03FU'
        },
        {
            name: '2 Flügel Oben - 1 Flügen Unten',
            image: img,
            key: '1F02FU'
        },
        {
            name: '2 Flügel Oben - 2 Flügen Unten',
            image: img,
            key: '1F02FU'
        },
    ],
    unterlicht: []
}

export const categoryItems = [
    {key: 'material', items: materials},
    {key: 'brand', items: brands}, 
    {key: 'style', items: windowStyles},
];