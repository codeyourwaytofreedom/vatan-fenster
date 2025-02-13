import { Config, Step } from '@/types/Configurator';
import style from '../.././styles/KonfiguratorPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

interface StepperProps {
    steps: Step[];
    currentStep: Step;
    orderDetailsReady: boolean;
    configuration: Config;
    setStep: React.Dispatch<React.SetStateAction<Step | null>>;
    setFeedback: React.Dispatch<React.SetStateAction<null | {key: string, text: string}>>;
}
export default function Stepper({steps, currentStep, configuration,orderDetailsReady, setStep, setFeedback}:StepperProps) {
    const stepClass = (step: Step) => {
        const currentlySelected = step.key === currentStep?.key;
        const completed = Boolean(configuration[step.key as keyof Config]);
        const stepIndex = steps.findIndex((st)=> st.key == step.key);
        // selected_complete
        // selected_next
        // complete
        // inactive
        if(orderDetailsReady){
            if(currentlySelected){
                return style.selected_complete; 
            }
            return style.complete;
        }
        if(currentlySelected){
            if(completed){
                return style.selected_complete; 
            }
            return style.selected_next;
        }
        if(stepIndex !== 0){
            const previousStepKey = steps[stepIndex-1].key;
            const previousStepComplete = Boolean(configuration[previousStepKey as keyof Config]);
            if(previousStepComplete && !completed && !currentlySelected){
                return style.next;
            }
            if(previousStepComplete && !completed && currentlySelected){
                return style.selected_next;
            }
        }
        if(completed && currentlySelected){
            return style.selected_complete;
        }
        if(completed && !currentlySelected){
            return style.complete;
        }
        return  style.inactive
    };


    const updateStep = (step: Step) => {
        let lastCompletedStepIndex = -1;
        const keys = Object.keys(configuration) as Array<keyof Config>;
    
        // Identify the last completed step
        for (let i = 0; i < keys.length; i++) {
            if (configuration[keys[i]]) {
                lastCompletedStepIndex = i; // Keep updating as long as the step is complete
            } else {
                break; // Stop at the first incomplete step
            }
        }
    
        // Find the first incomplete step after the last completed step
        let firstIncompleteStepKey = null;
        for (let i = lastCompletedStepIndex + 1; i < keys.length; i++) {
            if (!configuration[keys[i]]) {
                firstIncompleteStepKey = keys[i];
                break;
            }
        }
    
        // If the clicked step is incomplete but has previous incomplete steps, show feedback
        const stepIndex = keys.indexOf(step.key as keyof Config);
        if (stepIndex > lastCompletedStepIndex + 1) {
            setFeedback({key: 'step-warning', text:`${firstIncompleteStepKey?.toUpperCase()}`});
            setTimeout(() => {
                setFeedback(null);
            }, 3000);
            return;
        }
    
        // Allow setting the step if it's the first incomplete or already in sequence
        setStep(step);
    };

    // select first step when page loads
    useEffect(() => {
        setStep(steps[0]);
    }, []); 
    
    // handle switch to next step when config changes
    useEffect(() => {
        const stepIndex = steps.findIndex((st)=> st.key == currentStep?.key);
        const nextStep = steps[stepIndex+1];
        const stepComplete = configuration[currentStep?.key as keyof Config];
        if(nextStep && stepComplete){
                setStep(nextStep);
                window.scrollTo({top: 0, behavior: "smooth"})            
        }
    }, [configuration]); 
    
    return (
    <div className={style.config_steps}>
        {
        steps.map((st, index)=>
        <button key={index} className={stepClass(st)} onClick={()=>updateStep(st)}>
            <FontAwesomeIcon icon={st.icon} size={'2x'} color="black" beatFade={stepClass(st).includes('next')} />
            <p>
                {st.name}
            </p>
            <span id={style.anchor}>&#9660;</span>
        </button>
            )
        }
    </div>
    );
}