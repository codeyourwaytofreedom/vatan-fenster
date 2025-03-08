import { SelectionItem } from '@/data/configuration_options';
import OptionHolder from '../Product_Holder/Option_Holder';
import style from '../.././styles/KonfiguratorPage.module.css';
import { scrollToElement } from '@/utils';
import { Step, SubStyle } from '@/types/Configurator';
import { steps } from '@/data/steps';

type SubStyleProps = {
  configKey: 'option' | 'oben' | 'unten';
  title: string;
  currentGroup: 'basis' | 'farben';
  items?: SelectionItem[];
  substyle: SubStyle;
  comesFirst?: 'Oberlicht' | 'Unterlicht';
  setSubStyle: React.Dispatch<React.SetStateAction<SubStyle>>;
  setStep?: React.Dispatch<React.SetStateAction<Step | null>>;
};
export default function Substyle_Section({
  title,
  items,
  currentGroup,
  configKey,
  substyle,
  comesFirst,
  setSubStyle,
  setStep,
}: SubStyleProps) {
  const moveToSection = () => {
    switch (comesFirst) {
      case 'Oberlicht':
        scrollToElement('oben');
        break;
      case 'Unterlicht':
        scrollToElement('unten');
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
      scrollToElement('unten');
    }
    if (key === 'unten' && comesFirst === 'Oberlicht') {
      setTimeout(() => {
        setStep!(steps[currentGroup].find((s) => s.key === 'size')!);
      }, 300);
    }
    if (key === 'unten' && comesFirst === 'Unterlicht') {
      scrollToElement('oben');
    }
    if (key === 'oben' && comesFirst === 'Unterlicht') {
      setTimeout(() => {
        setStep!(steps[currentGroup].find((s) => s.key === 'size')!);
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
