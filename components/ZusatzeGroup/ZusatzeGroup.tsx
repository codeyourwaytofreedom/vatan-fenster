import { Config, DobuleSelection, SelectionItem } from '@/types/Configurator';
import OptionHolder from '../Product_Holder/Option_Holder';
import StepRahmenverbreiterung from '../StepRahmenverbreiterung/StepRahmenverbreiterung';
import style from './Zusatze.module.css';
import { useConfiguration } from '@/context/ConfigurationContext';
import { useRef } from 'react';
import { scrollToElement } from '@/utils';

export default function ZusatzeGroup() {
  const { configuration, windowHandleNumber, setConfiguration } = useConfiguration();

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

  const lüftungssystemeSubOptions = [
    {
      key: 'fRegelAir',
      name: 'Fensterfalzventil REGEL - Air ',
    },
    {
      key: 'fMacoVent',
      name: 'Fensterfalzventil MACO Vent',
    },
  ];

  const paarOptions = [
    {
      key: '1',
      name: '1 Paar',
    },
    {
      key: '2',
      name: '2 Paar',
    },
    {
      key: '3',
      name: '3 Paar',
    },
    {
      key: '4',
      name: '4 Paar',
    },
    {
      key: '5',
      name: '5 Paar',
    },
  ];

  const selectedProfileKey = configuration.profile.key;

  const sicherheitsbeschlageSubOptions = ['I5', 'I5C', 'IL'].includes(selectedProfileKey)
    ? [
        {
          key: 'basissicherheit',
          name: 'Basissicherheit',
        },
        {
          key: 'aufbohrschutz',
          name: 'Aufbohrschutz',
        },
        {
          key: 'rc1n',
          name: 'RC 1 N',
        },
        {
          key: 'rc2n',
          name: 'RC 2 N',
        },
      ]
    : ['IE', 'IEC'].includes(selectedProfileKey)
      ? [
          {
            key: 'basissicherheit',
            name: 'Basissicherheit',
          },
          {
            key: 'rc1n',
            name: 'RC 1 N',
          },
          {
            key: 'rc2n',
            name: 'RC 2 N',
          },
        ]
      : [];

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
    nextContainer?: HTMLDivElement,
    paar?: number
  ) => {
    setConfiguration((pr) => {
      return {
        ...pr,
        [key]: {
          category: item,
          subCategory: subOptions[0],
          ...(paar ? { paar: paar } : {}),
        },
      };
    });
    if (nextContainer) {
      scrollToElement({ htmlElement: nextContainer, offset: 200 });
    }
  };
  const updateSubcategory = (
    key: string,
    item: SelectionItem,
    nextContainer?: HTMLDivElement,
    paar?: number
  ) => {
    setConfiguration((pr) => {
      return {
        ...pr,
        [key]: {
          category: (pr[key as keyof Config] as DobuleSelection)?.category,
          subCategory: item,
          ...(paar ? { paar: configuration.lüftungssysteme.paar ?? paar } : {}),
        },
      };
    });
    if (nextContainer) {
      scrollToElement({ htmlElement: nextContainer, offset: 300 });
    }
  };

  const updateLüftungssystemePaar = (paar: number) => {
    setConfiguration((pr) => {
      return {
        ...pr,
        lüftungssysteme: {
          category: pr.lüftungssysteme?.category,
          subCategory: pr.lüftungssysteme?.subCategory,
          paar: paar,
        },
      };
    });
  };

  const isSelected = (name: string, key?: string) => {
    return (configuration[key as keyof Config] as SelectionItem)?.name === name;
  };

  const categorySelected = (item: SelectionItem, key: string) =>
    (configuration[key as keyof Config] as DobuleSelection)?.category?.key === item.key;
  const subCategorySelected = (item: SelectionItem, key: string) =>
    (configuration[key as keyof Config] as DobuleSelection)?.subCategory?.key === item.key;
  const paarSelected = (paar: number) => paar === configuration.lüftungssysteme.paar;

  const lüftungssystemeSelected = configuration['lüftungssysteme'].category.key === 'ja';

  return (
    <>
      {Boolean(windowHandleNumber) && (
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
                action={() =>
                  updateCategory('sicherheitsbeschlage', option, sicherheitsbeschlageSubOptions)
                }
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
            {sicherheitsbeschlageSubOptions.map((option, i) => (
              <OptionHolder
                item={option}
                key={i}
                action={() =>
                  updateSubcategory('sicherheitsbeschlage', option, container1.current!)
                }
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
        </>
      )}
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

      {Boolean(windowHandleNumber) && (
        <>
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
        </>
      )}

      <br />
      <br />
      <h4 className={style.label}>Möchten Sie Montagevorbohrungen hinzufügen?</h4>
      <br />
      <div className={style.container} ref={container4} style={{ marginBottom: 20 }}>
        {options.map((option, i) => (
          <OptionHolder
            item={option}
            key={i}
            action={() => updateConfiguration(option, 'montagevorbohrungen', container5.current!)}
            selected={isSelected(option.name, 'montagevorbohrungen')}
          />
        ))}
      </div>

      {Boolean(windowHandleNumber) && (
        <>
          <br />
          <h4>Möchten Sie ein Lüftungssystem hinzufügen?</h4>
          <br />
          <div className={style.container} ref={container5}>
            {options.map((option, i) => (
              <OptionHolder
                item={option}
                key={i}
                action={() =>
                  updateCategory(
                    'lüftungssysteme',
                    option,
                    lüftungssystemeSubOptions,
                    container6.current!,
                    1
                  )
                }
                selected={categorySelected(option, 'lüftungssysteme')}
              />
            ))}
          </div>
          <br />
          <div
            className={style.container}
            style={{
              maxHeight: lüftungssystemeSelected ? '700px' : 0,
            }}
            ref={container6}
          >
            {lüftungssystemeSubOptions.map((option, i) => (
              <OptionHolder
                item={option}
                key={i}
                action={() => updateSubcategory('lüftungssysteme', option, container7.current!, 1)}
                selected={subCategorySelected(option, 'lüftungssysteme')}
              />
            ))}
          </div>
          <div
            className={style.container}
            style={{
              maxHeight: lüftungssystemeSelected ? '700px' : 0,
              marginTop: 20,
              marginBottom: lüftungssystemeSelected ? 20 : 0,
            }}
            ref={container6}
          >
            {paarOptions.map((option, i) => (
              <OptionHolder
                item={option}
                key={i}
                action={() => updateLüftungssystemePaar(parseInt(option.key))}
                selected={paarSelected(parseInt(option.key))}
              />
            ))}
          </div>
          {lüftungssystemeSelected && (
            <>
              <h4 style={{ color: 'darkorange' }}>
                Ein Paar der Fensterfalzlüfter besteht aus jeweils zwei Stück pro Flügel.
              </h4>
              <br />
            </>
          )}
        </>
      )}
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
