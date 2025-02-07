import { useEffect, useState } from 'react';
import { StaticImageData } from 'next/image';
import style from '.././styles/KonfiguratorPage.module.css'
import { steps } from '@/data/steps';
import  { categoryItems, brands, windowStyles } from '@/data/configuration_options';
import type {SelectionItem } from '@/data/configuration_options';

import { Config, Size, Step, Summary } from '@/types/Configurator';


import OptionHolder from '@/components/Product_Holder/Option_Holder';
import Feedback from '@/components/Feedback/Feedback';
import Stepper from '@/components/Stepper/Stepper';
import Sizer from '@/components/Sizer/Sizer';
import SummaryDisplayer from '@/components/Summary/Summary';

export default function Page() {

    const initialConfiguration = {
        material: null,
        brand: null,
        profile: null,
        style: null,
        type: null,
        size: false
    }
    const [configuration, setConfiguration] = useState<Config>(initialConfiguration);
    const [feedback, setFeedback] = useState<null | {key: string, text: string}>(null);
    const [orderDetailsReady, setOrderDetailsReady] = useState<boolean>(false);
    const [finishedSteps, setFinishedSteps] = useState<Summary[]>();
    const [currentStep, setStep] = useState<Step | null>(null);
    const visibleSection = categoryItems.find(cat=> cat.key === currentStep?.key);
    const [itemsToDisplay, setItemsToDisplay] = useState<SelectionItem[]>();
    const [size, setSize] = useState<Size | null>(null);
    const sizeImage = windowStyles.find((img)=>img.name === configuration.style)?.image;


    const updateConfiguration = (key: keyof Config, value: Config[keyof Config], item: { name: string; image: StaticImageData; } ) => {
        setConfiguration((prevConfig) => ({
            ...prevConfig,
            [key]: value
        }));
        const stepAlreadyIn = finishedSteps?.some((step)=> step.key === key);
        if(stepAlreadyIn){
            const updatedSteps = finishedSteps?.filter(s=> s.key !== key);
            setFinishedSteps(() => [
                ...(updatedSteps || []), 
                { key, summaryItem: item }
              ]);
        }else{
            setFinishedSteps((prevFinishedSteps) => [
                ...(prevFinishedSteps || []), 
                { key, summaryItem: item }
              ]);
        }
    };

    // determine what items are to be displayed for current step
    useEffect(()=>{
        if(currentStep){
            switch (currentStep?.key) {
                case 'material':
                case 'brand':
                    setItemsToDisplay(visibleSection?.items);
                    break;
                case 'profile':
                    const selectedBrand = brands.find(br=>br.name === configuration['brand']);
                    const profilesOfBrand = selectedBrand?.children?.profile;
                    setItemsToDisplay(profilesOfBrand);
                    break;
                case 'style':
                    setItemsToDisplay(visibleSection?.items);
                    break;
                case 'type':
                    const selectedStyle = windowStyles.find(sty=>sty.name === configuration['style']);
                    const typesForSelectedStyle = selectedStyle?.children?.type;
                    setItemsToDisplay(typesForSelectedStyle);
                    break;
            }
        }
    },[currentStep, visibleSection]) 

    return (
        <div className={style.config}>
            <h1>Fenster-Konfigurator</h1>
            <Stepper 
                steps={steps} 
                setStep={setStep}
                setFeedback={setFeedback}
                orderDetailsReady={orderDetailsReady}
                currentStep={currentStep!} 
                configuration={configuration}  />

            <div className={style.config_wrapper}>
            {                
                currentStep?.key !== 'size' &&
                <div className={style.config_wrapper_option_holders}>
                    {
                    itemsToDisplay?.map((item, index) =>
                    <OptionHolder 
                        name={item.name}
                        image={item.image}
                        imageAlt={item.name}
                        selected={configuration[currentStep?.key as keyof Config] === item.name}
                        action={() => updateConfiguration(currentStep?.key as keyof Config, item.name, item)}
                        key={index} />
                        )
                    }

                    <Feedback visible={Boolean(feedback)}>
                        {
                            feedback?.key === 'step-warning' &&
                            <p>Bitte wählen Sie zuerst die <span style={{color: 'crimson'}}>{feedback.text}</span> aus.</p>
                        }
                    </Feedback>
                </div>
            }

                <Sizer 
                    size={size} 
                    configuration={configuration}
                    currentStep={currentStep}
                    setConfiguration={setConfiguration} 
                    setOrderDetailsReady={setOrderDetailsReady} 
                    setSize={setSize} 
                    sizeImage={sizeImage!} />
                {
                    orderDetailsReady &&  <SummaryDisplayer finishedSteps={finishedSteps}/>
                }
            </div>
        </div>
    );
}