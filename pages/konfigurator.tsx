import { useState } from 'react';
import { GetStaticProps } from 'next';
import { steps } from '@/data/steps';
import {
  categoryItems,
  brands,
  windowStyles,
  subStyleOptions,
  initialConfiguration,
  initialSize,
  initialSubstyle,
} from '@/data/configuration_options';
import style from '.././styles/KonfiguratorPage.module.css';

interface Props {
  steps: typeof steps;
  categoryItems: typeof categoryItems;
  brands: typeof brands;
  windowStyles: typeof windowStyles;
  subStyleOptions: typeof subStyleOptions;
}
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      steps,
      brands,
      windowStyles,
      subStyleOptions,
    },
  };
};
import { Config, Size, Step, SubStyle } from '@/types/Configurator';

import SummaryDisplayer from '@/components/Summary/Summary';
import SizerSummary from '@/components/SizerSummary/SizerSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Configuration_Group from '@/components/Configuration_Group/Configuration_Group';
import Basis_Configuration from '@/components/Configuration_Basis/Configuration_Basis';

export default function Page({ steps, subStyleOptions }: Props) {
  const [configuration, setConfiguration] = useState<Config>(initialConfiguration);
  const [orderDetailsReady, setOrderDetailsReady] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<Step | null>(null);
  const [currentGroup, setCurrentGroup] = useState<'basis' | 'farben'>('basis');
  const [size, setSize] = useState<Size | null>(initialSize);
  const [substyle, setSubStyle] = useState<SubStyle>(initialSubstyle);

  const handleSubmitOrder = () => {
    if (orderDetailsReady) {
      alert('Ihre Konfiguration wurde übermittelt.');
    }
  };

  const handleSelectGroup = () => {
    setCurrentGroup('basis');
    setCurrentStep(steps.basis[0]);
  };

  return (
    <>
      <div className={style.config}>
        <div>
          <Basis_Configuration
            currentStep={currentStep!}
            orderDetailsReady={orderDetailsReady}
            configuration={configuration}
            setStep={setCurrentStep}
            currentGroup={currentGroup}
            handleSelectGroup={handleSelectGroup}
            substyle={substyle}
            subStyleOptions={subStyleOptions}
            size={size}
            setSize={setSize}
            setSubStyle={setSubStyle}
            setOrderDetailsReady={setOrderDetailsReady}
            setConfiguration={setConfiguration}
          />

          <Configuration_Group
            groupTitle="farben"
            currentGroup={currentGroup}
            setConfiguration={setConfiguration}
            steps={steps.farben}
            configuration={configuration}
            currentStep={currentStep!}
            setStep={setCurrentStep}
            setCurrentGroup={setCurrentGroup}
          />
        </div>
        <SummaryDisplayer
          configuration={configuration}
          setStep={setCurrentStep}
          currentGroup={currentGroup}
          setCurrentGroup={setCurrentGroup}
          sizer={
            <SizerSummary
              size={size}
              configuration={configuration}
              currentStep={currentStep!}
              setConfiguration={setConfiguration}
              setOrderDetailsReady={setOrderDetailsReady}
              substyle={substyle}
            />
          }
          actions={
            <div id={style.actions}>
              <button id={style.add_to_chart} onClick={handleSubmitOrder}>
                {configuration.size ? (
                  <>
                    <FontAwesomeIcon icon={faShoppingCart} />

                    <span style={{ marginLeft: '20px' }}>In den Warenkorb</span>
                  </>
                ) : (
                  <span>Bitte geben Sie die Fenstergröße ein.</span>
                )}
              </button>
            </div>
          }
        ></SummaryDisplayer>
      </div>
    </>
  );
}
