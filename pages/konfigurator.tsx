import Image, { StaticImageData } from 'next/image';
import style from '.././styles/KonfiguratorPage.module.css'
import { steps } from '@/data/steps';
import { categoryItems, directions } from '@/data/configuration_options';
import type { Step } from '@/data/steps';

import { useEffect, useState } from 'react';
import OptionHolder from '@/components/Product_Holder/Option_Holder';
import Feedback from '@/components/Feedback/Feedback';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Size {
    w: number | undefined, 
    h: number | undefined
}


interface Config {
    material: string | null;
    brand: string | null;
    profile: string | null;
    direction: string | null;
    size: boolean;
}

interface Summary {
    key: string;
    summaryItem: { name: string; image: StaticImageData; }; 
}

export default function Page() {

    const initialConfiguration = {
        material: null,
        brand: null,
        profile: null,
        direction: null,
        size: false
    }
    const [configuration, setConfiguration] = useState<Config>(initialConfiguration);
    const [feedback, setFeedback] = useState<null | {key: string, text: string}>(null);
    // handle size separately
    const [size, setSize] = useState<Size | null>(null);
    const [orderDetailsReady, setOrderDetailsReady] = useState<boolean>(false);
    const [summary, setSummary] = useState<Summary[]>();

    const updateConfiguration = (key: keyof Config, value: Config[keyof Config]) => {
        setConfiguration((prevConfig) => ({
            ...prevConfig,
            [key]: value
        }));
    };

    const updateSize = (e: React.ChangeEvent<HTMLInputElement>, property: 'w' | 'h') => {
        const value = e.target.value ? Number(e.target.value) : undefined;
    
        setSize((prevSize) => ({
            ...(prevSize || { w: undefined, h: undefined }),
            [property]: value,
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
/*         const allConfigComplete =             
            size &&
            Object.values(size).every(v => v !== null && v !== undefined) &&
            Object.values(configuration).every(v => v !== null && v !== undefined); */
        if(orderDetailsReady){
            if(currentlySelected){
                return style.selected_complete; 
            }
            return style.complete;
        }
/*         if(!orderDetailsReady){
            return style.inactive;
        } */
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

    // select first step when page loads
    useEffect(() => {
        setStep(steps[0]);
    }, []);  

    // handle switch to next step when config changes
    useEffect(() => {
        const stepIndex = steps.findIndex((st)=> st.key == currentStep?.key);
        const nextStep = steps[stepIndex+1];
        if(nextStep){
            //const nextStepIsComplete = Boolean(configuration[nextStep.key as keyof Config]);
            if(nextStep /* && !nextStepIsComplete */){
                setStep(nextStep);
                window.scrollTo({top: 0, behavior: "smooth"})
            }
        }
    }, [configuration]);  

    // check config and size are ready
    // if so, move to summary
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
    
        const allValuesFilled =
            size && configuration && 
            Object.values(size).every(v => v !== null && v !== undefined) &&
            Object.values(configuration).every(v => v !== null && v !== undefined);
    
        if (allValuesFilled) {
            timeoutId = setTimeout(() => {
                setOrderDetailsReady(true);
                setConfiguration((pr)=>{
                    return {...pr, size: true}
                })
            }, 500);
        }
        else{
            setOrderDetailsReady(false);
        }
    
        return () => clearTimeout(timeoutId);
    }, [size]);

    useEffect(()=>{
        const summary = createSummary();
        if(summary){
            setSummary(summary);
        }
    },[orderDetailsReady, size, configuration])
    
    
    const createSummary = () => {
        if(orderDetailsReady){
            const x =  Object.keys(configuration).map(key=>{
                const category = categoryItems.find(cat=>cat.key === key);
                const items = category?.items;
                if(items){
                    const summaryItem = items.find(item=>item.name === configuration[key as keyof Config]);
                    if(summaryItem){
                        return { summaryItem, key: key[0].toUpperCase()+key.slice(1,key.length)}
                    }
                }
            }).filter(i=>Boolean(i));
            return x as Summary[];
        }
    }

    return (
        <div className={style.config}>
            <h1>Fenster-Konfigurator</h1>
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

            <div className={style.config_wrapper}>
            {                
                currentStep?.key !== 'size' &&
                <div className={style.config_wrapper_option_holders}>
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

                    <Feedback visible={Boolean(feedback)}>
                        {
                            feedback?.key === 'step-warning' &&
                            <p>Bitte wählen Sie zuerst die <span style={{color: 'crimson'}}>{feedback.text}</span> aus.</p>
                        }
                    </Feedback>
                </div>}
                {
                    currentStep?.key === 'size' &&
                    <div className={style.config_wrapper_sizer}>
                        <div id={style.left}>
                            <h1>Stückzahl und Größe </h1>
                            <h3>Achtung Wichtig! - Das Angegebene Maß ist das Fensterrahmen Außenmaß.</h3>
                            <div id={style.entries}>
                                <label>Fensterbreite (in MM) min ne oalcak?</label>
                                <input 
                                    type="number" 
                                    onChange={(e)=>updateSize(e,'w')}
                                    value={size?.w}
                                    placeholder='Bitte geben Sie die Fensterbreite ein...' /> <br />
                                <label>Fensterhöhe (in MM) min ne oalcak?</label>
                                <input 
                                    type="number" 
                                    onChange={(e)=>updateSize(e,'h')}
                                    value={size?.h}
                                    placeholder='Bitte geben Sie die Fensterhöhe ein...' />
                            </div>
                        </div>
                        <div id={style.right}>
                            <Image src={sizeImage!} alt='brand' width={300} height={300} />
                        </div>
                    </div>
                }
                {
                    orderDetailsReady &&
                    <div id={style.summary}>
                        <h3>Bestellübersicht</h3>
                        <div id={style.items}>
                        {
                            summary &&
                            summary.map((sum, index)=>
                                <div key={index} className={style.item}>
                                    <div>
                                        <h4>{sum.key}</h4>
                                        <p>{sum.summaryItem.name}</p>
                                    </div>
                                    <Image alt='alt' src={sum.summaryItem.image} width={60} height={60} />
                                </div>
                            )
                        }
                                <div key={999} className={style.item}>
                                    <h2><span>Total Price:</span> $874.54</h2>
                                </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}