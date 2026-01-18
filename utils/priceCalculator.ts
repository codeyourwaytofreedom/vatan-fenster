import { sonnenschutzApplicabilitySizes } from '@/data/common/common';
import { priceLists } from '@/data/priceLists/priceLists';
import {
  antriebsartPrices,
  antriebsartPrices_21,
  weightMultiplier,
} from '@/data/priceLists/sonnenschutz/antriebsartPrices';
import { farbeEndschienePrices } from '@/data/priceLists/sonnenschutz/farbeEndschienePrices';
import {
  farbenAussenInnenfarbenRolladenKastenPriceMultipliersLayer1,
  farbenAussenInnenfarbenRolladenKastenPriceMultipliersLayer2,
  farbenAussenInnenfarbenRolladenKastenPriceMultipliersLayer3,
} from '@/data/priceLists/sonnenschutz/farbeRolladenKastenPrices';
import { farbeRollladenPanzerPrices } from '@/data/priceLists/sonnenschutz/farbeRollladenPanzerPrices';
import { putztragerPrices } from '@/data/priceLists/sonnenschutz/putztragerPrices';
import { sonnenschutzPriceLists } from '@/data/priceLists/sonnenschutz/sonnenschutzPrices';
import {
  sprossenPricingList,
  sprossenPricingList3LayerGlassAufgesetzte,
} from '@/data/priceLists/sprossen/sprossen';
import {
  lüftungssystemePricing,
  rahmenverbreiterungPricing,
  reedKontaktPricing,
  sicherheitsbeschlagePricing,
  verdecktLiegenderBeschlagPricing,
} from '@/data/priceLists/zuzatse/zuzatsePricing';
import { sprossenPatterns } from '@/data/selectionItems/verglasungData';
import { ColorCode } from '@/data/selectionItems/farbenData';
import {
  FensterConfig,
  SelectionItem,
  SubStyle,
  WindowMaterial,
  WindowProfilePlastic,
  WindowStyle,
} from '@/types/Configurator';
import { calculateGlassPriceByM2, extractPriceFromTable, getColoringMultiplier } from '@/utils';
import { getSonnenschutzPartitionPossibilitiesForSection } from '@/utils/sonnenschutzPartition';

type PriceDeterminants = {
  selectedMaterialKey: WindowMaterial;
  selectedProfileKey: string;
  selectedWindowStyleKey: WindowStyle;
  selectedTypeKey: string;
  selectedOrnamentKey: string;
  width: number;
  height: number;
  multiWidth: Record<string, number> | undefined;
  colorExteriorCode: ColorCode;
  colorInteriorCode: ColorCode;
  colorMidKey: string;
  profileHeightKey: string | undefined;
  glasspaketKey: string;
  druckausgleichsventilKey: string;
  sprossen: string;
  numberOfSections: number;
  windowHandleNumber: number;
  direction?: 'oben' | 'unten';
};

const getSonnenschutzPartitionPossibilities = (
  configuration: FensterConfig,
  sectionMinWidth: number,
  sectionMaxWidth: number
) => {
  const selectedStyleKey = configuration.basis.style.key;
  const width = Number(configuration.basis.size?.w ?? 0);

  const oberlicht = (section: 'oben' | 'unten') => {
    const type = configuration.basis.type as SubStyle;
    const sectionNumber =
      section === 'oben' ? (type.oben?.sectionNumber ?? 1) : (type.unten?.sectionNumber ?? 1);
    const multiWidth =
      section === 'oben'
        ? Object.values(configuration.basis.obenMultiWidth ?? {})
        : Object.values(configuration.basis.untenMultiWidth ?? {});
    return getSonnenschutzPartitionPossibilitiesForSection({
      width,
      sectionNumber,
      multiWidth,
      sectionMinWidth,
      sectionMaxWidth,
    });
  };

  const unterlicht = (section: 'oben' | 'unten') => {
    const type = configuration.basis.type as SubStyle;
    const sectionNumber =
      section === 'oben' ? (type.unten?.sectionNumber ?? 1) : (type.oben?.sectionNumber ?? 1);
    const multiWidth =
      section === 'oben'
        ? Object.values(configuration.basis.obenMultiWidth ?? {})
        : Object.values(configuration.basis.untenMultiWidth ?? {});
    return getSonnenschutzPartitionPossibilitiesForSection({
      width,
      sectionNumber,
      multiWidth,
      sectionMinWidth,
      sectionMaxWidth,
    });
  };

  if (selectedStyleKey === 'oberlicht') {
    const oben = oberlicht('oben');
    const unten = oberlicht('unten');
    return oben.filter((p) => unten.includes(p));
  }

  if (selectedStyleKey === 'unterlicht') {
    const oben = unterlicht('oben');
    const unten = unterlicht('unten');
    return oben.filter((p) => unten.includes(p));
  }

  if (!['flugel1', 'flugel2', 'flugel3'].includes(selectedStyleKey)) {
    return [];
  }

  const sectionNumber =
    selectedStyleKey === 'flugel1' ? 1 : selectedStyleKey === 'flugel2' ? 2 : 3;
  const multiWidth = Object.values(configuration.basis.multiWidth ?? {});
  return getSonnenschutzPartitionPossibilitiesForSection({
    width,
    sectionNumber,
    multiWidth,
    sectionMinWidth,
    sectionMaxWidth,
  });
};

const calculateRolladenKastenPriceMultiplier = (configuration: FensterConfig) => {
  if (!('farbeRollladenkasten' in configuration.sonnenschutz)) {
    return 0;
  }
  const selectedRolladenKasten = configuration.sonnenschutz.farbeRollladenkasten;
  const rolladenKastenCategoryKey = selectedRolladenKasten?.category.key ?? '';
  const rolladenKastenColorKey = selectedRolladenKasten?.subCategory.key ?? '';

  const rolladenKastenPricingLayers =
    rolladenKastenCategoryKey === 'ffa'
      ? [farbenAussenInnenfarbenRolladenKastenPriceMultipliersLayer1]
      : rolladenKastenCategoryKey === 'ffkaa'
        ? [
            farbenAussenInnenfarbenRolladenKastenPriceMultipliersLayer1,
            farbenAussenInnenfarbenRolladenKastenPriceMultipliersLayer2,
          ]
        : rolladenKastenCategoryKey === 'ffkba'
          ? [
              farbenAussenInnenfarbenRolladenKastenPriceMultipliersLayer1,
              farbenAussenInnenfarbenRolladenKastenPriceMultipliersLayer2,
              farbenAussenInnenfarbenRolladenKastenPriceMultipliersLayer3,
            ]
          : [];

  const rolladenKastenPriceMultiplier = rolladenKastenPricingLayers.reduce((acc, layer) => {
    const multiplierInLayer =
      layer.find((col) => col.key === rolladenKastenColorKey)?.multiplier ?? 0;
    return acc + multiplierInLayer;
  }, 0);

  return rolladenKastenPriceMultiplier;
};

const calculateRollladenPanzerPrice = (configuration: FensterConfig, width: number, height: number) => {
  if (!('farbeRollladenPanzer' in configuration.sonnenschutz)) {
    return 0;
  }
  const selectedRollladenPanzerKey = configuration.sonnenschutz.farbeRollladenPanzer?.key || '';
  const multiplier = farbeRollladenPanzerPrices[selectedRollladenPanzerKey] ?? 0;
  const area = (width * height) / 1000_000;
  return multiplier * area;
};

const calculateFarbeEndschienePrice = (configuration: FensterConfig, width: number, height: number) => {
  if (!('farbeEndschiene' in configuration.sonnenschutz)) {
    return 0;
  }
  const selectedFarbeEndschieneKey = configuration.sonnenschutz.farbeEndschiene?.key ?? '';
  const multiplier = farbeEndschienePrices[selectedFarbeEndschieneKey] ?? 0;
  const area = (width * height) / 1000_000;
  return multiplier * area;
};

const calculatePutztragerPrice = (configuration: FensterConfig, width: number) => {
  if (!('putztrager' in configuration.sonnenschutz)) {
    return 0;
  }
  const putztrager = configuration.sonnenschutz.putztrager || {};
  if ('category' in putztrager) {
    const categoryKey = (putztrager.category as SelectionItem)?.key;
    if (categoryKey === 'nein' || !('subCategory' in putztrager)) {
      return 0;
    }
    const subcategoryKey = (putztrager.subCategory as SelectionItem)?.key;
    const multiplier = putztragerPrices[categoryKey][subcategoryKey];
    const putztragerPrice = multiplier * (width / 1000);
    return putztragerPrice;
  }
  return 0;
};

const calculateSchragschnittPrice = (configuration: FensterConfig, schragschnittKey: string, teilungKey: string) => {
  if (!('schragschnitt' in configuration.sonnenschutz)) {
    return 0;
  }
  if (schragschnittKey === 'nein') {
    return 0;
  }
  const teilungCount = teilungKey === '1' ? 1 : teilungKey === '3' ? 3 : 2;
  return teilungCount * 10;
};

const calculateAntriebsartPrice = (
  configuration: FensterConfig,
  teilungKey: string,
  width: number,
  height: number
) => {
  if (!('antriebsart' in configuration.sonnenschutz)) {
    return 0;
  }
  const area = (width * height) / 1000_000;
  const weight = area * weightMultiplier;

  const count = weight < 21 ? 1 : 2;

  let wellePrice = (width / 1000) * 5;
  if (
    configuration.sonnenschutz.antriebsart &&
    'category' in configuration.sonnenschutz.antriebsart &&
    'subCategory' in configuration.sonnenschutz.antriebsart
  ) {
    const categoryKey = (configuration.sonnenschutz.antriebsart?.category as SelectionItem)?.key;
    if (['gurt', 'kurbel'].includes(categoryKey)) {
      wellePrice = 0;
    }
    const subcategoryKey = (configuration.sonnenschutz.antriebsart?.subCategory as SelectionItem)
      ?.key;
    const priceObjs = weight > 21 ? antriebsartPrices_21 : antriebsartPrices;
    const multiplier = priceObjs[categoryKey][subcategoryKey];
    return multiplier * count + wellePrice;
  }
  return 0;
};

const calculateSchallschutzmattePrice = (configuration: FensterConfig, width: number) => {
  if (!('schallschutzmatte' in configuration.sonnenschutz)) {
    return 0;
  }
  if ((configuration.sonnenschutz.schallschutzmatte as SelectionItem)?.key === 'nein') {
    return 0;
  }
  return (width / 1000) * 50;
};

const calculateMontageartRollladenPrice = (configuration: FensterConfig, width: number) => {
  if (!('montageartRollladen' in configuration.sonnenschutz)) {
    return 0;
  }
  if ((configuration.sonnenschutz.montageartRollladen as SelectionItem)?.key === 'nein') {
    return 0;
  }
  return (width / 1000) * 70;
};

const calculateStahlkonsolePrice = (configuration: FensterConfig) => {
  if ('stahlkonsole' in configuration.sonnenschutz) {
    if ((configuration.sonnenschutz.stahlkonsole as SelectionItem)?.key === 'ja') {
      return 45;
    }
  }
  return 0;
};

const calculateRahmenverbreiterungPrice = ({
  configuration,
  width,
  height,
  colorInteriorCode,
  colorExteriorCode,
  selectedProfileKey,
  isOberLichtUnterlicht,
}: {
  configuration: FensterConfig;
  width: number;
  height: number;
  colorInteriorCode: ColorCode;
  colorExteriorCode: ColorCode;
  selectedProfileKey: string;
  isOberLichtUnterlicht: boolean;
}) => {
  if (configuration.zusatze.rahmenverbreiterung.key === 'nein') {
    return 0;
  }
  const assemblySelected = configuration.zusatze.rahmenverbreitungMontiert.key === 'ja';
  const rahmenverbreiterungAuswahlen = configuration.zusatze.rahmenverbreiterungAuswahlen;

  const priceListKey =
    colorExteriorCode === colorInteriorCode && colorInteriorCode === '0'
      ? 'innenAndAussenWeiss'
      : (colorInteriorCode === '0' || colorExteriorCode === '0') &&
          colorInteriorCode !== colorExteriorCode
        ? 'innenOrAussenWeiss'
        : 'innenAndAussenDifferent';

  const profileKey = selectedProfileKey as keyof typeof rahmenverbreiterungPricing;
  const pricingList = rahmenverbreiterungPricing[profileKey][priceListKey];

  const total = Object.entries(rahmenverbreiterungAuswahlen).reduce((acc, [key, value]) => {
    const measureToUse = (['links', 'rechts'].includes(key) ? height : width) / 1000;
    if (value === 0) {
      return acc;
    }
    const priceObj = pricingList[value];
    const assemblyCost =
      assemblySelected && isOberLichtUnterlicht
        ? priceObj.assembly / 2
        : assemblySelected && !isOberLichtUnterlicht
          ? priceObj.assembly
          : 0;

    const individualPrice =
      isOberLichtUnterlicht && ['oben', 'unten'].includes(key)
        ? (priceObj.pricePerMeter * measureToUse) / 2 + assemblyCost
        : priceObj.pricePerMeter * measureToUse + assemblyCost;

    return acc + individualPrice;
  }, 0);

  return total;
};

const calculateZusatzePrice = ({
  configuration,
  windowHandleNumber,
  width,
  height,
  colorInteriorCode,
  colorExteriorCode,
  selectedProfileKey,
  isOberLichtUnterlicht,
}: {
  configuration: FensterConfig;
  windowHandleNumber: number;
  width: number;
  height: number;
  colorInteriorCode: ColorCode;
  colorExteriorCode: ColorCode;
  selectedProfileKey: string;
  isOberLichtUnterlicht: boolean;
}) => {
  const selectedSicherheitsbeschlageKey =
    configuration.zusatze.sicherheitsbeschlage.subCategory?.key || '';
  const sicherheitsbeschlagePricesForProfile =
    sicherheitsbeschlagePricing[selectedProfileKey as WindowProfilePlastic];
  const sicherheitsbeschlageMultiplier =
    sicherheitsbeschlagePricesForProfile?.[selectedSicherheitsbeschlageKey] ?? 0;
  const sicherheitsbeschlagePrice =
    configuration.zusatze.sicherheitsbeschlage.category.key === 'ja'
      ? sicherheitsbeschlageMultiplier
      : 0;

  const selectedVerdecktLiegenderBeschlagKey = configuration.zusatze.verdecktLiegenderBeschlag.key;
  const verdecktLiegenderBeschlagMultiplier =
    verdecktLiegenderBeschlagPricing[selectedVerdecktLiegenderBeschlagKey];
  const verdecktLiegenderBeschlagPrice = verdecktLiegenderBeschlagMultiplier * windowHandleNumber;

  const dünneSchweißnahtVPerfectPrice = 0;

  const selectedReedKontaktKey = configuration.zusatze.reedKontakt.key;
  const reedKontaktMultiplier = reedKontaktPricing[selectedReedKontaktKey];
  const reedKontaktPrice = reedKontaktMultiplier * windowHandleNumber;

  const montagevorbohrungenPrice = 0;

  const selectedLüftungssystemeKey = configuration.zusatze.lüftungssysteme.category.key;
  const selectedLüftungssystemeSubcategoryKey =
    configuration.zusatze.lüftungssysteme.subCategory?.key || '';

  const lüftungssystemePriceMultiplier =
    selectedLüftungssystemeKey === 'nein'
      ? 0
      : lüftungssystemePricing[selectedLüftungssystemeSubcategoryKey];
  const paar = configuration.zusatze.lüftungssysteme.paar ?? 0;

  const lüftungssystemePrice = lüftungssystemePriceMultiplier * paar * windowHandleNumber;

  const rahmenverbreiterungPrice = calculateRahmenverbreiterungPrice({
    configuration,
    width,
    height,
    colorInteriorCode,
    colorExteriorCode,
    selectedProfileKey,
    isOberLichtUnterlicht,
  });

  return (
    sicherheitsbeschlagePrice +
    verdecktLiegenderBeschlagPrice +
    dünneSchweißnahtVPerfectPrice +
    reedKontaktPrice +
    montagevorbohrungenPrice +
    lüftungssystemePrice +
    rahmenverbreiterungPrice
  );
};

const showSonnenshutzNotApplicableWarning = (configuration: FensterConfig) => {
  const size = configuration.basis.size;
  const noCover = configuration.basis.cover.key === 'nein';

  if (!size || noCover) return false;

  const insektenschutzKey = configuration.sonnenschutz?.revisionsöffnung?.key.includes(
    'insektenschutz'
  )
    ? 'withInsektenschutz'
    : 'withoutInsektenschutz';

  const {
    sonnenschutzMinHeight,
    sonnenschutzMaxHeight,
    sonnenschutzSectionMinWidth,
    sonnenschutzSectionMaxWidth,
  } = sonnenschutzApplicabilitySizes[insektenschutzKey];

  const coverHeight =
    'height' in configuration.basis.cover ? configuration.basis.cover.height : 0;
  const totalHeight = Number(size.h) + Number(coverHeight);

  if (totalHeight > sonnenschutzMaxHeight) {
    return true;
  }

  if (totalHeight < sonnenschutzMinHeight) {
    return true;
  }

  const partitionsPossible = getSonnenschutzPartitionPossibilities(
    configuration,
    sonnenschutzSectionMinWidth,
    sonnenschutzSectionMaxWidth
  );

  return partitionsPossible.length === 0;
};

const calculateSonnenschutzPrice = ({
  configuration,
  width,
  height,
  isOberLichtUnterlicht,
  direction,
}: {
  configuration: FensterConfig;
  width: number;
  height: number;
  isOberLichtUnterlicht: boolean;
  direction?: 'oben' | 'unten';
}) => {
  if (configuration.basis.cover.key === 'nein') {
    return 0;
  }
  if (isOberLichtUnterlicht && direction && direction !== 'oben') {
    return 0;
  }
  const sonnenschutzPricingNotApplicable = showSonnenshutzNotApplicableWarning(configuration);

  if (sonnenschutzPricingNotApplicable) {
    return 0;
  }

  let baseSonnentschutzPrice = 0;

  const selectedTeilungKey = configuration.sonnenschutz.lamellenart?.subCategory.key ?? '';

  const selectedStyleKey = configuration.basis.style.key;
  const selectedCoverKey = configuration.basis.cover.key;

  const verlangerung = configuration.sonnenschutz.verlangerung;
  const extensionHeight = verlangerung?.name ? parseInt(verlangerung.name) : 0;

  const additionalSonnenschutzHeight =
    'height' in configuration.basis.cover ? (configuration.basis.cover.height as number) : 0;

  let additionalWidth = 0;

  if ('montageartRollladen' in configuration.sonnenschutz) {
    const montageartRollladenKey = (
      configuration.sonnenschutz.montageartRollladen as SelectionItem
    ).key;
    const { links, rechts } = configuration.zusatze.rahmenverbreiterungAuswahlen;
    const horizontalExtension = links + rechts;
    if (horizontalExtension > 0 && montageartRollladenKey === 'mrv') {
      additionalWidth = horizontalExtension;
    }
  }

  const insektenschutzKey = configuration.sonnenschutz?.revisionsöffnung?.key.includes(
    'insektenschutz'
  )
    ? 'withInsektenschutz'
    : 'withoutInsektenschutz';

  const totalHeight = height + extensionHeight + additionalSonnenschutzHeight;
  const totalWidth = width + additionalWidth;

  const priceTableForSelectedSonnenschutz =
    sonnenschutzPriceLists[selectedCoverKey][insektenschutzKey];

  const rollladenPanzerPrice = calculateRollladenPanzerPrice(configuration, totalWidth, height);
  const farbeEndschienePrice = calculateFarbeEndschienePrice(configuration, totalWidth, height);
  const schragschnittPrice = calculateSchragschnittPrice(
    configuration,
    configuration.sonnenschutz.schragschnitt?.key ?? 'nein',
    selectedTeilungKey
  );
  const putztragerPrice = calculatePutztragerPrice(configuration, totalWidth);
  const antriebsartPrice = calculateAntriebsartPrice(
    configuration,
    selectedTeilungKey,
    totalWidth,
    height
  );
  const schallschutzmattePrice = calculateSchallschutzmattePrice(configuration, totalWidth);
  const montageartRollladenPrice = calculateMontageartRollladenPrice(configuration, totalWidth);
  const stahlkonsolePrice = calculateStahlkonsolePrice(configuration);

  if (selectedStyleKey === 'flugel1' || selectedTeilungKey === '1') {
    baseSonnentschutzPrice =
      extractPriceFromTable(priceTableForSelectedSonnenschutz, totalWidth, totalHeight) || 0;

    const rolladenKastenPrice =
      (calculateRolladenKastenPriceMultiplier(configuration) * baseSonnentschutzPrice) / 100;

    return (
      baseSonnentschutzPrice +
      rolladenKastenPrice +
      rollladenPanzerPrice +
      farbeEndschienePrice +
      putztragerPrice +
      schragschnittPrice +
      antriebsartPrice +
      schallschutzmattePrice +
      montageartRollladenPrice +
      stahlkonsolePrice
    );
  }

  if (!configuration.basis.multiWidth) return 0;

  let sectionsByTeilung: number[] = [];
  const allSectionWidths = Object.values(configuration.basis.multiWidth);

  if (selectedStyleKey === 'flugel2') {
    sectionsByTeilung = allSectionWidths;
  }

  if (selectedStyleKey === 'flugel3') {
    if (selectedTeilungKey === '12') {
      sectionsByTeilung = [allSectionWidths[0], allSectionWidths[1] + allSectionWidths[2]];
    }
    if (selectedTeilungKey === '21') {
      sectionsByTeilung = [allSectionWidths[0] + allSectionWidths[1], allSectionWidths[2]];
    }
    if (selectedTeilungKey === '3') {
      sectionsByTeilung = allSectionWidths;
    }
  }

  baseSonnentschutzPrice = sectionsByTeilung.reduce((acc, sectionWidth) => {
    const sectionPrice =
      extractPriceFromTable(priceTableForSelectedSonnenschutz, sectionWidth, totalHeight) || 0;
    return acc + sectionPrice;
  }, 0);

  const rolladenKastenPrice =
    (calculateRolladenKastenPriceMultiplier(configuration) * baseSonnentschutzPrice) / 100;

  return (
    baseSonnentschutzPrice +
    rolladenKastenPrice +
    rollladenPanzerPrice +
    farbeEndschienePrice +
    putztragerPrice +
    schragschnittPrice +
    antriebsartPrice +
    schallschutzmattePrice +
    montageartRollladenPrice +
    stahlkonsolePrice
  );
};

export const calculateTotalPriceForConfiguration = (configuration: FensterConfig): number | null => {
  if (!configuration.basis.size) return null;

  const colorCodeExt = configuration.farben.colorExt.colorCode as ColorCode;
  const colorCodeInt = configuration.farben.colorInt.colorCode as ColorCode;
  const colorMidKey = configuration.farben.colorMid?.key || '';
  const profileHeightKey = configuration.basis.profileHeight?.key;
  const glasspaketKey = configuration.verglasung.glasspaket.key;
  const druckausgleichsventilKey = configuration.verglasung.druckausgleichsventil.key;
  const sprossen = configuration.verglasung.sprossen;

  const calculateTotalPrice = ({
    selectedMaterialKey,
    selectedProfileKey,
    selectedWindowStyleKey,
    selectedTypeKey,
    selectedOrnamentKey,
    width,
    height,
    multiWidth,
    colorExteriorCode,
    colorInteriorCode,
    colorMidKey: colorMid,
    profileHeightKey: profileHeight,
    glasspaketKey: glasspaket,
    druckausgleichsventilKey: druckausgleichsventil,
    sprossen: sprossenValue,
    numberOfSections,
    windowHandleNumber,
    direction,
  }: PriceDeterminants) => {
    if (width === 0 || height === 0) {
      return;
    }

    const priceListForSelectedWindowStyle = priceLists[selectedWindowStyleKey][selectedMaterialKey];

    const druckausgleichsventilPrice = druckausgleichsventil === 'ja' ? 15 : 0;
    const is3Layered = glasspaket.includes('3');

    let sprossenPrice = 0;

    if (sprossenValue !== 'Nein') {
      const style = sprossenValue.split('-')[0].toLowerCase().includes('innenliegen')
        ? 'innenliegen'
        : 'aufgesetzte';
      const thickhness = sprossenValue.split('-')[1].trim();
      const color = sprossenValue.split('-')[2];
      const type = sprossenValue.split('-')[3];

      const sprossenPriceItems =
        is3Layered && style === 'aufgesetzte'
          ? sprossenPricingList3LayerGlassAufgesetzte[style]?.[thickhness]
          : sprossenPricingList[style]?.[thickhness];

      const sprossenPriceMultipiler =
        sprossenPriceItems.find((it) => it.name === color)?.multiplier ?? 0;

      const sectionNumberInType =
        sprossenPatterns.find((pattern) => pattern.name === type)?.numberOfSections ?? 0;

      sprossenPrice = sectionNumberInType * sprossenPriceMultipiler * numberOfSections;
    }

    const zuzatsePrice = calculateZusatzePrice({
      configuration,
      windowHandleNumber,
      width,
      height,
      colorInteriorCode,
      colorExteriorCode,
      selectedProfileKey,
      isOberLichtUnterlicht: ['oberlicht', 'unterlicht'].includes(configuration.basis.style.key),
    });

    const sonnenschutzPrice = calculateSonnenschutzPrice({
      configuration,
      width,
      height,
      isOberLichtUnterlicht: ['oberlicht', 'unterlicht'].includes(configuration.basis.style.key),
      direction,
    });

    const { colouringPriceMultiplier } = getColoringMultiplier({
      colorExteriorCode,
      colorInteriorCode,
      colorMidKey: colorMid,
      selectedProfileKey,
    });

    let additionalWindowPrice = calculateGlassPriceByM2({
      w: width,
      h: height,
      is3Layered,
      selectedOrnamentKey,
    });

    const priceListKey = `${selectedProfileKey}_${selectedTypeKey}`;
    const priceListForSelectedType = priceListForSelectedWindowStyle[priceListKey];

    const priceFromTable = extractPriceFromTable(priceListForSelectedType, width, height);
    if (priceFromTable) {
      const colorPriceExterior = priceFromTable * colouringPriceMultiplier;
      const perimeterInMeter = ((width + height) * 2) / 1000;
      const profileHeightRelatedAdditionalCost =
        profileHeight === 'height75' ? perimeterInMeter * 16 : 0;
      return (
        additionalWindowPrice +
        priceFromTable +
        colorPriceExterior +
        profileHeightRelatedAdditionalCost +
        druckausgleichsventilPrice +
        sprossenPrice +
        zuzatsePrice +
        sonnenschutzPrice
      );
    }

    if (!priceListForSelectedType) {
      const selectedMaterial = configuration.basis.material.key;
      const priceListFor1Flugel = priceLists['flugel1'][selectedMaterial];
      let selectedType: SelectionItem;
      if (direction === 'oben') {
        selectedType = (configuration.basis.type as unknown as SubStyle).oben!;
      } else if (direction === 'unten') {
        selectedType = (configuration.basis.type as unknown as SubStyle).unten!;
      } else {
        selectedType = configuration.basis.type as SelectionItem;
      }

      const individualSectionTypeKeys = selectedType?.sections;
      if (!individualSectionTypeKeys) {
        return 0;
      }

      if (multiWidth) {
        let totalPrice = 0;
        additionalWindowPrice = calculateGlassPriceByM2({
          w: width,
          h: height,
          multiWidth,
          is3Layered,
          selectedOrnamentKey,
        });

        for (let index = 0; index < individualSectionTypeKeys.length; index++) {
          const typeKey = individualSectionTypeKeys?.[index];
          const priceKey = `${(configuration.basis.profile as SelectionItem).key}_${typeKey}`;
          const priceListForSectionType = priceListFor1Flugel[priceKey];

          if (!priceListForSectionType) {
            return 0;
          }

          const priceFromTableSection = extractPriceFromTable(
            priceListForSectionType,
            multiWidth[index],
            height
          );
          if (!priceFromTableSection) {
            return 0;
          }
          totalPrice += priceFromTableSection;
        }

        const colorPriceExterior = totalPrice * colouringPriceMultiplier;
        return (
          additionalWindowPrice +
          totalPrice +
          colorPriceExterior +
          druckausgleichsventilPrice +
          sprossenPrice +
          zuzatsePrice +
          sonnenschutzPrice
        );
      }
    }
  };

  try {
    let totalPrice = 0;
    if (
      configuration.basis.style.key === 'oberlicht' &&
      'oben' in configuration.basis.type &&
      'unten' in configuration.basis.type
    ) {
      const sectionNumberOben = configuration.basis.type.oben?.sectionNumber || 1;
      const windowStyleOben =
        sectionNumberOben === 1 ? 'flugel1' : sectionNumberOben === 2 ? 'flugel2' : 'flugel3';
      const obenPrice = calculateTotalPrice({
        selectedMaterialKey: configuration.basis.material.key,
        selectedProfileKey: configuration.basis.profile.key,
        selectedWindowStyleKey: windowStyleOben as WindowStyle,
        selectedTypeKey: configuration.basis.type.oben!.key,
        selectedOrnamentKey: configuration.verglasung.ornament.key,
        width: Number(configuration.basis.size.w),
        height: Number(configuration.basis.multiHeight?.obenHeight),
        multiWidth: configuration.basis.obenMultiWidth,
        colorExteriorCode: colorCodeExt!,
        colorInteriorCode: colorCodeInt!,
        colorMidKey,
        profileHeightKey,
        glasspaketKey,
        druckausgleichsventilKey,
        sprossen,
        numberOfSections: sectionNumberOben,
        windowHandleNumber: configuration.basis.type.oben?.handleNumber ?? 0,
        direction: 'oben',
      });

      const sectionNumberUnten = configuration.basis.type.unten?.sectionNumber || 1;
      const windowStyleUnten =
        sectionNumberUnten === 1 ? 'flugel1' : sectionNumberUnten === 2 ? 'flugel2' : 'flugel3';
      const untenPrice = calculateTotalPrice({
        selectedMaterialKey: configuration.basis.material.key,
        selectedProfileKey: configuration.basis.profile.key,
        selectedWindowStyleKey: windowStyleUnten as WindowStyle,
        selectedTypeKey: configuration.basis.type.unten!.key,
        selectedOrnamentKey: configuration.verglasung.ornament.key,
        width: Number(configuration.basis.size.w),
        height: Number(configuration.basis.multiHeight?.untenHeight),
        multiWidth: configuration.basis.untenMultiWidth,
        colorExteriorCode: colorCodeExt!,
        colorInteriorCode: colorCodeInt!,
        colorMidKey,
        profileHeightKey,
        glasspaketKey,
        druckausgleichsventilKey,
        sprossen,
        numberOfSections: sectionNumberUnten,
        windowHandleNumber: configuration.basis.type.unten?.handleNumber ?? 0,
        direction: 'unten',
      });

      totalPrice = (obenPrice ?? 0) + (untenPrice ?? 0);
      return Math.round(totalPrice * 100) / 100;
    }

    if (
      configuration.basis.style.key === 'unterlicht' &&
      'oben' in configuration.basis.type &&
      'unten' in configuration.basis.type
    ) {
      const sectionNumberOben = configuration.basis.type.unten?.sectionNumber || 1;
      const windowStyleOben =
        sectionNumberOben === 1 ? 'flugel1' : sectionNumberOben === 2 ? 'flugel2' : 'flugel3';
      const obenPrice = calculateTotalPrice({
        selectedMaterialKey: configuration.basis.material.key,
        selectedProfileKey: configuration.basis.profile.key,
        selectedWindowStyleKey: windowStyleOben as WindowStyle,
        selectedTypeKey: configuration.basis.type.unten!.key,
        selectedOrnamentKey: configuration.verglasung.ornament.key,
        width: Number(configuration.basis.size.w),
        height: Number(configuration.basis.multiHeight?.obenHeight),
        multiWidth: configuration.basis.obenMultiWidth,
        colorExteriorCode: colorCodeExt!,
        colorInteriorCode: colorCodeInt!,
        colorMidKey,
        profileHeightKey,
        glasspaketKey,
        druckausgleichsventilKey,
        sprossen,
        numberOfSections: sectionNumberOben,
        windowHandleNumber: configuration.basis.type.oben?.handleNumber ?? 0,
        direction: 'unten',
      });

      const sectionNumberUnten = configuration.basis.type.oben?.sectionNumber || 1;
      const windowStyleUnten =
        sectionNumberUnten === 1 ? 'flugel1' : sectionNumberUnten === 2 ? 'flugel2' : 'flugel3';
      const untenPrice = calculateTotalPrice({
        selectedMaterialKey: configuration.basis.material.key,
        selectedProfileKey: configuration.basis.profile.key,
        selectedWindowStyleKey: windowStyleUnten as WindowStyle,
        selectedTypeKey: configuration.basis.type.oben!.key,
        selectedOrnamentKey: configuration.verglasung.ornament.key,
        width: Number(configuration.basis.size.w),
        height: Number(configuration.basis.multiHeight?.untenHeight),
        multiWidth: configuration.basis.untenMultiWidth,
        colorExteriorCode: colorCodeExt!,
        colorInteriorCode: colorCodeInt!,
        colorMidKey,
        profileHeightKey,
        glasspaketKey,
        druckausgleichsventilKey,
        sprossen,
        numberOfSections: sectionNumberUnten,
        windowHandleNumber: configuration.basis.type.unten?.handleNumber ?? 0,
        direction: 'oben',
      });

      totalPrice = (obenPrice ?? 0) + (untenPrice ?? 0);
      return Math.round(totalPrice * 100) / 100;
    }

    if (['flugel1', 'flugel2', 'flugel3'].includes(configuration.basis.style.key)) {
      const numberOfSections =
        configuration.basis.style.key === 'flugel1'
          ? 1
          : configuration.basis.style.key === 'flugel2'
            ? 2
            : 3;

      totalPrice =
        calculateTotalPrice({
          selectedMaterialKey: configuration.basis.material.key,
          selectedProfileKey: configuration.basis.profile.key,
          selectedWindowStyleKey: configuration.basis.style.key as WindowStyle,
          selectedTypeKey: (configuration.basis.type as SelectionItem).key,
          selectedOrnamentKey: configuration.verglasung.ornament.key,
          width: Number(configuration.basis.size.w),
          height: Number(configuration.basis.size.h),
          multiWidth: configuration.basis.multiWidth,
          colorExteriorCode: colorCodeExt!,
          colorInteriorCode: colorCodeInt!,
          colorMidKey,
          profileHeightKey,
          glasspaketKey,
          druckausgleichsventilKey,
          sprossen,
          windowHandleNumber: (configuration.basis.type as SelectionItem)?.handleNumber ?? 0,
          numberOfSections,
        }) || 0;
    }

    return Math.round(totalPrice * 100) / 100;
  } catch {
    return null;
  }
};
