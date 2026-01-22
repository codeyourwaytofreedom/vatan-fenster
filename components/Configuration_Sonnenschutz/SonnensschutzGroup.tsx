import {
  ConfigGroup,
  DobuleSelection,
  DoubleStepperProps,
  FensterConfig,
  SelectionItem,
  Size,
  Step,
  StepWithProps,
  SubStyle,
} from '@/types/Configurator';
import style from '../../styles/KonfiguratorPage.module.css';
import Stepper from '../Stepper/Stepper';
import OptionHolder from '../Product_Holder/Option_Holder';
import { categoryItems } from '@/data/configurationData';
import { useEffect, useState } from 'react';
import { useConfiguration } from '@/context/ConfigurationContext';
import GroupBottomActions from '../GroupBottomActions/GroupBottomActions';
import {
  allSonnenschutzStepsKeys,
  sonnenschutzItems,
} from '@/data/selectionItems/sonnenschutzData';
import DoubleStepper from '../DoubleStepper/DoubleStepper';
import StepVerlangerung from '../StepVerlängerung/StepVerlangerung';
import Kastenart, { kastenartSizeOptions } from '../Kastenart/Kastenart';
import KastenartVorsatzraffstore from '../KastenartVorsatzraffstore/KastenartVorsatzraffstore';
import { useOrderDetailsReady } from '@/context/OrderDetailsContext';
import { getAntriebsartAvailability } from '@/utils/sonnenschutzPartition';

export default function Sonnenschutz_Group() {
  const {
    currentStep,
    currentGroup,
    configuration,
    currentStepGroup,
    setCurrentStep,
    setConfiguration,
    getStepsForGroup,
    moveToNextStep,
    getSonnenschutzPartitionPossibilities,
  } = useConfiguration();

  const { size } = useOrderDetailsReady();

  function hasGroupKey<G extends ConfigGroup>(
    group: G,
    key: PropertyKey
  ): key is keyof FensterConfig[G] {
    return key in (configuration[group] as object);
  }

  const isSelected = (name: string) => {
    if (currentStep) {
      return (
        (
          configuration.sonnenschutz[
            currentStep?.key as keyof typeof configuration.sonnenschutz
          ] as SelectionItem
        )?.name === name
      );
    }
    return false;
  };

  const visibleSection = categoryItems.find((cat) => cat.key === currentStep?.key);

  const [itemsToDisplay, setItemsToDisplay] = useState<SelectionItem[]>();
  const groupActive = currentGroup === 'sonnenschutz';
  const coverNotAvailable = configuration.basis.cover.key === 'nein';
  const [expandedSteps, setExpandedSteps] = useState<string[]>([]);

  const expanded = currentStep && expandedSteps.includes(currentStep?.key);

  const sonnenschutzSteps = getStepsForGroup('sonnenschutz');

  useEffect(() => {
    //// remove existing sonnenschutz config
    const sonnenschutzConfigPropertiesExist = Object.keys(configuration).some((key) =>
      allSonnenschutzStepsKeys.includes(key)
    );
    const clearedConfiguration = { ...configuration };
    if (sonnenschutzConfigPropertiesExist) {
      Object.keys(clearedConfiguration.sonnenschutz).forEach((key) => {
        if (allSonnenschutzStepsKeys.includes(key)) {
          delete clearedConfiguration.sonnenschutz[
            key as keyof typeof clearedConfiguration.sonnenschutz
          ];
        }
      });
    }
    // if sonnenschuts is removed, no need for default selection
    if (configuration.basis.cover.key === 'nein') {
      setConfiguration(clearedConfiguration);
      return;
    }
    // select default items for new sonnenschutz steps
    const sonnenschutzDefaultConfig: Record<
      string,
      SelectionItem | DobuleSelection | number | Size
    > = {};
    for (let index = 0; index < sonnenschutzSteps.length; index++) {
      const step = sonnenschutzSteps[index];
      //////////////////////////////////////////// if step has custom component
      if ('component' in step) {
        if (step.component === DoubleStepper) {
          // no default for antriebsart and antriebsseite because this is dependent on lamellenart
          if (step.key === 'antriebsart' || step.key === 'antriebsseite') {
            continue;
          }
          sonnenschutzDefaultConfig[step.key] = {
            category: (step?.props as DoubleStepperProps)?.categoryItems[0],
            subCategory: (step?.props as DoubleStepperProps)?.subCategoryItems[
              (step?.props as DoubleStepperProps)?.categoryItems[0].key
            ][0],
          };
        }
        if (step.component === StepVerlangerung) {
          sonnenschutzDefaultConfig[step.key] = { key: 'length', name: '0' };
        }
        if (step.component === Kastenart) {
          sonnenschutzDefaultConfig[step.key] = {
            key: 'ph',
            name: kastenartSizeOptions[0].toString() + 'mm',
          };
        }
        if (step.component === KastenartVorsatzraffstore) {
          sonnenschutzDefaultConfig[step.key] = size || ({} as Size);
        }
        //////////////////////////////////////////// if step has custom component
      }

      if (!('component' in step)) {
        // choose the adapter compatible for the selected profile
        if (step.key === 'adapter') {
          const adapterOptions = sonnenschutzItems.adapter;
          const selectedProfileKey = configuration.basis.profile.key;
          const defaultSelection = adapterOptions.find((op) =>
            op.key.includes(selectedProfileKey)
          )!;

          sonnenschutzDefaultConfig.adapter = defaultSelection;
        } else {
          sonnenschutzDefaultConfig[step.key] =
            sonnenschutzItems[step.key as keyof typeof sonnenschutzItems][0];
        }
      }
    }
    setConfiguration({ ...clearedConfiguration, sonnenschutz: sonnenschutzDefaultConfig });
  }, [configuration.basis.cover, configuration.basis.profile]);

  const expandable =
    itemsToDisplay &&
    currentStep &&
    itemsToDisplay.length > 5 &&
    !expandedSteps.includes(currentStep?.key);

  const excludedSteps = ['adapter'];

  useEffect(() => {
    if (groupActive) {
      setCurrentStep(currentStepGroup.filter((step) => !excludedSteps.includes(step.key))[0]);
    }
  }, [groupActive]);

  // determine what items are to be displayed for current step
  useEffect(() => {
    if (groupActive && visibleSection && Array.isArray(visibleSection.items)) {
      if (currentStep?.key === 'adapter') {
        setItemsToDisplay(
          visibleSection?.items.filter((it) => it.key === configuration.sonnenschutz.adapter?.key)
        );
        return;
      }
      if (currentStep?.key === 'montageartRollladen') {
        const verlangerung = configuration.sonnenschutz.verlangerung;
        const extension = verlangerung?.name ? parseInt(verlangerung.name) : 0;
        if (extension > 30) {
          setItemsToDisplay(visibleSection?.items.filter((it) => it.key === 'nein'));
          return;
        }
        const { links, rechts } = configuration.zusatze.rahmenverbreiterungAuswahlen;
        const horizontalExtension = links + rechts;
        if (horizontalExtension < 1) {
          setItemsToDisplay(visibleSection?.items.filter((it) => it.key !== 'mrv'));
          return;
        }
      }
      setItemsToDisplay(visibleSection?.items);
    }
  }, [groupActive, visibleSection]);

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

  const handleExpand = () => {
    setExpandedSteps([...expandedSteps, currentStep?.key || '']);
  };

  const Component = (currentStep as StepWithProps)?.component;
  const stepHasCustomComponent = (step: Step): step is StepWithProps => {
    return step && 'component' in step && step.component !== undefined;
  };

  const purifyComponentProps = () => {
    if (!currentStep || !('props' in currentStep)) {
      return {};
    }
    if (currentStep.key === 'lamellenart' && 'subCategoryItems' in currentStep.props!) {
      const allPartitionOptions = Object.values(currentStep.props.subCategoryItems)[0];
      const partitionsPossible = getSonnenschutzPartitionPossibilities();

      const possibleOptions = allPartitionOptions.filter((o) =>
        partitionsPossible.includes(Number(o.key))
      );

      const newProps = structuredClone(currentStep.props);
      // currently only L37 possible - temporary fix
      newProps.subCategoryItems.l37 = possibleOptions;
      return newProps;
    }
    if (currentStep.key === 'antriebsart' && 'categoryItems' in currentStep.props!) {
      const lamellenartKey = configuration.sonnenschutz.lamellenart?.subCategory?.key;
      if (!lamellenartKey) {
        return currentStep.props;
      }
      const styleKey = configuration.basis.style.key;
      const width = Number(configuration.basis.size?.w ?? 0);
      const height = Number(configuration.basis.size?.h ?? 0);
      const sectionNumber =
        styleKey === 'flugel1'
          ? 1
          : styleKey === 'flugel2'
            ? 2
            : styleKey === 'flugel3'
              ? 3
              : ((configuration.basis.type as SubStyle).oben?.sectionNumber ?? 1);
      const multiWidth =
        styleKey === 'oberlicht' || styleKey === 'unterlicht'
          ? Object.values(configuration.basis.obenMultiWidth ?? {})
          : Object.values(configuration.basis.multiWidth ?? {});
      const { gurt: gurtAllowed } = getAntriebsartAvailability({
        width,
        height,
        multiWidth,
        sectionNumber,
        teilungKey: String(lamellenartKey),
      });
      if (gurtAllowed) {
        return currentStep.props;
      }
      const newProps = structuredClone(currentStep.props);
      newProps.categoryItems = (newProps.categoryItems as SelectionItem[]).filter(
        (item) => item.key !== 'gurt'
      );
      if ('subCategoryItems' in newProps) {
        const nextSubCategoryItems = {
          ...(newProps.subCategoryItems as Record<string, SelectionItem[]>),
        };
        delete nextSubCategoryItems.gurt;
        newProps.subCategoryItems = nextSubCategoryItems;
      }
      return newProps;
    }
    return currentStep?.props;
  };

  if (coverNotAvailable) return null;

  return (
    <div>
      {groupActive && (
        <div>
          {<Stepper />}
          <div className={style.group}>
            {Component && stepHasCustomComponent(currentStep!) && currentStep?.props ? (
              <Component {...purifyComponentProps()} />
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
                <GroupBottomActions
                  itemNumber={itemsToDisplay?.length || 0}
                  expandable={Boolean(expandable)}
                  toggleExpand={handleExpand}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
