import { steps } from '@/data/steps';
import style from '../../styles/KonfiguratorPage.module.css';
import { Config, SelectionItem, SubStyle } from '@/types/Configurator';
import Stepper from '../Stepper/Stepper';
import { useEffect, useState } from 'react';
import OptionHolder from '../Product_Holder/Option_Holder';
import Substyle_Stepper from '../Substyle_Stepper/Substyle_Stepper';
import Sizer from '../Sizer/Sizer';
import { categoryItems, initialSize } from '@/data/configurationData';
import { useConfiguration } from '@/context/ConfigurationContext';
import { useOrderDetailsReady } from '@/context/OrderDetailsContext';
import GroupBottomActions from '../GroupBottomActions/GroupBottomActions';
import { farbenOptions, fenstergriffeOptions } from '@/data/selectionItems/farbenData';
import { brands, subStyleOptions, windowStyles } from '@/data/selectionItems/basisData';

export default function Basis_Configuration() {
  const [itemsToDisplay, setItemsToDisplay] = useState<SelectionItem[]>();

  const {
    configuration,
    substyle,
    setSubStyle,
    currentStep,
    currentGroup,
    setConfiguration,
    setCurrentGroup,
    setCurrentStep,
    moveToNextStep,
    getStepsForGroup,
  } = useConfiguration();

  const { setSize } = useOrderDetailsReady();
  const visibleSection = categoryItems.find((cat) => cat.key === currentStep?.key);

  //const prevCoverRef = useRef(configuration.cover);

  const handleSelectGroup = () => {
    setCurrentGroup('basis');
    setCurrentStep(steps.basis[0]);
  };

  const showDefaultProductHolders =
    currentStep &&
    currentStep?.key !== 'size' &&
    !(
      ['Oberlicht', 'Unterlicht'].includes(configuration.style.name) && currentStep?.key === 'type'
    );

  const isSelected = (name: string) => {
    if (currentStep) {
      return (configuration[currentStep?.key as keyof Config] as SelectionItem).name === name;
    }
    return false;
  };

  const showSubstyleStepper =
    configuration.style &&
    ['Oberlicht', 'Unterlicht'].includes(configuration.style.name) &&
    currentStep?.key === 'type';

  const findSizeImage = () => {
    const selectedStyle = windowStyles.find((sty) => sty.name === configuration['style'].name);
    const typesForSelectedStyle = selectedStyle?.children?.type;
    const selectedType = typesForSelectedStyle?.find(
      (typ) => typ.name === (configuration.type as SelectionItem).name
    );
    return selectedType?.image;
  };

  // determine what items are to be displayed for current step
  useEffect(() => {
    if (currentStep) {
      switch (currentStep?.key) {
        case 'material':
        case 'brand':
          setItemsToDisplay(visibleSection?.items as SelectionItem[]);
          break;
        case 'profile':
          const selectedBrand = brands.find((br) => br.name === configuration['brand'].name);
          const profilesOfBrand =
            selectedBrand?.children?.profile?.[
              configuration.material.name as keyof typeof selectedBrand.children.profile
            ];
          setItemsToDisplay(profilesOfBrand);
          break;
        case 'style':
          setItemsToDisplay(visibleSection?.items as SelectionItem[]);
          break;
        case 'type':
          const selectedStyle = windowStyles.find(
            (sty) => sty.name === configuration['style'].name
          );
          const typesForSelectedStyle = selectedStyle?.children?.type;
          setItemsToDisplay(typesForSelectedStyle);
          break;
        case 'cover':
          setItemsToDisplay(visibleSection?.items as SelectionItem[]);
          break;
      }
    }
  }, [currentStep, visibleSection]);

  // select first step when page loads
  useEffect(() => {
    setCurrentStep(steps.basis[0]);
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
    if (['Oberlicht', 'Unterlicht'].includes(configuration.style.name)) {
      const subStyles =
        subStyleOptions[configuration.style?.name.toLowerCase() as keyof typeof subStyleOptions];
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
      const selectedStyle = windowStyles.find((sty) => sty.name === configuration['style'].name);
      const typesForSelectedStyle = selectedStyle?.children?.type;
      const firstTypeToSelect = typesForSelectedStyle![0];
      updateConfiguration(firstTypeToSelect, 'type');
    }
  };

  const autoSelectProfile = () => {
    const selectedBrand = brands.find((sty) => sty.name === configuration['brand'].name);
    const profiles = selectedBrand?.children?.profile;
    const profileForSelectedMaterial =
      profiles![configuration.material.name as keyof typeof profiles];
    if (profileForSelectedMaterial && profileForSelectedMaterial[0]) {
      updateConfiguration(profileForSelectedMaterial[0], 'profile');
    }
  };

  const updateConfiguration = (item: SelectionItem, key?: string) => {
    if (currentStep) {
      setConfiguration((prevConfig) => ({
        ...prevConfig,
        [key ?? (currentStep?.key as keyof Config)]: item,
      }));
    }
    moveToNextStep();
  };

  const handleMoveNextGroup = () => {
    setCurrentGroup('farben');
    const nextGroupSteps = getStepsForGroup('farben');
    setCurrentStep(nextGroupSteps[0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // remove substyle selection if style changes from oberlicht/unterlicht
  useEffect(() => {
    autoSelectFirstType();
    setSize(initialSize);
    setConfiguration((pr) => {
      return { ...pr, multiWidth: undefined };
    });
  }, [configuration.style]);

  // autoselect for profiles
  useEffect(() => {
    autoSelectProfile();
  }, [configuration.material]);

  // if selected window type has handle, update configuration and vice-versa
  useEffect(() => {
    let hasHandle = false;
    if ((configuration.type as SelectionItem).handleNumber) {
      hasHandle = true;
    }
    if ((configuration.type as SubStyle).option) {
      if (
        (configuration.type as SubStyle).oben?.handleNumber ||
        (configuration.type as SubStyle).unten?.handleNumber
      ) {
        hasHandle = true;
      }
    }
    ////////
    if (hasHandle) {
      setConfiguration((pr) => {
        return {
          ...pr,
          fenstergriffe: {
            type: farbenOptions.fenstergriffe[0],
            choice: fenstergriffeOptions[farbenOptions.fenstergriffe[0].key][0],
          },
        };
      });
    } else {
      setConfiguration((pr) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { fenstergriffe, ...rest } = pr;
        return { ...rest };
      });
    }
  }, [configuration.type]);

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
      {currentGroup === 'basis' && <Stepper />}
      {currentGroup === 'basis' && (
        <div className={style.group}>
          <div className={style.config_wrapper}>
            {showDefaultProductHolders && (
              <div className={style.config_wrapper_option_holders}>
                {itemsToDisplay?.map((item, index) => (
                  <OptionHolder
                    item={item}
                    selected={isSelected(item.name)}
                    action={() => updateConfiguration(item)}
                    key={index}
                  />
                ))}
              </div>
            )}
            {showSubstyleStepper && <Substyle_Stepper />}

            {currentStep?.key === 'size' && (
              <Sizer substyle={substyle} sizeImage={findSizeImage()!} />
            )}
          </div>
          <GroupBottomActions
            expandable={false}
            isLastStep={currentStep?.key === 'size'}
            nextGroupAction={handleMoveNextGroup}
            toggleExpand={() => {}}
            itemNumber={0}
          />
        </div>
      )}
    </>
  );
}
