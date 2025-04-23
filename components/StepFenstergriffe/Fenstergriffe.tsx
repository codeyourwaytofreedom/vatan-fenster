import { farbenOptions, fenstergriffeOptions, SelectionItem } from '@/data/configuration_options';
import OptionHolder from '../Product_Holder/Option_Holder';
import style from './Fenstergriffe.module.css';
import { useConfiguration } from '@/context/ConfigurationContext';
import GroupBottomActions from '../GroupBottomActions/GroupBottomActions';
import { useRef, useState } from 'react';

export default function Fenstergriffe() {
  const { configuration, setConfiguration, setCurrentGroup } = useConfiguration();
  const handleOptions = farbenOptions.fenstergriffe;
  const subHandleOptions =
    fenstergriffeOptions[configuration.fenstergriffe?.type.key as keyof SelectionItem];

  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const core = useRef<HTMLDivElement>(null);

  const handleSelectHandleGroup = (item: SelectionItem) => {
    setConfiguration((pr) => {
      return { ...pr, fenstergriffe: { type: item, choice: fenstergriffeOptions[item.key][0] } };
    });
    core.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectHandleType = (item: SelectionItem) => {
    setConfiguration((pr) => {
      return { ...pr, fenstergriffe: { type: configuration.fenstergriffe!.type, choice: item } };
    });
  };

  const expandable = !expandedCategories.includes(configuration.fenstergriffe?.type.name as string);

  return (
    <>
      <div className={style.option_holders}>
        {handleOptions.map((item, key) => (
          <OptionHolder
            key={key}
            selected={configuration.fenstergriffe?.type.key === item.key}
            action={() => handleSelectHandleGroup(item)}
            item={item}
          />
        ))}
      </div>
      <br />
      <div className={style.option_holders} ref={core}>
        {subHandleOptions.slice(0, !expandable ? subHandleOptions.length : 5).map((item, key) => (
          <OptionHolder
            key={key}
            selected={configuration.fenstergriffe?.choice.key === item.key}
            action={() => handleSelectHandleType(item)}
            item={item}
          />
        ))}
      </div>
      <GroupBottomActions
        expandable={expandable}
        isLastStep={true}
        expandAction={() =>
          setExpandedCategories([
            ...expandedCategories,
            configuration.fenstergriffe?.type.name as string,
          ])
        }
        nextGroupAction={() => {
          setCurrentGroup('verglasung');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </>
  );
}
