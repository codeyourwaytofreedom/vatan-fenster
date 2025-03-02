import { Config, Step } from '@/types/Configurator';
import style from '../.././styles/KonfiguratorPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface StepperProps {
  id?: string;
  steps: Step[];
  currentStep: Step;
  orderDetailsReady: boolean;
  configuration: Config;
  setStep: React.Dispatch<React.SetStateAction<Step | null>>;
}
export default function Stepper({
  steps,
  id,
  currentStep,
  configuration,
  orderDetailsReady,
  setStep,
}: StepperProps) {
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


  return (
    <div id={id ? style.orange : ''} className={style.config_steps}>
      {steps.map((st, index) => (
        <button key={index} className={stepClass(st)} onClick={() => setStep(st)}>
          <FontAwesomeIcon icon={st.icon} color="black" beatFade={stepClass(st).includes('next')} />
          <p>{st.name}</p>
          <span id={style.anchor}>&#9660;</span>
        </button>
      ))}
    </div>
  );
}
