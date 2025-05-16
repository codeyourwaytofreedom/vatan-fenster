import Image from 'next/image';
import { MouseEventHandler } from 'react';
import style from './Option_Holder.module.css';
import { useConfiguration } from '@/context/ConfigurationContext';
import { SelectionItem } from '@/types/Configurator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';
import { useModal } from '@/context/ModalContext';

type ProductHolderProps = {
  item: SelectionItem;
  selected: boolean;
  action: MouseEventHandler<HTMLDivElement>;
};

export default function OptionHolder({ item, selected, action }: ProductHolderProps) {
/*   const [zoomedImage, setZoomededImage] = useState<string | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null); */

/*   const handleZoomPhoto = () => {
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

  const isZoomed = item.zoomable && item.name === zoomedImage; */

  const { currentStep } = useConfiguration();
  const { openModal } = useModal();

  const withHoverZoom = currentStep && currentStep.withHoverZoom;
  const withoutDetails = currentStep && currentStep.withoutDetails;

  const cardClass = (() => {
    if (selected) {
      if (withHoverZoom) {
        return style.option_selected_withzoom;
      }
      return style.option_selected;
    }
    if (!selected) {
      if (withHoverZoom) {
        return style.option_withzoom;
      }
      return style.option;
    }
  })();

  const handleShowFullSize = () => {
    openModal(<Image className={style.glow} src={item.image} alt={item.name} width={500} height={500} />);
  }

  return (
    <div className={style.outer} /* onMouseLeave={handleBlur} */>
{/*       {isZoomed && (
        <div className={style.huge}>
          <Image src={item.image} alt={item.name} width={250} height={220} />
        </div>
      )} */}
      {
        item.zoomable &&
        <span className={style.expand} onClick={handleShowFullSize}>
          <FontAwesomeIcon size='xl' color='whitesmoke' beat icon={faUpRightAndDownLeftFromCenter}/>
        </span>
      }
      <div
        style={{ pointerEvents: item.disabled ? 'none' : 'all' }}
        className={cardClass}
        onClick={action}
      >
        <label>
          <div className={style.imageWrapper} /* onMouseEnter={handleZoomPhoto} */>
            <Image src={item.image} alt={item.name} width={250} height={220} />
          </div>
          {
            !withoutDetails &&
            <div id={style.details}>
              Keep up good work! Remember why you started!
            </div>
          }
          <p>{item.name}</p>
        </label>
      </div>
    </div>
  );
}
