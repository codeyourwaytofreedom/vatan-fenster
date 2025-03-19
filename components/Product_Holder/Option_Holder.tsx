import Image from 'next/image';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import style from './Option_Holder.module.css';
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons'; */
import { SelectionItem } from '@/data/configuration_options';

type ProductHolderProps = {
  item: SelectionItem;
  selected: boolean;
  action: MouseEventHandler<HTMLDivElement>;
};
export default function OptionHolder({ item, selected, action }: ProductHolderProps) {
  const [showInfo, setShowInfo] = useState(false);
  const infoRef = useRef<HTMLDivElement | null>(null);

  // Close the info box when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
        setShowInfo(false);
      }
    };

    if (showInfo) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showInfo]);

  const [zoomedImage, setZoomededImage] = useState<string | null>(null);
  const handleZoomPhoto = (item: SelectionItem) => {
    if(item.zoomable){
      setTimeout(() => {
        setZoomededImage(item.name);
      }, 300);
    }
  }
  const handleBlur = () => {
    setZoomededImage(null);
  }
  return (
    <div
      className={selected ? style.option_selected : style.option}
      onClick={action}
      onBlur={() => setShowInfo(false)}
    >
      <label>
        <Image onMouseEnter={()=>handleZoomPhoto(item)} src={item.image} alt={item.name} width={250} height={220} /> <br />
        {
          item.zoomable && item.name === zoomedImage &&
          <Image onMouseLeave={handleBlur} id={style.zoomed} src={item.image} alt={item.name} width={250*1.3} height={220*1.3} /> 
        }
        <div id={style.details}></div>
        <p>{item.name}</p>
      </label>
      {showInfo && (
        <div ref={infoRef} id={style.infobox}>
          {item.name} details go here...
        </div>
      )}
    </div>
  );
}
