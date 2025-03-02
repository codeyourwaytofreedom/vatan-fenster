import { Config, Size, Step } from '@/types/Configurator';
import { StaticImageData } from 'next/image';
import { useEffect } from 'react';
import { SubStyle } from '@/pages/konfigurator';
import Size_Holder from './Size_Holder';

interface SizerProps {
  size: Size | null;
  configuration: Config;
  sizeImage: StaticImageData;
  substyle?: SubStyle;
  currentStep: Step;
  setOrderDetailsReady: React.Dispatch<React.SetStateAction<boolean>>;
  setConfiguration: React.Dispatch<React.SetStateAction<Config>>;
}

export default function SizerSummary({
  size,
  sizeImage,
  configuration,
  substyle,
  setConfiguration,
  setOrderDetailsReady,
}: SizerProps) {
  // check if size is ready
  // if so, it means steps are complete, so move to summary
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const sizeComplete = ['Oberlicht', 'Unterlicht'].includes(configuration.style as string)
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
    configuration.style === 'Oberlicht'
      ? ['oben', 'unten']
      : configuration.style === 'Unterlicht'
        ? ['unten', 'oben']
        : undefined;

  return (
    <>
      <Size_Holder
        orderOfKeys={orderOfKeys}
        subStyle={substyle}
        size={size}
        sizeImage={sizeImage!}
      />
    </>
  );
}
