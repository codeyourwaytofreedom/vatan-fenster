import style from '../.././styles/KonfiguratorPage.module.css';
import { scrollToElement } from '@/utils';
import { steps } from '@/data/steps';
import { useConfiguration } from '@/context/ConfigurationContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import SizerSummary from '../SizerSummary/SizerSummary';

export default function SummaryDisplayer() {
  const { configuration, currentGroup, setCurrentStep, setCurrentGroup } = useConfiguration();

  const handleShowStep = (key: string) => {
    if (['oben', 'unten'].includes(key)) {
      setCurrentStep(steps[currentGroup].find((st) => st.key === 'type') || null);
      if (configuration.style.name === 'Oberlicht') {
        scrollToElement(key, 50);
      }
      if (configuration.style.name === 'Unterlicht') {
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
    setCurrentStep(steps[parentKey].find((st) => st.key === key) || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id={style.summary}>
      <h3>Bestellübersicht</h3>
      <SizerSummary />
      <div id={style.items}>
        {Object.entries(configuration).map(([key, value]) => (
          value &&
          <div key={key} className={style.item} onClick={() => handleShowStep(key)} id={key}>
            <span id={style.title}>&#x2022; {key.toUpperCase()}</span>
            <span id={style.value}>{value.name ?? value}</span>
          </div>
        ))}
      </div>
      <div id={style.actions}>
        <button id={style.add_to_chart}>
          <>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span style={{ marginLeft: '20px' }}>In den Warenkorb</span>
          </>
        </button>
      </div>
    </div>
  );
}
