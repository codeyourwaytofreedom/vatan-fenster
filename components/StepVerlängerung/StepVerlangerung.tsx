import { useRef, useState } from 'react';
import style from './StepVerlängerung.module.css';
import { useConfiguration } from '@/context/ConfigurationContext';
export default function StepVerlangerung() {
  const { configuration, setConfiguration } = useConfiguration();
  const [length, setLength] = useState<number>(
    Number(configuration.sonnenschutz.verlangerung?.name) || 0
  );

  const debounceTimeout = useRef<NodeJS.Timeout>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value.replace(/^0+(?=\d)/, '')) : 0;
    const newLength = value > 500 ? 500 : value;
    e.target.value = value === 0 ? '' : value.toString();
    setLength(newLength);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      setConfiguration((prev) => ({
        ...prev,
        sonnenschutz: {
          ...prev.sonnenschutz,
          verlangerung: { key: 'length', name: newLength.toString() },
        },
      }));
    }, 300);
  };

  return (
    <div className={style.container}>
      <h4>Bitte wählen Sie die gewünschte Verlängerung in Millimetern.</h4>
      <br />
      <h3 style={{ height: Number(length) > 30 ? '40px' : '0px' }}>
        {' '}
        <span>Rollladenführungsschienen ab 30 Lose Lieferung keine Montage möglichen</span>{' '}
      </h3>
      <input type="range" value={length} step={1} onChange={(e) => handleChange(e)} max={500} />
      <div className={style.container_manual}>
        <input type="number" value={length} onChange={(e) => handleChange(e)} max={500} />
        <h4>mm</h4>
      </div>
    </div>
  );
}
