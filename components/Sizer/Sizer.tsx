import { Size, SubStyle } from '@/types/Configurator';
import { StaticImageData } from 'next/image';
import { useEffect } from 'react';
import Size_Holder from './Size_Holder';
import { useOrderDetailsReady } from '@/context/OrderDetailsContext';
import { useConfiguration } from '@/context/ConfigurationContext';

interface SizerProps {
  size: Size | null;
  sizeImage: StaticImageData;
  substyle?: SubStyle;
  setSize: React.Dispatch<React.SetStateAction<Size | null>>;
}

export default function Sizer({ size, sizeImage, setSize, substyle }: SizerProps) {
  const { setOrderDetailsReady } = useOrderDetailsReady();
  const { configuration, setConfiguration } = useConfiguration();

  const updateSize = (e: React.ChangeEvent<HTMLInputElement>, property: 'w' | 'h' | 'h_unten') => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    setSize((prevSize) => ({
      ...(prevSize || { w: undefined, h: undefined }),
      [property]: value,
    }));
  };

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

  return (
    <>
      <Size_Holder
        orderOfKeys={orderOfKeys}
        subStyle={substyle}
        size={size}
        sizeImage={sizeImage!}
        updateSize={updateSize}
      />
    </>
  );
}
