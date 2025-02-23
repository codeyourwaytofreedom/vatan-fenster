import { Size } from '@/types/Configurator';
import style from './Sizer.module.css';
import Image, { StaticImageData } from 'next/image';
import { SubStyle } from '@/pages/konfigurator';

interface SizeHolderProps {
  size?: Size | null;
  sizeImage: StaticImageData;
  orderOfKeys?: string[];
  subStyle?: SubStyle;
  updateSize: (e: React.ChangeEvent<HTMLInputElement>, property: 'w' | 'h' | 'h_unten') => void;
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
        {!orderOfKeys && (
          <>
            <div className={style.container_big}>
              <div className={style.container_big_shell}>
                <Image src={displayedImageTwo!} alt="brand" width={230} height={230} />
              </div>
              <div id={style.right_line}>
                <span>{size?.h}</span>
              </div>
            </div>
            <div id={style.bottom_line}>
              <span>{size?.w}</span>
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
                  min={1000}
                  max={1700}
                  placeholder="breite"
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
                  min={500}
                  max={800}
                  placeholder="höhe"
                />
              </div>
            </div>
          </>
        )}
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
        {orderOfKeys && orderOfKeys[0] === 'unten' && (
          <>
            <div className={style.container_small}>
              <div className={style.container_small_shell}>
                <Image src={displayedImageOne!} alt="brand" width={230} height={230} />
              </div>
              <div id={style.right_line}>
                <span>{size?.h_unten}</span>
              </div>
            </div>
            <div className={style.container_big}>
              <div className={style.container_big_shell}>
                <Image src={displayedImageTwo!} alt="brand" width={230} height={230} />
              </div>
              <div id={style.right_line}>
                <span>{size?.h}</span>
              </div>
            </div>
            <div id={style.bottom_line}>
              <span>{size?.w}</span>
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
                  <span>Height Unten</span> <span id={style.range}>(500-800)</span>
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
                  <span>Height Oben</span> <span id={style.range}>(1000-1700)</span>
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
      </div>
    </div>
  );
}
