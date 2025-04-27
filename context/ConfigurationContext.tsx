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
  orderOfKeys: string[] | undefined;
  setConfiguration: React.Dispatch<React.SetStateAction<Config>>;
  setCurrentGroup: React.Dispatch<React.SetStateAction<GroupKey>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<Step | null>>;
  setSubStyle: React.Dispatch<React.SetStateAction<SubStyle>>;
  moveToNextStep: () => void;
}

// Create the context with a default value
const ConfiurationContext = createContext<ConfigurationContextType | undefined>(undefined);

// Provider component
export const ConfigurationProvider = ({ children }: { children: ReactNode }) => {
  const [configuration, setConfiguration] = useState<Config>(initialConfiguration);
  const [currentGroup, setCurrentGroup] = useState<GroupKey>('basis');
  const [currentStep, setCurrentStep] = useState<Step | null>(null);
  const [substyle, setSubStyle] = useState<SubStyle>(initialSubstyle);

  const orderOfKeys =
    configuration.style.name === 'Oberlicht'
      ? ['oben', 'unten']
      : configuration.style.name === 'Unterlicht'
        ? ['unten', 'oben']
        : undefined;

  const currentStepGroup = (() => {
    // for sonnenschutz group, steps are built dynamically according to cover selection in Basis
    if (currentGroup === 'sonnenschutz') {
      return (
        sonnenschutzStepPacks[configuration.cover.key as keyof typeof sonnenschutzStepPacks] || []
      );
    }
    // farben steps changge if the window type has no handle
    if (currentGroup === 'farben') {
      let handleExists;
      if ('option' in configuration.type) {
        handleExists =
          configuration.type.oben?.handleNumber && configuration.type.unten?.handleNumber;
        if (!handleExists) {
          return steps[currentGroup].filter((st) => st.key !== 'fenstergriffe');
        }
      }
      handleExists = (configuration.type as SelectionItem).handleNumber;
      if (!handleExists) {
        return steps[currentGroup].filter((st) => st.key !== 'fenstergriffe');
      }
    }
    // default steps for static groups
    return steps[currentGroup];
  })();

  const isLastStepInGroup = currentStep?.key === currentStepGroup[currentStepGroup.length - 1]?.key;

  const moveToNextStep = () => {
    const currentStepIndex = currentStepGroup.indexOf(currentStep!);
    const nextStep = currentStepGroup[currentStepIndex + 1];
    if (nextStep) {
      setTimeout(() => {
        setCurrentStep(nextStep);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <ConfiurationContext.Provider
      value={{
        configuration,
        currentStep,
        currentStepGroup,
        isLastStepInGroup,
        currentGroup,
        substyle,
        orderOfKeys,
        setConfiguration,
        setCurrentStep,
        setCurrentGroup,
        setSubStyle,
        moveToNextStep,
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
