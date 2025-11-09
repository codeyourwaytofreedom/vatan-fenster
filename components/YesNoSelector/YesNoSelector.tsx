import { YesNoSelectorProps } from '@/types/Configurator';
import OptionHolder from '../Product_Holder/Option_Holder';
import style from './YesNoSelector.module.css';
import { useConfiguration } from '@/context/ConfigurationContext';
import { SelectionItem } from '@/types/Configurator';

export default function YesNoSelector({ label }: YesNoSelectorProps) {
  const { currentStep, currentGroup, configuration, setConfiguration, moveToNextStep } =
    useConfiguration();
  const isSelected = (name: string) => {
    if (currentStep) {
      const currentGroupConfig = configuration[currentGroup];
      return (
        (currentGroupConfig[currentStep?.key as keyof typeof currentGroupConfig] as SelectionItem)
          .name === name
      );
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
        [currentGroup]: {
          ...prevConfig[currentGroup],
          [currentStep.key]: item,
        },
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
