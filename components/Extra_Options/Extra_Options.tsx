import { ExtraConfig } from '@/types/Configurator';
import OptionHolder from '../Product_Holder/Option_Holder';
import style from './Extra.module.css';
import { SetStateAction } from 'react';
import { extraOptionsMock } from '@/data/configuration_options';

interface ExtraProps {
  extraConfig: ExtraConfig | null;
  setExtraConfig: React.Dispatch<SetStateAction<ExtraConfig | null>>;
}

export default function Extra_Options({ extraConfig, setExtraConfig }: ExtraProps) {
  const updateExtraConfig = (key: string, value: string) => {
    setExtraConfig((pr)=>{
        return {
            ...(pr || null),
            [key]: value
        }
    })
};
  return (
    <div className={style.extra}>
      {
        Object.keys(extraOptionsMock).map((k, index) => (
          <>
            <h2 key={index} id={(extraConfig || {})[k as keyof ExtraConfig] ? style.complete : style.notcomplete}>
              {k}
            </h2>
            <div className={style.extra_options_holder}>
              {extraOptionsMock[k as keyof ExtraConfig].map((item, index) => (
                <OptionHolder
                  name={item.name}
                  image={item.image}
                  imageAlt={item.name}
                  selected={false}
                  action={() => updateExtraConfig(k, item.name)}
                  key={index}
                />
              ))}
            </div>
            <br /><br />
          </>
        ))}
    </div>
  );
}
