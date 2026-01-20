import { sonnenschutzApplicabilitySizes } from '@/data/common/common';
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
import { FensterConfig, SelectionItem, SubStyle } from '@/types/Configurator';
import { extractPriceFromTable } from '@/utils';
import { getSonnenschutzPartitionPossibilitiesForSection } from '@/utils/sonnenschutzPartition';

export const getSonnenschutzPartitionPossibilities = (
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

export const calculateRolladenKastenPriceMultiplier = (configuration: FensterConfig) => {
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

export const calculateRollladenPanzerPrice = (
  configuration: FensterConfig,
  width: number,
  height: number
) => {
  if (!('farbeRollladenPanzer' in configuration.sonnenschutz)) {
    return 0;
  }
  const selectedRollladenPanzerKey = configuration.sonnenschutz.farbeRollladenPanzer?.key || '';
  const multiplier = farbeRollladenPanzerPrices[selectedRollladenPanzerKey] ?? 0;
  const area = (width * height) / 1000_000;
  return multiplier * area;
};

export const calculateFarbeEndschienePrice = (
  configuration: FensterConfig,
  width: number,
  height: number
) => {
  if (!('farbeEndschiene' in configuration.sonnenschutz)) {
    return 0;
  }
  const selectedFarbeEndschieneKey = configuration.sonnenschutz.farbeEndschiene?.key ?? '';
  const multiplier = farbeEndschienePrices[selectedFarbeEndschieneKey] ?? 0;
  const area = (width * height) / 1000_000;
  return multiplier * area;
};

export const calculatePutztragerPrice = (configuration: FensterConfig, width: number) => {
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

export const calculateSchragschnittPrice = (
  configuration: FensterConfig,
  schragschnittKey: string,
  teilungKey: string
) => {
  if (!('schragschnitt' in configuration.sonnenschutz)) {
    return 0;
  }
  if (schragschnittKey === 'nein') {
    return 0;
  }
  const teilungCount = teilungKey === '1' ? 1 : teilungKey === '3' ? 3 : 2;
  return teilungCount * 10;
};

export const calculateAntriebsartPrice = (
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

  const count = 1;

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

export const calculateSchallschutzmattePrice = (configuration: FensterConfig, width: number) => {
  if (!('schallschutzmatte' in configuration.sonnenschutz)) {
    return 0;
  }
  if ((configuration.sonnenschutz.schallschutzmatte as SelectionItem)?.key === 'nein') {
    return 0;
  }
  return (width / 1000) * 50;
};

export const calculateMontageartRollladenPrice = (configuration: FensterConfig, width: number) => {
  if (!('montageartRollladen' in configuration.sonnenschutz)) {
    return 0;
  }
  if ((configuration.sonnenschutz.montageartRollladen as SelectionItem)?.key === 'nein') {
    return 0;
  }
  return (width / 1000) * 70;
};

export const calculateStahlkonsolePrice = (configuration: FensterConfig) => {
  if ('stahlkonsole' in configuration.sonnenschutz) {
    if ((configuration.sonnenschutz.stahlkonsole as SelectionItem)?.key === 'ja') {
      return 45;
    }
  }
  return 0;
};

export const showSonnenshutzNotApplicableWarning = (configuration: FensterConfig) => {
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

export const calculateSonnenschutzPrice = ({
  configuration,
  selectedWindowStyleKey,
  width,
  height,
  isOberLichtUnterlicht,
}: {
  configuration: FensterConfig;
  selectedWindowStyleKey?: string;
  width: number;
  height: number;
  isOberLichtUnterlicht: boolean;
}) => {
  if (configuration.basis.cover.key === 'nein') {
    return 0;
  }
  const sonnenschutzPricingNotApplicable = showSonnenshutzNotApplicableWarning(configuration);

  if (sonnenschutzPricingNotApplicable) {
    return 0;
  }

  let baseSonnentschutzPrice = 0;

  const selectedTeilungKey = configuration.sonnenschutz.lamellenart?.subCategory.key ?? '';

  const selectedStyleKey = selectedWindowStyleKey ?? configuration.basis.style.key;
  const selectedCoverKey = configuration.basis.cover.key;


  const verlangerung = configuration.sonnenschutz.verlangerung;
  const extensionHeight = verlangerung?.name ? parseInt(verlangerung.name) : 0;

  const additionalSonnenschutzHeight =
    'height' in configuration.basis.cover
      ? Number(configuration.basis.cover.height) || 0
      : 0;

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

  const sonnenschutzHeight = isOberLichtUnterlicht
    ? Number(configuration.basis.size?.h ?? height)
    : height;
  const totalHeight = sonnenschutzHeight + extensionHeight + additionalSonnenschutzHeight;
  const totalWidth = width + additionalWidth;

  const priceTableForSelectedSonnenschutz =
    sonnenschutzPriceLists[selectedCoverKey][insektenschutzKey];

  const rollladenPanzerPrice = calculateRollladenPanzerPrice(
    configuration,
    totalWidth,
    sonnenschutzHeight
  );
  const farbeEndschienePrice = calculateFarbeEndschienePrice(
    configuration,
    totalWidth,
    sonnenschutzHeight
  );
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
    sonnenschutzHeight
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

  const multiWidth = isOberLichtUnterlicht ? configuration.basis.obenMultiWidth : configuration.basis.multiWidth;
  if (!multiWidth) {
    return 0;
  }

  let sectionsByTeilung: number[] = [];
  const allSectionWidths = Object.values(multiWidth);

  if (selectedStyleKey === 'flugel2') {
    sectionsByTeilung = allSectionWidths;
  }

  if (selectedStyleKey === 'flugel3') {
    if (selectedTeilungKey === '2') {
      const left2 = allSectionWidths[0] + allSectionWidths[1];
      const right2 = allSectionWidths[1] + allSectionWidths[2];
      if (left2 === allSectionWidths[2]) {
        sectionsByTeilung = [left2, allSectionWidths[2]];
      } else if (right2 === allSectionWidths[0]) {
        sectionsByTeilung = [allSectionWidths[0], right2];
      } else {
        const diff21 = Math.abs(left2 - allSectionWidths[2]);
        const diff12 = Math.abs(right2 - allSectionWidths[0]);
        sectionsByTeilung =
          diff21 <= diff12
            ? [left2, allSectionWidths[2]]
            : [allSectionWidths[0], right2];
      }
    }
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
