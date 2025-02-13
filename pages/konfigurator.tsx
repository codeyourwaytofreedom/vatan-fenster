import { useEffect, useState } from 'react';
import { StaticImageData } from 'next/image';
import style from '.././styles/KonfiguratorPage.module.css'
import { steps } from '@/data/steps';
import  { categoryItems, brands, windowStyles, subStyleOptions } from '@/data/configuration_options';
import type {SelectionItem, SubStyleOptions } from '@/data/configuration_options';

import { Config, Size, Step, Summary } from '@/types/Configurator';


import OptionHolder from '@/components/Product_Holder/Option_Holder';
import Feedback from '@/components/Feedback/Feedback';
import Stepper from '@/components/Stepper/Stepper';
import Sizer from '@/components/Sizer/Sizer';
import SummaryDisplayer from '@/components/Summary/Summary';
import Substyle_Section from '@/components/Substyle/Substyle_Section';

export interface SubStyle  {
    option: SelectionItem | null;
    oben: SelectionItem | null;
    unten: SelectionItem | null;
}

export default function Page() {

    const initialConfiguration = {
        material: null,
        brand: null,
        profile: null,
        style: null,
        type: null,
        size: false
    }
    const initialSubstyle = {
        option: null,
        oben: null,
        unten: null
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

    //const showSubCategory = configuration.style && currentStep?.key === 'style' && ['Oberlicht', 'Unterlicht'].includes(configuration.style);
    const [showSubCategory, setShowSubCat] = useState(false);
    const [subStyleKey, setSubStyleKey] = useState<string>('');
    const itemWithSubCategory = itemsToDisplay?.find(it=> it.name === subStyleKey);
    const [substyle, setSubStyle] = useState<SubStyle>(initialSubstyle);

    const obenItems = subStyleOptions[itemWithSubCategory?.key as keyof SubStyleOptions]?.find((it)=> it.key === substyle.option?.key)?.children?.oben;
    const untenItems = subStyleOptions[itemWithSubCategory?.key as keyof SubStyleOptions]?.find((it)=> it.key === substyle.option?.key)?.children?.unten;

    const updateSubStyle = (key: string, item: SelectionItem) => {
        setSubStyle((pr)=>{
            return {
                ...pr,
                [key]: item
            }
        });
    };

    const updateConfiguration = (key: keyof Config, value: Config[keyof Config], item: { name: string; image: StaticImageData; } ) => {
        if(['Oberlicht', 'Untenlicht'].includes(value as string)){
            setShowSubCat(true);
            setSubStyleKey('Oberlicht');
            setConfiguration((pr)=>{
                return {...pr, style: null}
            })
            return;
        }
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

    const handleCancelStyle = () => {
        setConfiguration((pr)=>{
            return {...pr, style: null}
        });
        setShowSubCat(false);
        setSubStyleKey('');
        setSubStyle(initialSubstyle);
    }
    

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
                    const profilesOfBrand = selectedBrand?.children?.profile?.[configuration.material as keyof typeof selectedBrand.children.profile];
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

    useEffect(()=>{
        const allSubStylesComplete = Object.values(substyle).every((s)=> Boolean(s));
        if(allSubStylesComplete){
            //select type step
            setTimeout(() => {
                setConfiguration((pr)=>{
                    return {...pr, style: subStyleKey }
                })
            }, 200);
        }
    },[substyle])

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
                <Feedback visible={Boolean(feedback)}>
                    {
                        feedback?.key === 'step-warning' &&
                        <p>Bitte wählen Sie zuerst die <span style={{color: 'crimson'}}>{feedback.text}</span> aus.</p>
                    }
                </Feedback>
            {                
                currentStep?.key !== 'size' &&
                <>
                {
                    !(currentStep?.key === 'style' && showSubCategory ) &&
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
                </div>
                }
                {/* following block to be moved to a seperate component */}
                {
                    showSubCategory &&  itemWithSubCategory &&
                    <div className={style.config_wrapper_subcategories}>
                        <div id={style.minified}>
                        <button onClick={handleCancelStyle}>X</button>
                        <OptionHolder 
                            mini={true}
                            name={itemWithSubCategory!.name}
                            image={itemWithSubCategory!.image}
                            imageAlt={itemWithSubCategory!.name}
                            action={() => {}} />
                        </div>
                        <Substyle_Section 
                            title={itemWithSubCategory.name}
                            configKey='option'
                            items={subStyleOptions[itemWithSubCategory.key as keyof SubStyleOptions]}
                            substyle={substyle}
                            updateSubStyle={updateSubStyle}
                            />
                        {
                            substyle.option &&
                            <Substyle_Section 
                                title={'Oben'}
                                configKey='oben'
                                items={obenItems}
                                substyle={substyle}
                                updateSubStyle={updateSubStyle}
                                />
                        }
                                                {
                            substyle.oben &&
                            <Substyle_Section 
                                title={'Unten'}
                                configKey='unten'
                                items={untenItems}
                                substyle={substyle}
                                updateSubStyle={updateSubStyle}
                                />
                        }
                    </div>
                }
                </>
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