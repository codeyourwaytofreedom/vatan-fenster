import type { Summary } from '@/types/Configurator';
import style from '../.././styles/KonfiguratorPage.module.css';
import Image from 'next/image';

interface SummaryProps {
    finishedSteps?: Summary[];
}

export default function SummaryDisplayer({finishedSteps}: SummaryProps) {
    return (
        <div id={style.summary}>
        <h3>Bestellübersicht</h3>
        <div id={style.items}>
        {
            finishedSteps?.sort((a, b) => a.key.localeCompare(b.key)).map((sum, index)=>
                <div key={index} className={style.item}>
                    <div>
                        <h4>{sum.key.toUpperCase()}</h4>
                        <p>{sum.summaryItem.name}</p>
                    </div>
                    <Image alt='alt' src={sum.summaryItem.image} width={60} height={60} />
                </div>
            )
        }
                <div key={999} className={style.item}>
                    <h2><span>Total Price:</span> $874.54</h2>
                </div>
        </div>
    </div>
    );
}