import Image from 'next/image';
import style from './KastenartVorsatzraffstore.module.css';
import kastenart from '@/assets/common/blackcover.png';
import { useOrderDetailsReady } from '@/context/OrderDetailsContext';
import { useConfiguration } from '@/context/ConfigurationContext';
import { useEffect, useState } from 'react';
import { Size } from '@/types/Configurator';
import NumberInput from '../NumberInput/NumberInput';

export const kastenartVorsatzraffstoreSizeOptions = [240, 300];

export default function KastenartVorsatzraffstore() {
  const { size } = useOrderDetailsReady();
  const { configuration, setConfiguration } = useConfiguration();
  const coverHeight = configuration.kastenheight?.name || '';
  const existingKastenDimensions = configuration.kastenDimensions;
  const [kastenDimensions, setKastenDimentions] = useState<Size | null | undefined>(
    existingKastenDimensions ?? size
  );
  const [errors, setErrors] = useState<{ w?: string; h?: string }>();

  const width = Number(size?.w);
  const height = Number(size?.h);

  const valueValid = (v: number, key: 'w' | 'h') => v > (key === 'h' ? height - 1 : width - 1);

  const handleChangeDimension = (e: React.ChangeEvent<HTMLInputElement>, key: 'w' | 'h') => {
    const raw = e.target.value;

    const normalized = raw.length > 1 ? raw.replace(/^0+/, '') : raw;
    e.target.value = normalized;

    const value = Number(normalized);

    const valid = valueValid(value, key);
    if (!valid) {
      if (!errors || (errors && !errors[key])) {
        setErrors((pr) => {
          return {
            ...(pr || {}),
            [key]:
              key === 'h'
                ? 'Invalid height! Height must be bigger than window height'
                : 'Invalid width! Width must be bigger than window width',
          };
        });
      }
    }
    if (valid && errors && key in errors) {
      setErrors((pr) => {
        delete pr![key];
        return {
          ...pr,
        };
      });
    }

    setKastenDimentions((prev) => ({
      ...(prev || { w: 0, h: 0 }),
      [key]: value,
    }));
  };

  useEffect(() => {
    const hasErrors = errors && Object.keys(errors).length > 0;

    if (!hasErrors) {
      const timeout = setTimeout(() => {
        setConfiguration((prev) => ({
          ...prev,
          kastenDimensions,
        }));
      }, 300);
      return () => clearTimeout(timeout);
    } else {
      const partial: Partial<Size> = { ...kastenDimensions };

      Object.keys(errors).forEach((key) => {
        partial[key as keyof Size] = undefined;
      });

      setConfiguration((prev) => ({
        ...prev,
        kastenDimensions: partial as Size,
      }));
    }
  }, [errors]);

  return (
    <div className={style.kasten}>
      <div className={style.figure}>
        <Image src={kastenart} width={300} height={400} alt="kastenart" />
        <div className={style.top}>{coverHeight}</div>
        <div className={style.bottom}>
          <div className={style.outer_layer}>
            <div></div>
            <div>
              <NumberInput
                value={Number(kastenDimensions?.w)}
                onChange={(e) => handleChangeDimension(e, 'w')}
                width={55}
                rules={[(v) => v > width - 1]}
              />
              mm
            </div>
            <div></div>
          </div>
        </div>
        <div className={style.right}>
          <span>
            <NumberInput
              value={Number(kastenDimensions?.h)}
              onChange={(e) => handleChangeDimension(e, 'h')}
              width={55}
              rules={[(v) => v > height - 1]}
            />
            mm
          </span>
        </div>
      </div>
      <div className={style.errors} style={{ height: Object.keys(errors || {}).length * 25 }}>
        {errors &&
          Object.values(errors).map((e) => (
            <p key={e}>
              <span>&#9888;</span>
              {e}
            </p>
          ))}
      </div>
    </div>
  );
}
