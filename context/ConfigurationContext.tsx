import { sonnenschutzApplicabilitySizes } from '@/data/common/common';
import {
  initialConfiguration,
  initialSubstyle,
  optionNo,
  zusatzeOnlyOpeningWindowOptions,
} from '@/data/configurationData';
import { minMaxSizes } from '@/data/minMaxSizes/minMaxSizes';
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
  innenAussenCompatibleText,
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
import { ColorCode } from '@/data/selectionItems/farbenData';
import { sprossenCards, sprossenPatterns } from '@/data/selectionItems/verglasungData';
import { sonnenschutzStepPacks, steps } from '@/data/steps';
import {
  FensterConfig,
  GroupKey,
  MinMaxSet,
  MinMaxSize,
  MinMaxSizes,
  SelectionItem,
  Step,
  SubStyle,
  WindowMaterial,
  WindowProfilePlastic,
  WindowStyle,
} from '@/types/Configurator';
import { calculateGlassPriceByM2, extractPriceFromTable, getColoringMultiplier } from '@/utils';
import { createContext, useState, ReactNode, useContext, useEffect } from 'react';

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

// Define the context type
interface ConfigurationContextType {
  configuration: FensterConfig;
  currentGroup: GroupKey;
  currentStep: Step | null;
  currentStepGroup: Step[];
  isLastStepInGroup: boolean;
  substyle: SubStyle;
  previousStep: Step;
  previousGroup: GroupKey;
  orderOfKeys: string[] | undefined;
  windowSectionCount: number;
  windowHandleNumber: number;
  motorCount: number;
  setConfiguration: React.Dispatch<React.SetStateAction<FensterConfig>>;
  setCurrentGroup: React.Dispatch<React.SetStateAction<GroupKey>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<Step | null>>;
  setSubStyle: React.Dispatch<React.SetStateAction<SubStyle>>;
  moveToNextStep: () => void;
  movePreviousGroup: () => void;
  moveNextGroup: () => void;
  getStepsForGroup: (key: GroupKey) => Step[];
  calculateTotalPrice: ({
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
    colorMidKey,
    druckausgleichsventilKey,
    sprossen,
    numberOfSections,
    windowHandleNumber,
    direction,
  }: PriceDeterminants) => number | null | undefined;
  getMinMaxSizes: (
    selectedMaterial: SelectionItem<WindowMaterial>,
    selectedStyle: SelectionItem,
    selectedProfile: SelectionItem,
    selectedType: SelectionItem
  ) => MinMaxSizes;
  showSonnenshutzNotApplicableWarning: () => boolean;
  getSonnenschutzPartitionPossibilities: () => number[];
}

// Create the context with a default value
const ConfiurationContext = createContext<ConfigurationContextType | undefined>(undefined);

// Provider component
export const ConfigurationProvider = ({ children }: { children: ReactNode }) => {
  const [configuration, setConfiguration] = useState<FensterConfig>(initialConfiguration);
  const [group, setCurrentGroup] = useState<GroupKey>('basis');
  const [currentStep, setCurrentStep] = useState<Step | null>(null);
  const [substyle, setSubStyle] = useState<SubStyle>(initialSubstyle);
  const [motorCount, setMotorCount] = useState<number>(1);

  const orderOfKeys =
    configuration.basis.style.name === 'Oberlicht'
      ? ['oben', 'unten']
      : configuration.basis.style.name === 'Unterlicht'
        ? ['unten', 'oben']
        : undefined;

  const getStepsForGroup = (group: GroupKey) => {
    // for sonnenschutz group, steps are built dynamically according to cover selection in Basis
    if (group === 'sonnenschutz') {
      const stepsForCover =
        sonnenschutzStepPacks[
          configuration.basis.cover.key as keyof typeof sonnenschutzStepPacks
        ] || [];
      if (motorCount === 2) {
        return stepsForCover.filter((step) => step.key !== 'antriebsseite');
      }
      return stepsForCover;
    }
    // farben steps changge if the window type has no handle
    if (group === 'farben') {
      let handleExists;
      if (
        'option' in configuration.basis.type &&
        'oben' in configuration.basis.type &&
        'unten' in configuration.basis.type
      ) {
        handleExists =
          configuration.basis.type.oben?.handleNumber &&
          configuration.basis.type.unten?.handleNumber;
        if (!handleExists) {
          return steps[group].filter((st) => st.key !== 'fenstergriffe');
        }
      }
      if (!Boolean('option' in configuration.basis.type)) {
        handleExists = (configuration.basis.type as SelectionItem).handleNumber;
      }
      if (!handleExists) {
        return steps[group].filter((st) => st.key !== 'fenstergriffe');
      }
    }
    // default steps for static groups
    return steps[group];
  };

  const currentStepPack = getStepsForGroup(group);

  const isLastStepInGroup = currentStep?.key === currentStepPack[currentStepPack.length - 1]?.key;

  const allGroups: GroupKey[] = ['basis', 'farben', 'verglasung', 'zusatze', 'sonnenschutz'];
  const visibleGroups: GroupKey[] =
    configuration.basis.cover.key === 'nein'
      ? allGroups.filter((g) => g !== 'sonnenschutz')
      : allGroups;

  const currentGroupIndex = visibleGroups.indexOf(group);
  const previousGroup = visibleGroups[currentGroupIndex - 1];

  const currentStepIndex = currentStepPack.indexOf(currentStep!);
  const nextStep = currentStepPack[currentStepIndex + 1];
  const previousStep = currentStepPack[currentStepIndex - 1];

  const windowSectionCount =
    'oben' in configuration.basis.type
      ? (configuration.basis.type.oben?.sectionNumber ?? 1) +
        (configuration.basis.type.unten?.sectionNumber ?? 1)
      : (configuration.basis.type.sectionNumber ?? 1);

  const windowHandleNumberTotal =
    'oben' in configuration.basis.type
      ? (configuration.basis.type.oben?.handleNumber ?? 0) +
        (configuration.basis.type.unten?.handleNumber ?? 0)
      : (configuration.basis.type.handleNumber ?? 0);

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

  const moveNextGroup = () => {
    const currentGroupIndex = visibleGroups.indexOf(group);
    const nextGroup = visibleGroups[currentGroupIndex + 1];
    const nextGroupSteps = getStepsForGroup(nextGroup);
    const firstStepInGroup = nextGroupSteps?.[0];
    if (nextGroup) {
      setTimeout(() => {
        setCurrentGroup(nextGroup);
        setCurrentStep(firstStepInGroup);
      }, 300);
    }
  };

  const movePreviousGroup = () => {
    if (previousGroup) {
      setTimeout(() => {
        setCurrentGroup(previousGroup);
      }, 300);
    }
  };

  const moveToNextStep = () => {
    if (nextStep) {
      setTimeout(() => {
        setCurrentStep(nextStep);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
    }
    if (!nextStep) {
      moveNextGroup();
    }
  };

  const getMinMaxSizes = (
    selectedMaterial: SelectionItem<WindowMaterial>,
    selectedStyle: SelectionItem,
    selectedProfile: SelectionItem,
    selectedType: SelectionItem
  ) => {
    const selectedMaterialKey = selectedMaterial.key;
    const selectedStyleKey = selectedStyle.key;
    const selectedProfileKey = selectedProfile.key;
    const selectedTypeKey = (selectedType as SelectionItem).key;

    const sizesByMaterial = minMaxSizes[selectedMaterialKey as keyof typeof minMaxSizes];
    const sizesByStyle = sizesByMaterial?.[selectedStyleKey as keyof typeof sizesByMaterial];
    const sizesByProfile = sizesByStyle?.[selectedProfileKey as keyof typeof sizesByStyle];
    const sizesByType = sizesByProfile?.[selectedTypeKey];

    if (selectedStyle.key)
      if (sizesByType) {
        // if price table exists for selected window type, extract the min-max sizes from the table
        const { width, height } = sizesByType;

        const minWidth = (width as MinMaxSet).min;
        const maxWidth = (width as MinMaxSet).max;

        const minHeight = (height as MinMaxSet).min;
        const maxHeight = (height as MinMaxSet).max;
        return {
          minWidth,
          maxWidth,
          minHeight,
          maxHeight,
        } as MinMaxSizes;
      }
    // no price list available so can't extract minMaxSizes

    // flugel1 min-max values for different types available for selected profile
    // F, FF, K, DL, DR, DKL, DKR
    // so calculate the min-max sizes via aggregating each section's min-max values
    const minMaxSizesForSingleSections =
      sizesByMaterial.flugel1[selectedProfileKey as keyof typeof sizesByMaterial.flugel1];

    // selected type's sections --> ie F+F --> DK + DL
    const selectedTypeSections = selectedType.sections;

    // for each section in the selected type, get min-max sizes
    let minWidthDerivedFromSections = 0;
    let maxWidthDerivedFromSections = 0;
    const minHeightForEachSection: number[] = [];
    const maxHeightForEachSection: number[] = [];

    const sectionsMinWidthPack: Record<string, number> = {};
    const sectionsMaxWidthPack: Record<string, number> = {};

    selectedTypeSections?.forEach((section) => {
      const minMaxForSingleSectionInSelectedType = minMaxSizesForSingleSections[section];
      const { width, height } = minMaxForSingleSectionInSelectedType as MinMaxSize;
      const minWidthForSection = width.min;
      const maxWidthForSection = width.max;

      sectionsMinWidthPack[section] = minWidthForSection;
      sectionsMaxWidthPack[section] = maxWidthForSection;

      minHeightForEachSection.push(height.min);
      maxHeightForEachSection.push(height.max);

      // calculate minWidth by summing minWidth values for each section
      minWidthDerivedFromSections += minWidthForSection;

      // calculate maxWidth by summing maxWidth values for each section
      maxWidthDerivedFromSections += maxWidthForSection;
    });

    // from all sections' minHeight, take the biggest
    const minHeight = Math.max(...minHeightForEachSection);

    // from all sections' maxHeight, take the smallest
    const maxHeight = Math.min(...maxHeightForEachSection);

    return {
      // total window width can never be greater than 4800
      minWidth: Math.min(minWidthDerivedFromSections, 4800),
      maxWidth: Math.min(maxWidthDerivedFromSections, 4800),
      minHeight: minHeight,
      maxHeight: maxHeight,
      // provide each section's minWidth so that sizer can use it an minSectionWidth
      sectionsMinWidthPack,
      sectionsMaxWidthPack,
    } as MinMaxSizes;
  };

  const getSonnenschutzPartitionPossibilities = () => {
    const possibilities = [];
    const selectedStyleKey = configuration.basis.style.key;
    const width = Number(configuration.basis.size?.w ?? 0);
    const sectionValid = (w: number) =>
      w > sonnenschutzSectionMinWidth && w <= sonnenschutzSectionMaxWidth;

    if (selectedStyleKey === 'flugel1') {
      if (sectionValid(width)) {
        return [1];
      }
      return [];
    }

    if (!configuration.basis.multiWidth) {
      return [];
    }

    const multiWidth = Object.values(configuration.basis.multiWidth);
    const allSectionsValid = multiWidth.every((w) => sectionValid(w));

    // if total width is valid, 1 Teilung is possible
    if (width <= sonnenschutzSectionMaxWidth) {
      possibilities.push(1);
    }

    // if all sections are valid
    if (allSectionsValid) {
      if (selectedStyleKey === 'flugel2') {
        if (multiWidth[0] === multiWidth[1]) {
          possibilities.push(2);
        }
        if (multiWidth[0] > multiWidth[1]) {
          possibilities.push(21);
        }
        if (multiWidth[1] > multiWidth[0]) {
          possibilities.push(12);
        }
      }
      if (selectedStyleKey === 'flugel3') {
        if (multiWidth[0] === multiWidth[1] && multiWidth[1] === multiWidth[2]) {
          possibilities.push(3);
        }
        if (
          sectionValid(multiWidth[0] + multiWidth[1]) &&
          multiWidth[0] + multiWidth[1] > multiWidth[2]
        ) {
          possibilities.push(21);
        }
        if (
          sectionValid(multiWidth[1] + multiWidth[2]) &&
          multiWidth[1] + multiWidth[2] > multiWidth[0]
        ) {
          possibilities.push(12);
        }
        possibilities.push(3);
      }
    }

    if (selectedStyleKey === 'flugel3') {
      const left2 = multiWidth[0] + multiWidth[1];
      const right1 = multiWidth[2];

      const _2_1_Possible = sectionValid(left2) && sectionValid(right1) && right1 === left2;

      const left1 = multiWidth[0];
      const right2 = multiWidth[1] + multiWidth[2];

      const _1_2_Possible = sectionValid(left1) && sectionValid(right2) && left1 === right2;

      if (_1_2_Possible || _2_1_Possible) {
        possibilities.push(2);
      }
    }

    return possibilities;
  };

  /* ------------------------- PRICING ------------------------- */

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
    colorMidKey,
    profileHeightKey,
    glasspaketKey,
    druckausgleichsventilKey,
    sprossen,
    numberOfSections,
    windowHandleNumber,
    direction,
  }: PriceDeterminants) => {
    if (width === 0 || height === 0) {
      return;
    }

    const priceListForSelectedWindowStyle = priceLists[selectedWindowStyleKey][selectedMaterialKey];

    const druckausgleichsventilPrice = druckausgleichsventilKey === 'ja' ? 15 : 0;

    const is3Layered = glasspaketKey.includes('3');

    let sprossenPrice = 0;

    if (sprossen !== 'Nein') {
      const style = sprossen.split('-')[0].toLowerCase().includes('innenliegen')
        ? 'innenliegen'
        : 'aufgesetzte';
      const thickhness = sprossen.split('-')[1].trim();
      const color = sprossen.split('-')[2];
      const type = sprossen.split('-')[3];

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
      windowHandleNumber,
      width,
      height,
      colorInteriorCode,
      colorExteriorCode,
      selectedProfileKey,
      // isOberLichtUnterlicht important to prevent double cost calculation for oben & unten rahmenverbreiterung
      isOberLichtUnterlicht: ['oberlicht', 'unterlicht'].includes(configuration.basis.style.key),
    });

    const sonnenschutzPrice = calculateSonnenschutzPrice({
      width,
      height,
      isOberLichtUnterlicht: ['oberlicht', 'unterlicht'].includes(configuration.basis.style.key),
    });

    const { colouringPriceMultiplier } = getColoringMultiplier({
      colorExteriorCode,
      colorInteriorCode,
      colorMidKey,
      selectedProfileKey,
    });

    // additional calculation for the glass
    // deafult is 2 layer of glass so multiply by 2
    let additionalWindowPrice = calculateGlassPriceByM2({
      w: width,
      h: height,
      is3Layered,
      selectedOrnamentKey,
    });

    // adjust for overlicht and unterlicht
    const priceListKey = `${selectedProfileKey}_${selectedTypeKey}`;

    // extract price for given width and height from csv tables
    const priceListForSelectedType = priceListForSelectedWindowStyle[priceListKey];

    const priceFromTable = extractPriceFromTable(priceListForSelectedType, width, height);
    if (priceFromTable) {
      // additional price from colorSelection for Exterior
      const colorPriceExterior = priceFromTable * colouringPriceMultiplier;

      // calculate additional cost when 77mm profile is selected
      const perimeterInMeter = ((width + height) * 2) / 1000;
      const profileHeightRelatedAdditionalCost =
        profileHeightKey === 'height75' ? perimeterInMeter * 16 : 0;
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

    // csv table does not exist for the selected type
    // so build the price based on sections
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

      if (!selectedType) alert('cant extract selectedType');
      const individualSectionTypeKeys = selectedType!.sections;

      if (!individualSectionTypeKeys) {
        //alert('no price list - to sections to calculate the price');
        return 0;
      }

      // we provide the multiWidth only when there is no priceTable for the selected windowType
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
          const priceFromTable = extractPriceFromTable(
            priceListForSectionType,
            multiWidth[index],
            height
          );

          if (!priceFromTable) {
            //alert('price can not be extracted for a given multiwidth section');
            return 0;
          }

          totalPrice += priceFromTable;
        }

        // additional price from colorSelection for Exterior
        const colorPriceExterior = totalPrice * colouringPriceMultiplier;

        const totalProfileHeightRelatedAdditionalCost = Object.values(multiWidth).reduce(
          (acc, sectionWidth) => {
            const perimeterInMeter = ((sectionWidth + height) * 2) / 1000;
            const profileHeightRelatedAdditionalCost =
              profileHeightKey === 'height75' ? perimeterInMeter * 16 : 0;
            return acc + profileHeightRelatedAdditionalCost;
          },
          0
        );

        return (
          totalPrice +
          additionalWindowPrice +
          colorPriceExterior +
          totalProfileHeightRelatedAdditionalCost +
          druckausgleichsventilPrice +
          sprossenPrice +
          zuzatsePrice +
          sonnenschutzPrice
        );
      }
    }
  };

  const calculateZusatzePrice = ({
    windowHandleNumber,
    width,
    height,
    colorInteriorCode,
    colorExteriorCode,
    selectedProfileKey,
    isOberLichtUnterlicht,
  }: {
    windowHandleNumber: number;
    width: number;
    height: number;
    colorInteriorCode: ColorCode;
    colorExteriorCode: ColorCode;
    selectedProfileKey: string;
    isOberLichtUnterlicht: boolean;
  }) => {
    /* ---------- calculate sicherheitsbeschlage price ---------- */
    //const selectedProfileKey = configuration.profile.key as WindowProfilePlastic;
    const sicherheitsbeschlageSubcategory =
      configuration.zusatze.sicherheitsbeschlage.subCategory?.key || '';

    const sicherheitsbeschlagePricesForProfile =
      sicherheitsbeschlagePricing[selectedProfileKey as WindowProfilePlastic];
    const sicherheitsbeschlageMultiplier =
      sicherheitsbeschlagePricesForProfile[sicherheitsbeschlageSubcategory] ?? 0;

    const sicherheitsbeschlagePrice = sicherheitsbeschlageMultiplier * windowHandleNumber;

    /* ---------- calculate verdecktLiegenderBeschlag price ---------- */
    const selectedVerdecktLiegenderBeschlagKey =
      configuration.zusatze.verdecktLiegenderBeschlag.key;
    const verdecktLiegenderBeschlagMultiplier =
      verdecktLiegenderBeschlagPricing[selectedVerdecktLiegenderBeschlagKey];

    const verdecktLiegenderBeschlagPrice = verdecktLiegenderBeschlagMultiplier * windowHandleNumber;

    /* ---------- calculate dünneSchweißnahtVPerfect price ---------- */
    const dünneSchweißnahtVPerfectPrice = 0;

    /* ---------- calculate reedKontakt price ---------- */
    const selectedReedKontaktKey = configuration.zusatze.reedKontakt.key;
    const reedKontaktMultiplier = reedKontaktPricing[selectedReedKontaktKey];
    const reedKontaktPrice = reedKontaktMultiplier * windowHandleNumber;

    /* ---------- calculate montagevorbohrungen price ---------- */
    const montagevorbohrungenPrice = 0;

    /* ---------- calculate lüftungssysteme price ---------- */

    const selectedLüftungssystemeKey = configuration.zusatze.lüftungssysteme.category.key;
    const selectedLüftungssystemeSubcategoryKey =
      configuration.zusatze.lüftungssysteme.subCategory?.key || '';

    const lüftungssystemePriceMultiplier =
      selectedLüftungssystemeKey === 'nein'
        ? 0
        : lüftungssystemePricing[selectedLüftungssystemeSubcategoryKey];
    const paar = configuration.zusatze.lüftungssysteme.paar ?? 0;

    const lüftungssystemePrice = lüftungssystemePriceMultiplier * paar * windowHandleNumber;

    /* ---------- calculate rahmenverbreiterung price ---------- */
    const rahmenverbreiterungPrice = calculateRahmenverbreiterungPrice({
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

  const calculateRahmenverbreiterungPrice = ({
    width,
    height,
    colorInteriorCode,
    colorExteriorCode,
    selectedProfileKey,
    isOberLichtUnterlicht,
  }: {
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

      // because price is calculated for oben + unten separately when oberlicht or unterlicht is selected
      // oben and unten rahmenverbreiterung leads to double pricing so /2 is
      const individualPrice =
        isOberLichtUnterlicht && ['oben', 'unten'].includes(key)
          ? (priceObj.pricePerMeter * measureToUse) / 2 + assemblyCost
          : priceObj.pricePerMeter * measureToUse + assemblyCost;

      return acc + individualPrice;
    }, 0);

    return total;
  };

  // adjustment needed for oberlicht and unterlicht
  const calculateSonnenschutzPrice = ({
    width,
    height,
    isOberLichtUnterlicht,
  }: {
    width: number;
    height: number;
    isOberLichtUnterlicht: boolean;
  }) => {
    if (configuration.basis.cover.key === 'nein') {
      return 0;
    }
    // to be adjusted !!!!!
    if (isOberLichtUnterlicht) {
      return 0;
    }
    const sonnenschutzPricingNotApplicable = showSonnenshutzNotApplicableWarning();

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

    const totalHeight = height + extensionHeight + additionalSonnenschutzHeight;
    const totalWidth = width + additionalWidth;

    const priceTableForSelectedSonnenschutz =
      sonnenschutzPriceLists[selectedCoverKey][insektenschutzKey];

    // steps that are priced same for single and multiple teilungs

    const rollladenPanzerPrice = calculateRollladenPanzerPrice(totalWidth, height);

    const farbeEndschienePrice = calculateFarbeEndschienePrice(totalWidth, height);

    const schragschnittPrice = calculateSchragschnittPrice(
      configuration.sonnenschutz.schragschnitt?.key ?? 'nein',
      selectedTeilungKey
    );

    const putztragerPrice = calculatePutztragerPrice(totalWidth);

    const antriebsartPrice = calculateAntriebsartPrice(selectedTeilungKey, totalWidth, height);

    const schallschutzmattePrice = calculateSchallschutzmattePrice(totalWidth);

    const montageartRollladenPrice = calculateMontageartRollladenPrice(totalWidth);

    const stahlkonsolePrice = calculateStahlkonsolePrice();

    // single window or one teilung selected
    if (selectedStyleKey === 'flugel1' || selectedTeilungKey === '1') {
      // RETURN SONNENSCHUTZ PRICE
      baseSonnentschutzPrice =
        extractPriceFromTable(priceTableForSelectedSonnenschutz, totalWidth, totalHeight) || 0;

      const rolladenKastenPrice =
        (calculateRolladenKastenPriceMultiplier() * baseSonnentschutzPrice) / 100;

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

    // flugel2 --> lamellenarts =  [2, 21, 12]
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

    // RETURN SONNENSCHUTZ PRICE
    baseSonnentschutzPrice = sectionsByTeilung.reduce((acc, sectionWidth) => {
      const sectionPrice =
        // !!
        // !!
        // additionalWidth varsa, multiTeilung larda fiyat çekerken nasıl dahil edilecek???
        // !!
        // !!
        // !!
        // !!
        extractPriceFromTable(priceTableForSelectedSonnenschutz, sectionWidth, totalHeight) || 0;
      return acc + sectionPrice;
    }, 0);

    const rolladenKastenPrice =
      (calculateRolladenKastenPriceMultiplier() * baseSonnentschutzPrice) / 100;

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

  const calculateRolladenKastenPriceMultiplier = () => {
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

  const calculateRollladenPanzerPrice = (width: number, height: number) => {
    if (!('farbeRollladenPanzer' in configuration.sonnenschutz)) {
      return 0;
    }
    const selectedRollladenPanzerKey = configuration.sonnenschutz.farbeRollladenPanzer?.key || '';
    const multiplier = farbeRollladenPanzerPrices[selectedRollladenPanzerKey] ?? 0;
    const area = (width * height) / 1000_000;
    return multiplier * area;
  };

  const calculateFarbeEndschienePrice = (width: number, height: number) => {
    if (!('farbeEndschiene' in configuration.sonnenschutz)) {
      return 0;
    }
    const selectedFarbeEndschieneKey = configuration.sonnenschutz.farbeEndschiene?.key ?? '';
    const multiplier = farbeEndschienePrices[selectedFarbeEndschieneKey] ?? 0;
    const area = (width * height) / 1000_000;
    return multiplier * area;
  };

  const calculatePutztragerPrice = (width: number) => {
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

  const calculateSchragschnittPrice = (schragschnittKey: string, teilungKey: string) => {
    if (!('schragschnitt' in configuration.sonnenschutz)) {
      return 0;
    }
    if (schragschnittKey === 'nein') {
      return 0;
    }
    const teilungCount = teilungKey === '1' ? 1 : teilungKey === '3' ? 3 : 2;
    return teilungCount * 10;
  };

  const calculateAntriebsartPrice = (teilungKey: string, width: number, height: number) => {
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

  const calculateSchallschutzmattePrice = (width: number) => {
    if (!('schallschutzmatte' in configuration.sonnenschutz)) {
      return 0;
    }
    if ((configuration.sonnenschutz.schallschutzmatte as SelectionItem)?.key === 'nein') {
      return 0;
    }
    return (width / 1000) * 50;
  };

  const calculateMontageartRollladenPrice = (width: number) => {
    if (!('montageartRollladen' in configuration.sonnenschutz)) {
      return 0;
    }
    if ((configuration.sonnenschutz.montageartRollladen as SelectionItem)?.key === 'nein') {
      return 0;
    }
    return (width / 1000) * 70;
  };

  const calculateStahlkonsolePrice = () => {
    if ('stahlkonsole' in configuration.sonnenschutz) {
      if ((configuration.sonnenschutz.stahlkonsole as SelectionItem)?.key === 'ja') {
        return 45;
      }
    }
    return 0;
  };

  // check if sonnenschutz is applicable for current SIZE
  const showSonnenshutzNotApplicableWarning = () => {
    const size = configuration.basis.size;
    const noCover = configuration.basis.cover.key === 'nein';

    if (!size || noCover) return false;

    const coverHeight =
      'height' in configuration.basis.cover ? configuration.basis.cover.height : 0;
    const totalHeight = Number(size.h) + Number(coverHeight);

    if (totalHeight > sonnenschutzMaxHeight) {
      return true;
    }

    if (totalHeight < sonnenschutzMinHeight) {
      return true;
    }

    const partitionsPossible = getSonnenschutzPartitionPossibilities();

    if (partitionsPossible.length === 0) {
      return true;
    }
    return false;
  };

  /* ------------------------- PRICING ------------------------- */

  const sonnenschutPartitionPossibilities = getSonnenschutzPartitionPossibilities();

  // for Lamellenart subcategory, select the first of possible partitions
  useEffect(() => {
    if (configuration.basis.cover.key !== 'nein') {
      if (sonnenschutPartitionPossibilities?.length > 0 && !showSonnenshutzNotApplicableWarning()) {
        const sonnenschutzSteps = getStepsForGroup('sonnenschutz');
        const lamellenartStep = sonnenschutzSteps.find((st) => st.key === 'lamellenart');

        if (!lamellenartStep || !('props' in lamellenartStep)) {
          return;
        }

        if (!('subCategoryItems' in lamellenartStep.props!)) {
          return;
        }

        const allPartitionOptions = Object.values(lamellenartStep.props?.subCategoryItems)[0];
        const partitionsPossible = getSonnenschutzPartitionPossibilities();

        const possibleOptions = allPartitionOptions.filter((o) =>
          partitionsPossible.includes(Number(o.key))
        );

        const existingOption = configuration.sonnenschutz.lamellenart?.subCategory;

        const optionToApply =
          existingOption && possibleOptions.some((op) => op.key === existingOption?.key)
            ? existingOption
            : possibleOptions[0];

        setConfiguration((pr) => {
          return {
            ...pr,
            sonnenschutz: {
              ...pr.sonnenschutz,
              lamellenart: {
                category: pr.sonnenschutz.lamellenart!.category,
                subCategory: optionToApply,
              },
            },
          };
        });
      }
    }
  }, [configuration.basis.size]);

  // if sprossen color is custom-color for innen-aussen, when innen-aussen combination changes,
  // reset the sprossen color
  useEffect(() => {
    const colorCodeExt = configuration.farben.colorExt.colorCode;
    const colorCodeInt = configuration.farben.colorInt.colorCode;
    const intExtDifferent =
      colorCodeExt !== '0' && colorCodeInt !== '0' && colorCodeExt !== colorCodeInt;

    const ausfgesetzeSelected = configuration.verglasung.sprossen
      .split('-')[0]
      .includes('Aufgesetzte');
    const intExtDifferentForAufgesetzte =
      ausfgesetzeSelected && (colorCodeExt !== '0' || colorCodeInt !== '0');

    if (
      !intExtDifferent &&
      !intExtDifferentForAufgesetzte &&
      configuration.verglasung.sprossen.includes(innenAussenCompatibleText)
    ) {
      const sprossenWidthItems = sprossenCards.find(
        (sp) => sp.name === configuration.verglasung.sprossen.split('-')[0]
      )?.items;
      const width = configuration.verglasung.sprossen.split('-')[1];
      const defaultColors = sprossenWidthItems?.find((it) => it.name === width)?.colors;
      const newColor = defaultColors![0].name;
      const newSprossen = configuration.verglasung.sprossen.replace(
        innenAussenCompatibleText,
        newColor
      );
      setConfiguration((pr) => {
        return {
          ...pr,
          verglasung: {
            ...pr.verglasung,
            sprossen: newSprossen,
          },
        };
      });
    }
  }, [
    configuration.farben.colorExt,
    configuration.farben.colorInt,
    configuration.verglasung.sprossen,
  ]);

  // when type changes, if new type is single-flugel, reset sicherheitsbeschlage selection
  useEffect(() => {
    if (windowSectionCount < 2) {
      if (configuration.zusatze.sicherheitsbeschlage.category.key === 'ja') {
        setConfiguration((pr) => {
          return {
            ...pr,
            zusatze: {
              ...pr.zusatze,
              sicherheitsbeschlage: {
                category: optionNo,
                subCategory: undefined,
              },
            },
          };
        });
      }
    }
  }, [configuration.basis.type]);

  // when profile changes, if aufbohrschutz is selected with IE or IEC profile, reset to basissicherheit
  useEffect(() => {
    if (
      configuration.zusatze.sicherheitsbeschlage.subCategory?.key === 'aufbohrschutz' &&
      ['IE', 'IEC'].includes(configuration.basis.profile.key)
    ) {
      setConfiguration((pr) => {
        return {
          ...pr,
          sicherheitsbeschlage: {
            category: pr.zusatze.sicherheitsbeschlage.category,
            subCategory: {
              key: 'basissicherheit',
              name: 'Basissicherheit',
            },
          },
        };
      });
    }
  }, [configuration.basis.profile]);

  // when window has no opening flugel, reset options which are only for opening windows in zusatze group
  useEffect(() => {
    if (windowHandleNumberTotal === 0) {
      zusatzeOnlyOpeningWindowOptions.forEach((optionKey) => {
        if (
          typeof configuration.zusatze[optionKey] === 'object' &&
          configuration.zusatze[optionKey] &&
          'category' in configuration.zusatze[optionKey]
        ) {
          setConfiguration((pr) => {
            return {
              ...pr,
              zusatze: {
                ...pr.zusatze,
                [optionKey]: {
                  category: optionNo,
                  subCategory: undefined,
                },
              },
            };
          });
        } else if ((configuration.zusatze[optionKey] as SelectionItem).key === 'ja') {
          setConfiguration((pr) => {
            return {
              ...pr,
              zusatze: {
                ...pr.zusatze,
                [optionKey]: optionNo,
              },
            };
          });
        }
      });
    }
  }, [windowHandleNumberTotal]);

  // --------
  useEffect(() => {
    const verlangerung = configuration.sonnenschutz.verlangerung;
    const extension = verlangerung?.name ? parseInt(verlangerung.name) : 0;
    if (extension > 30 && 'montageartRollladen' in configuration.sonnenschutz) {
      const selectedmontageartRollladen = configuration.sonnenschutz
        .montageartRollladen as SelectionItem;
      if (selectedmontageartRollladen.key !== 'nein') {
        setConfiguration((pr) => {
          return {
            ...pr,
            sonnenschutz: {
              ...pr.sonnenschutz,
              montageartRollladen: { key: 'nein', name: 'Ohne Rollladenmontage' },
            },
          };
        });
      }
    }
  }, [configuration.sonnenschutz.verlangerung]);

  useEffect(() => {
    const size = configuration.basis.size;
    if (!size) {
      setMotorCount(1);
      return;
    }

    const width = Number(size.w) || 0;
    const height = Number(size.h) || 0;

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

    const totalWidth = width + additionalWidth;
    const area = (totalWidth * height) / 1000_000;
    const weight = area * weightMultiplier;

    setMotorCount(weight < 21 ? 1 : 2);
  }, [
    configuration.basis.size,
    configuration.sonnenschutz.montageartRollladen,
    configuration.zusatze.rahmenverbreiterungAuswahlen,
  ]);

  return (
    <ConfiurationContext.Provider
      value={{
        configuration,
        currentStep,
        currentStepGroup: currentStepPack,
        isLastStepInGroup,
        currentGroup: group,
        substyle,
        orderOfKeys,
        previousStep,
        previousGroup,
        windowSectionCount,
        windowHandleNumber: windowHandleNumberTotal,
        motorCount,
        getStepsForGroup,
        setConfiguration,
        setCurrentStep,
        setCurrentGroup,
        setSubStyle,
        moveToNextStep,
        movePreviousGroup,
        moveNextGroup,
        calculateTotalPrice,
        getMinMaxSizes,
        showSonnenshutzNotApplicableWarning,
        getSonnenschutzPartitionPossibilities,
      }}
    >
      {children}
    </ConfiurationContext.Provider>
  );
};

// Custom hook to use the context
export const useConfiguration = () => {
  const context = useContext(ConfiurationContext);
  if (!context) {
    throw new Error('useConfiguration must be used within an OrderDetailsProvider');
  }
  return context;
};
