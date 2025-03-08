import { SelectionItem } from '@/data/configuration_options';
import OptionHolder from '../Product_Holder/Option_Holder';
import style from '../.././styles/KonfiguratorPage.module.css';
import { scrollToElement } from '@/utils';
import { steps } from '@/data/steps';
import { useConfiguration } from '@/context/ConfigurationContext';

type SubStyleProps = {
  configKey: 'option' | 'oben' | 'unten';
  title: string;
  items?: SelectionItem[];
  comesFirst?: 'Oberlicht' | 'Unterlicht';
};
export default function Substyle_Section({ title, items, configKey, comesFirst }: SubStyleProps) {
  const { substyle, currentGroup, setSubStyle, setCurrentStep } = useConfiguration();

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
        setCurrentStep!(steps[currentGroup].find((s) => s.key === 'size')!);
      }, 300);
    }
    if (key === 'unten' && comesFirst === 'Unterlicht') {
      scrollToElement('oben');
    }
    if (key === 'oben' && comesFirst === 'Unterlicht') {
      setTimeout(() => {
        setCurrentStep!(steps[currentGroup].find((s) => s.key === 'size')!);
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
