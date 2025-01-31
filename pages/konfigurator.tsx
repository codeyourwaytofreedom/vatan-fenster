import Image from 'next/image';
import style from '.././styles/KonfiguratorPage.module.css'
import { steps } from '@/data/steps';
import { categoryItems, directions } from '@/data/configuration_options';
import type { Step } from '@/data/steps';

import { useEffect, useState } from 'react';
import OptionHolder from '@/components/Product_Holder/Option_Holder';
import Feedback from '@/components/Feedback/Feedback';

interface Config {
    material: string | null;
    brand: string | null;
    profile: string | null;
    direction: string | null;
    size: Record<string, number> | null;
}

export default function Page() {

    const initialConfiguration = {
        material: null,
        brand: null,
        profile: null,
        direction: null,
        size: null
    }
    const [configuration, setConfiguration] = useState<Config>(initialConfiguration);
    const [feedback, setFeedback] = useState<null | {key: string, text: string}>(null);

    const updateConfiguration = (key: keyof Config, value: Config[keyof Config]) => {
        setConfiguration((prevConfig) => ({
            ...prevConfig,
            [key]: value
        }));
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
    

    const [currentStep, setStep] = useState<Step | null>(null);

    const visibleSection = categoryItems.find(cat=> cat.key === currentStep?.key);

    const sizeImage = directions.find((img)=>img.name === configuration.direction)?.image;

    const stepClass = (step: Step) => {
        const currentlySelected = step.key === currentStep?.key;
        const completed = Boolean(configuration[step.key as keyof Config]);
        const stepIndex = steps.findIndex((st)=> st.key == step.key);
        // selected_complete
        // selected_next
        // complete
        // inactive
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

    useEffect(() => {
        const stepIndex = steps.findIndex((st)=> st.key == currentStep?.key);
        const nextStep = steps[stepIndex+1];
        const nextStepIsComplete = Boolean(configuration[nextStep.key as keyof Config]);
        if(nextStep && !nextStepIsComplete){
            setStep(nextStep);
        }
    }, [configuration]);

    useEffect(() => {
        setStep(steps[0]);
    }, []);    

    return (
        <div className={style.config}>
            <h1>Fenster-Konfigurator</h1>
            <div className={style.config_steps}>
                {
                steps.map((st, index)=>
                <button key={index} className={stepClass(st)} onClick={()=>updateStep(st)}>
                    <Image src={st.image} alt='brand' width={50} height={50} />
                    <p>
                        {st.name}
                         <br />
                         <span>Auswählen</span>
                    </p>
                    <span id={style.anchor}>&#9660;</span>
                </button>
                    )
                }
            </div>
            <div>
                
            <div className={style.config_option_holders}>
                {
                visibleSection?.items.map((item, index) =>
                <OptionHolder 
                    name={item.name}
                    image={item.image}
                    imageAlt={item.name}
                    selected={configuration[currentStep?.key as keyof Config] === item.name}
                    action={() => updateConfiguration(currentStep?.key as keyof Config, item.name)}
                    key={index} />
                    )
                }
                {
                    currentStep?.key === 'size' &&
                    <div className={style.config_sizer}>
                        <div id={style.left}>
                            <h1>Stückzahl und Größe </h1>
                            <h3>Achtung Wichtig! - Das Angegebene Maß ist das Fensterrahmen Außenmaß.</h3>
                            <div id={style.entries}>
                                <label>Window width</label>
                                <input type="number" placeholder='Window width' /> <br />
                                <label>Window height</label>
                                <input type="number" placeholder='Window height' />
                            </div>
                        </div>
                        <Image src={sizeImage!} alt='brand' width={350} height={350} />

                    </div>
                }
                <Feedback visible={Boolean(feedback)}>
                    {
                        feedback?.key === 'step-warning' &&
                        <p>Bitte wählen Sie zuerst die <span style={{color: 'crimson'}}>{feedback.text}</span> aus.</p>
                    }
                </Feedback>
            </div>
            <br /><br />
            <pre>{JSON.stringify(configuration, null, 2)}</pre>
            </div>
        </div>
    );
}