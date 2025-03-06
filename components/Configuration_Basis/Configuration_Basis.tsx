import { steps } from '@/data/steps';
import style from '../../styles/KonfiguratorPage.module.css';
import { Config, Size, Step, SubStyle } from '@/types/Configurator';
import Stepper from '../Stepper/Stepper';
import { MouseEventHandler, useEffect, useState } from 'react';
import OptionHolder from '../Product_Holder/Option_Holder';
import Substyle_Stepper from '../Substyle_Stepper/Substyle_Stepper';
import Sizer from '../Sizer/Sizer';
import {
  brands,
  categoryItems,
  SelectionItem,
  SubStyleOptions,
  windowStyles,
} from '@/data/configuration_options';

interface BasisProps {
  currentGroup: 'basis' | 'farben';
  currentStep: Step;
  configuration: Config;
  orderDetailsReady: boolean;
  substyle: SubStyle;
  subStyleOptions: SubStyleOptions;
  size: Size | null;
  setSize: React.Dispatch<React.SetStateAction<Size | null>>;
  setSubStyle: React.Dispatch<React.SetStateAction<SubStyle>>;
  setStep: React.Dispatch<React.SetStateAction<Step | null>>;
  setOrderDetailsReady: React.Dispatch<React.SetStateAction<boolean>>;
  setConfiguration: React.Dispatch<React.SetStateAction<Config>>;
  handleSelectGroup: MouseEventHandler<HTMLButtonElement>;
}
export default function Basis_Configuration({
  currentGroup,
  currentStep,
  configuration,
  orderDetailsReady,
  substyle,
  subStyleOptions,
  size,
  setSize,
  setSubStyle,
  setStep,
  setConfiguration,
  setOrderDetailsReady,
  handleSelectGroup,
}: BasisProps) {
  const [itemsToDisplay, setItemsToDisplay] = useState<SelectionItem[]>();
  const visibleSection = categoryItems.find((cat) => cat.key === currentStep?.key);

  const showDefaultProductHolders =
    currentStep &&
    currentStep?.key !== 'size' &&
    !(
      ['Oberlicht', 'Unterlicht'].includes(configuration.style as string) &&
      currentStep?.key === 'type'
    );
  const isSelected = (name: string) => {
    if (currentStep) {
      return configuration[currentStep?.key as keyof Config] === name;
    }
    return false;
  };
  const showSubstyleStepper =
    configuration.style &&
    ['Oberlicht', 'Unterlicht'].includes(configuration.style) &&
    currentStep?.key === 'type';

  const findSizeImage = () => {
    const selectedStyle = windowStyles.find((sty) => sty.name === configuration['style']);
    const typesForSelectedStyle = selectedStyle?.children?.type;
    const selectedType = typesForSelectedStyle?.find((typ) => typ.name === configuration.type);
    return selectedType?.image;
  };

  // determine what items are to be displayed for current step
  useEffect(() => {
    if (currentStep) {
      switch (currentStep?.key) {
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
          console.log('profilesOfBrand', profilesOfBrand);
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
  }, [currentStep, visibleSection]);

  // select first step when page loads
  useEffect(() => {
    setStep(steps.basis[0]);
  }, []);

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
    if (profileForSelectedMaterial && profileForSelectedMaterial[0]) {
      updateConfiguration(profileForSelectedMaterial[0], 'profile');
    }
  };

  // remove substyle selection if style changes from oberlicht/unterlicht
  useEffect(() => {
    autoSelectFirstType();
  }, [configuration.style]);

  // autoselect for profiles
  useEffect(() => {
    autoSelectProfile();
  }, [configuration.material]);

  const moveNextStep = () => {
    // make currentGroup dynamic, thats why alwayes setting the ssame next step for basis
    const stepIndex = steps[currentGroup].findIndex((st) => st.key == currentStep?.key);
    const nextStep = steps[currentGroup][stepIndex + 1];
    const value = configuration[currentStep?.key as keyof Config];
    if (nextStep && value) {
      setTimeout(() => {
        // have to handle this correctly
        setStep(nextStep);
      }, 300);
    }
  };

  const updateConfiguration = (item: SelectionItem, key?: string) => {
    if (currentStep) {
      setConfiguration((prevConfig) => ({
        ...prevConfig,
        [key ?? (currentStep?.key as keyof Config)]: item.name,
      }));
    }
    moveNextStep();
  };
  return (
    <>
      <div className={style.layers}>
        <button
          id={currentGroup === 'basis' ? style.active : style.default}
          onClick={handleSelectGroup}
        >
          <span>BASISKONFIGURATION</span>
        </button>
      </div>
{  currentGroup === 'basis' &&    <Stepper
        steps={steps.basis}
        currentStep={currentStep!}
        setStep={setStep}
        orderDetailsReady={orderDetailsReady}
        configuration={configuration}
      />}
      {currentGroup === 'basis' && (
        <div className={style.group}>
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
                currentGroup={currentGroup}
                substyle={substyle}
                subStyleOptions={subStyleOptions}
                setSubStyle={setSubStyle}
                setStep={setStep}
              />
            )}

            {currentStep?.key === 'size' && (
              <Sizer
                size={size}
                configuration={configuration}
                currentStep={currentStep!}
                setConfiguration={setConfiguration}
                setSize={setSize}
                setOrderDetailsReady={setOrderDetailsReady}
                substyle={substyle}
                sizeImage={findSizeImage()!}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
