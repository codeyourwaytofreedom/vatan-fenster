import Image, { StaticImageData } from 'next/image';
import { ChangeEventHandler } from 'react';
import style from "./Option_Holder.module.css";


type ProductHolderProps = {
    image: StaticImageData,
    name: string,
    imageAlt: string,
    selected?: boolean,
    action: ChangeEventHandler<HTMLInputElement>,
    mini?: boolean
}
export default function OptionHolder({image, name, imageAlt, selected,mini, action }: ProductHolderProps) {
    return (
        <div className={selected ? style.option_selected : style.option} id={mini ? style.mini : ''}>
            <label>
                <Image  src={image} alt={imageAlt} width={220} height={220} /> <br />
                <p>{name}</p><br />
                {
                    !mini && 
                    <input type="radio" name={name} onChange={action} checked={selected} />
                }
                {
                    selected && !mini &&
                    <p id={style.check}>&#10003;</p>
                }
            </label>
        </div>
    );
}