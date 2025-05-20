import { YesNoSelectorProps } from '@/types/Configurator';
import OptionHolder from '../Product_Holder/Option_Holder';
import style from './YesNoSelector.module.css';
import { useConfiguration } from '@/context/ConfigurationContext';
import { Config, SelectionItem } from '@/types/Configurator';

export default function YesNoSelector({ label }: YesNoSelectorProps) {
  const { currentStep, configuration, setConfiguration, moveToNextStep } = useConfiguration();
  const isSelected = (name: string) => {
    if (currentStep) {
      return (configuration[currentStep?.key as keyof Config] as SelectionItem).name === name;
    }
    return false;
  };
  const options = [
    {
      key: 'nein',
      name: 'Nein',
    },
    {
      key: 'ja',
      name: 'Ja',
    },
  ];
  const updateConfiguration = (item: SelectionItem) => {
    if (currentStep) {
      setConfiguration((prevConfig) => ({
        ...prevConfig,
        [currentStep?.key as keyof Config]: item,
      }));
    }
    moveToNextStep();
  };
  return (
    <>
      <br />
      <h4 className={style.label}>{label}</h4>
      <br />
      <div className={style.container}>
        {options.map((option, i) => (
          <OptionHolder
            item={option}
            key={i}
            action={() => updateConfiguration(option)}
            selected={isSelected(option.name)}
          />
        ))}
      </div>
    </>
  );
}
