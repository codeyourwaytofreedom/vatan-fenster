import Substyle_Section from '../Substyle/Substyle_Section';
import style from '../.././styles/KonfiguratorPage.module.css';
import { subStyleOptions, SubStyleOptions } from '@/data/configuration_options';
import { useConfiguration } from '@/context/ConfigurationContext';

export default function Substyle_Stepper() {
  const { configuration, substyle } = useConfiguration();
  const obenItems = subStyleOptions[
    configuration.style.name.toLowerCase() as keyof SubStyleOptions
  ]?.find((it) => it.key === substyle.option?.key)?.children?.oben;
  const untenItems = subStyleOptions[
    configuration.style.name.toLowerCase() as keyof SubStyleOptions
  ]?.find((it) => it.key === substyle.option?.key)?.children?.unten;

  return (
    <div className={style.config_wrapper_subcategories}>
      <Substyle_Section
        title={configuration.style.name || ''}
        configKey="option"
        items={subStyleOptions[configuration.style.name.toLowerCase() as keyof SubStyleOptions]}
        comesFirst={configuration.style.name as 'Oberlicht' | 'Unterlicht'}
      />
      {configuration.style.name === 'Oberlicht' && (
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
      {configuration.style.name === 'Unterlicht' && (
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
