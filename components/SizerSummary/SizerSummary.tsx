import { Config, Size, Step, SubStyle } from '@/types/Configurator';
import { useEffect } from 'react';
import Size_Holder from './Size_Holder';
import { SelectionItem, windowStyles } from '@/data/configuration_options';

interface SizerProps {
  size: Size | null;
  configuration: Config;
  substyle?: SubStyle;
  currentStep: Step;
  setOrderDetailsReady: React.Dispatch<React.SetStateAction<boolean>>;
  setConfiguration: React.Dispatch<React.SetStateAction<Config>>;
}

export default function SizerSummary({
  size,
  configuration,
  substyle,
  setConfiguration,
  setOrderDetailsReady,
}: SizerProps) {
  // check if size is ready
  // if so, it means steps are complete, so move to summary
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const sizeComplete = ['Oberlicht', 'Unterlicht'].includes(configuration.style.name)
      ? !!(size?.w && size?.h && size?.h_unten)
      : !!(size?.w && size?.h);

    if (sizeComplete) {
      timeoutId = setTimeout(() => {
        setOrderDetailsReady(true);
        setConfiguration((pr) => {
          return { ...pr, size: true };
        });
      }, 1000);
    } else {
      setOrderDetailsReady(false);
      setConfiguration((pr) => {
        return { ...pr, size: false };
      });
    }

    return () => clearTimeout(timeoutId);
  }, [size]);

  const orderOfKeys =
    configuration.style.name === 'Oberlicht'
      ? ['oben', 'unten']
      : configuration.style.name === 'Unterlicht'
        ? ['unten', 'oben']
        : undefined;

  const findSizeImage = () => {
    const selectedStyle = windowStyles.find((sty) => sty.name === configuration['style'].name);
    const typesForSelectedStyle = selectedStyle?.children?.type;
    const selectedType = typesForSelectedStyle?.find((typ) => typ.name === (configuration.type as SelectionItem).name);
    return selectedType?.image;
  };
  return (
    <>
      <Size_Holder
        orderOfKeys={orderOfKeys}
        subStyle={substyle}
        size={size}
        sizeImage={findSizeImage()!}
      />
    </>
  );
}
