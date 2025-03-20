import Image from 'next/image';
import { MouseEventHandler, useState } from 'react';
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

  const [zoomedImage, setZoomededImage] = useState<string | null>(null);
  const handleZoomPhoto = (item: SelectionItem) => {
    if(item.zoomable){
      setTimeout(() => {
        setZoomededImage(item.name);
      }, 300);
    }
  }
  const handleBlur = () => {
    setZoomededImage(()=>null);
  }
  return (
    <div
      className={selected ? style.option_selected : style.option}
      onClick={action}
    >
      <label>
        <Image onMouseEnter={()=>handleZoomPhoto(item)} src={item.image} alt={item.name} width={250} height={220} /> <br />
        {
          item.zoomable && item.name === zoomedImage+'8788' &&
          <Image onMouseLeave={handleBlur} id={style.zoomed} src={item.image} alt={item.name} width={250*1.5} height={220*1.5} /> 
        }
        <div id={style.details}></div>
        <p>{item.name}</p>
      </label>
    </div>
  );
}
