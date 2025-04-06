import Image, { StaticImageData } from 'next/image';
import style from './Sizer.module.css';
import { Size, SubStyle } from '@/types/Configurator';
import { useConfiguration } from '@/context/ConfigurationContext';

interface OberSizeProps {
  displayedImageOne: StaticImageData;
  displayedImageTwo: StaticImageData;
  size?: Size | null;
  updateSize: (e: React.ChangeEvent<HTMLInputElement>, property: 'w' | 'h' | 'h_unten') => void;
}

export default function ObenSizer({
  displayedImageOne,
  displayedImageTwo,
  size,
  updateSize,
}: OberSizeProps) {
  const { configuration } = useConfiguration();
  const obenSectionNumber = (configuration.type as SubStyle).oben?.sectionNumber ?? 1;
  const untenSectionNumber = (configuration.type as SubStyle).unten?.sectionNumber ?? 1;

  const minWidth = 500;
  const maxWidth = 1800;

  const widthInputHasProblems = () => {
    if (!size || !size.w) return true;
    return (size?.w as number) < minWidth || (size?.w as number) > maxWidth;
  };

  return (
    <>
      {obenSectionNumber > 1 && (
        <div className={style.multi_widths}>
          <div className={style.multi_widths_inputs}>
            {[...Array(obenSectionNumber)].map((it) => (
              <input type="number" key={it} />
            ))}
          </div>
        </div>
      )}
      <div id={style.central_holder}>
        <div className={style.container_small}>
          <div className={style.container_small_shell}>
            <Image src={displayedImageOne!} alt="brand" width={230} height={230} />
          </div>
        </div>
        <div className={style.container_big}>
          <div className={style.container_big_shell}>
            <Image src={displayedImageTwo!} alt="brand" width={230} height={230} />
          </div>
        </div>
        <div id={style.right_line} className={style.obenunten_rightline}></div>
      </div>
      {untenSectionNumber > 1 && (
        <div className={style.multi_widths}>
          <div className={style.multi_widths_inputs}>
            {[...Array(untenSectionNumber)].map((it) => (
              <input type="number" key={it} />
            ))}
          </div>
        </div>
      )}
      <div id={style.bottom_line}>
        <span id={style.bottom_width}>{size?.w} </span>
      </div>
      <div id={style.inputs}>
        <div id={style.input_line}>
          <h5>
            <span>Width</span> <span id={style.range}>(1000-1700)</span>
          </h5>
          <input
            type="number"
            onChange={(e) => updateSize(e, 'w')}
            value={size?.w}
            placeholder="breite"
            style={{ border: widthInputHasProblems() ? '2px solid crimson' : '1px solid silver' }}
          />
        </div>
      </div>
      <div id={style.height_oben}>
        <h5>
          <span>Height Oben</span> <span id={style.range}>(500-800)</span>
        </h5>
        <input
          type="number"
          onChange={(e) => updateSize(e, 'h')}
          value={size?.h}
          placeholder="höhe"
        />
      </div>
      <div id={style.height_unten}>
        <h5>
          <span>Height Unten</span> <span id={style.range}>(1000-1700)</span>
        </h5>
        <input
          type="number"
          onChange={(e) => updateSize(e, 'h_unten')}
          value={size?.h_unten}
          placeholder="höhe"
        />
      </div>
    </>
  );
}
