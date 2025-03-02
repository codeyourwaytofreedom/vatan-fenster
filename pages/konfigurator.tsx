import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { steps } from '@/data/steps';
import {
  categoryItems,
  brands,
  windowStyles,
  subStyleOptions,
  initialConfiguration,
  initialSize,
  initialExtraConfig,
} from '@/data/configuration_options';
import type { SelectionItem } from '@/data/configuration_options';
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
      categoryItems,
      brands,
      windowStyles,
      subStyleOptions,
    },
  };
};
import { Config, ExtraConfig, Size, Step } from '@/types/Configurator';

import OptionHolder from '@/components/Product_Holder/Option_Holder';
import Stepper from '@/components/Stepper/Stepper';
import SummaryDisplayer from '@/components/Summary/Summary';
import Substyle_Stepper from '@/components/Substyle_Stepper/Substyle_Stepper';
import SizerSummary from '@/components/SizerSummary/SizerSummary';
import Sizer from '@/components/Sizer/Sizer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { extraSteps } from '@/data/extra_steps';

export interface SubStyle {
  option: SelectionItem | null;
  oben: SelectionItem | null;
  unten: SelectionItem | null;
}

export const initialSubstyle = {
  option: null,
  oben: null,
  unten: null,
};

export default function Page({
  steps,
  categoryItems,
  brands,
  windowStyles,
  subStyleOptions,
}: Props) {
  const [configuration, setConfiguration] = useState<Config>(initialConfiguration);
  const [orderDetailsReady, setOrderDetailsReady] = useState<boolean>(false);
  const [basisStep, setBasisStep] = useState<Step | null>(null);
  const [extraStep, setExtraStep] = useState<Step | null>(null);
  const visibleSection = categoryItems.find((cat) => cat.key === (basisStep?.key ?? extraStep?.key));
  const [itemsToDisplay, setItemsToDisplay] = useState<SelectionItem[]>();
  const [size, setSize] = useState<Size | null>(initialSize);
  const [substyle, setSubStyle] = useState<SubStyle>(initialSubstyle);
  const [extraConfig, setExtraConfig] = useState<ExtraConfig>(initialExtraConfig);

  const findSizeImage = () => {
    const selectedStyle = windowStyles.find((sty) => sty.name === configuration['style']);
    const typesForSelectedStyle = selectedStyle?.children?.type;
    const selectedType = typesForSelectedStyle?.find((typ) => typ.name === configuration.type);
    return selectedType?.image;
  };

  const autoSelectFirstType = () => {
    if (['Oberlicht', 'Unterlicht'].includes(configuration.style as string)) {
      const subStyles =
        subStyleOptions[configuration.style?.toLowerCase() as keyof typeof subStyleOptions];
      const firstSubstyle = subStyles[0];
      if (firstSubstyle) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { children, ...rest } = firstSubstyle;
        const { oben, unten } = children as { oben: SelectionItem[]; unten: SelectionItem[] };
        setSubStyle(() => {
          return {
            option: firstSubstyle,
            oben: oben[0],
            unten: unten[0],
          };
        });
      }
    } else {
      const selectedStyle = windowStyles.find((sty) => sty.name === configuration['style']);
      const typesForSelectedStyle = selectedStyle?.children?.type;
      const firstTypeToSelect = typesForSelectedStyle![0];
      updateConfiguration(firstTypeToSelect, 'type');
    }
  };

  const autoSelectProfile = () => {
    const selectedBrand = brands.find((sty) => sty.name === configuration['brand']);
    const profiles = selectedBrand?.children?.profile;
    const profileForSelectedMaterial = profiles![configuration.material as keyof typeof profiles];
    if(profileForSelectedMaterial && profileForSelectedMaterial[0]){
      console.log(profileForSelectedMaterial[0]);
      updateConfiguration(profileForSelectedMaterial[0],'profile');
    }
  }

  const showDefaultProductHolders =
    (basisStep || extraStep) &&
    basisStep?.key !== 'size' &&
    !(
      ['Oberlicht', 'Unterlicht'].includes(configuration.style as string) &&
      basisStep?.key === 'type'
    );
  const showSubstyleStepper =
    configuration.style &&
    ['Oberlicht', 'Unterlicht'].includes(configuration.style) &&
    basisStep?.key === 'type';

  const moveNextStep = () => {
    const stepsToUse = basisStep ? steps : extraSteps;
    const relevantStep = basisStep ?? extraStep;
    const stepIndex = stepsToUse.findIndex((st) => st.key == relevantStep?.key);
    const nextStep = stepsToUse[stepIndex + 1];
    const action = basisStep ? setBasisStep : setExtraStep;
    const value = basisStep ? configuration[basisStep?.key as keyof Config] : extraConfig[extraStep?.key as keyof ExtraConfig];
    if (nextStep && value) {
      setTimeout(() => {
        action(nextStep);
      }, 300);
    }
  };

  const updateConfiguration = ( item: SelectionItem, key?: string,) => {
    if(basisStep){
      setConfiguration((prevConfig) => ({
        ...prevConfig,
        [key ?? basisStep?.key as keyof Config]: item.name,
      }));
    }
    if(extraStep){
      setExtraConfig((prevConfig) => ({
        ...prevConfig,
        [key ?? extraStep?.key as keyof ExtraConfig]: item.name,
      }));
    }
    moveNextStep();
  };

  const handleSubmitOrder = () => {
    if (orderDetailsReady) {
      alert('Ihre Konfiguration wurde übermittelt.');
    } else {
      setBasisStep(steps.find((st) => st.key === 'size')!);
    }
  };

  const handleShowBasis = () => {
    setBasisStep(steps[0]);
    setExtraStep(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowExtraOptions = () => {
    setBasisStep(null);
    setExtraStep(extraSteps[0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isSelected = ( name: string) => {
    if(basisStep){
      return configuration[basisStep?.key as keyof Config] === name;
    }
    if(extraStep){
      return extraConfig[extraStep?.key as keyof ExtraConfig] === name;
    }
    return false;
  }

  // determine what items are to be displayed for current step
  useEffect(() => {
    if (basisStep) {
      switch (basisStep?.key) {
        case 'material':
        case 'brand':
          setItemsToDisplay(visibleSection?.items);
          break;
        case 'profile':
          const selectedBrand = brands.find((br) => br.name === configuration['brand']);
          const profilesOfBrand =
            selectedBrand?.children?.profile?.[
              configuration.material as keyof typeof selectedBrand.children.profile
            ];
          console.log('profilesOfBrand',profilesOfBrand);
          setItemsToDisplay(profilesOfBrand);
          break;
        case 'style':
          setItemsToDisplay(visibleSection?.items);
          break;
        case 'type':
          const selectedStyle = windowStyles.find((sty) => sty.name === configuration['style']);
          const typesForSelectedStyle = selectedStyle?.children?.type;
          setItemsToDisplay(typesForSelectedStyle);
          break;
      }
    }
    if(extraStep){
      setItemsToDisplay(visibleSection?.items);
    }
  }, [basisStep,extraStep, visibleSection]);

  // when substyles are complete, make style complete for configuration
  useEffect(() => {
    const allSubStylesComplete = Object.values(substyle).every((s) => Boolean(s));
    if (allSubStylesComplete) {
      //select type step
      const { oben, unten, option } = substyle;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { children, ...optionRest } = option as SelectionItem;
      setConfiguration((pr) => {
        return { ...pr, type: { unten, oben, option: optionRest } };
      });
    }
  }, [substyle]);

  // when substyle option changes, remove oben and unten
  useEffect(() => {
    if (substyle && substyle.option) {
      setConfiguration((pr) => {
        return { ...pr, type: null };
      });
    }
  }, [substyle.option]);

  // when substyle option changes, autoselect oben and unten
  useEffect(() => {
    if (substyle.option) {
      setSubStyle(() => {
        return {
          option: substyle.option! || null,
          oben: substyle.option!.children?.oben![0] || null,
          unten: substyle.option!.children?.unten![0] || null,
        };
      });
    }
  }, [substyle.option]);

  // remove substyle selection if style changes from oberlicht/unterlicht
  useEffect(() => {
    autoSelectFirstType();
  }, [configuration.style]);

    // autoselect for profiles
    useEffect(() => {
      autoSelectProfile();
    }, [configuration.material]);

    // select first step when page loads
  useEffect(() => {
    setBasisStep(steps[0]);
  }, []);

  return (
    <>
      <div className={style.config}>
        <div>
          <div className={style.layers}>
            <button id={style.must} onClick={handleShowBasis}>
              <FontAwesomeIcon icon={basisStep ? faChevronDown : faChevronUp} />
              <span>Basiskonfiguration</span>
            </button>
            <button id={style.may} onClick={handleShowExtraOptions}>
              <FontAwesomeIcon icon={extraStep ? faChevronDown : faChevronUp} />
              <span>Erweiterte Konfiguration</span>
            </button>
          </div>
          {
            <Stepper
              id={!basisStep ? 'orange' : ''}
              steps={basisStep ? steps : extraSteps}
              setStep={basisStep ? setBasisStep : setExtraStep}
              orderDetailsReady={orderDetailsReady}
              currentStep={basisStep ?? extraStep!}
              configuration={configuration}
            />
          }

          <div className={style.config_wrapper}>
            {showDefaultProductHolders && (
              <div className={style.config_wrapper_option_holders}>
                {itemsToDisplay?.map((item, index) => (
                  <OptionHolder
                    name={item.name}
                    image={item.image}
                    imageAlt={item.name}
                    selected={isSelected(item.name)}
                    action={() => updateConfiguration(item)}
                    key={index}
                  />
                ))}
              </div>
            )}
            {showSubstyleStepper && (
              <Substyle_Stepper
                configuration={configuration}
                substyle={substyle}
                subStyleOptions={subStyleOptions}
                setSubStyle={setSubStyle}
                setStep={setBasisStep}
              />
            )}

            {basisStep?.key === 'size' && (
              <Sizer
                size={size}
                configuration={configuration}
                currentStep={basisStep!}
                setConfiguration={setConfiguration}
                setSize={setSize}
                setOrderDetailsReady={setOrderDetailsReady}
                substyle={substyle}
                sizeImage={findSizeImage()!}
              />
            )}
          </div>
        </div>
        <SummaryDisplayer
          configuration={configuration}
          setStep={setBasisStep}
          sizer={
            <SizerSummary
              size={size}
              configuration={configuration}
              currentStep={basisStep!}
              setConfiguration={setConfiguration}
              setOrderDetailsReady={setOrderDetailsReady}
              substyle={substyle}
              sizeImage={findSizeImage()!}
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
