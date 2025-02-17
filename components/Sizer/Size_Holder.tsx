import { Size } from '@/types/Configurator';
import style from './Sizer.module.css';
import Image, { StaticImageData } from 'next/image';
import { SubStyle } from '@/pages/konfigurator';

interface SizeHolderProps {
  size?: Size | null;
  sizeImage: StaticImageData;
  orderOfKeys?: string[];
  subStyle?: SubStyle;
  updateSize: (e: React.ChangeEvent<HTMLInputElement>, property: 'w' | 'h', key?: string) => void;
}

export default function Size_Holder({
  size,
  sizeImage,
  orderOfKeys,
  subStyle,
  updateSize,
}: SizeHolderProps) {
  const image1 =
    orderOfKeys && subStyle ? subStyle[orderOfKeys[0] as keyof SubStyle]?.image : sizeImage;
  const image2 = orderOfKeys && subStyle ? subStyle[orderOfKeys[1] as keyof SubStyle]?.image : null;
  return (
    <div className={style.config_wrapper_sizer}>
      <div id={style.left}>
        <h2>Stückzahl und Größe </h2>
        <h4>Achtung Wichtig! - Das Angegebene Maß ist das Fensterrahmen Außenmaß.</h4>
        <div id={style.entries}>
          <label>Fensterbreite (in MM) min ne oalcak?</label>
          <input
            type="number"
            onChange={(e) => updateSize(e, 'w')}
            value={size?.w}
            placeholder="Bitte geben Sie die Fensterbreite ein..."
          />
          <br />
          <label>Fensterhöhe (in MM) min ne oalcak?</label>
          <input
            type="number"
            onChange={(e) => updateSize(e, 'h')}
            value={size?.h}
            placeholder="Bitte geben Sie die Fensterhöhe ein..."
          />
          {image2 && (
            <>
              <br />
              <label>Fensterhöhe (in MM) min ne oalcak?</label>
              <input
                type="number"
                onChange={(e) => updateSize(e, 'h')}
                value={size?.h}
                placeholder="Bitte geben Sie die Fensterhöhe ein..."
              />
            </>
          )}
        </div>
      </div>
      <div
        id={
          orderOfKeys && orderOfKeys[0] === 'unten'
            ? style.untenoben
            : orderOfKeys && orderOfKeys[0] === 'oben'
              ? style.obenunten
              : ''
        }
      >
        <div id={style.right}>
          <span id={style.first_image}>
            <Image src={image1!} alt="brand" width={300} height={300} />
            <span id={style.top_line}>
              <span>{size?.w}</span>
            </span>
            <span id={style.right_line}>
              <span>{size?.h}</span>
            </span>
          </span>
        </div>
        {image2 && (
          <div id={style.right}>
            <span id={style.second_image}>
              <Image src={image2} alt="brand" width={300} height={300} />
              <span id={style.right_line}>
                <span>{size?.h}</span>
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
