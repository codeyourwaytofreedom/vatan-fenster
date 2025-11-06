//common images
import { Config, SelectionItem, Size, SonnenschutzKey, WindowProfilePlastic } from '@/types/Configurator';

import { farbenOptions } from './selectionItems/farbenData';
import {
  brands,
  covers,
  customProfileHeights,
  materials,
  windowStyles,
} from './selectionItems/basisData';
import { verglasung } from './selectionItems/verglasungData';
import { sonnenschutzItems } from './selectionItems/sonnenschutzData';

//
// all items
//
export const categoryItems = [
  { key: 'material', items: materials },
  { key: 'brand', items: brands },
  { key: 'style', items: windowStyles },
  { key: 'cover', items: covers },
  { key: 'colorExt', items: farbenOptions.colorExt },
  { key: 'colorInt', items: farbenOptions.colorInt },
  { key: 'dichtungAussen', items: farbenOptions.dichtungAussen },
  { key: 'dichtungInnen', items: farbenOptions.dichtungInnen },
  { key: 'sealInt', items: farbenOptions.sealInt, dynamic: true },
  { key: 'fenstergriffe', items: farbenOptions.fenstergriffe },
  { key: 'glasspaket', items: verglasung.glasspaket },
  { key: 'ornament', items: verglasung.ornament },
  { key: 'sicherheitsverglasung', items: verglasung.sicherheitsverglasung, dynamic: true },
  { key: 'schallschutz', items: verglasung.schallschutz },
  { key: 'sprossen', items: [] },
  { key: 'druckausgleichsventil', items: verglasung.druckausgleichsventil },
  { key: 'adapter', items: sonnenschutzItems.adapter },
  { key: 'revisionsöffnung', items: sonnenschutzItems.revisionsöffnung },
  { key: 'lamellenartVorsatzrollladen', items: sonnenschutzItems.lamellenartVorsatzrollladen },
  { key: 'farbeRollladenPanzer', items: sonnenschutzItems.farbeRollladenPanzer },
  { key: 'farbeEndschiene', items: sonnenschutzItems.farbeEndschiene },
  { key: 'putzträger', items: sonnenschutzItems.putzträger },
  { key: 'putzträgerStyroporkasten', items: sonnenschutzItems.putzträgerStyroporkasten },
  { key: 'schrägschnitt', items: sonnenschutzItems.schrägschnitt },
  { key: 'antriebsart', items: sonnenschutzItems.antriebsart },
  { key: 'antriebsseite', items: sonnenschutzItems.antriebsseite },
  { key: 'schallschutzmatte', items: sonnenschutzItems.schallschutzmatte },
  { key: 'verläagerung', items: [] },
  { key: 'rollladen', items: sonnenschutzItems.rollladen },
  { key: 'montageartRollladen', items: sonnenschutzItems.montageartRollladen },
  { key: 'stahlkonsole', items: sonnenschutzItems.stahlkonsole },
  { key: 'kastentiefeStyroporkasten', items: sonnenschutzItems.kastentiefeStyroporkasten },
  { key: 'kastenform', items: sonnenschutzItems.kastenform },
  { key: 'kastentiefeAufStyroporkasten', items: sonnenschutzItems.kastentiefeAufStyroporkasten },
  { key: 'lamellenartAufStyroporkasten', items: sonnenschutzItems.lamellenartAufStyroporkasten },
  {
    key: 'farbeRaffstorelamelleAufStyroporkasten',
    items: sonnenschutzItems.farbeRaffstorelamelleAufStyroporkasten,
  },
  {
    key: 'farbeEndschieneAufStyroporkasten',
    items: sonnenschutzItems.farbeEndschieneAufStyroporkasten,
  },
  { key: 'antriebsartAufStyroporkasten', items: sonnenschutzItems.antriebsartAufStyroporkasten },
  {
    key: 'kastendämmungAufStyroporkasten',
    items: sonnenschutzItems.kastendämmungAufStyroporkasten,
  },
  { key: 'putzschieneAufStyroporkasten', items: sonnenschutzItems.putzschieneAufStyroporkasten },
  {
    key: 'führungsschieneAufStyroporkasten',
    items: sonnenschutzItems.führungsschieneAufStyroporkasten,
  },
  { key: 'montageartVorsatzrollladen', items: sonnenschutzItems.montageartVorsatzrollladen },
  { key: 'kastenheight', items: sonnenschutzItems.kastenheight },
  { key: 'kastenDimensions', items: sonnenschutzItems.kastenDimensions },
  { key: 'lamelleArtFarbe', items: sonnenschutzItems.lamelleArtFarbe },
  {
    key: 'farbeRaffstorelamelleVorsatzraffstore',
    items: sonnenschutzItems.farbeRaffstorelamelleVorsatzraffstore,
  },
  {
    key: 'farbeEndschieneVorsatzraffstore',
    items: sonnenschutzItems.farbeEndschieneVorsatzraffstore,
  },
  {
    key: 'antriebsartVorsatzraffstore',
    items: sonnenschutzItems.antriebsartVorsatzraffstore,
  },
  {
    key: 'windSonnensensoren',
    items: sonnenschutzItems.windSonnensensoren,
  },
  {
    key: 'putzschieneVorsatzraffstore',
    items: sonnenschutzItems.putzschieneVorsatzraffstore,
  },
  {
    key: 'führungsschieneVorsatzraffstore',
    items: sonnenschutzItems.führungsschieneVorsatzraffstore,
  },
];

export const optionYes = {
  key: 'ja',
  name: 'Ja',
};
export const optionNo = {
  key: 'nein',
  name: 'Nein',
};
export const yesNoOptions = [optionNo, optionYes];

export const initialSubstyle = {
  option: null,
  oben: null,
  unten: null,
};

export const initialSize: Size = {
  w: 1000,
  h: 1000,
};

//
// initial deafult configuration
//
export const initialConfiguration: Config = {
  material: materials[0],
  brand: brands[0],
  // adjust the type here
  profile: brands[0].children!.profile!.plastic[0] as SelectionItem<WindowProfilePlastic>,
  profileHeight: customProfileHeights[0],
  style: windowStyles[0],
  type: windowStyles[0].children!.type![0]!,
  cover: covers[0] as SelectionItem<SonnenschutzKey>,
  size: false,
  colorExt: farbenOptions.colorExt[0],
  colorInt: farbenOptions.colorInt[0],
  dichtungAussen: farbenOptions.dichtungAussen[0],
  dichtungInnen: farbenOptions.dichtungInnen[0],
  sealInt: farbenOptions.sealInt[0],
  glasspaket: verglasung.glasspaket[0],
  glasspaketWarmeKante: 'Nein',
  ornament: verglasung.ornament[0],
  sicherheitsverglasung: verglasung.sicherheitsverglasung['2-f-v'][0],
  schallschutz: verglasung.schallschutz[0],
  sprossen: 'Nein',
  druckausgleichsventil: verglasung.druckausgleichsventil[0],
  // adjust the type here
  sicherheitsbeschlage: { category: optionNo, subCategory: undefined },
  verdecktLiegenderBeschlag: optionNo,
  dünneSchweißnahtVPerfect: optionNo,
  reedKontakt: optionNo,
  montagevorbohrungen: optionNo,
  lüftungssysteme: { category: optionNo, subCategory: undefined, paar: undefined },
  rahmenverbreiterung: optionNo,
  rahmenverbreitungMontiert: optionNo,
  rahmenverbreiterungAuswahlen: {
    links: 0,
    rechts: 0,
    oben: 0,
    unten: 0,
  },
  druckausgleichsventilZusatze: optionNo,
};
