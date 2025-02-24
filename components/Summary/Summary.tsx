import { Config, ExtraConfig } from '@/types/Configurator';
import style from '../.././styles/KonfiguratorPage.module.css';
import { ReactNode, useEffect, useState } from 'react';
import { SubStyle } from '@/pages/konfigurator';

interface SummaryProps {
  configuration: Config;
  children?: ReactNode;
  extraConfig?: ExtraConfig | null;
}

export default function SummaryDisplayer({ configuration, children }: SummaryProps) {
  const [summaryItemsToDisplay, setSummaryItems] = useState<Partial<Config>>({});
  useEffect(()=>{
    (()=>{
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { size, type, ...config } = configuration;
      if(typeof type !== 'string' && type){
        const { oben, unten, option } = type as SubStyle;
        const subStyleSummary = {
          style: option?.name,
          // have to adjust to oberlicht unterlicht switch
          oben: configuration.style === 'Unterlicht' ? unten?.name : oben?.name,
          unten: configuration.style === 'Unterlicht' ? oben?.name : unten?.name,
        }
        return setSummaryItems({...config, ...subStyleSummary});
      }
      return setSummaryItems({...config, type});
    })()
  },[configuration]);
  return (
    <div id={style.summary}>
      <h3>Bestellübersicht</h3>
      <div id={style.items}>
        {Object.keys(summaryItemsToDisplay).map((key, index) => (
          <div key={index} className={style.item}>
            <span id={style.title}>&#x2022; {key.toUpperCase()}</span>
            <span id={style.value}>{summaryItemsToDisplay[key as keyof typeof summaryItemsToDisplay] as string}</span>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}
