import { SelectionItem } from '@/data/configuration_options';
import OptionHolder from '../Product_Holder/Option_Holder';
import style from '../.././styles/KonfiguratorPage.module.css';
import { SubStyle } from '@/pages/konfigurator';
import { scrollToElement } from '@/utils';

type SubStyleProps = {
  configKey: 'option' | 'oben' | 'unten';
  title: string;
  items?: SelectionItem[];
  substyle: SubStyle;
  comesFirst?: 'Oberlicht' | 'Unterlicht';
  setSubStyle: React.Dispatch<React.SetStateAction<SubStyle>>;
};
export default function Substyle_Section({
  title,
  items,
  configKey,
  substyle,
  comesFirst,
  setSubStyle,
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
    if (key === 'unten' && comesFirst === 'Unterlicht') {
      scrollToElement('oben');
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
