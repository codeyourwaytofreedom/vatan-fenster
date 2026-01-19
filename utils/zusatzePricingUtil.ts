import {
  lüftungssystemePricing,
  rahmenverbreiterungPricing,
  reedKontaktPricing,
  sicherheitsbeschlagePricing,
  verdecktLiegenderBeschlagPricing,
} from '@/data/priceLists/zuzatse/zuzatsePricing';
import { ColorCode } from '@/data/selectionItems/farbenData';
import { FensterConfig, WindowProfilePlastic } from '@/types/Configurator';

export const calculateRahmenverbreiterungPrice = ({
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

  const pricingList = rahmenverbreiterungPricing[selectedProfileKey][priceListKey];

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

export const calculateZusatzePrice = ({
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
  const sicherheitsbeschlageSubcategory =
    configuration.zusatze.sicherheitsbeschlage.subCategory?.key || '';
  const sicherheitsbeschlagePricesForProfile =
    sicherheitsbeschlagePricing[selectedProfileKey as WindowProfilePlastic];
  const sicherheitsbeschlageMultiplier =
    sicherheitsbeschlagePricesForProfile[sicherheitsbeschlageSubcategory] ?? 0;

  const sicherheitsbeschlagePrice = sicherheitsbeschlageMultiplier * windowHandleNumber;

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
