import { initialConfiguration, initialSubstyle, optionNo } from '@/data/configurationData';
import { minMaxSizes } from '@/data/minMaxSizes/minMaxSizes';
import { priceLists } from '@/data/priceLists/priceLists';
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
  Config,
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
  configuration: Config;
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
  setConfiguration: React.Dispatch<React.SetStateAction<Config>>;
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
}

// Create the context with a default value
const ConfiurationContext = createContext<ConfigurationContextType | undefined>(undefined);

// Provider component
export const ConfigurationProvider = ({ children }: { children: ReactNode }) => {
  const [configuration, setConfiguration] = useState<Config>(initialConfiguration);
  const [group, setCurrentGroup] = useState<GroupKey>('basis');
  const [currentStep, setCurrentStep] = useState<Step | null>(null);
  const [substyle, setSubStyle] = useState<SubStyle>(initialSubstyle);

  const orderOfKeys =
    configuration.style.name === 'Oberlicht'
      ? ['oben', 'unten']
      : configuration.style.name === 'Unterlicht'
        ? ['unten', 'oben']
        : undefined;

  const getStepsForGroup = (group: GroupKey) => {
    // for sonnenschutz group, steps are built dynamically according to cover selection in Basis
    if (group === 'sonnenschutz') {
      return (
        sonnenschutzStepPacks[configuration.cover.key as keyof typeof sonnenschutzStepPacks] || []
      );
    }
    // farben steps changge if the window type has no handle
    if (group === 'farben') {
      let handleExists;
      if ('option' in configuration.type) {
        handleExists =
          configuration.type.oben?.handleNumber && configuration.type.unten?.handleNumber;
        if (!handleExists) {
          return steps[group].filter((st) => st.key !== 'fenstergriffe');
        }
      }
      if (!Boolean('option' in configuration.type)) {
        handleExists = (configuration.type as SelectionItem).handleNumber;
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
    configuration.cover.key === 'nein' ? allGroups.filter((g) => g !== 'sonnenschutz') : allGroups;

  const currentGroupIndex = visibleGroups.indexOf(group);
  const previousGroup = visibleGroups[currentGroupIndex - 1];

  const currentStepIndex = currentStepPack.indexOf(currentStep!);
  const nextStep = currentStepPack[currentStepIndex + 1];
  const previousStep = currentStepPack[currentStepIndex - 1];

  const windowSectionCount =
    'oben' in configuration.type
      ? (configuration.type.oben?.sectionNumber ?? 1) +
        (configuration.type.unten?.sectionNumber ?? 1)
      : (configuration.type.sectionNumber ?? 1);

  const windowHandleNumberTotal =
    'oben' in configuration.type
      ? (configuration.type.oben?.handleNumber ?? 0) + (configuration.type.unten?.handleNumber ?? 0)
      : (configuration.type.handleNumber ?? 0);

  const zusatzeOnlyOpeningWindowOptions: (keyof Config)[] = [
    'sicherheitsbeschlage',
    'verdecktLiegenderBeschlag',
    'reedKontakt',
    'lüftungssysteme',
  ];

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
      // isOberLichtUnterlicht important to prevent double cost calculation for oben & unten rahmenverbreiterung
      isOberLichtUnterlicht: ['oberlicht', 'unterlicht'].includes(configuration.style.key),
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
        zuzatsePrice
      );
    }

    // csv table does not exist for the selected type
    // so build the price based on sections
    if (!priceListForSelectedType) {
      const selectedMaterial = configuration.material.key;
      const priceListFor1Flugel = priceLists['flugel1'][selectedMaterial];
      let selectedType: SelectionItem;
      if (direction === 'oben') {
        selectedType = (configuration.type as SubStyle).oben!;
      } else if (direction === 'unten') {
        selectedType = (configuration.type as SubStyle).unten!;
      } else {
        selectedType = configuration.type as SelectionItem;
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
          const priceKey = `${(configuration.profile as SelectionItem).key}_${typeKey}`;
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
          zuzatsePrice
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
    isOberLichtUnterlicht,
  }: {
    windowHandleNumber: number;
    width: number;
    height: number;
    colorInteriorCode: ColorCode;
    colorExteriorCode: ColorCode;
    isOberLichtUnterlicht: boolean;
  }) => {
    /* ---------- calculate sicherheitsbeschlage price ---------- */
    const selectedProfileKey = configuration.profile.key as WindowProfilePlastic;
    const sicherheitsbeschlageSubcategory =
      configuration.sicherheitsbeschlage.subCategory?.key || '';

    const sicherheitsbeschlagePricesForProfile = sicherheitsbeschlagePricing[selectedProfileKey];
    const sicherheitsbeschlageMultiplier =
      sicherheitsbeschlagePricesForProfile[sicherheitsbeschlageSubcategory] ?? 0;

    const sicherheitsbeschlagePrice = sicherheitsbeschlageMultiplier * windowHandleNumber;

    /* ---------- calculate verdecktLiegenderBeschlag price ---------- */
    const selectedVerdecktLiegenderBeschlagKey = configuration.verdecktLiegenderBeschlag.key;
    const verdecktLiegenderBeschlagMultiplier =
      verdecktLiegenderBeschlagPricing[selectedVerdecktLiegenderBeschlagKey];

    const verdecktLiegenderBeschlagPrice = verdecktLiegenderBeschlagMultiplier * windowHandleNumber;

    /* ---------- calculate dünneSchweißnahtVPerfect price ---------- */
    const dünneSchweißnahtVPerfectPrice = 0;

    /* ---------- calculate reedKontakt price ---------- */
    const selectedReedKontaktKey = configuration.reedKontakt.key;
    const reedKontaktMultiplier = reedKontaktPricing[selectedReedKontaktKey];
    const reedKontaktPrice = reedKontaktMultiplier * windowHandleNumber;

    /* ---------- calculate montagevorbohrungen price ---------- */
    const montagevorbohrungenPrice = 0;

    /* ---------- calculate lüftungssysteme price ---------- */

    const selectedLüftungssystemeKey = configuration.lüftungssysteme.category.key;
    const selectedLüftungssystemeSubcategoryKey =
      configuration.lüftungssysteme.subCategory?.key || '';

    const lüftungssystemePriceMultiplier =
      selectedLüftungssystemeKey === 'nein'
        ? 0
        : lüftungssystemePricing[selectedLüftungssystemeSubcategoryKey];
    const paar = configuration.lüftungssysteme.paar ?? 0;

    const lüftungssystemePrice = lüftungssystemePriceMultiplier * paar * windowHandleNumber;

    /* ---------- calculate rahmenverbreiterung price ---------- */
    const rahmenverbreiterungPrice = calculateRahmenverbreiterungPrice({
      width,
      height,
      colorInteriorCode,
      colorExteriorCode,
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
    isOberLichtUnterlicht,
  }: {
    width: number;
    height: number;
    colorInteriorCode: ColorCode;
    colorExteriorCode: ColorCode;
    isOberLichtUnterlicht: boolean;
  }) => {
    if (configuration.rahmenverbreiterung.key === 'nein') {
      return 0;
    }
    const assemblySelected = configuration.rahmenverbreitungMontiert.key === 'ja';
    const rahmenverbreiterungAuswahlen = configuration.rahmenverbreiterungAuswahlen;

    const priceListKey =
      colorExteriorCode === colorInteriorCode && colorInteriorCode === '0'
        ? 'innenAndAussenWeiss'
        : (colorInteriorCode === '0' || colorExteriorCode === '0') &&
            colorInteriorCode !== colorExteriorCode
          ? 'innenOrAussenWeiss'
          : 'innenAndAussenDifferent';

    const pricingList = rahmenverbreiterungPricing[priceListKey];

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

  // if sprossen color is custom-color for innen-aussen, when innen-aussen combination changes,
  // reset the sprossen color
  useEffect(() => {
    const colorCodeExt = configuration.colorExt.colorCode;
    const colorCodeInt = configuration.colorInt.colorCode;
    const intExtDifferent =
      colorCodeExt !== '0' && colorCodeInt !== '0' && colorCodeExt !== colorCodeInt;

    const ausfgesetzeSelected = configuration.sprossen.split('-')[0].includes('Aufgesetzte');
    const intExtDifferentForAufgesetzte =
      ausfgesetzeSelected && (colorCodeExt !== '0' || colorCodeInt !== '0');

    if (
      !intExtDifferent &&
      !intExtDifferentForAufgesetzte &&
      configuration.sprossen.includes(innenAussenCompatibleText)
    ) {
      const sprossenWidthItems = sprossenCards.find(
        (sp) => sp.name === configuration.sprossen.split('-')[0]
      )?.items;
      const width = configuration.sprossen.split('-')[1];
      const defaultColors = sprossenWidthItems?.find((it) => it.name === width)?.colors;
      const newColor = defaultColors![0].name;
      const newSprossen = configuration.sprossen.replace(innenAussenCompatibleText, newColor);
      setConfiguration((pr) => {
        return {
          ...pr,
          sprossen: newSprossen,
        };
      });
    }
  }, [configuration.colorExt, configuration.colorInt, configuration.sprossen]);

  // when type changes, if new type is single-flugel, reset sicherheitsbeschlage selection
  useEffect(() => {
    if (windowSectionCount < 2) {
      if (configuration.sicherheitsbeschlage.category.key === 'ja') {
        setConfiguration((pr) => {
          return {
            ...pr,
            sicherheitsbeschlage: {
              category: optionNo,
              subCategory: undefined,
            },
          };
        });
      }
    }
  }, [configuration.type]);

  // when profile changes, if aufbohrschutz is selected with IE or IEC profile, reset to basissicherheit
  useEffect(() => {
    if (
      configuration.sicherheitsbeschlage.subCategory?.key === 'aufbohrschutz' &&
      ['IE', 'IEC'].includes(configuration.profile.key)
    ) {
      setConfiguration((pr) => {
        return {
          ...pr,
          sicherheitsbeschlage: {
            category: pr.sicherheitsbeschlage.category,
            subCategory: {
              key: 'basissicherheit',
              name: 'Basissicherheit',
            },
          },
        };
      });
    }
  }, [configuration.profile]);

  // when window has no opening flugel, reset options which are only for opening windows in zusatze group
  useEffect(() => {
    if (windowHandleNumberTotal === 0) {
      zusatzeOnlyOpeningWindowOptions.forEach((optionKey) => {
        if (
          typeof configuration[optionKey] === 'object' &&
          configuration[optionKey] &&
          'category' in configuration[optionKey]
        ) {
          setConfiguration((pr) => {
            return {
              ...pr,
              [optionKey]: {
                category: optionNo,
                subCategory: undefined,
              },
            };
          });
        } else if ((configuration[optionKey] as SelectionItem).key === 'ja') {
          setConfiguration((pr) => {
            return {
              ...pr,
              [optionKey]: optionNo,
            };
          });
        }
      });
    }
  }, [windowHandleNumberTotal]);

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
