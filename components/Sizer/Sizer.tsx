import { SubStyle } from '@/types/Configurator';
import { StaticImageData } from 'next/image';
import { useEffect } from 'react';
import Size_Holder from './Size_Holder';
import { useOrderDetailsReady } from '@/context/OrderDetailsContext';
import { useConfiguration } from '@/context/ConfigurationContext';

interface SizerProps {
  sizeImage: StaticImageData;
  substyle?: SubStyle;
  summary?: boolean;
}

export default function Sizer({ sizeImage, substyle, summary }: SizerProps) {
  const { setOrderDetailsReady } = useOrderDetailsReady();
  const { setConfiguration } = useConfiguration();
  const { size } = useOrderDetailsReady();

  // check if size is ready
  // if so, it means steps are complete, so move to summary
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const sizeComplete = !!(size?.w && size?.h);

    if (sizeComplete) {
      timeoutId = setTimeout(() => {
        setOrderDetailsReady(true);
        setConfiguration((pr) => {
          return { ...pr, size: size };
        });
      }, 100);
    } else {
      setOrderDetailsReady(false);
      setConfiguration((pr) => {
        return { ...pr, size: false };
      });
    }

    return () => clearTimeout(timeoutId);
  }, [size]);

  return (
    <>
      <Size_Holder subStyle={substyle} sizeImage={sizeImage!} summary={summary} />
    </>
  );
}
