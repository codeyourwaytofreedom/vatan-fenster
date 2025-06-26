import { initialConfiguration, initialSubstyle } from '@/data/configurationData';
import { minMaxSizes } from '@/data/minMaxSizes/minMaxSizes';
import { priceLists } from '@/data/priceLists/priceLists';
import { sonnenschutzStepPacks, steps } from '@/data/steps';
import {
  Config,
  GroupKey,
  MinMaxSet,
  MinMaxSizes,
  SelectionItem,
  Step,
  SubStyle,
  WindowMaterial,
  WindowStyle,
} from '@/types/Configurator';
import { extractPriceFromTable } from '@/utils';
import { createContext, useState, ReactNode, useContext } from 'react';

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
  getStepsForGroup: (key: GroupKey) => Step[];
  calculateTotalPrice: (
    selectedMaterialKey: WindowMaterial,
    selectedProfileKey: string,
    selectedWindowStyleKey: WindowStyle,
    selectedTypeKey: string,
    width: number,
    height: number,
    testKey?: string
  ) => number | null | undefined;
  getMinMaxSizes: (
    selectedMaterial: SelectionItem,
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

  const calculateAdditionalWindowPrice = (m2Price: number = 8, w: number, h: number) => {
    const additionalWindowPrice = (w * h * m2Price * 2) / 1_000_000;
    const truncatedAdditionalWindowPrice = Math.floor(additionalWindowPrice * 100) / 100;
    return truncatedAdditionalWindowPrice;
  };

  const calculateTotalPrice = (
    selectedMaterialKey: WindowMaterial,
    selectedProfileKey: string,
    selectedWindowStyleKey: WindowStyle,
    selectedTypeKey: string,
    width: number = 0,
    height: number = 0,
    testKey?: string
  ) => {
    const priceListForSelectedWindowStyle = priceLists[selectedWindowStyleKey][selectedMaterialKey];

    if (width === 0 || height === 0) {
      return;
    }

    if (['oberlicht', 'unterlicht'].includes(configuration.style.key)) {
      return;
    }

    // additional calculation for the glass
    // deafult is 2 layer of glass so multiply by 2
    const additionalWindowPrice = calculateAdditionalWindowPrice(8, width, height);

    // adjust for overlicht and unterlicht
    const priceListKey = testKey || `${selectedProfileKey}_${selectedTypeKey}`;

    // extract price for given width and height from csv tables
    const priceListForSelectedType = priceListForSelectedWindowStyle[priceListKey];

    if (!priceListForSelectedType) {
      /* const priceListFor1Flugel = priceLists['flugel1'][selectedMaterial];
      const individualSectionTypeKeys = (configuration.type as SelectionItem).sections;
      const priceKey = `${(configuration.profile as SelectionItem).key}_${individualSectionTypeKeys![0]}`;
      const priceListForSectionType = priceListFor1Flugel[priceKey];
      console.log(priceListForSectionType); */
      return 0;
    }

    const priceFromTable = extractPriceFromTable(priceListForSelectedType, width, height);
    if (priceFromTable) {
      return additionalWindowPrice + priceFromTable;
    }
    return null;
  };

  const getMinMaxSizes = (
    selectedMaterial: SelectionItem,
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

    if (sizesByType) {
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
    // therefore return placeholder minMax values for now
    // to be discussed
    return {
      /* minWidth: 1000,
      maxWidth: 1000,
      minHeight: 1000,
      maxHeight: 1000, */
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
