import { Config, GroupKey, Step } from '@/types/Configurator';
import style from '../../styles/KonfiguratorPage.module.css';
import Stepper from '../Stepper/Stepper';
import OptionHolder from '../Product_Holder/Option_Holder';
import { categoryItems, SelectionItem } from '@/data/configuration_options';
import { useEffect, useState } from 'react';
import { useConfiguration } from '@/context/ConfigurationContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import YesNoHolder from '../YesNoHolder/YesNoHolder';
import StepGlassPaket from '../StepGlassPaket/StepGlassPaket';
import StepSprossen from '../StepSprossen/StepSprossen';
import StepDruckausgleichsventil from '../StepGlassPaket/StepDruckausgleichsventil/StepDruckausgleichsventil';

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

  const yesNoStep = currentStep?.yesNo;

  const [yesS, setYesS] = useState<string[]>([]);

  const showOptionHolders = !yesNoStep || yesS.includes(currentStep.key);

  // determine what items are to be displayed for current step
  useEffect(() => {
    if (groupActive) {
      setItemsToDisplay(visibleSection?.items);
    }
  }, [groupActive, visibleSection]);

  useEffect(() => {
    if (currentGroup === groupTitle) {
      setCurrentStep(steps[0]);
    }
  }, [currentGroup, groupTitle]);

  useEffect(() => {
    if (itemsToDisplay && currentStep && yesS.includes(currentStep?.key)) {
      setConfiguration((prevConfig) => ({
        ...prevConfig,
        [currentStep?.key as keyof Config]: itemsToDisplay![0],
      }));
    }
    if (itemsToDisplay && currentStep && !yesS.includes(currentStep?.key)) {
      setConfiguration((prevConfig) => ({
        ...prevConfig,
        [currentStep.key]: 'nein',
      }));
    }
  }, [yesS]);

  const handleSelectGroup = () => {
    setCurrentGroup(groupTitle);
    setCurrentStep(steps[0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const moveNextStep = () => {
    const stepIndex = steps.findIndex((st) => st.key == currentStep?.key);
    const nextStep = steps[stepIndex + 1];
    const value = configuration[currentStep?.key as keyof Config];
    if (nextStep && value) {
      setTimeout(() => {
        // handle selection has to be corrected, auto select causes issues
        setCurrentStep(nextStep);
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

  function getValidSteps() {
    if (currentGroup === 'farben') {
      let handleExists;
      if ('option' in configuration.type) {
        handleExists =
          configuration.type.oben?.handleNumber && configuration.type.unten?.handleNumber;
        if (!handleExists) {
          return steps.filter((st) => st.key !== 'handle');
        }
        return steps;
      }
      handleExists = (configuration.type as SelectionItem).handleNumber;
      if (!handleExists) {
        return steps.filter((st) => st.key !== 'handle');
      }
      return steps;
    }
    return steps;
  }

  const handleMoveNextGroup = () => {
    const groups: GroupKey[] = ['basis', 'farben', 'verglasung', 'sonnenschutz', 'zusätze'];
    const currentGroupIndex = groups.indexOf(currentGroup);
    let nextGroup = groups[currentGroupIndex + 1];
    const coverNotAvailable = configuration.cover.key === 'nein';
    if (nextGroup === 'sonnenschutz' && coverNotAvailable) {
      nextGroup = 'zusätze';
    }
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
            {yesNoStep && <YesNoHolder yesS={yesS} setYesS={setYesS} stepKey={currentStep.key} />}
            {currentStep?.component === StepGlassPaket ? (
              <StepGlassPaket items={itemsToDisplay || []} expanded={expanded!} />
            ) : currentStep?.component === StepSprossen ? (
              <StepSprossen />
            ) : currentStep?.component === StepDruckausgleichsventil ? (
              <StepDruckausgleichsventil />
            ) : (
              <div className={style.config_wrapper}>
                {showOptionHolders ? (
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
                ) : null}
              </div>
            )}
          </div>
        </div>
      )}
      {currentGroup === groupTitle && (
        <div id={style.bottom_actions}>
          {expandable && showOptionHolders && (
            <button id={style.show_more} onClick={handleExpand}>
              <FontAwesomeIcon icon={faPlus} size={'1x'} beat />
              Alle anzeigen
            </button>
          )}
          {isLastStepInGroup && (
            <button onClick={handleMoveNextGroup} id={style.next_group}>
              <FontAwesomeIcon icon={faChevronDown} size={'1x'} beat /> Nächster Schritt
            </button>
          )}
        </div>
      )}
    </div>
  );
}
