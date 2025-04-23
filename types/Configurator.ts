import { GlassPaketProps } from '@/components/StepGlassPaket/StepGlassPaket';
import { SelectionItem } from '@/data/configuration_options';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { StaticImageData } from 'next/image';
import { ComponentType } from 'react';

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
  sicherheitsverglasung: SelectionItem;
  schallschutz: SelectionItem;
  sprossen: string | 'Nein';
  druckausgleichsventil: SelectionItem;
  adapter?: SelectionItem;
  revisionsöffnung?: SelectionItem;
  lamellenart?: SelectionItem;
  farbeRollladenkasten?: SelectionItem;
  farbeRollladenPanzer?: SelectionItem;
  farbeEndschiene?: SelectionItem;
  putzträger?: SelectionItem;
  schrägschnitt?: SelectionItem;
  multiWidth?: Record<string, number>;
  multiHeight?: Record<string, number>;
  obenMultiWidth?: Record<string, number>;
  untenMultiWidth?: Record<string, number>;
}

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

export interface Step<TProps = GlassPaketProps> {
  key: string;
  name: string;
  icon: IconDefinition;
  yesNo?: boolean;
  component?: ComponentType<TProps>;
}

export type GroupKey = 'basis' | 'farben' | 'verglasung' | 'sonnenschutz' | 'zusätze';
