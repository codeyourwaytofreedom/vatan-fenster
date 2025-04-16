import { Config, Step } from '@/types/Configurator';
import style from '../.././styles/KonfiguratorPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useConfiguration } from '@/context/ConfigurationContext';
import { useOrderDetailsReady } from '@/context/OrderDetailsContext';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

interface StepperProps {
  steps: Step[];
  configuration: Config;
}
export default function Stepper({ steps, configuration }: StepperProps) {
  const { orderDetailsReady } = useOrderDetailsReady();
  const stepClass = (step: Step) => {
    const currentlySelected = step.key === currentStep?.key;
    const completed = Boolean(configuration[step.key as keyof Config]);
    const stepIndex = steps.findIndex((st) => st.key == step.key);
    // selected_complete
    // selected_next
    // complete
    // inactive
    if (orderDetailsReady) {
      if (currentlySelected) {
        return style.selected_complete;
      }
      return style.complete;
    }
    if (currentlySelected) {
      if (completed) {
        return style.selected_complete;
      }
      return style.selected_next;
    }
    if (stepIndex !== 0) {
      const previousStepKey = steps[stepIndex - 1].key;
      const previousStepComplete = Boolean(configuration[previousStepKey as keyof Config]);
      if (previousStepComplete && !completed && !currentlySelected) {
        return style.next;
      }
      if (previousStepComplete && !completed && currentlySelected) {
        return style.selected_next;
      }
    }
    if (completed && currentlySelected) {
      return style.selected_complete;
    }
    if (completed && !currentlySelected) {
      return style.complete;
    }
    return style.inactive;
  };
  const { currentStep, setCurrentStep } = useConfiguration();
  const handleSetStep = (step: Step) => {
    setTimeout(() => {
      setCurrentStep(step);
    }, 100);
  };

  const currentStepIndex = steps.findIndex((st) => st.key === currentStep?.key);
  const isFirstStep = currentStepIndex === 0;

  const goToPreviousStep = () => {
    setCurrentStep(steps[currentStepIndex - 1]);
  };

  return (
    <>
      <div className={style.config_steps}>
        {steps.map((st, index) => (
          <button key={index} className={stepClass(st)} onClick={() => handleSetStep(st)}>
            <FontAwesomeIcon
              icon={st.icon}
              color="black"
              beatFade={stepClass(st).includes('next')}
            />
            <p>{st.name}</p>
            <span id={style.anchor}>&#9660;</span>
          </button>
        ))}
      </div>
      {!isFirstStep && (
        <button className={style.previousStep} onClick={goToPreviousStep}>
          <FontAwesomeIcon icon={faChevronLeft} />
          <FontAwesomeIcon icon={faChevronLeft} />
          <FontAwesomeIcon icon={faChevronLeft} />
          &nbsp; Vorheriger Schritt
        </button>
      )}
    </>
  );
}
