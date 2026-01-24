import { priceLists } from '@/data/priceLists/priceLists';
import {
  sprossenPricingList,
  sprossenPricingList3LayerGlassAufgesetzte,
} from '@/data/priceLists/sprossen/sprossen';
import { sprossenPatterns } from '@/data/selectionItems/verglasungData';
import { ColorCode } from '@/data/selectionItems/farbenData';
import {
  FensterConfig,
  SelectionItem,
  SubStyle,
  WindowMaterial,
  WindowStyle,
} from '@/types/Configurator';
import { calculateGlassPriceByM2, extractPriceFromTable, getColoringMultiplier } from '@/utils';
import { calculateSonnenschutzPrice } from '@/utils/sonnenschutzPricingUtil';
import { calculateZusatzePrice } from '@/utils/zusatzePricingUtil';
import { festergriffePricingObj } from '@/data/priceLists/farben/fenstergriffePricing';

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


export const calculateTotalPriceForConfiguration = (configuration: FensterConfig): number | null => {
  if (!configuration.basis.size) return null;

  const colorCodeExt = configuration.farben.colorExt.colorCode as ColorCode;
  const colorCodeInt = configuration.farben.colorInt.colorCode as ColorCode;
  const colorMidKey = configuration.farben.colorMid?.key || '';
  const profileHeightKey = configuration.basis.profileHeight?.key;
  const glasspaketKey = configuration.verglasung.glasspaket.key;
  const druckausgleichsventilKey = configuration.verglasung.druckausgleichsventil.key;
  const sprossen = configuration.verglasung.sprossen;
  let totalPrice = 0;

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

    const calculateFenstergriffePrice = () => {
      if('fenstergriffe' in configuration.farben && configuration.farben.fenstergriffe){
        const fenstergriffe = configuration.farben.fenstergriffe;
        const key = fenstergriffe.type.key;
        const choice = fenstergriffe.choice.key;
        const priceMultiplier = festergriffePricingObj[key as keyof typeof festergriffePricingObj][choice] || 0;
        return priceMultiplier * windowHandleNumber;
      }
      return 0;
    };

    const fenstergriffePrice = calculateFenstergriffePrice()

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

    const isOberLichtUnterlicht = ['oberlicht', 'unterlicht'].includes(
      configuration.basis.style.key
    );
    const shouldChargeSonnenschutz = !(isOberLichtUnterlicht && direction === 'unten');
    const sonnenschutzPrice = shouldChargeSonnenschutz
      ? (() => {
          try {
            return calculateSonnenschutzPrice({
              configuration,
              selectedWindowStyleKey,
              width,
              height,
              isOberLichtUnterlicht,
            });
          } catch (error) {
            console.error('Sonnenschutz price failed', error);
            return 0;
          }
        })()
      : 0;

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
        sonnenschutzPrice +
        fenstergriffePrice
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
          sonnenschutzPrice + 
          fenstergriffePrice
        );
      }
    }
  };

  try {
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
  } catch (error) {
    console.error('Total price calculation failed', error);
    return Math.round(totalPrice * 100) / 100;
  }
};
