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
  const updateSizeDouble = (e: React.ChangeEvent<HTMLInputElement>, property: 'w' | 'h') => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    console.log(value,property);
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

  const sizerOrder = {
    Oberlicht: ['oben', 'unten'],
    Unterlicht: ['unten', 'oben'],
  };
  return (
    <>
      {currentStep && currentStep.key === 'size' && !showDouble && (
        <Size_Holder size={size} sizeImage={sizeImage!} updateSize={updateSizeSingle} />
      )}

      {currentStep && currentStep.key === 'size' && showDouble && (
        <>
          {sizerOrder[configuration.style as keyof typeof sizerOrder].map((key, index) => (
            <Size_Holder
              key={index}
              size={size}
              sizeImage={substyle![key as keyof SubStyle]!.image!}
              updateSize={updateSizeDouble}
            />
          ))}
        </>
      )}
    </>
  );
}
