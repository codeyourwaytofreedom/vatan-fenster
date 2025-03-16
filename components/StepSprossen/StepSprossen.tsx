import { useEffect, useState } from 'react';
import style from './StepSprossen.module.css';
import { sprossenItems, sprossenPatterns } from '@/data/configuration_options';
import OptionHolder from '../Product_Holder/Option_Holder';
import { useConfiguration } from '@/context/ConfigurationContext';
import { steps } from '@/data/steps';

export default function StepSprossen() {
  const { configuration, setConfiguration, setCurrentStep } = useConfiguration();
  const [selectedSprossen, setSelectedSprossen] = useState<string>(
    configuration.sprossen.split('-')[0]
  );

  const [sprossen, setSprossen] = useState<{
    width: string | undefined;
    pattern: string | undefined;
  } | null>({
    width: configuration.sprossen.split('-')[1],
    pattern: configuration.sprossen.split('-')[2],
  });

  const handleSprossenStep = (value: string) => {
    setSelectedSprossen(value);
    if (value === 'nein') {
      setConfiguration((pr) => {
        return { ...pr, sprossen: 'nein' };
      });
      setSprossen(null);
    }
  };

  const handleSprossenWidth = (width: string) => {
    setSprossen({ width: width, pattern: sprossen?.pattern });
  };

  const handleSprossenPattern = (pattern: string) => {
    setSprossen({ width: sprossen?.width, pattern: pattern });
    setTimeout(() => {
      setCurrentStep(steps.verglasung[5]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  const itemsToDisplay = selectedSprossen
    ? sprossenItems[selectedSprossen as keyof typeof sprossenItems]
    : null;

  useEffect(() => {
    if (sprossen?.width && sprossen.pattern && selectedSprossen) {
      setConfiguration((pr) => {
        return { ...pr, sprossen: `${selectedSprossen}-${sprossen.width}-${sprossen.pattern}` };
      });
    }
  }, [sprossen]);

  // when Sprossen step changes
  useEffect(()=>{
    if(['innenliegende', 'aufgesetzte'].includes(selectedSprossen)){
      const widthTransferable = itemsToDisplay?.some((it)=>it.value === configuration.sprossen.split('-')[1] );
      const width = widthTransferable ?  configuration.sprossen.split('-')[1] : itemsToDisplay![0].value;
      const pattern = configuration.sprossen.split('-')[2] ?? sprossenPatterns[0].name;
      setSprossen({ width: width, pattern: pattern});      
    }
  },[selectedSprossen, itemsToDisplay]);

  return (
    <>
      <div className={style.yesno}>
        <button
          className={selectedSprossen === 'nein' ? style.selected : ''}
          onClick={() => handleSprossenStep('nein')}
        >
          NEIN
        </button>
        <button
          className={selectedSprossen === 'innenliegende' ? style.selected : ''}
          onClick={() => handleSprossenStep('innenliegende')}
        >
          Innenliegende Sprossen
        </button>
        <button
          className={selectedSprossen === 'aufgesetzte' ? style.selected : ''}
          onClick={() => handleSprossenStep('aufgesetzte')}
        >
          Aufgesetzte Sprossen
        </button>
      </div>
      <div className={style.width_options}>
        {itemsToDisplay &&
          itemsToDisplay.map((item, key) => (
            <button
              className={sprossen?.width === item.value ? style.selected : ''}
              key={key}
              onClick={() => handleSprossenWidth(item.value)}
            >
              {item.value}
            </button>
          ))}
      </div>
      <div className={style.option_holders}>
        {itemsToDisplay &&
          sprossenPatterns.map((item, key) => (
            <OptionHolder
              key={key}
              selected={sprossen?.pattern === item.name}
              action={() => handleSprossenPattern(item.name)}
              item={item}
            />
          ))}
      </div>
    </>
  );
}
