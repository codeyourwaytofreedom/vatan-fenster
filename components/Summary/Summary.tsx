import { Config, Step, SubStyle } from '@/types/Configurator';
import style from '../.././styles/KonfiguratorPage.module.css';
import { ReactNode, SetStateAction, useEffect, useState } from 'react';
import { scrollToElement } from '@/utils';
import { steps } from '@/data/steps';

interface SummaryProps {
  configuration: Config;
  currentGroup: 'basis' | 'farben';
  sizer?: ReactNode;
  actions?: ReactNode;
  setStep: React.Dispatch<SetStateAction<Step | null>>;
  setCurrentGroup: React.Dispatch<React.SetStateAction<'basis' | 'farben'>>;
}

export default function SummaryDisplayer({ configuration, currentGroup, sizer, actions, setStep, setCurrentGroup }: SummaryProps) {
  const [summaryItemsToDisplay, setSummaryItems] = useState<Partial<Config>>({});
  useEffect(() => {
    (() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { size, type, ...config } = configuration;
      if (typeof type !== 'string' && type) {
        const { oben, unten, option } = type as SubStyle;
        const subStyleSummary = {
          type: option?.name,
          // have to adjust to oberlicht unterlicht switch
          oben: configuration.style === 'Unterlicht' ? unten?.name : oben?.name,
          unten: configuration.style === 'Unterlicht' ? oben?.name : unten?.name,
        };
        return setSummaryItems({ ...config, ...subStyleSummary });
      }
      return setSummaryItems({ ...config, type });
    })();
  }, [configuration]);

  const handleShowStep = (key: string) => {
    if (['oben', 'unten'].includes(key)) {
      setStep(steps[currentGroup].find((st) => st.key === 'type') || null);
      if (configuration.style === 'Oberlicht') {
        scrollToElement(key, 50);
      }
      if (configuration.style === 'Unterlicht') {
        if (key === 'oben') {
          scrollToElement('unten', 50);
        }
        if (key === 'unten') {
          scrollToElement('oben', 50);
        }
      }
      return;
    }
    const parentKey = Object.entries(steps).find(([, value]) => 
      Array.isArray(value) && value.some(item => item.key === key)
    )?.[0] as 'basis' | 'farben';

    setCurrentGroup(parentKey);
    setStep(steps[parentKey].find((st) => st.key === key) || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id={style.summary}>
      <h3>Bestellübersicht</h3>
      {sizer}
      <div id={style.items}>
        {Object.keys(summaryItemsToDisplay).map((key, index) => (
          <div key={index} className={style.item} onClick={() => handleShowStep(key)} id={key}>
            <span id={style.title}>&#x2022; {key.toUpperCase()}</span>
            <span id={style.value}>
              {summaryItemsToDisplay[key as keyof typeof summaryItemsToDisplay] as string}
            </span>
          </div>
        ))}
      </div>
      {actions}
    </div>
  );
}
