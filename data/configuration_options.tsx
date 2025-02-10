import drutex from '../assets/configurator/brands/drutex.svg';
/* import schuco from '../assets/configurator/brands/schuco.png';
import gealan from '../assets/configurator/brands/gealan.webp';
import veka from '../assets/configurator/brands/veka.png';
import aluplast from '../assets/configurator/brands/aluplast.png'; */

import fensterart from '../assets/configurator/type/fensterart.png';

import flugel1 from '../assets/configurator/style/flugel1/1-Flügel.webp';
import flugel2 from '../assets/configurator/style/flugel2/2-Flügel.webp';
import flugel3 from '../assets/configurator/style/flugel3/3-Flügel.webp';

import Iglo5 from '../assets/configurator/profiles/drutex/plastic/Iglo5.webp';
import Iglo5Classic from '../assets/configurator/profiles/drutex/plastic/Iglo5Classic.webp';
import Iglo5Energy from '../assets/configurator/profiles/drutex/plastic/Iglo5Energy.webp';
import Iglo5EnergyClassic from '../assets/configurator/profiles/drutex/plastic/Iglo5EnergyClassic.webp';

import MB45 from '../assets/configurator/profiles/drutex/aluminium/MB45.webp';
import MB70 from '../assets/configurator/profiles/drutex/aluminium/MB70.webp';
import MB70HI from '../assets/configurator/profiles/drutex/aluminium/MB70HI.webp';
import MB86NSI from '../assets/configurator/profiles/drutex/aluminium/MB86NSI.webp';


import IgloLight from '../assets/configurator/profiles/drutex/plastic/IgloLight.webp';

import plastic from '../assets/configurator/materials/plastic.jpeg';
import aluminum from '../assets/configurator/materials/aluminum.jpeg'

/* import aluminum from '../assets/configurator/materials/aluminum.jpeg';
import wood from '../assets/configurator/materials/wood.jpg'; */
import { StaticImageData } from 'next/image';

type Image = StaticImageData;

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
                    image: fensterart,
                    key: 'fest1'
                },
                {
                    name: 'Fester Flügel',
                    image: fensterart,
                    key: 'fester-flugel1'
                },
                {
                    name: 'Dreh-Kipp links',
                    image: fensterart,
                    key: 'dreh-kipp-links1'
                },
                {
                    name: 'Dreh-Kipp rechts',
                    image: fensterart,
                    key: 'dreh-kipp-rechts1'
                },
                {
                    name: 'Kipp',
                    image: fensterart,
                    key: 'kipp1'
                },
                {
                    name: 'Dreh links',
                    image: fensterart,
                    key: 'dreh-links1'
                },
                {
                    name: 'Dreh rechts',
                    image: fensterart,
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
                    image: fensterart,
                    key: 'fest-fest2'
                },
                {
                    name: 'Fester Flüger + Fester Flügel',
                    image: fensterart,
                    key: 'fester-flugel2'
                },
                {
                    name: 'Dreh-Kipp + Dreh-Kipp (Pfosten)',
                    image: fensterart,
                    key: 'dreh-kipp-pfosten2'
                },
                {
                    name: 'Dreh-Kipp + Dreh-Kipp (Stulp)',
                    image: fensterart,
                    key: 'dreh-kipp-stulp2'
                },
                {
                    name: 'Fest + Dreh-Kipp',
                    image: fensterart,
                    key: 'fest-dreh-kipp2'
                },
                {
                    name: 'Dreh-Kipp + Fest',
                    image: fensterart,
                    key: 'dreh-kipp-fest2'
                },
                {
                    name: 'Dreh + Dreh-Kipp (Pfosten)',
                    image: fensterart,
                    key: 'dreh-dreh-kipp-pfosten2'
                },
                {
                    name: 'Dreh-Kipp + Dreh (Pfosten)',
                    image: fensterart,
                    key: 'dreh-kipp-dreh-pfosten2'
                },
                {
                    name: 'Kipp + Kipp',
                    image: fensterart,
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
                    image: fensterart,
                    key: 'fest-fest-fest3'
                },
                {
                    name: 'Fester Flügel + Fester Flügel + Fester Flügel',
                    image: fensterart,
                    key: 'fester-flugel3'
                },
                {
                    name: 'Kipp + Kipp + Kipp',
                    image: fensterart,
                    key: 'kipp-kipp-kipp3'
                },
                {
                    name: 'Dreh-Kipp + Fest + Fest',
                    image: fensterart,
                    key: 'dreh-kipp-fest-fest3'
                },
                {
                    name: 'Fest + Fest + Dreh-Kipp',
                    image: fensterart,
                    key: 'fest-fest-dreh-kipp3'
                },
                {
                    name: 'Fest + Dreh-Kipp links + Fest',
                    image: fensterart,
                    key: 'fest-dreh-kipp-links-fest3'
                },
                {
                    name: 'Fest + Dreh-Kipp rechts + Fest',
                    image: fensterart,
                    key: 'fest-dreh-kipp-rechts-fest3'
                },
                {
                    name: 'Dreh-Kipp + Fest + Dreh-Kipp',
                    image: fensterart,
                    key: 'dreh-kipp-fest-dreh-kipp3'
                },
                {
                    name: 'Dreh-Kipp + Dreh links + Dreh-Kipp (Pfosten)',
                    image: fensterart,
                    key: 'dreh-kipp-dreh-links-pfosten3'
                },
                {
                    name: 'Dreh-Kipp + Dreh rechts + Dreh-Kipp (Pfosten)',
                    image: fensterart,
                    key: 'dreh-kipp-dreh-rechts-pfosten3'
                },
                {
                    name: 'Dreh-Kipp + Dreh links + Dreh-Kipp (Stulp)',
                    image: fensterart,
                    key: 'dreh-kipp-dreh-links-stulp3'
                },
                {
                    name: 'Dreh-Kipp + Dreh rechts + Dreh-Kipp (Stulp)',
                    image: fensterart,
                    key: 'dreh-kipp-dreh-rechts-stulp3'
                }
            ]
        }
    }
];


export const categoryItems = [
    {key: 'material', items: materials},
    {key: 'brand', items: brands}, 
    {key: 'style', items: windowStyles},
];