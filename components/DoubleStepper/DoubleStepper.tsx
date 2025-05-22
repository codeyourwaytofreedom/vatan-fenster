import { useEffect, useRef, useState } from 'react';
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
  const { configuration, moveToNextStep, setConfiguration } = useConfiguration();
  //const [expanded, setExpanded] = useState(false);

  const [selection, setSelection] = useState<DobuleSelection>(
    configuration[configurationKey] as DobuleSelection
  );
  const items = useRef<HTMLDivElement>(null);

  const categorySelected = (item: SelectionItem) => (configuration[configurationKey] as DobuleSelection)?.category?.key === item.key;
  const subCategorySelected = (item: SelectionItem) => (configuration[configurationKey] as DobuleSelection)?.subCategory?.key === item.key;


  const itemsToDisplay = subCategoryItems[selection?.category?.key];
  const expandable = itemsToDisplay?.length > 10;

  const [expanded, setExpanded] = useState(false);

  const handleSelectCategory = (item: SelectionItem) => {
    setSelection(() => {
      return {
        category: item,
        subCategory: subCategoryItems[item.key][0],
      };
    });
    setTimeout(() => {
      items?.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleSelectSubCategory = (item: SelectionItem) => {
    setSelection(() => {
      return {
        category: selection.category,
        subCategory: item,
      };
    });
    moveToNextStep();
  };

  useEffect(() => {
      setConfiguration((pr) => {
        return {
          ...pr,
          [configurationKey]: selection,
        };
      });
  }, [selection]);

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
        {itemsToDisplay
          ?.slice(0, !expanded ? 10 : itemsToDisplay.length)
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
        toggleExpand={setExpanded ? () => setExpanded(true) : () => {}}
        expandable={expandable}
        itemNumber={itemsToDisplay?.length || 0}
      />
    </>
  );
}
