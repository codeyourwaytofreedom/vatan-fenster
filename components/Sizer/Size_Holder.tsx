import { SubStyle } from '@/types/Configurator';
import style from './Sizer.module.css';
import { StaticImageData } from 'next/image';
import ObenSizer from './oben/ObenSizeHolder';
import SingleSizer from './single/SingleSizeHolder';
import { useConfiguration } from '@/context/ConfigurationContext';
import { useState } from 'react';
import UntenSizer from './unten/UntenSizeHolder';

interface SizeHolderProps {
  sizeImage: StaticImageData;
  subStyle?: SubStyle;
  summary?: boolean;
}

export type SizeFeedback = {
  [key: number]: string[];
  height?: string[];
  oben?: string[];
  unten?: string[];
};
export default function Size_Holder({ sizeImage, subStyle, summary }: SizeHolderProps) {
  const { orderOfKeys } = useConfiguration();
  const image1 =
    orderOfKeys && subStyle ? subStyle[orderOfKeys[0] as keyof SubStyle]?.image : sizeImage;
  const image2 = orderOfKeys && subStyle ? subStyle[orderOfKeys[1] as keyof SubStyle]?.image : null;

  const displayedImageOne =
    orderOfKeys && orderOfKeys[0] === 'oben'
      ? image1
      : orderOfKeys && orderOfKeys[0] === 'unten'
        ? image2
        : sizeImage;
  const displayedImageTwo =
    orderOfKeys && orderOfKeys[0] === 'oben'
      ? image2
      : orderOfKeys && orderOfKeys[0] === 'unten'
        ? image1
        : sizeImage;

  const [sizeFeedback, setSizeFeedback] = useState<SizeFeedback>({});

  return (
    <div className={style.sizer}>
      {!orderOfKeys && (
        <SingleSizer displayedImageTwo={displayedImageTwo!} setSizeFeedback={setSizeFeedback} summary={summary} />
      )}
      {orderOfKeys && orderOfKeys[0] === 'oben' && (
        <ObenSizer
          displayedImageOne={displayedImageOne!}
          displayedImageTwo={displayedImageTwo!}
          setSizeFeedback={setSizeFeedback}
          summary={summary}
        />
      )}
      {orderOfKeys && orderOfKeys[0] === 'unten' && (
        <UntenSizer
          displayedImageOne={displayedImageOne!}
          displayedImageTwo={displayedImageTwo!}
          setSizeFeedback={setSizeFeedback}
          summary={summary}
        />
      )}

      <div
        className={style.errors}
        style={{ height: Object.values(sizeFeedback).flat().length * 20 }}
      >
        {Object.values(sizeFeedback)
          .flat()
          .map((m, i) => (
            <p
              key={i}
              style={{
                color: 'crimson',
                fontWeight: 'bold',
                fontSize: 'small',
              }}
            >
              &#x26A0; {m}
            </p>
          ))}
      </div>
    </div>
  );
}
