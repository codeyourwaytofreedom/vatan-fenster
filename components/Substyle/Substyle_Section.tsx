import { SelectionItem } from '@/data/configuration_options';
import OptionHolder from '../Product_Holder/Option_Holder';
import style from '../.././styles/KonfiguratorPage.module.css';
import { SubStyle } from '@/pages/konfigurator';
import { scrollToElement } from '@/utils';
import { Step } from '@/types/Configurator';
import { steps } from '@/data/steps';

type SubStyleProps = {
  configKey: 'option' | 'oben' | 'unten';
  title: string;
  items?: SelectionItem[];
  substyle: SubStyle;
  setSubStyle: React.Dispatch<React.SetStateAction<SubStyle>>;
  setStep?: React.Dispatch<React.SetStateAction<Step | null>>;
};
export default function Substyle_Section({
  title,
  items,
  configKey,
  substyle,
  setSubStyle,
  setStep,
}: SubStyleProps) {
  const updateSubStyle = (key: string, item: SelectionItem) => {
    setSubStyle((pr) => ({
      ...pr,
      [key]: item,
    }));

    if (key === 'option') {
      scrollToElement('oben');
    } else if (key === 'oben') {
      scrollToElement('unten');
    } else if (key === 'unten') {
      if (substyle.unten) {
        const stepSize = steps.find((s) => s.key === 'size');
        if (stepSize && setStep) {
          setTimeout(() => {
            setStep(stepSize || steps[0]);
          }, 300);
        }
      }
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
              name={item.name}
              image={item.image}
              imageAlt={item.name}
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
