import { useConfiguration } from '@/context/ConfigurationContext';
import OptionHolder from '../Product_Holder/Option_Holder';
import style from './StepRahmenverbreiterung.module.css';
import { Config, SelectionItem } from '@/types/Configurator';
import { yesNoOptions } from '@/data/configurationData';
import StepRahmenverbreiterungAuswahlen from '../StepRahmenverbreiterungAuswahlen/StepRahmenverbreiterungAuswahlen';
import { useRef } from 'react';
import { scrollToElement } from '@/utils';

export default function StepRahmenverbreiterung() {
  const { configuration, setConfiguration } = useConfiguration();

  const nextContainer = useRef<HTMLDivElement>(null);

  const isSelected = (item: SelectionItem, key: keyof Config) => {
    return (configuration[key] as SelectionItem).key === item.key;
  };

  const updateConfiguration = (
    item: {
      key: string;
      name: string;
    },
    key: keyof Config,
    moveToElemnt?: boolean
  ) => {
    setConfiguration((prevConfig) => ({
      ...prevConfig,
      [key]: item,
    }));
    if (moveToElemnt) {
      setTimeout(() => {
        scrollToElement({ htmlElement: nextContainer.current! });
      }, 300);
    }
  };

  return (
    <>
      <div className={style.container}>
        {yesNoOptions.map((option, i) => (
          <OptionHolder
            item={option}
            key={i}
            action={() => updateConfiguration(option, 'rahmenverbreiterung', true)}
            selected={isSelected(option, 'rahmenverbreiterung')}
          />
        ))}
      </div>
      {configuration.rahmenverbreiterung.key === 'ja' && (
        <>
          <br />
          <h4 className={style.label}>Sollen die Rahmenverbreiterungen montiert werden?</h4>
          <br />
          <div className={style.container}>
            {yesNoOptions.map((option, i) => (
              <OptionHolder
                item={option}
                key={i}
                action={() => updateConfiguration(option, 'rahmenverbreitungMontiert')}
                selected={isSelected(option, 'rahmenverbreitungMontiert')}
              />
            ))}
          </div>
        </>
      )}
      {configuration.rahmenverbreiterung.key === 'ja' && (
        <>
          <div ref={nextContainer}>
            <StepRahmenverbreiterungAuswahlen />
          </div>
        </>
      )}
    </>
  );
}
