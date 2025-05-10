import { initialConfiguration, initialSubstyle, SelectionItem } from '@/data/configuration_options';
import { sonnenschutzStepPacks, steps } from '@/data/steps';
import { Config, GroupKey, Step, SubStyle } from '@/types/Configurator';
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
  getStepsForGroup: (key: GroupKey) => Step[]
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


  const getStepsForGroup = (group:GroupKey ) => {
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
      if(!Boolean('option' in configuration.type)){
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

  const allGroups: GroupKey[] = ['basis', 'farben', 'verglasung', 'zusätze', 'sonnenschutz'];
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
    const firstStepInGroup = nextGroupSteps[0];
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
