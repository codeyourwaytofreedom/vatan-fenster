import { Size, SubStyle } from '@/types/Configurator';
import style from './Sizer.module.css';
import { StaticImageData } from 'next/image';
import ObenSizer from './ObenSizeHolder';
import UntenSizer from './UntenSizeHolder';
import SingleSizer from './SingleSizeHolder';
import { useConfiguration } from '@/context/ConfigurationContext';
import { useState } from 'react';

interface SizeHolderProps {
  size?: Size | null;
  sizeImage: StaticImageData;
  subStyle?: SubStyle;
  updateSize: (e: React.ChangeEvent<HTMLInputElement>, property: 'w' | 'h' | 'h_unten') => void;
}

export default function Size_Holder({ size, sizeImage, subStyle, updateSize }: SizeHolderProps) {
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

  const [sizeFeedback, setSizeFeedback] = useState<string[] | null>(null);
  

  return (
    <div className={style.config_wrapper_sizer}>
      <div
        className={style.container}
        id={
          orderOfKeys && orderOfKeys[0] === 'unten'
            ? style.untenoben
            : orderOfKeys && orderOfKeys[0] === 'oben'
              ? style.obenunten
              : style.default
        }
      >
        {!orderOfKeys && <SingleSizer displayedImageTwo={displayedImageTwo!} setSizeFeedback={setSizeFeedback} />}
        {orderOfKeys && orderOfKeys[0] === 'oben' && (
          <ObenSizer
            displayedImageOne={displayedImageOne!}
            displayedImageTwo={displayedImageTwo!}
            size={size}
            updateSize={updateSize}
          />
        )}
                {orderOfKeys && orderOfKeys[0] === 'unten' && (
        <UntenSizer
        displayedImageOne={displayedImageOne!}
        displayedImageTwo={displayedImageTwo!}
        size={size}
        updateSize={updateSize}
      />
        )}
      </div>
      <div className={style.errors} style={{height: (sizeFeedback || []).length*20}}>
      {
          sizeFeedback &&
          sizeFeedback.map((m,i) =>
          <p key={i} style={{ color: 'crimson', fontWeight: 'bold', fontSize: 'small' }}>&#x26A0; {m}</p>
        )
      }
      </div>
    </div>
  );
}
