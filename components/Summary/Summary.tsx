import { Config } from '@/types/Configurator';
import style from '../.././styles/KonfiguratorPage.module.css';
import { ReactNode } from 'react';

interface SummaryProps {
  configuration: Config;
  children?: ReactNode;
}

export default function SummaryDisplayer({ configuration, children }: SummaryProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { size, type, ...config } = configuration;
  return (
    <div id={style.summary}>
      <h3>Bestellübersicht</h3>
      <div id={style.items}>
        {Object.keys(config).map((key, index) => (
          <div key={index} className={style.item}>
            <span id={style.title}>&#x2022; {key.toUpperCase()}</span>
            <span id={style.value}>{config[key as keyof typeof config]}</span>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}
