import { useEffect, useState } from 'react';
import style from './StepSprossen.module.css';
import { SelectionItem, sprossenCards, sprossenPatterns } from '@/data/configuration_options';
import OptionHolder from '../Product_Holder/Option_Holder';
import { useConfiguration } from '@/context/ConfigurationContext';
import { scrollToElement } from '@/utils';

export default function StepSprossen() {
  const { configuration, setConfiguration, moveToNextStep } = useConfiguration();
  const [selectedSprossen, setSelectedSprossen] = useState<string>(
    configuration.sprossen.split('-')[0]
  );

  const [sprossen, setSprossen] = useState<{
    width: string | undefined;
    color: string | undefined;
    pattern: string | undefined;
  } | null>({
    width: configuration.sprossen.split('-')[1],
    color: configuration.sprossen.split('-')[2],
    pattern: configuration.sprossen.split('-')[3],
  });

  const sprossenWidthItems = sprossenCards.find((sp) => sp.name === selectedSprossen)?.items;
  const colors = sprossenWidthItems?.find((it) => it.name === sprossen?.width)?.colors;

  const handleSelectSprossen = (itemName: string) => {
    setSelectedSprossen(itemName);
    if (itemName === 'Nein') {
      return moveToNextStep();
    }
    scrollToElement('bereite');
    const newItems = sprossenCards.find((sp) => sp.name === itemName)?.items;
    // handle color and width trasnfer to the new selection
    if (itemName !== 'Nein') {
      const widthTransferable = newItems?.some((it) => it.name === sprossen?.width);
      const width = widthTransferable ? sprossen?.width : newItems![0].name;

      const itemToSelect = widthTransferable
        ? newItems?.find((it) => it.name === sprossen?.width)
        : newItems![0];
      const colorItem =
        itemToSelect?.colors?.find((clr) => clr.name === sprossen?.color) ??
        itemToSelect!.colors![0];

      setSprossen({ width: width, color: colorItem.name, pattern: sprossen?.pattern });
    }
    if (selectedSprossen === 'Nein') {
      if (itemName !== 'Nein') {
        setSprossen({
          width: newItems![0].name,
          color: newItems![0].colors![0].name,
          pattern: sprossenPatterns[0].name,
        });
      }
    }
  };

  const handleSelectBereite = (item: SelectionItem) => {
    setSprossen({ width: item.name, color: item.colors![0].name, pattern: sprossen?.pattern });
    scrollToElement('colors');
  };

  const handleSelectColor = (item: SelectionItem) => {
    const color = item.name;
    setSprossen({ width: sprossen?.width, color: color, pattern: sprossen?.pattern });
    scrollToElement('type');
  };

  const handleSelectPattern = (pattern: string) => {
    setSprossen({ width: sprossen?.width, color: sprossen?.color, pattern: pattern });
    moveToNextStep();
  };

  useEffect(() => {
    if (selectedSprossen === 'Nein') {
      setConfiguration((pr) => {
        return { ...pr, sprossen: 'Nein' };
      });
    } else {
      setConfiguration((pr) => {
        return {
          ...pr,
          sprossen: `${selectedSprossen}-${sprossen?.width}-${sprossen?.color}-${sprossen?.pattern}`,
        };
      });
    }
  }, [selectedSprossen, sprossen]);

  return (
    <>
      <div className={style.option_holders}>
        {sprossenCards &&
          sprossenCards.map((item, key) => (
            <OptionHolder
              key={key}
              selected={selectedSprossen === item.name}
              action={() => handleSelectSprossen(item.name)}
              item={item}
            />
          ))}
      </div>

      {sprossenWidthItems && (
        <>
          <br />
          <h3 className={style.title}>Bereite</h3>
          <br />
          <div className={style.option_holders} id={'bereite'}>
            {sprossenWidthItems.map((item, key) => (
              <OptionHolder
                key={key}
                selected={sprossen?.width === item.name}
                action={() => handleSelectBereite(item)}
                item={item}
              />
            ))}
          </div>

          <br />
          <h3 className={style.title}>Colors</h3>
          <br />
          <div className={style.option_holders} id={'colors'}>
            {colors?.map((item, key) => (
              <OptionHolder
                key={key}
                selected={sprossen?.color === item.name}
                action={() => handleSelectColor(item)}
                item={item}
              />
            ))}
          </div>

          <br />
          <h3 className={style.title}>Type</h3>
          <br />
          <div className={style.option_holders} id={'type'}>
            {sprossenPatterns.map((item, key) => (
              <OptionHolder
                key={key}
                selected={sprossen?.pattern === item.name}
                action={() => handleSelectPattern(item.name)}
                item={item}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
