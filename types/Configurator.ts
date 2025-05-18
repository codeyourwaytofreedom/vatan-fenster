import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { StaticImageData } from 'next/image';
import { ComponentType, ReactNode } from 'react';

export interface Size {
  w: number | string | undefined;
  h: number | string | undefined;
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

export interface SubStyle {
  option: SelectionItem | null;
  oben: SelectionItem | null;
  unten: SelectionItem | null;
}

export interface Config {
  material: SelectionItem;
  brand: SelectionItem;
  profile: SelectionItem;
  style: SelectionItem;
  type: SelectionItem | SubStyle;
  cover: SelectionItem;
  size: boolean | Size;
  colorExt: SelectionItem;
  colorInt: SelectionItem;
  dichtungAussen: SelectionItem;
  dichtungInnen: SelectionItem;
  sealInt: SelectionItem;
  fenstergriffe?: { type: SelectionItem; choice: SelectionItem };
  glasspaket: SelectionItem;
  glasspaketWarmeKante: SelectionItem | 'Nein';
  ornament: SelectionItem;
  sicherheitsverglasung: Record<string, SelectionItem[]>;
  schallschutz: SelectionItem;
  sprossen: string | 'Nein';
  druckausgleichsventil: SelectionItem;
  adapter?: SelectionItem;
  revisionsöffnung?: SelectionItem;
  lamellenart?: {
    category: SelectionItem;
    subCategory: SelectionItem;
  };
  verlangerung?: number;
  antriebsart?: SelectionItem;
  farbeRollladenkasten?: SelectionItem;
  farbeRollladenPanzer?: SelectionItem;
  farbeEndschiene?: SelectionItem;
  farbeFührungsschiene?: SelectionItem;
  putzträger?: SelectionItem;
  schrägschnitt?: SelectionItem;
  multiWidth?: Record<string, number>;
  multiHeight?: Record<string, number>;
  obenMultiWidth?: Record<string, number>;
  untenMultiWidth?: Record<string, number>;
  sicherheitsbeschlage: 'Nein' | 'Ja';
  verdecktLiegenderBeschlag: 'Nein' | 'Ja';
  rahmenverbreitung: 'Nein' | 'Ja';
  rahmenverbreitungMontiert: 'Nein' | 'Ja';
  dünneSchweißnahtVPerfect:  'Nein' | 'Ja';
  verschlussüberwachungReedkontakt: 'Nein' | 'Ja';
  montagevorbohrungen: 'Nein' | 'Ja';
  lüftungssysteme: 'Nein' | 'Ja';
  druckausgleichsventilZusatze: 'Nein' | 'Ja';
  rahmenverbreitungAuswahlen: {
    links: number;
    rechts: number;
    oben: number;
    unten: number;
  }
}

export type DobuleSelection = {
  category: SelectionItem;
  subCategory: SelectionItem;
};

export interface ExtraConfig {
  colorExt: string;
  colorInt: string;
  dichtungAussen: string;
  dichtungInnen: string;
  sealInt: string;
  handle: string;
}

export interface Summary {
  key: string;
  summaryItem: { name?: string; image?: StaticImageData; detail?: Size | null };
}

export interface DoubleStepperProps {
  categoryItems: SelectionItem[];
  subCategoryItems: Record<string, SelectionItem[]>;
  configurationKey: keyof Config;
}

export interface YesNoSelectorProps {
  label: string;
}

export interface StepWithoutProps {
  key: string;
  name: string;
  icon: IconDefinition;
  yesNo?: boolean;
  withHoverZoom?: boolean;
  withoutDetails?: boolean;
}

export interface StepWithProps<TProps = unknown> {
  key: string;
  name: string;
  icon: IconDefinition;
  yesNo?: boolean;
  withHoverZoom?: boolean;
  withoutDetails?: boolean;
  component?: ComponentType<TProps>;
  props?: TProps;
}

export type Step =
  | StepWithoutProps
  | StepWithProps<DoubleStepperProps>
  | StepWithProps<YesNoSelectorProps>;

export type GroupKey = 'basis' | 'farben' | 'verglasung' | 'sonnenschutz' | 'zusatze';

type Image = StaticImageData;

export type SelectionItem = {
  key: string;
  name: string;
  image?: Image;
  isActive?: boolean;
  handleNumber?: number;
  colorCode?: string;
  colors?: SelectionItem[];
  zoomable?: boolean;
  sectionNumber?: number;
  component?: ReactNode;
  items?: SelectionItem[];
  disabled?: boolean;
  children?: {
    profile?: {
      'Kunststoff (PVC)': SelectionItem[];
      Aluminium: SelectionItem[];
    };
    type?: SelectionItem[];
    style?: SelectionItem[];
    substyle?: SelectionItem[];
    oben?: SelectionItem[];
    unten?: SelectionItem[];
  };
};

export type SubStyleOptions = {
  oberlicht: SelectionItem[];
  unterlicht: SelectionItem[];
};
