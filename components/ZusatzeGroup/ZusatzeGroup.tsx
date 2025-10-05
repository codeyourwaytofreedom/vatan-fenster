import { Config, DobuleSelection, SelectionItem } from '@/types/Configurator';
import OptionHolder from '../Product_Holder/Option_Holder';
import StepRahmenverbreiterung from '../StepRahmenverbreiterung/StepRahmenverbreiterung';
import style from './Zusatze.module.css';
import empty from '@/assets/common/empty.jpg';
import { useConfiguration } from '@/context/ConfigurationContext';
import { useRef } from 'react';
import { scrollToElement } from '@/utils';

export default function ZusatzeGroup() {
  const { configuration, setConfiguration } = useConfiguration();
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
  const subOptions = [
    {
      key: 'nein',
      name: 'Sub Option 1',
      image: empty,
    },
    {
      key: 'ja',
      name: 'Sub Option 2',
      image: empty,
    },
  ];

  const container1 = useRef<HTMLDivElement>(null);
  const container2 = useRef<HTMLDivElement>(null);
  const container3 = useRef<HTMLDivElement>(null);
  const container4 = useRef<HTMLDivElement>(null);
  const container5 = useRef<HTMLDivElement>(null);
  const container6 = useRef<HTMLDivElement>(null);
  const container7 = useRef<HTMLDivElement>(null);

  const updateConfiguration = (
    item: SelectionItem,
    key: string,
    nextContainer?: HTMLDivElement
  ) => {
    setConfiguration((pr) => {
      return {
        ...pr,
        [key]: item,
      };
    });
    if (nextContainer) {
      scrollToElement({ htmlElement: nextContainer, offset: 200 });
    }
  };

  const updateCategory = (
    key: string,
    item: SelectionItem,
    subOptions: SelectionItem[],
    nextContainer?: HTMLDivElement
  ) => {
    setConfiguration((pr) => {
      return {
        ...pr,
        [key]: {
          category: item,
          subCategory: subOptions[0],
        },
      };
    });
    if (nextContainer) {
      scrollToElement({ htmlElement: nextContainer, offset: 200 });
    }
  };
  const updateSubcategory = (key: string, item: SelectionItem, nextContainer?: HTMLDivElement) => {
    setConfiguration((pr) => {
      return {
        ...pr,
        [key]: {
          category: (pr[key as keyof Config] as DobuleSelection)?.category,
          subCategory: item,
        },
      };
    });
    if (nextContainer) {
      scrollToElement({ htmlElement: nextContainer, offset: 300 });
    }
  };

  const isSelected = (name: string, key?: string) => {
    return (configuration[key as keyof Config] as SelectionItem)?.name === name;
  };

  const categorySelected = (item: SelectionItem, key: string) =>
    (configuration[key as keyof Config] as DobuleSelection)?.category?.key === item.key;
  const subCategorySelected = (item: SelectionItem, key: string) =>
    (configuration[key as keyof Config] as DobuleSelection)?.subCategory?.key === item.key;

  return (
    <>
      <br />
      <br />
      <h4>Möchten Sie Sicherheitsbeschläge hinzufügen?</h4>
      <br />
      <div className={style.container}>
        {options.map((option, i) => (
          <OptionHolder
            item={option}
            key={i}
            action={() => updateCategory('sicherheitsbeschlage', option, subOptions)}
            selected={categorySelected(option, 'sicherheitsbeschlage')}
          />
        ))}
      </div>
      {configuration['sicherheitsbeschlage'].category.key === 'ja' && <br />}
      <div
        className={style.container}
        style={{
          maxHeight: configuration['sicherheitsbeschlage'].category.key === 'ja' ? '700px' : 0,
        }}
      >
        {subOptions.map((option, i) => (
          <OptionHolder
            item={option}
            key={i}
            action={() => updateSubcategory('sicherheitsbeschlage', option, container1.current!)}
            selected={subCategorySelected(option, 'sicherheitsbeschlage')}
          />
        ))}
      </div>
      <br />
      <br />
      <h4 className={style.label}>Möchten Sie verdeckt liegende Beschläge hinzufügen?</h4>
      <br />
      <div className={style.container} ref={container1}>
        {options.map((option, i) => (
          <OptionHolder
            item={option}
            key={i}
            action={() =>
              updateConfiguration(option, 'verdecktLiegenderBeschlag', container2.current!)
            }
            selected={isSelected(option.name, 'verdecktLiegenderBeschlag')}
          />
        ))}
      </div>
      <br />
      <br />
      <h4 className={style.label}>Möchten Sie für das Kunststoffprofil eine dünne Schweißnaht?</h4>
      <br />
      <div className={style.container} ref={container2}>
        {options.map((option, i) => (
          <OptionHolder
            item={option}
            key={i}
            action={() =>
              updateConfiguration(option, 'dünneSchweißnahtVPerfect', container3.current!)
            }
            selected={isSelected(option.name, 'dünneSchweißnahtVPerfect')}
          />
        ))}
      </div>
      <br />
      <br />
      <h4 className={style.label}>Möchten Sie Reedkontakte hinzufügen?</h4>
      <br />
      <div className={style.container} ref={container3}>
        {options.map((option, i) => (
          <OptionHolder
            item={option}
            key={i}
            action={() => updateConfiguration(option, 'reedKontakt', container4.current!)}
            selected={isSelected(option.name, 'reedKontakt')}
          />
        ))}
      </div>
      <br />
      <br />
      <h4 className={style.label}>Möchten Sie Montagevorbohrungen hinzufügen?</h4>
      <br />
      <div className={style.container} ref={container4}>
        {options.map((option, i) => (
          <OptionHolder
            item={option}
            key={i}
            action={() => updateConfiguration(option, 'montagevorbohrungen', container5.current!)}
            selected={isSelected(option.name, 'montagevorbohrungen')}
          />
        ))}
      </div>
      <br />
      <br />
      <h4>Möchten Sie ein Lüftungssystem hinzufügen?</h4>
      <br />
      <div className={style.container} ref={container5}>
        {options.map((option, i) => (
          <OptionHolder
            item={option}
            key={i}
            action={() =>
              updateCategory('lüftungssysteme', option, subOptions, container6.current!)
            }
            selected={categorySelected(option, 'lüftungssysteme')}
          />
        ))}
      </div>
      <br />
      <div
        className={style.container}
        style={{ maxHeight: configuration['lüftungssysteme'].category.key === 'ja' ? '700px' : 0 }}
        ref={container6}
      >
        {subOptions.map((option, i) => (
          <OptionHolder
            item={option}
            key={i}
            action={() => updateSubcategory('lüftungssysteme', option, container7.current!)}
            selected={subCategorySelected(option, 'lüftungssysteme')}
          />
        ))}
      </div>
      <br />
      <br />
      <h4 className={style.label}>Möchten Sie Rahmenverbreitung hinzufügen?</h4>
      <br />
      <div ref={container7}>
        <StepRahmenverbreiterung />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
