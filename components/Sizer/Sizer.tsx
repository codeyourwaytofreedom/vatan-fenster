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
  setSize: React.Dispatch<React.SetStateAction<Size | null>>;
  setOrderDetailsReady: React.Dispatch<React.SetStateAction<boolean>>;
  setConfiguration: React.Dispatch<React.SetStateAction<Config>>;
}

export default function Sizer({
  size,
  sizeImage,
  configuration,
  currentStep,
  setSize,
  substyle,
  setConfiguration,
  setOrderDetailsReady,
}: SizerProps) {
  const showDouble = ['Oberlicht', 'Unterlicht'].includes(configuration.style as string);

  const updateSizeSingle = (e: React.ChangeEvent<HTMLInputElement>, property: 'w' | 'h') => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    setSize((prevSize) => ({
      ...(prevSize || { w: undefined, h: undefined }),
      [property]: value,
    }));
  };
  const updateSizeDouble = (
    e: React.ChangeEvent<HTMLInputElement>,
    property: 'w' | 'h',
    key?: string
  ) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    console.log(value, property, key);
  };

  // check if size is ready
  // if so, it means steps are complete, so move to summary
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (size?.w && size.h) {
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

  // if fesnterart changes, restart selection for type and size
  useEffect(() => {
    if (Boolean(configuration.type)) {
      setConfiguration((prevConfig) => ({
        ...prevConfig,
        type: null,
        size: false,
      }));
      setSize(null);
    }
  }, [configuration.style]);

  const orderOfKeys =
    configuration.style === 'Oberlicht'
      ? ['oben', 'unten']
      : configuration.style === 'Unterlicht'
        ? ['unten', 'oben']
        : undefined;

  return (
    <>
      {currentStep && currentStep.key === 'size' && (
        <Size_Holder
          orderOfKeys={orderOfKeys}
          subStyle={substyle}
          size={size}
          sizeImage={sizeImage!}
          updateSize={showDouble ? updateSizeDouble : updateSizeSingle}
        />
      )}
    </>
  );
}
