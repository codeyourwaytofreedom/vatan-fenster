import { useConfiguration } from '@/context/ConfigurationContext';
import OptionHolder from '../Product_Holder/Option_Holder';
import style from './StepRahmenverbreiterung.module.css';
import { Config } from '@/types/Configurator';

export default function StepRahmenverbreiterung() {
  const { configuration, setConfiguration, moveToNextStep } = useConfiguration();

  const isSelected = (name: string, key: keyof Config) => {
    return configuration[key] === name;
  };

  const options: { key: string; name: 'Nein' | 'Ja' }[] = [
    {
      key: 'ja',
      name: 'Ja',
    },
    {
      key: 'nein',
      name: 'Nein',
    },
  ];

  const updateConfiguration = (
    item: { key: string; name: 'Nein' | 'Ja' },
    key: keyof Config,
    moveNext: boolean
  ) => {
    setConfiguration((prevConfig) => ({
      ...prevConfig,
      [key]: item.name,
    }));
    if (moveNext) moveToNextStep();
  };

  return (
    <>
      <br />
      <h4 className={style.label}>Möchten Sie Rahmenverbreitung hinzufügen?</h4>
      <br />
      <div className={style.container}>
        {options.map((option, i) => (
          <OptionHolder
            item={option}
            key={i}
            action={() => updateConfiguration(option, 'rahmenverbreitung', false)}
            selected={isSelected(option.name, 'rahmenverbreitung')}
          />
        ))}
      </div>
      {configuration.rahmenverbreitung === 'Ja' && (
        <>
          <br />
          <h4 className={style.label}>Sollen die Rahmenverbreiterungen montiert werden?</h4>
          <br />
          <div className={style.container}>
            {options.map((option, i) => (
              <OptionHolder
                item={option}
                key={i}
                action={() => updateConfiguration(option, 'rahmenverbreitungMontiert', true)}
                selected={isSelected(option.name, 'rahmenverbreitungMontiert')}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
