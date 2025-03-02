import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { StaticImageData } from 'next/image';

export interface Size {
  w: number | undefined;
  h: number | undefined;
  h_unten?: number | undefined;
}

export interface TripleSize {
  w_oben: number | undefined;
  h_oben: number | undefined;
  h_unten: number | undefined;
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
  material: string;
  brand: string;
  profile: string;
  style: string;
  type: string | object | null;
  size: boolean;
}

export interface ExtraConfig {
  colorExt: string;
  colorInt: string;
  colorMid: string;
  sealExt: string;
  sealInt: string;
  handle: string;
}

export interface Summary {
  key: string;
  summaryItem: { name?: string; image?: StaticImageData; detail?: Size | null };
}

export interface Step {
  key: string;
  name: string;
  icon: IconDefinition;
}
