import style from '../../styles/KonfiguratorPage.module.css';
import OptionHolder from '../Product_Holder/Option_Holder';
import { useConfiguration } from '@/context/ConfigurationContext';
import { Config, SelectionItem } from '@/types/Configurator';
import { useEffect } from 'react';
import { steps } from '@/data/steps';
import { warmenKante } from '@/data/selectionItems/verglasungData';

export interface GlassPaketProps {
  items: SelectionItem[];
  expanded: boolean;
}

export default function StepGlassPaket({ items, expanded }: GlassPaketProps) {
  const { currentStep, configuration, setConfiguration, setCurrentStep } = useConfiguration();

  const updateGlassPaket = (item: SelectionItem, key?: string) => {
    if (currentStep) {
      setConfiguration((prevConfig) => ({
        ...prevConfig,
        [key ?? (currentStep?.key as keyof Config)]: item,
      }));
      if (!item.name.includes('warme')) {
        setTimeout(() => {
          setCurrentStep(steps.verglasung[1]);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
      }
      setTimeout(() => {
        const colors = document.getElementById('warmeKante');
        if (colors) {
          colors.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  };

  const updateWarmeKante = (item: SelectionItem | 'Nein') => {
    setConfiguration((prevConfig) => ({
      ...prevConfig,
      glasspaketWarmeKante: item,
    }));
    setTimeout(() => {
      setCurrentStep(steps.verglasung[1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  const isSelected = (name: string) => {
    if (currentStep) {
      return (configuration[currentStep?.key as keyof Config] as SelectionItem)?.name === name;
    }
    return false;
  };

  const warmeKanteSelected = (name: string) => {
    return (configuration.glasspaketWarmeKante as SelectionItem).name === name;
  };

  const showColorOptions = configuration.glasspaket.name.includes('warme');
  useEffect(() => {
    if (showColorOptions) {
      const existingWarmeKante =
        configuration.glasspaketWarmeKante !== 'Nein' ? configuration.glasspaketWarmeKante : null;
      setConfiguration((prevConfig) => ({
        ...prevConfig,
        glasspaketWarmeKante: existingWarmeKante ?? warmenKante[0],
      }));
    }
    if (!showColorOptions && configuration.glasspaketWarmeKante !== 'Nein') {
      setConfiguration((prevConfig) => ({
        ...prevConfig,
        glasspaketWarmeKante: 'Nein',
      }));
    }
  }, [showColorOptions]);

  return (
    <>
      <div className={style.config_wrapper}>
        <div className={style.config_wrapper_subcategories}>
          <div className={style.config_wrapper_option_holders}>
            {items
              ?.slice(0, !expanded ? 10 : items.length)
              .map((item, index) => (
                <OptionHolder
                  key={index}
                  item={item}
                  selected={isSelected(item.name)}
                  action={() => updateGlassPaket(item)}
                />
              ))}
          </div>
          {showColorOptions && (
            <div>
              <br />
              <br />
              <h2 id={style.complete}>Warmen Kante</h2>
              <div className={style.config_wrapper_option_holders} id={'warmeKante'}>
                {warmenKante
                  ?.slice(0, !expanded ? 10 : items.length)
                  .map((item, index) => (
                    <OptionHolder
                      key={index}
                      item={item}
                      selected={warmeKanteSelected(item.name)}
                      action={() => updateWarmeKante(item)}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
