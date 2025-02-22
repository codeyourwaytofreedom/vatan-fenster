import { useEffect, useState } from 'react';
import { StaticImageData } from 'next/image';
import { GetStaticProps } from 'next';
import { steps } from '@/data/steps';
import { categoryItems, brands, windowStyles, subStyleOptions } from '@/data/configuration_options';
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
import { Config, Size, Step, Summary } from '@/types/Configurator';

import OptionHolder from '@/components/Product_Holder/Option_Holder';
import Feedback from '@/components/Feedback/Feedback';
import Stepper from '@/components/Stepper/Stepper';
import Sizer from '@/components/Sizer/Sizer';
import SummaryDisplayer from '@/components/Summary/Summary';
import Substyle_Stepper from '@/components/Substyle_Stepper/Substyle_Stepper';

export interface SubStyle {
  option: SelectionItem | null;
  oben: SelectionItem | null;
  unten: SelectionItem | null;
}
const initialConfiguration = {
  material: null,
  brand: null,
  profile: null,
  style: null,
  type: null,
  size: false,
};
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
  const [feedback, setFeedback] = useState<null | { key: string; text: string }>(null);
  const [orderDetailsReady, setOrderDetailsReady] = useState<boolean>(false);
  const [finishedSteps, setFinishedSteps] = useState<Summary[]>();
  const [currentStep, setStep] = useState<Step | null>(null);
  const visibleSection = categoryItems.find((cat) => cat.key === currentStep?.key);
  const [itemsToDisplay, setItemsToDisplay] = useState<SelectionItem[]>();
  const [size, setSize] = useState<Size | null>(null);
  const [substyle, setSubStyle] = useState<SubStyle>(initialSubstyle);

  const findSizeImage = () => {
    if (configuration.style) {
      const selectedStyle = windowStyles.find((sty) => sty.name === configuration['style']);
      const typesForSelectedStyle = selectedStyle?.children?.type;
      const selectedType = typesForSelectedStyle?.find((typ) => typ.name === configuration.type);
      return selectedType?.image;
    }
  };

  const showDefaultProductHolders =
    currentStep?.key !== 'size' &&
    !(
      ['Oberlicht', 'Unterlicht'].includes(configuration.style as string) &&
      currentStep?.key === 'type'
    );
  const showSubstyleStepper =
    configuration.style &&
    ['Oberlicht', 'Unterlicht'].includes(configuration.style) &&
    currentStep?.key === 'type';

  const moveNextStep = () => {
    const stepIndex = steps.findIndex((st) => st.key == currentStep?.key);
    const nextStep = steps[stepIndex + 1];
    if (nextStep && configuration[currentStep?.key as keyof Config]) {
      setTimeout(() => {
        setStep(nextStep);
      }, 300);
    }
  };

  const updateConfiguration = (
    key: keyof Config,
    value: Config[keyof Config],
    item: { name: string; image: StaticImageData }
  ) => {
    const valueChanged = value !== configuration[key];
    if (!valueChanged) {
      moveNextStep();
      return;
    }
    setConfiguration((prevConfig) => ({
      ...prevConfig,
      [key]: value,
    }));
    const stepAlreadyIn = finishedSteps?.some((step) => step.key === key);
    if (stepAlreadyIn) {
      const updatedSteps = finishedSteps?.filter((s) => s.key !== key);
      setFinishedSteps(() => [...(updatedSteps || []), { key, summaryItem: item }]);
    } else {
      setFinishedSteps((prevFinishedSteps) => [
        ...(prevFinishedSteps || []),
        { key, summaryItem: item },
      ]);
    }
  };

  // summary operations for size and substyles
  useEffect(() => {
    if (orderDetailsReady) {
      let nonDuplicateFinishedSteps = (finishedSteps || [])?.filter(
        (st) => !['type oben', 'type unten', 'size'].includes(st.key)
      );
      // when order is ready, add the size data to the summary
      const summaryItemSize = {
        key: 'size',
        summaryItem: {
          key: 'size',
          detail: size,
        },
      };
      if (substyle.option) {
        const obenKey = configuration.style === 'Oberlicht' ? 'oben' : 'unten';
        const untenKey = configuration.style === 'Unterlicht' ? 'oben' : 'unten';
        const summaryItemOben = {
          key: 'type oben',
          summaryItem: substyle[obenKey]!,
        };
        const summaryItemUnten = {
          key: 'type unten',
          summaryItem: substyle[untenKey]!,
        };
        nonDuplicateFinishedSteps = nonDuplicateFinishedSteps.filter((it) => it.key !== 'type');
        setFinishedSteps(() => [
          ...nonDuplicateFinishedSteps,
          summaryItemOben,
          summaryItemUnten,
          summaryItemSize,
        ]);
        return;
      }
      setFinishedSteps(() => [...nonDuplicateFinishedSteps, summaryItemSize]);
    }
  }, [orderDetailsReady]);

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

  // when substyles are complete, make style complete for configuration
  useEffect(() => {
    const allSubStylesComplete = Object.values(substyle).every((s) => Boolean(s));
    if (allSubStylesComplete) {
      //select type step
      const { oben, unten, option } = substyle;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { children, ...optionRest } = option as SelectionItem;
      setConfiguration((pr) => {
        return { ...pr, type: JSON.stringify({ unten, oben, optionRest }) };
      });
    } else {
      setSize(null);
    }
  }, [substyle]);

  // when substyle option changes, remove oben and unten
  useEffect(() => {
    if (substyle && substyle.option) {
      setConfiguration((pr) => {
        return { ...pr, type: null };
      });
      setSubStyle((pr) => {
        return { ...pr, oben: null, unten: null };
      });
    }
  }, [substyle.option]);

  // remove substyle selection if style changes from oberlicht/unterlicht
  useEffect(() => {
    if (substyle) {
      setSubStyle(initialSubstyle);
    }
  }, [configuration.style]);

  return (
    <div className={style.config}>
      <h1>Fenster-Konfigurator</h1>
      <Stepper
        steps={steps}
        setStep={setStep}
        setFeedback={setFeedback}
        orderDetailsReady={orderDetailsReady}
        currentStep={currentStep!}
        configuration={configuration}
      />

      <div className={style.config_wrapper}>
        <Feedback visible={Boolean(feedback)}>
          {feedback?.key === 'step-warning' && (
            <p>
              Bitte wählen Sie zuerst die <span style={{ color: 'crimson' }}>{feedback.text}</span>{' '}
              aus.
            </p>
          )}
        </Feedback>
        {showDefaultProductHolders && (
          <div className={style.config_wrapper_option_holders}>
            {itemsToDisplay?.map((item, index) => (
              <OptionHolder
                name={item.name}
                image={item.image}
                imageAlt={item.name}
                selected={configuration[currentStep?.key as keyof Config] === item.name}
                action={() =>
                  updateConfiguration(currentStep?.key as keyof Config, item.name, item)
                }
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
          />
        )}

        <Sizer
          size={size}
          configuration={configuration}
          currentStep={currentStep!}
          setConfiguration={setConfiguration}
          setOrderDetailsReady={setOrderDetailsReady}
          setSize={setSize}
          substyle={substyle}
          sizeImage={findSizeImage()!}
        />

        {orderDetailsReady && <SummaryDisplayer finishedSteps={finishedSteps} />}
      </div>
    </div>
  );
}
