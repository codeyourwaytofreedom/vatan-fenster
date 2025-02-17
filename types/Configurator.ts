import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { StaticImageData } from 'next/image';

export interface Size {
  w: number | undefined;
  h: number | undefined;
}

export interface DoubleSize {
  oben: {
    w: number | undefined;
    h: number | undefined;
  };
  unten: {
    w: number | undefined;
    h: number | undefined;
  };
}

export interface Config {
  material: string | null;
  brand: string | null;
  profile: string | null;
  style: string | null;
  type: string | null;
  size: boolean;
}

export interface Summary {
  key: string;
  summaryItem: { name: string; image: StaticImageData };
}

export interface Step {
  key: string;
  name: string;
  icon: IconDefinition;
}
