import { faCopyright, faCropSimple, faFlask, faMaximize, faSignsPost } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface Step {
    key: string,
    name: string,
    icon: IconDefinition
}

export const steps = [
    {
        key: 'material',
        name: 'Material',
        icon: faFlask
    },
    {
        key: 'brand',
        name: 'Brand',
        icon: faCopyright
    },
    {
        key: 'profile',
        name: 'Profil',
        icon: faCropSimple
    },
    {
        key: 'direction',
        name: 'Richtung',
        icon: faSignsPost
    },
    {
        key: 'size',
        name: 'Größe',
        icon: faMaximize
    }
];