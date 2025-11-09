import Substyle_Section from '../Substyle/Substyle_Section';
import style from '../.././styles/KonfiguratorPage.module.css';
import { useConfiguration } from '@/context/ConfigurationContext';
import { subStyleOptions } from '@/data/selectionItems/basisData';
import { SubStyleOptions } from '@/types/Configurator';

export default function Substyle_Stepper() {
  const { configuration, substyle } = useConfiguration();
  const obenItems = subStyleOptions[
    configuration.basis.style.name.toLowerCase() as keyof SubStyleOptions
  ]?.find((it) => it.key === substyle.option?.key)?.children?.oben;
  const untenItems = subStyleOptions[
    configuration.basis.style.name.toLowerCase() as keyof SubStyleOptions
  ]?.find((it) => it.key === substyle.option?.key)?.children?.unten;

  return (
    <div className={style.config_wrapper_subcategories}>
      <Substyle_Section
        title={configuration.basis.style.name || ''}
        configKey="option"
        items={
          subStyleOptions[configuration.basis.style.name.toLowerCase() as keyof SubStyleOptions]
        }
        comesFirst={configuration.basis.style.name as 'Oberlicht' | 'Unterlicht'}
      />
      {configuration.basis.style.name === 'Oberlicht' && (
        <>
          {substyle.option && (
            <Substyle_Section
              title={'Oben'}
              configKey="oben"
              items={obenItems}
              comesFirst={'Oberlicht'}
            />
          )}
          {substyle.oben && (
            <Substyle_Section
              title={'Unten'}
              configKey="unten"
              items={untenItems}
              comesFirst={'Oberlicht'}
            />
          )}
        </>
      )}
      {configuration.basis.style.name === 'Unterlicht' && (
        <>
          {substyle.option && (
            <Substyle_Section
              title={'Oben'}
              configKey="unten"
              items={untenItems}
              comesFirst={'Unterlicht'}
            />
          )}
          {substyle.unten && (
            <Substyle_Section
              title={'Unten'}
              configKey="oben"
              items={obenItems}
              comesFirst={'Unterlicht'}
            />
          )}
        </>
      )}
    </div>
  );
}
