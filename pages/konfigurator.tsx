import { useState } from 'react';
import { steps } from '@/data/steps';
import {
  subStyleOptions,
  initialConfiguration,
  initialSize,
  initialSubstyle,
} from '@/data/configuration_options';
import style from '.././styles/KonfiguratorPage.module.css';
import { Config, GroupKey, Size, Step, SubStyle } from '@/types/Configurator';

import SummaryDisplayer from '@/components/Summary/Summary';
import SizerSummary from '@/components/SizerSummary/SizerSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Configuration_Group from '@/components/Configuration_Group/Configuration_Group';
import Basis_Configuration from '@/components/Configuration_Basis/Configuration_Basis';

export default function Page() {
  const [configuration, setConfiguration] = useState<Config>(initialConfiguration);
  const [orderDetailsReady, setOrderDetailsReady] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<Step | null>(null);
  const [currentGroup, setCurrentGroup] = useState<GroupKey>('basis');
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

          {Object.entries(steps).map(([stepKey, stepValues]) =>
            stepKey === 'basis' ? 
            <Basis_Configuration
            key={stepKey}
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
            : 
            <Configuration_Group
            key={stepKey}
            groupTitle={stepKey as GroupKey}
            currentGroup={currentGroup}
            setConfiguration={setConfiguration}
            steps={stepValues}
            configuration={configuration}
            currentStep={currentStep!}
            setStep={setCurrentStep}
            setCurrentGroup={setCurrentGroup}
          />
          )}

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
