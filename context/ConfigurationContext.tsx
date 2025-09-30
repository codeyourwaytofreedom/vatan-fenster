import { initialConfiguration, initialSubstyle } from '@/data/configurationData';
import { minMaxSizes } from '@/data/minMaxSizes/minMaxSizes';
import { priceLists } from '@/data/priceLists/priceLists';
import { ColorCode } from '@/data/selectionItems/farbenData';
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
  WindowStyle,
} from '@/types/Configurator';
import { calculateGlassPriceByM2, extractPriceFromTable, getColoringMultiplier } from '@/utils';
import { createContext, useState, ReactNode, useContext } from 'react';

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
    direction,
  }: PriceDeterminants) => {
    const priceListForSelectedWindowStyle = priceLists[selectedWindowStyleKey][selectedMaterialKey];

    const druckausgleichsventilPrice = druckausgleichsventilKey === 'ja' ? 15 : 0;

    if (width === 0 || height === 0) {
      return;
    }

    const is3Layered = glasspaketKey.includes('3');

    const { colouringPriceMultiplier } = getColoringMultiplier({
      colorExteriorCode,
      colorInteriorCode,
      colorMidKey,
      selectedProfileKey,
    });

    // calculate additional cost when 77mm profile is selected
    const perimeterInMeter = ((width + height) * 2) / 1000;
    const profileHeightRelatedAdditionalCost =
      profileHeightKey === 'height75' ? perimeterInMeter * 16 : 0;

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
      return (
        additionalWindowPrice +
        priceFromTable +
        colorPriceExterior +
        profileHeightRelatedAdditionalCost +
        druckausgleichsventilPrice
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
        return (
          totalPrice +
          additionalWindowPrice +
          colorPriceExterior +
          profileHeightRelatedAdditionalCost +
          druckausgleichsventilPrice
        );
      }
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
