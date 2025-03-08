import { Config, GroupKey, Step } from '@/types/Configurator';
import style from '../.././styles/KonfiguratorPage.module.css';
import { ReactNode, SetStateAction } from 'react';
import { scrollToElement } from '@/utils';
import { steps } from '@/data/steps';

interface SummaryProps {
  configuration: Config;
  currentGroup: GroupKey;
  sizer?: ReactNode;
  actions?: ReactNode;
  setStep: React.Dispatch<SetStateAction<Step | null>>;
  setCurrentGroup: React.Dispatch<React.SetStateAction<GroupKey>>;
}


export default function SummaryDisplayer({
  configuration,
  currentGroup,
  sizer,
  actions,
  setStep,
  setCurrentGroup,
}: SummaryProps) {

  const handleShowStep = (key: string) => {
    if (['oben', 'unten'].includes(key)) {
      setStep(steps[currentGroup].find((st) => st.key === 'type') || null);
      if (configuration.style.name  === 'Oberlicht') {
        scrollToElement(key, 50);
      }
      if (configuration.style.name  === 'Unterlicht') {
        if (key === 'oben') {
          scrollToElement('unten', 50);
        }
        if (key === 'unten') {
          scrollToElement('oben', 50);
        }
      }
      return;
    }
    const parentKey = Object.entries(steps).find(
      ([, value]) => Array.isArray(value) && value.some((item) => item.key === key)
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
        {Object.entries(configuration).map(([key, value]) => (
          <div key={key} className={style.item} onClick={() => handleShowStep(key)} id={key}>
            <span id={style.title}>&#x2022; {key.toUpperCase()}</span>
            <span id={style.value}>
              {value.name}
            </span>
          </div>
        ))}
      </div>
      {actions}
    </div>
  );
}
