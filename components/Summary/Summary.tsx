import type { Summary } from '@/types/Configurator';
import style from '../.././styles/KonfiguratorPage.module.css';
import Image from 'next/image';

interface SummaryProps {
  finishedSteps?: Summary[];
}

export default function SummaryDisplayer({ finishedSteps }: SummaryProps) {
  return (
    <div id={style.summary}>
      <h3>Bestellübersicht</h3>
      <div id={style.items}>
        {finishedSteps
          ?.sort((a, b) => a.key.localeCompare(b.key))
          .map((sum, index) => (
            <div key={index} className={style.item}>
              <div>
                <h4>{sum.key.toUpperCase()}</h4>
                {sum.summaryItem?.name && <p>{sum.summaryItem.name}</p>}
              </div>
              {sum.summaryItem?.image && (
                <Image alt="alt" src={sum.summaryItem.image} width={90} height={90} />
              )}
              {sum.summaryItem?.detail && (
                <div id={style.detail}>
                  <span>Bereite:</span> <span>{sum.summaryItem.detail.w}</span>
                  <span>Höhe Oben:</span> <span>{sum.summaryItem.detail.h}</span>
                  {sum.summaryItem?.detail.h_unten && (
                    <>
                      <span>Höhe Unten:</span> <span>{sum.summaryItem.detail.h_unten}</span>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        <div key={999} className={style.item}>
          <h2>
            <span>Total Price:</span> $874.54
          </h2>
        </div>
      </div>
    </div>
  );
}
