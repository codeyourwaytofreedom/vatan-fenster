import { Config, GroupKey, Step } from '@/types/Configurator';
import style from '../../styles/KonfiguratorPage.module.css';
import Stepper from '../Stepper/Stepper';
import OptionHolder from '../Product_Holder/Option_Holder';
import { categoryItems, SelectionItem } from '@/data/configuration_options';
import { useEffect, useState } from 'react';
import { useConfiguration } from '@/context/ConfigurationContext';
import StepGlassPaket from '../StepGlassPaket/StepGlassPaket';
import StepSprossen from '../StepSprossen/StepSprossen';
import Fenstergriffe from '../StepFenstergriffe/Fenstergriffe';
import GroupBottomActions from '../GroupBottomActions/GroupBottomActions';

interface GroupProps {
  groupTitle: GroupKey;
  steps: Step[];
}

export default function Configuration_Group({ groupTitle, steps }: GroupProps) {
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
    setCurrentStep,
    setCurrentGroup,
    setConfiguration,
    moveToNextStep,
  } = useConfiguration();

  const visibleSection = categoryItems.find((cat) => cat.key === currentStep?.key);

  const [itemsToDisplay, setItemsToDisplay] = useState<SelectionItem[]>();
  const groupActive = currentGroup === groupTitle;
  const coverNotAvailable = configuration.cover.key === 'nein' && groupTitle === 'sonnenschutz';
  const [expandedSteps, setExpandedSteps] = useState<string[]>([]);

  const expanded = currentStep && expandedSteps.includes(currentStep?.key);

  const expandable =
    itemsToDisplay &&
    currentStep &&
    itemsToDisplay.length > 5 &&
    !expandedSteps.includes(currentStep?.key);

  const isLastStepInGroup = currentStep?.key === getValidSteps()[getValidSteps().length - 1]?.key;

  // determine what items are to be displayed for current step
  useEffect(() => {
    // additional check prevents flicker in steps with custom compoent
    if (groupActive && visibleSection && visibleSection.items.length > 0) {
      setItemsToDisplay(visibleSection?.items);
    }
  }, [groupActive, visibleSection]);

  useEffect(() => {
    if (currentGroup === groupTitle) {
      setCurrentStep(steps[0]);
    }
  }, [currentGroup, groupTitle]);

  const handleSelectGroup = () => {
    setCurrentGroup(groupTitle);
    setCurrentStep(steps[0]);
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

  function getValidSteps() {
    if (currentGroup === 'farben') {
      let handleExists;
      if ('option' in configuration.type) {
        handleExists =
          configuration.type.oben?.handleNumber && configuration.type.unten?.handleNumber;
        if (!handleExists) {
          return steps.filter((st) => st.key !== 'fenstergriffe');
        }
        return steps;
      }
      handleExists = (configuration.type as SelectionItem).handleNumber;
      if (!handleExists) {
        return steps.filter((st) => st.key !== 'fenstergriffe');
      }
      return steps;
    }
    return steps;
  }

  const handleMoveNextGroup = () => {
    const coverNotAvailable = configuration.cover.key === 'nein';
    const groups: GroupKey[] = coverNotAvailable
      ? ['basis', 'farben', 'verglasung', 'zusätze']
      : ['basis', 'farben', 'verglasung','zusätze','sonnenschutz',];
    const currentGroupIndex = groups.indexOf(currentGroup);
    const nextGroup = groups[currentGroupIndex + 1];
    setCurrentGroup(nextGroup);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExpand = () => {
    setExpandedSteps([...expandedSteps, currentStep?.key || '']);
  };

  if (coverNotAvailable) return null;

  return (
    <div>
      <div className={style.layers}>
        <button id={groupActive ? style.active : style.default} onClick={handleSelectGroup}>
          <span>{groupTitle.toUpperCase()}</span>
        </button>
      </div>
      {groupActive && (
        <div>
          {<Stepper steps={getValidSteps()} configuration={configuration} />}
          <div className={style.group}>
            {currentStep?.component === StepGlassPaket ? (
              <StepGlassPaket items={itemsToDisplay || []} expanded={expanded!} />
            ) : currentStep?.component === StepSprossen ? (
              <StepSprossen />
            ) : currentStep?.component === Fenstergriffe ? (
              <Fenstergriffe />
            ) : (
              <>
                <div className={style.config_wrapper}>
                  <div className={style.config_wrapper_option_holders}>
                    {itemsToDisplay
                      ?.slice(0, !expanded ? 5 : itemsToDisplay.length)
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
                {currentGroup === groupTitle && (
                  <GroupBottomActions
                    expandable={Boolean(expandable)}
                    expandAction={handleExpand}
                    isLastStep={isLastStepInGroup}
                    nextGroupAction={handleMoveNextGroup}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
