import {
  ConfigGroup,
  FensterConfig,
  GroupKey,
  SelectionItem,
  Step,
  StepWithProps,
} from '@/types/Configurator';
import style from '../../styles/KonfiguratorPage.module.css';
import Stepper from '../Stepper/Stepper';
import OptionHolder from '../Product_Holder/Option_Holder';
import { categoryItems } from '@/data/configurationData';
import { useEffect, useState } from 'react';
import { useConfiguration } from '@/context/ConfigurationContext';
import StepGlassPaket from '../StepGlassPaket/StepGlassPaket';
import GroupBottomActions from '../GroupBottomActions/GroupBottomActions';
import { sicherheitsverglasungDynamicItems } from '@/data/selectionItems/verglasungData';
import { getColoringMultiplier } from '@/utils';
import ZusatzeGroup from '../ZusatzeGroup/ZusatzeGroup';
import StepSwitchNotice from '../StepSwitchNotice/StepSwitchNotice';

interface GroupProps {
  groupTitle: GroupKey;
}

export default function Configuration_Group({ groupTitle }: GroupProps) {
  const {
    currentStep,
    currentGroup,
    configuration,
    isLastStepInGroup,
    setConfiguration,
    moveToNextStep,
    moveNextGroup,
  } = useConfiguration();

  function hasGroupKey<G extends ConfigGroup>(
    group: G,
    key: PropertyKey
  ): key is keyof FensterConfig[G] {
    return key in (configuration[group] as object);
  }

  // to be studied
  const isSelected = (name: string) => {
    if (!currentStep || !currentGroup) return false;

    const group = currentGroup as ConfigGroup;
    const key = currentStep.key as PropertyKey;

    if (!hasGroupKey(group, key)) return false;

    const v = configuration[group][key] as unknown;
    return !!(v && typeof v === 'object' && 'name' in v && v.name === name);
  };

  const visibleSection = categoryItems.find((cat) => cat.key === currentStep?.key);

  const [itemsToDisplay, setItemsToDisplay] = useState<SelectionItem[]>();
  const groupActive = currentGroup === groupTitle;
  const coverNotAvailable =
    configuration.basis.cover.key === 'nein' && groupTitle === 'sonnenschutz';
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
            const items =
              sicherheitsverglasungDynamicItems[configuration.verglasung.glasspaket.key];
            const isOrnamentAvailable = configuration.verglasung.ornament.key !== 'nein';
            const is2Layered = configuration.verglasung.glasspaket.key.includes('2');
            if (isOrnamentAvailable && is2Layered) {
              return setItemsToDisplay(items.filter((it) => !it.key.includes('doubleConfig')));
            } else {
              return setItemsToDisplay(items);
            }
          case 'colorMid':
            const { colorsAvailable } = getColoringMultiplier({
              colorExteriorCode: configuration.farben.colorExt.colorCode!,
              colorInteriorCode: configuration.farben.colorInt.colorCode!,
              colorMidKey: configuration.farben.colorMid?.key,
              selectedProfileKey: configuration.basis.profile.key,
            });
            const dynamiColorMidColors = Array.isArray(visibleSection.items)
              ? visibleSection.items.filter((item) =>
                  colorsAvailable?.some((it) => it === item.key)
                )
              : [];
            return setItemsToDisplay(dynamiColorMidColors);
        }
      }
      if (Array.isArray(visibleSection.items)) {
        setItemsToDisplay(visibleSection?.items);
      }
    }
  }, [groupActive, visibleSection]);

  const { colorsAvailable } = getColoringMultiplier({
    colorExteriorCode: configuration.farben.colorExt.colorCode!,
    colorInteriorCode: configuration.farben.colorInt.colorCode!,
    colorMidKey: configuration.farben.colorMid?.key,
    selectedProfileKey: configuration.basis.profile.key,
  });

  // make selection from dynamic midColorOptions
  useEffect(() => {
    const dynamicColorMidColors = Array.isArray(visibleSection?.items)
      ? visibleSection.items.filter((item) => colorsAvailable?.some((it) => it === item.key))
      : [];
    if (dynamicColorMidColors?.[0]) {
      if (!configuration.farben.colorMid) {
        setConfiguration((pr) => {
          return {
            ...pr,
            farben: {
              ...pr.farben,
              colorMid: dynamicColorMidColors[0],
            },
          };
        });
      }
      if (configuration.farben.colorMid) {
        if (!dynamicColorMidColors.some((it) => it.key == configuration.farben.colorMid.key)) {
          setConfiguration((pr) => {
            return {
              ...pr,
              farben: {
                ...pr.farben,
                colorMid: dynamicColorMidColors[0],
              },
            };
          });
        }
      }
    }
  }, [
    colorsAvailable,
    configuration.farben.colorExt,
    configuration.farben.colorInt,
    configuration.basis.profile,
    configuration.farben.colorMid,
    setConfiguration,
    visibleSection,
  ]);

  // autoselect sicherheitsverglasung's first option when glasspaket changes
  useEffect(() => {
    const items = sicherheitsverglasungDynamicItems[configuration.verglasung.glasspaket.key];
    setConfiguration((pr) => {
      return {
        ...pr,
        verglasung: {
          ...pr.verglasung,
          sicherheitsverglasung: items[0],
        },
      };
    });
  }, [configuration.verglasung.glasspaket]);

  const updateConfiguration = (item: SelectionItem, keyOverride?: PropertyKey) => {
    if (!currentStep || !currentGroup) {
      moveToNextStep();
      return;
    }

    const group = currentGroup as ConfigGroup;
    const key = (keyOverride ?? currentStep.key) as PropertyKey;

    if (!hasGroupKey(group, key)) {
      moveToNextStep();
      return;
    }

    setConfiguration((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [key]: item, // key is now narrowed to keyof FensterConfig[group]
      } as FensterConfig[typeof group],
    }));

    moveToNextStep();
  };

  const toggleExpand = () => {
    const stepKey = currentStep?.key || '';
    setExpandedSteps((prev) =>
      prev.includes(stepKey) ? prev.filter((key) => key !== stepKey) : [...prev, stepKey]
    );
  };

  const Component = (currentStep as StepWithProps)?.component;
  const stepHasCustomComponent = (step: Step): step is StepWithProps => {
    return step && 'component' in step && step.component !== undefined;
  };

  if (coverNotAvailable) return null;

  return (
    <>
      {currentGroup === 'zusatze' && groupActive ? (
        <ZusatzeGroup />
      ) : (
        <div>
          {groupActive && (
            <div>
              {<Stepper />}
              <div className={style.group}>
                <StepSwitchNotice stepKey={currentStep?.key} />
                {currentStep?.key === 'glasspaket' ? (
                  <StepGlassPaket items={itemsToDisplay || []} expanded={expanded!} />
                ) : Component && stepHasCustomComponent(currentStep!) && currentStep?.props ? (
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
                    {currentGroup === groupTitle && (
                      <GroupBottomActions
                        itemNumber={itemsToDisplay?.length || 0}
                        expandable={Boolean(expandable)}
                        toggleExpand={toggleExpand}
                        isLastStep={isLastStepInGroup}
                        nextGroupAction={moveNextGroup}
                      />
                    )}
                  </>
                )}
              </div>
              <br />
            </div>
          )}
        </div>
      )}
    </>
  );
}
