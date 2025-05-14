import { Config, GroupKey, SelectionItem, Step, StepWithProps } from '@/types/Configurator';
import style from '../../styles/KonfiguratorPage.module.css';
import Stepper from '../Stepper/Stepper';
import OptionHolder from '../Product_Holder/Option_Holder';
import { categoryItems } from '@/data/configurationData';
import { useEffect, useState } from 'react';
import { useConfiguration } from '@/context/ConfigurationContext';
import StepGlassPaket from '../StepGlassPaket/StepGlassPaket';
import StepSprossen from '../StepSprossen/StepSprossen';
import Fenstergriffe from '../StepFenstergriffe/Fenstergriffe';
import GroupBottomActions from '../GroupBottomActions/GroupBottomActions';
import { sicherheitsverglasungDynamicItems } from '@/data/selectionItems/verglasungData';

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
    isLastStepInGroup,
    setCurrentStep,
    setCurrentGroup,
    setConfiguration,
    moveToNextStep,
    getStepsForGroup,
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
    itemsToDisplay.length > 10 &&
    !expandedSteps.includes(currentStep?.key);

  // determine what items are to be displayed for current step
  useEffect(() => {
    // additional check prevents flicker in steps with custom compoent
    if (groupActive && visibleSection /* && visibleSection.items.length > 0 */) {
      if (visibleSection.dynamic) {
        switch (visibleSection.key) {
          case 'sicherheitsverglasung':
            const items = sicherheitsverglasungDynamicItems[configuration.glasspaket.key];
            return setItemsToDisplay(items);
        }
      }
      if (Array.isArray(visibleSection.items)) {
        setItemsToDisplay(visibleSection?.items);
      }
    }
  }, [groupActive, visibleSection]);

  /*   useEffect(() => {
    if (currentGroup === groupTitle) {
      setCurrentStep(steps[0]);
    }
  }, [currentGroup, groupTitle]); */

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

  const handleMoveNextGroup = () => {
    const coverNotAvailable = configuration.cover.key === 'nein';
    const groups: GroupKey[] = coverNotAvailable
      ? ['basis', 'farben', 'verglasung', 'zusätze']
      : ['basis', 'farben', 'verglasung', 'zusätze', 'sonnenschutz'];
    const currentGroupIndex = groups.indexOf(currentGroup);
    const nextGroup = groups[currentGroupIndex + 1];
    setCurrentGroup(nextGroup);
    const nextGroupSteps = getStepsForGroup(nextGroup);
    setCurrentStep(nextGroupSteps[0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExpand = () => {
    setExpandedSteps([...expandedSteps, currentStep?.key || '']);
  };

  const stepHasCustomComponent = (step: Step): step is StepWithProps => {
    return step && 'component' in step && step.component !== undefined;
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
          {<Stepper />}
          <div className={style.group}>
            {currentStep?.key === 'glasspaket' ? (
              <StepGlassPaket items={itemsToDisplay || []} expanded={expanded!} />
            ) : stepHasCustomComponent(currentStep!) && currentStep?.component === StepSprossen ? (
              <StepSprossen />
            ) : stepHasCustomComponent(currentStep!) && currentStep?.component === Fenstergriffe ? (
              <Fenstergriffe />
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
