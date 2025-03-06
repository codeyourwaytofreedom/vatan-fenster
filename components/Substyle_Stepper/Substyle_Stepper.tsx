import Substyle_Section from '../Substyle/Substyle_Section';
import style from '../.././styles/KonfiguratorPage.module.css';
import { SubStyleOptions } from '@/data/configuration_options';
import { Config, Step, SubStyle } from '@/types/Configurator';

interface SubstyleStepperProps {
  configuration: Config;
  currentGroup: 'basis' | 'farben';
  substyle: SubStyle;
  subStyleOptions: SubStyleOptions;
  setSubStyle: React.Dispatch<React.SetStateAction<SubStyle>>;
  setStep: React.Dispatch<React.SetStateAction<Step | null>>;
}
export default function Substyle_Stepper({
  substyle,
  configuration,
  currentGroup,
  subStyleOptions,
  setSubStyle,
  setStep,
}: SubstyleStepperProps) {
  const obenItems = subStyleOptions[
    configuration.style?.toLowerCase() as keyof SubStyleOptions
  ]?.find((it) => it.key === substyle.option?.key)?.children?.oben;
  const untenItems = subStyleOptions[
    configuration.style?.toLowerCase() as keyof SubStyleOptions
  ]?.find((it) => it.key === substyle.option?.key)?.children?.unten;

  return (
    <div className={style.config_wrapper_subcategories}>
      <Substyle_Section
        title={configuration.style || ''}
        configKey="option"
        items={subStyleOptions[configuration.style?.toLowerCase() as keyof SubStyleOptions]}
        substyle={substyle}
        comesFirst={configuration.style as 'Oberlicht' | 'Unterlicht'}
        setSubStyle={setSubStyle}
        currentGroup={currentGroup}
      />
      {configuration.style === 'Oberlicht' && (
        <>
          {substyle.option && (
            <Substyle_Section
              title={'Oben'}
              configKey="oben"
              items={obenItems}
              substyle={substyle}
              comesFirst={'Oberlicht'}
              setSubStyle={setSubStyle}
              currentGroup={currentGroup}
            />
          )}
          {substyle.oben && (
            <Substyle_Section
              title={'Unten'}
              configKey="unten"
              items={untenItems}
              substyle={substyle}
              currentGroup={currentGroup}
              comesFirst={'Oberlicht'}
              setSubStyle={setSubStyle}
              setStep={setStep}
            />
          )}
        </>
      )}
      {configuration.style === 'Unterlicht' && (
        <>
          {substyle.option && (
            <Substyle_Section
              title={'Oben'}
              configKey="unten"
              items={untenItems}
              substyle={substyle}
              comesFirst={'Unterlicht'}
              currentGroup={currentGroup}
              setSubStyle={setSubStyle}
            />
          )}
          {substyle.unten && (
            <Substyle_Section
              title={'Unten'}
              configKey="oben"
              items={obenItems}
              substyle={substyle}
              currentGroup={currentGroup}
              comesFirst={'Unterlicht'}
              setSubStyle={setSubStyle}
              setStep={setStep}
            />
          )}
        </>
      )}
    </div>
  );
}
