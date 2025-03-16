import style from '@/components/YesNoHolder/YesNo.module.css';
import { useConfiguration } from '@/context/ConfigurationContext';
export default function StepDruckausgleichsventil() {
  const { configuration, setConfiguration } = useConfiguration();
  const handleSelectDruckausgleichsventil = (value: 'ja' | 'nein') => {
    if (configuration.druckausgleichsventil !== value) {
      setConfiguration((pr) => {
        return { ...pr, druckausgleichsventil: value };
      });
    }
  };
  return (
    <div className={style.yesno}>
      <button
        onClick={() => handleSelectDruckausgleichsventil('nein')}
        className={configuration.druckausgleichsventil === 'nein' ? style.selected : ''}
      >
        NEIN
      </button>
      <button
        onClick={() => handleSelectDruckausgleichsventil('ja')}
        className={configuration.druckausgleichsventil === 'ja' ? style.selected : ''}
      >
        JA
      </button>
    </div>
  );
}
