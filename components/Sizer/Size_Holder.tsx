import { Size } from '@/types/Configurator';
import style from './Sizer.module.css';
import Image, { StaticImageData } from 'next/image';

interface SizeHolderProps {
  size?: Size | null;
  sizeImage: StaticImageData;
  updateSize: (e: React.ChangeEvent<HTMLInputElement>, property: 'w' | 'h') => void;
}

export default function Size_Holder({ size, sizeImage, updateSize }: SizeHolderProps) {
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
        <span id={style.top_line}>
          <span>{size?.w}</span>
        </span>
        <span id={style.right_line}>
          <span>{size?.h}</span>
        </span>
      </div>
    </div>
  );
}
