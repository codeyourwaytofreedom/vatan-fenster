import drutex from '../assets/configurator/brands/drutex.svg';
/* import schuco from '../assets/configurator/brands/schuco.png';
import gealan from '../assets/configurator/brands/gealan.webp';
import veka from '../assets/configurator/brands/veka.png';
import aluplast from '../assets/configurator/brands/aluplast.png'; */

import fensterart from '../assets/configurator/type/fensterart.png';

import flugel1 from '../assets/configurator/style/flugel1.png';
import flugel2 from '../assets/configurator/style/flugel2.png';
import flugel3 from '../assets/configurator/style/flugel3.png';


import profile1 from '../assets/configurator/profiles/profile1.jpg';

/* import closed from '../assets/configurator/directions/closed.png';
import left from '../assets/configurator/directions/left.png';
import upside from '../assets/configurator/directions/upside.png';
import double from '../assets/configurator/directions/double.png'; */

import plastic from '../assets/configurator/materials/plastic.jpeg';

/* import aluminum from '../assets/configurator/materials/aluminum.jpeg';
import wood from '../assets/configurator/materials/wood.jpg'; */
import { StaticImageData } from 'next/image';

type Image = StaticImageData;

export type SelectionItem = {
    name: string;
    image: Image;
    isActive?: boolean;
    children?: {
        profile?: SelectionItem[];
        type?: SelectionItem [];
        style?: SelectionItem [];
    };
}

export interface SelectionItemWithChilren extends SelectionItem {
    children: {
        profile?: SelectionItem[];
        type?: SelectionItem [];
        style?: SelectionItem [];
    };
}

type GenericItem = SelectionItemWithChilren | SelectionItem;

export const materials:GenericItem[] = [
    {
        name: 'Kunststoff (PVC)',
        image: plastic,
        isActive: true,
    },
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
        name: 'Drutex',
        image: drutex,
        isActive: true,
        children: {
            profile: [
                {
                    name: 'Iglo 5',
                    image: profile1,
                },
                {
                    name: 'Iglo 5 Classic',
                    image: profile1
                },
                {
                    name: 'Iglo Energy',
                    image: profile1
                },
                {
                    name: 'Iglo Energy Classic',
                    image: profile1
                },
                {
                    name: 'Iglo Light',
                    image: profile1
                },
                {
                    name: 'Iglo Edge',
                    image: profile1
                }
            ]
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

export const windowStyles:GenericItem[] = [
    {
        name: '1. Flügel',
        image: flugel1,
        children: {
            type: [
                {
                    name: 'Fest',
                    image: fensterart
                },
                {
                    name: 'Fester Flügel',
                    image: fensterart
                },
                {
                    name: 'Dreh-Kipp links ',
                    image: fensterart
                },
                {
                    name: 'Dreh-Kipp rechts ',
                    image: fensterart
                },
                {
                    name: 'Kipp',
                    image: fensterart
                },
                {
                    name: 'Dreh links',
                    image: fensterart
                },
                {
                    name: 'Dreh rechts',
                    image: fensterart
                }
            ]
        }
    },
    {
        name: '2. Flügel',
        image: flugel2,
        children: {
            type: [
                {
                    name: 'Fest + Fest',
                    image: fensterart
                },                
                {
                    name: 'Fester Flüger + Fester Flügel',
                    image: fensterart
                },
                {
                    name: 'Dreh-Kipp + Dreh-Kipp (Pfosten)',
                    image: fensterart
                },
                {
                    name: 'Dreh-Kipp + Dreh-Kipp (Stulp)',
                    image: fensterart
                },
                {
                    name: 'Fest + Dreh-Kipp',
                    image: fensterart
                },
                {
                    name: 'Dreh-Kipp + Fest',
                    image: fensterart
                },
                {
                    name: 'Dreh + Dreh-Kipp (Pfosten)',
                    image: fensterart
                },
                {
                    name: 'Dreh-Kipp + Dreh (Pfosten)',
                    image: fensterart
                },
                {
                    name: 'Kipp + Kipp',
                    image: fensterart
                }
            ]
        }
    },
    {
        name: '3. Flügel',
        image: flugel3,
        children: {
            type: [
                {
                    name: 'Fest + Fest + Fest',
                    image: fensterart
                }, 
                {
                    name: 'Fester Flügel + Fester Flügel + Fester Flügel',
                    image: fensterart
                },
                {
                    name: 'Kipp + Kipp + Kipp',
                    image: fensterart
                },
                {
                    name: 'Dreh-Kipp + Fest + Fest',
                    image: fensterart
                },
                {
                    name: 'Fest + Fest + Dreh-Kipp',
                    image: fensterart
                },
                {
                    name: 'Fest + Dreh-Kipp links + Fest',
                    image: fensterart
                },
                {
                    name: 'Fest + Dreh-Kipp rechts + Fest',
                    image: fensterart
                },
                {
                    name: 'Dreh-Kipp + Fest + Dreh- Kipp',
                    image: fensterart
                },
                {
                    name: 'Dreh-Kipp + Dreh links + Dreh- Kipp (Pfosten)',
                    image: fensterart
                },
                {
                    name: 'Dreh-Kipp + Dreh rechts + Dreh- Kipp (Pfosten)',
                    image: fensterart
                },
                {
                    name: 'Dreh-Kipp + Dreh links + Dreh- Kipp (Stulp)',
                    image: fensterart
                },
                {
                    name: 'Dreh-Kipp + Dreh rechts + Dreh- Kipp (Stulp)',
                    image: fensterart
                }
            ]
        }
    }
]

export const categoryItems = [
    {key: 'material', items: materials},
    {key: 'brand', items: brands}, 
    {key: 'style', items: windowStyles},
];