import { Config, GroupKey, Step } from '@/types/Configurator';
import style from '../../styles/KonfiguratorPage.module.css';
import Stepper from '../Stepper/Stepper';
import OptionHolder from '../Product_Holder/Option_Holder';
import { categoryItems, SelectionItem } from '@/data/configuration_options';
import { useEffect, useState } from 'react';

interface GroupProps {
  groupTitle: GroupKey;
  currentGroup: GroupKey;
  steps: Step[];
  currentStep: Step;
  configuration: Config;
  setStep: React.Dispatch<React.SetStateAction<Step | null>>;
  setCurrentGroup: React.Dispatch<React.SetStateAction<GroupKey>>;
  setConfiguration: React.Dispatch<React.SetStateAction<Config>>;
}

export default function Configuration_Group({
  groupTitle,
  currentGroup,
  setCurrentGroup,
  steps,
  configuration,
  currentStep,
  setStep,
  setConfiguration,
}: GroupProps) {
  const isSelected = (name: string) => {
    if (currentStep) {
      return (configuration[currentStep?.key as keyof Config] as SelectionItem)?.name === name;
    }
    return false;
  };
  const visibleSection = categoryItems.find((cat) => cat.key === currentStep?.key);

  const [itemsToDisplay, setItemsToDisplay] = useState<SelectionItem[]>();
  const groupActive = currentGroup === groupTitle;

  // determine what items are to be displayed for current step
  useEffect(() => {
    if (groupActive) {
      setItemsToDisplay(visibleSection?.items);
    }
  }, [groupActive, visibleSection]);

  const handleSelectGroup = () => {
    setCurrentGroup(groupTitle);
    setStep(steps[0]);
  };
  
  const moveNextStep = () => {
    // make currentGroup dynamic, thats why alwayes setting the ssame next step for basis
    const stepIndex = steps.findIndex((st) => st.key == currentStep?.key);
    const nextStep = steps[stepIndex + 1];
    const value = configuration[currentStep?.key as keyof Config];
    if (nextStep && value) {
      setTimeout(() => {
        // have to handle this correctly
        setStep(nextStep);
      }, 300);
    }
  };

  const updateConfiguration = (item: SelectionItem, key?: string) => {
    if (currentStep) {
      setConfiguration((prevConfig) => ({
        ...prevConfig,
        [key ?? (currentStep?.key as keyof Config)]: item,
      }));
    }
    moveNextStep();
  };

    const getValidSteps = () => {
      if(currentGroup === 'farben'){
            let handleExists;
            if('option' in configuration.type){
              handleExists = configuration.type.oben?.handleNumber && configuration.type.unten?.handleNumber;
              if(!handleExists){
                return steps.filter((st)=>st.key !== 'handle');
              }
              return steps;
            }
            handleExists = (configuration.type as SelectionItem).handleNumber;
            if(!handleExists){
              return steps.filter((st)=>st.key !== 'handle');
            }
            return steps
      }
      return steps;
    }

  return (
    <div>
      <div className={style.layers}>
        <button id={groupActive ? style.active : style.default} onClick={handleSelectGroup}>
          <span>{groupTitle.toUpperCase()}</span>
        </button>
      </div>
      {groupActive && (
        <div>
          {
            <Stepper
              steps={getValidSteps()}
              setStep={setStep}
              currentStep={currentStep}
              configuration={configuration}
            />
          }
          <div className={style.group}>
            <div className={style.config_wrapper}>
              <div className={style.config_wrapper_option_holders}>
                {itemsToDisplay?.map((item, index) => (
                  <OptionHolder
                    key={index}
                    item={item}
                    selected={isSelected(item.name)}
                    action={() => updateConfiguration(item)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
