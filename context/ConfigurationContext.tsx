import { initialConfiguration, initialSubstyle } from '@/data/configuration_options';
import { steps } from '@/data/steps';
import { Config, GroupKey, Step, SubStyle } from '@/types/Configurator';
import { createContext, useState, ReactNode, useContext } from 'react';

// Define the context type
interface ConfigurationContextType {
  configuration: Config;
  currentGroup: GroupKey;
  currentStep: Step | null;
  substyle: SubStyle;
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

  const moveToNextStep = () => {
    const currentGroupSteps = steps[currentGroup];
    const currentStepIndex = currentGroupSteps.indexOf(currentStep!);
    const nextStep = currentGroupSteps[currentStepIndex + 1];
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
        currentGroup,
        substyle,
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
