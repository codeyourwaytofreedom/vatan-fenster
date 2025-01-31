import Image, { StaticImageData } from 'next/image';
import { ChangeEventHandler } from 'react';
import style from "./Option_Holder.module.css";


type ProductHolderProps = {
    image: StaticImageData,
    name: string,
    imageAlt: string,
    selected: boolean,
    action: ChangeEventHandler<HTMLInputElement>
}
export default function OptionHolder({image, name, imageAlt, selected, action }: ProductHolderProps) {
    return (
        <div className={selected ? style.option_selected : style.option}>
            <label>
                <Image  src={image} alt={imageAlt} width={200} height={200} /> <br />
                <p>{name}</p><br />
                <input type="radio" name={name} onChange={action} checked={selected} />
                {
                    selected &&
                    <p id={style.check}>&#10003;</p>
                }
            </label>
        </div>
    );
}