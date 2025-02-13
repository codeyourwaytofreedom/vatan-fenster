import { SelectionItem } from "@/data/configuration_options";
import OptionHolder from "../Product_Holder/Option_Holder";
import style from '../.././styles/KonfiguratorPage.module.css';
import { SubStyle } from "@/pages/konfigurator";
import { ChangeEventHandler, useEffect, useRef } from "react";

type SubStyleProps = {
    configKey: string,
    title: string,
    items?: SelectionItem[],
    substyle: SubStyle,
    updateSubStyle: (key: string, item: SelectionItem) => ChangeEventHandler<HTMLInputElement> | void,
}
export default function Substyle_Section({ title, items, configKey, substyle, updateSubStyle}: SubStyleProps) {
    const complete = substyle[configKey as keyof typeof substyle];
    const anchorDiv = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        const allSubStylesComplete = Object.values(substyle).every((s)=> Boolean(s));
        if(anchorDiv.current && !allSubStylesComplete){
            anchorDiv.current.scrollIntoView({behavior: "smooth"});
        }
    },[substyle[configKey as keyof typeof substyle]])
    return (
        <>
        <div ref={anchorDiv}>
            <h2 id={complete ? style.complete : style.notcomplete}>
                {title}
            </h2>
            <div className={style.config_wrapper_option_holders}>
            {
            items?.map((item, index) =>
            <OptionHolder 
                name={item.name}
                image={item.image}
                imageAlt={item.name}
                selected={substyle[configKey as keyof typeof substyle]?.name === item.name}
                action={()=>updateSubStyle(configKey, item)}
                key={index} />
                )
            }
        </div>
        </div>
        </>
    );
}