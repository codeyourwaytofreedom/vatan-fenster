import { Config, Size, Step } from '@/types/Configurator';
import style from '../.././styles/KonfiguratorPage.module.css';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import { useEffect } from 'react';

interface SizerProps {
  size: Size | null;
  configuration: Config;
  currentStep: Step | null;
  sizeImage: StaticImageData;
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
  setConfiguration,
  setOrderDetailsReady,
}: SizerProps) {
  const updateSize = (e: React.ChangeEvent<HTMLInputElement>, property: 'w' | 'h') => {
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
  return (
    <>
      {currentStep && currentStep.key === 'size' && (
        <div className={style.config_wrapper_sizer}>
          <div id={style.left}>
            <h1>Stückzahl und Größe </h1>
            <h3>Achtung Wichtig! - Das Angegebene Maß ist das Fensterrahmen Außenmaß.</h3>
            <div id={style.entries}>
              <label>Fensterbreite (in MM) min ne oalcak?</label>
              <input
                type="number"
                onChange={(e) => updateSize(e, 'w')}
                value={size?.w}
                placeholder="Bitte geben Sie die Fensterbreite ein..."
              />{' '}
              <br />
              <label>Fensterhöhe (in MM) min ne oalcak?</label>
              <input
                type="number"
                onChange={(e) => updateSize(e, 'h')}
                value={size?.h}
                placeholder="Bitte geben Sie die Fensterhöhe ein..."
              />
            </div>
          </div>
          <div id={style.right}>
            <Image src={sizeImage!} alt="brand" width={300} height={300} />
          </div>
        </div>
      )}
    </>
  );
}
