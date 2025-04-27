import { useRef, useState } from 'react';
import style from './StepVerlängerung.module.css';
import { useConfiguration } from '@/context/ConfigurationContext';
export default function StepVerlängerung() {
  const { configuration, setConfiguration } = useConfiguration();
  const [length, setLength] = useState<number>(configuration.verlangerung ?? 0);

  const debounceTimeout = useRef<NodeJS.Timeout>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLength = Number(e.target.value);
    setLength(newLength);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      setConfiguration((prev) => ({
        ...prev,
        verlangerung: newLength,
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
      <h2>{length} mm</h2>
    </div>
  );
}
