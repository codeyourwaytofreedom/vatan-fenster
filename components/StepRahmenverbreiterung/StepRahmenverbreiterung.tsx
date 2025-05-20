import { useConfiguration } from '@/context/ConfigurationContext';
import OptionHolder from '../Product_Holder/Option_Holder';
import style from './StepRahmenverbreiterung.module.css';
import { Config, SelectionItem } from '@/types/Configurator';
import { yesNoOptions } from '@/data/configurationData';
import StepRahmenverbreiterungAuswahlen from '../StepRahmenverbreiterungAuswahlen/StepRahmenverbreiterungAuswahlen';

export default function StepRahmenverbreiterung() {
  const { configuration, setConfiguration, moveToNextStep } = useConfiguration();

  const isSelected = (item: SelectionItem, key: keyof Config) => {
    return (configuration[key] as SelectionItem).key === item.key;
  };

  const updateConfiguration = (
    item: {
      key: string;
      name: string;
    },
    key: keyof Config,
    moveNext: boolean
  ) => {
    setConfiguration((prevConfig) => ({
      ...prevConfig,
      [key]: item,
    }));
    if (moveNext) {
      moveToNextStep();
    }
  };

  return (
    <>
      <br />
      <h4 className={style.label}>Möchten Sie Rahmenverbreitung hinzufügen?</h4>
      <br />
      <div className={style.container}>
        {yesNoOptions.map((option, i) => (
          <OptionHolder
            item={option}
            key={i}
            action={() => updateConfiguration(option, 'rahmenverbreiterung', false)}
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
                action={() => updateConfiguration(option, 'rahmenverbreitungMontiert', false)}
                selected={isSelected(option, 'rahmenverbreitungMontiert')}
              />
            ))}
          </div>
        </>
      )}
      {configuration.rahmenverbreiterung.key === 'ja' && (
        <>
          <StepRahmenverbreiterungAuswahlen />
        </>
      )}
    </>
  );
}
