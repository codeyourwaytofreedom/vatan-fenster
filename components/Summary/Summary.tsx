import { Config, Step } from '@/types/Configurator';
import style from '../.././styles/KonfiguratorPage.module.css';
import { ReactNode, SetStateAction, useEffect, useState } from 'react';
import { SubStyle } from '@/pages/konfigurator';
import { scrollToElement } from '@/utils';
import { steps } from '@/data/steps';

interface SummaryProps {
  configuration: Config;
  sizer?: ReactNode;
  actions?: ReactNode;
  setStep: React.Dispatch<SetStateAction<Step | null>>;
}

export default function SummaryDisplayer({
  configuration,
  sizer,
  actions,
  setStep,
}: SummaryProps) {
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
      setStep(steps.find((st) => st.key === 'type') || null);
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
    setStep(steps.find((st) => st.key === key) || null);
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
{/*         {extraConfig &&
          Object.keys(extraConfig).map((key, index) => (
            <div key={index} className={style.item}>
              <span id={style.title}>&#x2022; {key.toUpperCase()}</span>
              <div id={style.value}>
                <span>{extraConfig[key as keyof ExtraConfig] as string}</span>
              </div>
            </div>
          ))} */}
      </div>
      {actions}
    </div>
  );
}
