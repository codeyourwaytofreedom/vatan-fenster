import brand from '../assets/configurator/steps/brand.png';
import Profilsysteme from '../assets/configurator/steps/Profilsysteme.png';
import Öffnungsrichtung from '../assets/configurator/steps/Öffnungsrichtung.png';
import Größe from '../assets/configurator/steps/Größe.png';
import material from '../assets/configurator/steps/material.png';

import { StaticImageData } from 'next/image';

export interface Step {
    key: string,
    name: string,
    image: StaticImageData
}

export const steps = [
    {
        key: 'material',
        name: 'Material',
        image: material
    },
    {
        key: 'brand',
        name: 'Brand',
        image: brand
    },
    {
        key: 'profile',
        name: 'Profilsysteme',
        image: Profilsysteme
    },
    {
        key: 'direction',
        name: 'Öffnungsrichtung',
        image: Öffnungsrichtung
    },
    {
        key: 'size',
        name: 'Größe',
        image: Größe
    }
];