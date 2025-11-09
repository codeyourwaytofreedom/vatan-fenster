import OptionHolder from '../Product_Holder/Option_Holder';
import style from './Fenstergriffe.module.css';
import { useConfiguration } from '@/context/ConfigurationContext';
import GroupBottomActions from '../GroupBottomActions/GroupBottomActions';
import { useRef, useState } from 'react';
import { SelectionItem } from '@/types/Configurator';
import { farbenOptions, fenstergriffeOptions } from '@/data/selectionItems/farbenData';

export default function Fenstergriffe() {
  const { configuration, setConfiguration, setCurrentGroup, moveToNextStep } = useConfiguration();
  const handleOptions = farbenOptions.fenstergriffe;
  const subHandleOptions =
    fenstergriffeOptions[configuration.farben.fenstergriffe?.type.key as keyof SelectionItem] || [];

  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const core = useRef<HTMLDivElement>(null);

  const handleSelectHandleGroup = (item: SelectionItem) => {
    setConfiguration((pr) => {
      return {
        ...pr,
        farben: {
          ...pr.farben,
          fenstergriffe: { type: item, choice: fenstergriffeOptions[item.key][0] },
        },
      };
    });
    core.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectHandleType = (item: SelectionItem) => {
    setConfiguration((pr) => {
      return {
        ...pr,
        farben: {
          ...pr.farben,
          fenstergriffe: { type: configuration.farben.fenstergriffe!.type, choice: item },
        },
      };
    });
    moveToNextStep();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  const expandable = !expandedCategories.includes(
    configuration.farben.fenstergriffe?.type.name as string
  );

  return (
    <>
      <div className={style.option_holders}>
        {handleOptions.map((item, key) => (
          <OptionHolder
            key={key}
            selected={configuration.farben.fenstergriffe?.type.key === item.key}
            action={() => handleSelectHandleGroup(item)}
            item={item}
          />
        ))}
      </div>
      <br />
      <div className={style.option_holders} ref={core}>
        {subHandleOptions.slice(0, !expandable ? subHandleOptions.length : 10).map((item, key) => (
          <OptionHolder
            key={key}
            selected={configuration.farben.fenstergriffe?.choice.key === item.key}
            action={() => handleSelectHandleType(item)}
            item={item}
          />
        ))}
      </div>
      <GroupBottomActions
        itemNumber={subHandleOptions.length}
        expandable={expandable}
        isLastStep={true}
        toggleExpand={() =>
          setExpandedCategories([
            ...expandedCategories,
            configuration.farben.fenstergriffe?.type.name as string,
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
