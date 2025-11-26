import { useRef, useState } from 'react';
import OptionHolder from '../Product_Holder/Option_Holder';
import style from './DoubleStepper.module.css';
import { DobuleSelection, DoubleStepperProps, SelectionItem } from '@/types/Configurator';
import GroupBottomActions from '../GroupBottomActions/GroupBottomActions';
import { useConfiguration } from '@/context/ConfigurationContext';

export default function DoubleStepper({
  categoryItems,
  subCategoryItems,
  configurationKey,
  label,
}: DoubleStepperProps) {
  const { configuration, currentGroup, currentStep, moveToNextStep, setConfiguration } =
    useConfiguration();

  const items = useRef<HTMLDivElement>(null);

  const categorySelected = (item: SelectionItem) => {
    const currentGroupConfig = configuration[currentGroup];
    const currentValue = currentGroupConfig[currentStep?.key as keyof typeof currentGroupConfig];
    return (currentValue as DobuleSelection)?.category?.key === item.key;
  };

  const subCategorySelected = (item: SelectionItem) => {
    const currentGroupConfig = configuration[currentGroup];
    const currentValue = currentGroupConfig[currentStep?.key as keyof typeof currentGroupConfig];
    return (currentValue as DobuleSelection)?.subCategory?.key === item.key;
  };

  const itemsToDisplay = () => {
    const currentGroupConfig = configuration[currentGroup];
    return subCategoryItems[
      (currentGroupConfig[configurationKey as keyof typeof currentGroupConfig] as DobuleSelection)
        ?.category?.key
    ];
  };

  const expandable = itemsToDisplay()?.length > 10;

  const [expanded, setExpanded] = useState(false);

  const handleSelectCategory = (item: SelectionItem) => {
    const currentGroupConfig = configuration[currentGroup];
    const currentValue = currentGroupConfig[configurationKey as keyof typeof currentGroupConfig];
    if (item.key === (currentValue as DobuleSelection).category.key) {
      return setTimeout(() => {
        items?.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
    setConfiguration((pr) => {
      return {
        ...pr,
        [currentGroup]: {
          ...pr[currentGroup],
          [configurationKey]: {
            category: item,
            subCategory: subCategoryItems[item.key][0],
          },
        },
      };
    });
    setTimeout(() => {
      items?.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleSelectSubCategory = (item: SelectionItem) => {
    setConfiguration((pr) => {
      const currentConfig = pr[currentGroup];
      const currentCategory = (
        currentConfig[configurationKey as keyof typeof currentConfig] as DobuleSelection
      ).category;
      return {
        ...pr,
        [currentGroup]: {
          ...pr[currentGroup],
          [configurationKey]: {
            category: currentCategory,
            subCategory: item,
          },
        },
      };
    });
    moveToNextStep();
  };

  return (
    <>
      {label && (
        <>
          <br />
          <h4 className={style.label}>{label}</h4>
          <br />
        </>
      )}
      <div className={style.config_wrapper_option_holders}>
        {categoryItems
          ?.slice(0, !expanded ? 10 : categoryItems.length)
          .map((item, index) => (
            <OptionHolder
              key={index}
              item={item}
              selected={categorySelected(item)}
              action={() => handleSelectCategory(item)}
            />
          ))}
      </div>
      <br />
      <div className={style.config_wrapper_option_holders} ref={items}>
        {itemsToDisplay()
          ?.slice(0, !expanded ? 10 : itemsToDisplay().length)
          .map((item, index) => (
            <OptionHolder
              key={index}
              item={item}
              selected={subCategorySelected(item)}
              action={() => handleSelectSubCategory(item)}
            />
          ))}
      </div>
      <GroupBottomActions
        toggleExpand={!expanded ? () => setExpanded(true) : () => setExpanded(false)}
        expandable={expandable}
        itemNumber={itemsToDisplay()?.length || 0}
      />
    </>
  );
}
