import Image from 'next/image';
import { MouseEventHandler } from 'react';
import style from './Option_Holder.module.css';
import { useConfiguration } from '@/context/ConfigurationContext';
import { SelectionItem } from '@/types/Configurator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
import { useModal } from '@/context/ModalContext';
import { faComments as faCommentsRegular } from '@fortawesome/free-regular-svg-icons';

type ProductHolderProps = {
  item: SelectionItem;
  selected: boolean;
  action: MouseEventHandler<HTMLDivElement>;
};

export default function OptionHolder({ item, selected, action }: ProductHolderProps) {
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
    openModal(
      <div className={style.glow}>
        <Image src={item.image!} alt={item.name} width={500} height={500} />
        <p>{item.name}</p>
      </div>
    );
  };

  const handleShowItemDetails = () => {
    openModal(
      <div className={style.details}>
        <h3>
          <FontAwesomeIcon icon={faCommentsRegular} color="salmon" size="xl" />
          <span>{item.name}</span>
        </h3>
        <br />
        <p>{item?.details}</p>
      </div>
    );
  };

  return (
    <div className={style.outer}>
      {item.zoomable && item.image && (
        <span className={style.expand} onClick={handleShowFullSize}>
          <FontAwesomeIcon size="xl" color="whitesmoke" icon={faMagnifyingGlassPlus} />
        </span>
      )}
      {item.details && (
        <span className={style.info}>
          <FontAwesomeIcon
            color="salmon"
            style={{ cursor: 'pointer' }}
            onClick={handleShowItemDetails}
            beat
            icon={faInfoCircle}
            size="xl"
          />
        </span>
      )}
      <div
        style={{ pointerEvents: item.disabled ? 'none' : 'all' }}
        className={cardClass}
        onClick={action}
      >
        {item.image && <Image src={item.image} alt={item.name} width={220} height={220} />}
        {!withoutDetails && (
          <div id={style.details}>Keep up good work! Remember why you started!</div>
        )}
        <p /* style={{ border: minMaxSizesAvailableForType ? 'none' : '3px solid crimson' }} */>
          {item.name}
          {item.colorCode && <span>{item.colorCode}</span>}
        </p>
      </div>
      <Image
        style={{ display: 'none' }}
        src={item.image!}
        alt={item.name}
        width={500}
        height={500}
      />
    </div>
  );
}
