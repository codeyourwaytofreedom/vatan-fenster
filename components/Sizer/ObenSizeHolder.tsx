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
  const { orderOfKeys, configuration } = useConfiguration();
  const obenSectionNumber = (configuration.type as SubStyle).oben?.sectionNumber ?? 1;
  const untenSectionNumber = (configuration.type as SubStyle).unten?.sectionNumber ?? 1;

  console.log('obenSectionNumber', obenSectionNumber);
  console.log('untenSectionNumber', untenSectionNumber);

  return (
    <>
      {orderOfKeys && orderOfKeys[0] === 'oben' && (
        <>
          <div className={style.container_small}>
            <div className={style.container_small_shell}>
              <Image src={displayedImageOne!} alt="brand" width={230} height={230} />
            </div>
            <div id={style.right_line}>
              <span>{size?.h}</span>
            </div>
          </div>
          <div className={style.container_big}>
            <div className={style.container_big_shell}>
              <Image src={displayedImageTwo!} alt="brand" width={230} height={230} />
            </div>
            <div id={style.right_line}>
              <span>{size?.h_unten}</span>
            </div>
          </div>
          <div id={style.bottom_line}>
            <span>{size?.w} </span>
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
              />
            </div>
            <div id={style.input_line}>
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
            <div id={style.input_line}>
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
          </div>
        </>
      )}
    </>
  );
}
