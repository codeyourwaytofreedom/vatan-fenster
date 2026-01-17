import OptionHolder from '../Product_Holder/Option_Holder';
import style from '../.././styles/KonfiguratorPage.module.css';
import { scrollToElement } from '@/utils';
import { useConfiguration } from '@/context/ConfigurationContext';
import { SelectionItem } from '@/types/Configurator';

type SubStyleProps = {
  configKey: 'option' | 'oben' | 'unten';
  title: string;
  items?: SelectionItem[];
  comesFirst?: 'Oberlicht' | 'Unterlicht';
};
export default function Substyle_Section({ title, items, configKey, comesFirst }: SubStyleProps) {
  const { substyle, currentGroup, currentStep, setSubStyle, setCurrentStep, getStepsForGroup } =
    useConfiguration();

  const moveToNextStep = () => {
    const stepsForGroup = getStepsForGroup(currentGroup);
    const currentIndex = stepsForGroup.findIndex((step) => step.key === currentStep?.key);
    const nextStep = stepsForGroup[currentIndex + 1];
    if (nextStep) {
      setCurrentStep!(nextStep);
    }
  };

  const moveToSection = () => {
    switch (comesFirst) {
      case 'Oberlicht':
        scrollToElement({ elementId: 'oben' });
        break;
      case 'Unterlicht':
        scrollToElement({ elementId: 'unten' });
        break;
      default:
        break;
    }
  };

  const updateSubStyle = (key: string, item: SelectionItem) => {
    setSubStyle((pr) => ({
      ...pr,
      [key]: item,
    }));

    if (key === 'option') {
      moveToSection();
    }
    if (key === 'oben' && comesFirst === 'Oberlicht') {
      scrollToElement({ elementId: 'unten' });
    }
    if (key === 'unten' && comesFirst === 'Oberlicht') {
      setTimeout(() => {
        moveToNextStep();
      }, 300);
    }
    if (key === 'unten' && comesFirst === 'Unterlicht') {
      scrollToElement({ elementId: 'oben' });
    }
    if (key === 'oben' && comesFirst === 'Unterlicht') {
      setTimeout(() => {
        moveToNextStep();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 200);
    }
  };

  const complete = substyle[configKey as keyof typeof substyle];
  return (
    <>
      <div id={configKey}>
        <h2 id={complete ? style.complete : style.notcomplete}>{title}</h2>
        <div className={style.config_wrapper_option_holders}>
          {items?.map((item, index) => (
            <OptionHolder
              item={item}
              selected={substyle[configKey as keyof typeof substyle]?.name === item.name}
              action={() => updateSubStyle(configKey, item)}
              key={index}
            />
          ))}
        </div>
        <br />
        <br />
      </div>
    </>
  );
}
