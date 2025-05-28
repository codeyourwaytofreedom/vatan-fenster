import Image from 'next/image';
import style from './Kastenart.module.css';
import kastenart from '@/assets/common/kasten.png';
import { useOrderDetailsReady } from '@/context/OrderDetailsContext';
import { useState } from 'react';

export default function Kastenart() {
  const { size } = useOrderDetailsReady();
  const options = [137, 165, 185, 205];
  const [coverHeight, setCoverheight] = useState<number>(options[0]);
  const frameSideWidth = 53;
  const innerWidth = Number(size?.w) - 2*frameSideWidth;

  const handleSelectHeight = (o: number) => {
    setCoverheight(o);
  }

  return (
    <div className={style.kasten}>
      <div className={style.figure}>
        <Image src={kastenart} width={400} height={400} alt="kastenart" />
        <div className={style.top}>{coverHeight} mm</div>
        <div className={style.bottom}>
            <div className={style.inner_layer}>
                <div></div>
                <div>{innerWidth} mm</div>
                <div></div>
            </div>
            <div className={style.outer_layer}>
                <div></div>
                <div>{size?.w} mm</div>
                <div></div>
            </div>
        </div>
        <div className={style.right}>
          <span>{Number(size?.h) + coverHeight} mm</span>
        </div>
      </div>
      <div className={style.height}>
        <h3>Kastenhöhe</h3>
        {options.map((o) => (
          <button className={o === coverHeight ? style.selected_option : style.option } onClick={()=>handleSelectHeight(o)} key={o}>{o}mm</button>
        ))}
      </div>
    </div>
  );
}
