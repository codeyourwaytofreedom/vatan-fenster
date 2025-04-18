import Image from 'next/image';
import { MouseEventHandler, useRef, useState } from 'react';
import style from './Option_Holder.module.css';
import { SelectionItem } from '@/data/configuration_options';

type ProductHolderProps = {
  item: SelectionItem;
  selected: boolean;
  action: MouseEventHandler<HTMLDivElement>;
};

export default function OptionHolder({ item, selected, action }: ProductHolderProps) {
  const [zoomedImage, setZoomededImage] = useState<string | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleZoomPhoto = () => {
    if (item.zoomable) {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
      hoverTimeout.current = setTimeout(() => {
        setZoomededImage(item.name);
      }, 300);
    }
  };

  const handleBlur = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setZoomededImage(null);
  };

  const isZoomed = item.zoomable && item.name === zoomedImage;

  return (
    <div className={style.outer}           onMouseLeave={handleBlur}
>
      {
        isZoomed &&
        <div className={style.huge}>
            <Image src={item.image} alt={item.name} width={250} height={220} />
        </div>
      }
    <div style={{pointerEvents: item.disabled ? 'none' : 'all'}} className={selected ? style.option_selected : style.option} onClick={action}>
      <label>
        <div
          className={style.imageWrapper}
          onMouseEnter={handleZoomPhoto}
        >
          <Image src={item.image} alt={item.name} width={250} height={220} />
        </div>
        <div id={style.details}></div>
        <p>{item.name}</p>
      </label>
    </div>
    </div>
  );
}
