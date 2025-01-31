import window_brand1 from '../assets/configurator/brands/window_brand1.jpg';
import window_brand2 from '../assets/configurator/brands/window_brand2.jpg';
import window_brand3 from '../assets/configurator/brands/window_brand3.jpg';

import profile1 from '../assets/configurator/profiles/profile1.jpg';

import closed from '../assets/configurator/directions/closed.png';
import left from '../assets/configurator/directions/left.png';
import upside from '../assets/configurator/directions/upside.png';
import double from '../assets/configurator/directions/double.png';

import aluminum from '../assets/configurator/materials/aluminum.jpeg';
import plastic from '../assets/configurator/materials/plastic.jpeg';
import wood from '../assets/configurator/materials/wood.jpg';


export const materials = [
    {
        name: 'Kunststoff',
        image: plastic
    },
    {
        name: 'Aluminium',
        image: aluminum
    },
    {
        name: 'Holz',
        image: wood
    }
]

export const brands = [
    {
        name: 'Alside',
        image: window_brand1
    },
    {
        name: 'JW',
        image: window_brand2
    },
    {
        name: 'Milgard',
        image: window_brand3
    }
]

export const profiles = [
    {
        name: 'Grs-28',
        image: profile1
    },
    {
        name: 'Yzg-66',
        image: profile1
    },
    {
        name: 'Ank-06',
        image: profile1
    }
]

export const directions = [
    {
        name: 'Closed',
        image: closed
    },
    {
        name: 'Left-side',
        image: left
    },
    {
        name: 'Upside',
        image: upside
    },
    {
        name: 'Double',
        image: double
    }
]

export const categoryItems = [
    {key: 'material', items: materials},
    {key: 'brand', items: brands}, 
    {key: 'profile', items: profiles}, 
    {key: 'direction', items: directions}
];