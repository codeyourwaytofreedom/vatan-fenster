import { Config, SelectionItem, Step, StepWithProps } from '@/types/Configurator';
import style from '../../styles/KonfiguratorPage.module.css';
import Stepper from '../Stepper/Stepper';
import OptionHolder from '../Product_Holder/Option_Holder';
import { categoryItems } from '@/data/configurationData';
import { useEffect, useState } from 'react';
import { useConfiguration } from '@/context/ConfigurationContext';
import GroupBottomActions from '../GroupBottomActions/GroupBottomActions';

export default function Sonnenschutz_Group() {
  const isSelected = (name: string) => {
    if (currentStep) {
      return (configuration[currentStep?.key as keyof Config] as SelectionItem)?.name === name;
    }
    return false;
  };

  const {
    currentStep,
    currentGroup,
    configuration,
    currentStepGroup,
    setCurrentStep,
    setCurrentGroup,
    setConfiguration,
    moveToNextStep,
  } = useConfiguration();

  const visibleSection = categoryItems.find((cat) => cat.key === currentStep?.key);

  const [itemsToDisplay, setItemsToDisplay] = useState<SelectionItem[]>();
  const groupActive = currentGroup === 'sonnenschutz';
  const coverNotAvailable = configuration.cover.key === 'nein';
  const [expandedSteps, setExpandedSteps] = useState<string[]>([]);

  const expanded = currentStep && expandedSteps.includes(currentStep?.key);

  const expandable =
    itemsToDisplay &&
    currentStep &&
    itemsToDisplay.length > 5 &&
    !expandedSteps.includes(currentStep?.key);

  useEffect(() => {
    if (groupActive) {
      setCurrentStep(currentStepGroup[0]);
    }
  }, [groupActive]);

  // determine what items are to be displayed for current step
  useEffect(() => {
    // additional check prevents flicker in steps with custom compoent
    if (groupActive && visibleSection /* && visibleSection.items.length > 0 */) {
      setItemsToDisplay(visibleSection?.items);
    }
  }, [groupActive, visibleSection]);

  const handleSelectGroup = () => {
    setCurrentGroup('sonnenschutz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateConfiguration = (item: SelectionItem, key?: string) => {
    if (currentStep) {
      setConfiguration((prevConfig) => ({
        ...prevConfig,
        [key ?? (currentStep?.key as keyof Config)]: item,
      }));
    }
    moveToNextStep();
  };

  const handleExpand = () => {
    setExpandedSteps([...expandedSteps, currentStep?.key || '']);
  };

  const Component = (currentStep as StepWithProps)?.component;
  const stepHasCustomComponent = (step: Step): step is StepWithProps => {
    return step && 'component' in step && step.component !== undefined;
  };

  if (coverNotAvailable) return null;

  return (
    <div>
      <div className={style.layers}>
        <button id={groupActive ? style.active : style.default} onClick={handleSelectGroup}>
          <span>SONNENSCHUTZ</span>
        </button>
      </div>
      {groupActive && (
        <div>
          {<Stepper />}
          <div className={style.group}>
            {Component && stepHasCustomComponent(currentStep!) && currentStep?.props ? (
              <Component {...currentStep?.props} />
            ) : Component ? (
              <Component />
            ) : (
              <>
                <div className={style.config_wrapper}>
                  <div className={style.config_wrapper_option_holders}>
                    {itemsToDisplay
                      ?.slice(0, !expanded ? 10 : itemsToDisplay.length)
                      .map((item, index) => (
                        <OptionHolder
                          key={index}
                          item={item}
                          selected={isSelected(item.name)}
                          action={() => updateConfiguration(item)}
                        />
                      ))}
                  </div>
                </div>
                <GroupBottomActions expandable={Boolean(expandable)} expandAction={handleExpand} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
