import { steps } from '@/data/steps';
import style from '../../styles/KonfiguratorPage.module.css';
import {
  BasisConfiuration,
  ConfigGroup,
  FensterConfig,
  SelectionItem,
  SubStyle,
} from '@/types/Configurator';
import Stepper from '../Stepper/Stepper';
import { useEffect, useState } from 'react';
import OptionHolder from '../Product_Holder/Option_Holder';
import Substyle_Stepper from '../Substyle_Stepper/Substyle_Stepper';
import Sizer from '../Sizer/Sizer';
import { categoryItems } from '@/data/configurationData';
import { useConfiguration } from '@/context/ConfigurationContext';
import { useOrderDetailsReady } from '@/context/OrderDetailsContext';
import GroupBottomActions from '../GroupBottomActions/GroupBottomActions';
import { farbenOptions, fenstergriffeOptions } from '@/data/selectionItems/farbenData';
import {
  brands,
  customProfileHeights,
  subStyleOptions,
  windowStyles,
} from '@/data/selectionItems/basisData';
import { scrollToElement } from '@/utils';

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
    getMinMaxSizes,
  } = useConfiguration();

  const { setSize } = useOrderDetailsReady();
  const visibleSection = categoryItems.find((cat) => cat.key === currentStep?.key);

  function hasGroupKey<G extends ConfigGroup>(
    group: G,
    key: PropertyKey
  ): key is keyof FensterConfig[G] {
    return key in (configuration[group] as object);
  }

  const showProfileHeight =
    ['I5', 'I5C', 'IL'].includes(configuration.basis.profile.key) && currentStep?.key === 'profile';

  const showDefaultProductHolders =
    currentStep &&
    currentStep?.key !== 'size' &&
    !(
      ['Oberlicht', 'Unterlicht'].includes(configuration.basis.style.name) &&
      currentStep?.key === 'type'
    );

  const isSelected = (name: string, key?: string) => {
    if (currentStep) {
      return (
        (configuration.basis[(key ?? currentStep?.key) as keyof BasisConfiuration] as SelectionItem)
          ?.name === name
      );
    }
    return false;
  };

  const showSubstyleStepper =
    configuration.basis.style &&
    ['Oberlicht', 'Unterlicht'].includes(configuration.basis.style.name) &&
    currentStep?.key === 'type';

  const findSizeImage = () => {
    const selectedStyle = windowStyles.find(
      (sty) => sty.name === configuration.basis['style'].name
    );
    const typesForSelectedStyle = selectedStyle?.children?.type;
    const selectedType = typesForSelectedStyle?.find(
      (typ) => typ.name === (configuration.basis.type as SelectionItem).name
    );
    return selectedType?.image;
  };

  // if profile changes, check if 75mm is available in the new profile
  // if not, default back to 66 mm
  useEffect(() => {
    if (!['I5', 'I5C', 'IL'].includes(configuration.basis.profile.key)) {
      if (configuration.basis.profileHeight?.key === 'height75') {
        setConfiguration((pr) => {
          return {
            ...pr,
            basis: {
              ...pr.basis,
              profileHeight: customProfileHeights[0],
            },
          };
        });
      }
    }
  }, [configuration.basis.profile]);

  // determine what items are to be displayed for current step
  useEffect(() => {
    if (currentStep) {
      switch (currentStep?.key) {
        case 'material':
        case 'brand':
          setItemsToDisplay(visibleSection?.items as SelectionItem[]);
          break;
        case 'profile':
          const selectedBrand = brands.find((br) => br.key === configuration.basis['brand'].key);
          const profilesOfBrand =
            selectedBrand?.children?.profile?.[
              configuration.basis.material.key as keyof typeof selectedBrand.children.profile
            ];
          setItemsToDisplay(profilesOfBrand);
          break;
        case 'style':
          setItemsToDisplay(visibleSection?.items as SelectionItem[]);
          break;
        case 'type':
          const selectedStyle = windowStyles.find(
            (sty) => sty.name === configuration.basis['style'].name
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
        return {
          ...pr,
          basis: {
            ...pr.basis,
            type: { unten, oben, option: optionRest },
          },
        };
      });
    }
  }, [substyle]);

  const autoSelectFirstType = () => {
    if (['Oberlicht', 'Unterlicht'].includes(configuration.basis.style.name)) {
      const subStyles =
        subStyleOptions[
          configuration.basis.style?.name.toLowerCase() as keyof typeof subStyleOptions
        ];
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
      const selectedStyle = windowStyles.find(
        (sty) => sty.name === configuration.basis['style'].name
      );
      const typesForSelectedStyle = selectedStyle?.children?.type;
      const firstTypeToSelect = typesForSelectedStyle![0];

      updateConfiguration(firstTypeToSelect, 'type');
    }
  };

  const autoSelectProfile = () => {
    const selectedBrand = brands.find((sty) => sty.name === configuration.basis['brand'].name);
    const profiles = selectedBrand?.children?.profile;
    const profileForSelectedMaterial =
      profiles![configuration.basis.material.key as keyof typeof profiles];
    if (profileForSelectedMaterial && profileForSelectedMaterial[0]) {
      updateConfiguration(profileForSelectedMaterial[0], 'profile');
    }
  };

  const updateConfiguration = (item: SelectionItem, keyOverride?: PropertyKey) => {
    if (!currentStep || !currentGroup) {
      moveToNextStep();
      return;
    }

    const group = currentGroup as ConfigGroup;
    const key = (keyOverride ?? currentStep.key) as PropertyKey;

    if (!hasGroupKey(group, key)) {
      moveToNextStep();
      return;
    }

    if (['I5', 'I5C', 'IL'].includes(item.key) && currentStep?.key === 'profile' && !key) {
      scrollToElement({ elementId: 'profileHeights' });
      return;
    }

    setConfiguration((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [key]: item, // key is now narrowed to keyof FensterConfig[group]
      } as FensterConfig[typeof group],
    }));

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
    setConfiguration((pr) => {
      const refreshedConfig = { ...pr };
      delete refreshedConfig.basis.multiWidth;
      delete refreshedConfig.basis.multiHeight;
      delete refreshedConfig.basis.obenMultiWidth;
      delete refreshedConfig.basis.untenMultiWidth;
      return refreshedConfig;
    });
  }, [configuration.basis.style]);

  // autoselect for profiles
  useEffect(() => {
    autoSelectProfile();
  }, [configuration.basis.material]);

  // if selected window type has handle, update configuration and vice-versa
  useEffect(() => {
    let hasHandle = false;
    if ((configuration.basis.type as SelectionItem).handleNumber) {
      hasHandle = true;
    }
    if ((configuration.basis.type as SubStyle).option) {
      if (
        (configuration.basis.type as SubStyle).oben?.handleNumber ||
        (configuration.basis.type as SubStyle).unten?.handleNumber
      ) {
        hasHandle = true;
      }
    }
    ////////
    if (hasHandle) {
      setConfiguration((pr) => {
        return {
          ...pr,
          farben: {
            ...pr.farben,
            fenstergriffe: {
              type: farbenOptions.fenstergriffe[0],
              choice: fenstergriffeOptions[farbenOptions.fenstergriffe[0].key][0],
            },
          },
        };
      });
    } else {
      setConfiguration((pr) => {
        const { farben, ...festerConfigRest } = pr;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { fenstergriffe, ...farbenRest } = farben;
        return { ...festerConfigRest, farben: { ...farbenRest } };
      });
    }
  }, [configuration.basis.type]);

  useEffect(() => {
    setTimeout(() => {
      if (
        configuration.basis.material &&
        configuration.basis.profile &&
        configuration.basis.style &&
        configuration.basis.type
      ) {
        // provide Width and Height when oberlicht is selected
        if (/* configuration.style.key === 'oberlicht' && */ 'oben' in configuration.basis.type) {
          const sectionNumberOben = configuration.basis.type.oben?.sectionNumber || 1;
          const windowStyleOben =
            sectionNumberOben === 1
              ? windowStyles.find((st) => st.key === 'flugel1')
              : sectionNumberOben === 2
                ? windowStyles.find((st) => st.key === 'flugel2')
                : windowStyles.find((st) => st.key === 'flugel3');
          const windowProfileOben = configuration.basis.profile;
          const windowTypeOben = configuration.basis.type.oben!;

          const minMaxSizesOben = getMinMaxSizes(
            configuration.basis.material,
            windowStyleOben!,
            windowProfileOben,
            windowTypeOben
          );

          const sectionNumberUnten = configuration.basis.type.unten?.sectionNumber || 1;
          const windowStyleUnten =
            sectionNumberUnten === 1
              ? windowStyles.find((st) => st.key === 'flugel1')
              : sectionNumberUnten === 2
                ? windowStyles.find((st) => st.key === 'flugel2')
                : windowStyles.find((st) => st.key === 'flugel3');
          const windowProfileUnten = configuration.basis.profile;
          const windowTypeUnten = configuration.basis.type.unten!;

          const minMaxSizesUnten = getMinMaxSizes(
            configuration.basis.material,
            windowStyleUnten!,
            windowProfileUnten,
            windowTypeUnten
          );

          const minWidthOberlicht = Math.max(minMaxSizesOben.minWidth, minMaxSizesUnten.minWidth);
          const minHeightOberlicht = minMaxSizesOben.minHeight + minMaxSizesUnten.minHeight;

          setSize({ w: minWidthOberlicht, h: minHeightOberlicht });

          // remove multiwidth,obenMultiWidth,untenMultiWidth,multiHeight
          // to trigger re-division in sizer for types with sections
          setConfiguration((pr) => {
            const reserve = { ...pr };
            delete reserve.basis.multiWidth;
            delete reserve.basis.obenMultiWidth;
            delete reserve.basis.untenMultiWidth;
            delete reserve.basis.multiHeight;
            if (configuration.basis.style.key === 'oberlicht') {
              reserve.basis.multiHeight = {
                obenHeight: minMaxSizesOben.minHeight,
                untenHeight: minMaxSizesUnten.minHeight,
              };
            }
            //flip for unterlicht
            if (configuration.basis.style.key === 'unterlicht') {
              reserve.basis.multiHeight = {
                obenHeight: minMaxSizesUnten.minHeight,
                untenHeight: minMaxSizesOben.minHeight,
              };
            }
            return reserve;
          });
        }
        if (['flugel1', 'flugel2', 'flugel3'].includes(configuration.basis.style.key)) {
          setSize({
            w: getMinMaxSizes(
              configuration.basis.material,
              configuration.basis.style,
              configuration.basis.profile,
              configuration.basis.type as SelectionItem
            ).minWidth,
            h: getMinMaxSizes(
              configuration.basis.material,
              configuration.basis.style,
              configuration.basis.profile,
              configuration.basis.type as SelectionItem
            ).minHeight,
          });
          // remove multiwidth,obenMultiWidth,untenMultiWidth,multiHeight
          // to trigger re-division in sizer for types with sections
          setConfiguration((pr) => {
            const reserve = { ...pr };
            delete reserve.basis.multiWidth;
            delete reserve.basis.obenMultiWidth;
            delete reserve.basis.untenMultiWidth;
            delete reserve.basis.multiHeight;
            return reserve;
          });
        }
      }
    }, 100);
  }, [
    configuration.basis.material,
    configuration.basis.profile,
    configuration.basis.style,
    configuration.basis.type,
  ]);

  return (
    <>
      {currentGroup === 'basis' && <Stepper />}
      {currentGroup === 'basis' && (
        <div className={style.group}>
          <div className={style.config_wrapper}>
            {showDefaultProductHolders && (
              <>
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
                <div
                  className={style.config_wrapper_option_holders}
                  style={{ marginTop: 20 }}
                  id="profileHeights"
                >
                  {showProfileHeight &&
                    customProfileHeights?.map((item, index) => (
                      <OptionHolder
                        item={item}
                        selected={isSelected(item.name, 'profileHeight')}
                        action={() => updateConfiguration(item, 'profileHeight')}
                        key={index}
                      />
                    ))}
                </div>
              </>
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
