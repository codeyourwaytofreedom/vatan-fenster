import { farbenOptions, fenstergriffeOptions, SelectionItem } from '@/data/configuration_options';
import OptionHolder from '../Product_Holder/Option_Holder';
import style from './Fenstergriffe.module.css';
import { useConfiguration } from '@/context/ConfigurationContext';
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'; */

export default function Fenstergriffe() {
  const { configuration, setConfiguration } = useConfiguration();
  const handleOptions = farbenOptions.fenstergriffe;
  const subHandleOptions =
    fenstergriffeOptions[configuration.fenstergriffe?.type.key as keyof SelectionItem];

  const handleSelectHandleGroup = (item: SelectionItem) => {
    setConfiguration((pr) => {
      return { ...pr, fenstergriffe: { type: item, choice: fenstergriffeOptions[item.key][0] } };
    });
  };

  const handleSelectHandleType = (item: SelectionItem) => {
    setConfiguration((pr) => {
      return { ...pr, fenstergriffe: { type: configuration.fenstergriffe!.type, choice: item } };
    });
  };

  return (
    <>
      <div className={style.option_holders}>
        {handleOptions.map((item, key) => (
          <OptionHolder
            key={key}
            selected={configuration.fenstergriffe?.type.key === item.key}
            action={() => handleSelectHandleGroup(item)}
            item={item}
          />
        ))}
      </div>
      <br />
      <div className={style.option_holders}>
        {subHandleOptions.map((item, key) => (
          <OptionHolder
            key={key}
            selected={configuration.fenstergriffe?.choice.key === item.key}
            action={() => handleSelectHandleType(item)}
            item={item}
          />
        ))}
      </div>
{/*       <div id={style.bottom_actions}>
            <button id={style.show_more} onClick={()=>alert(999)}>
              <span>
                <FontAwesomeIcon icon={faPlus} size={'1x'} beat /> &nbsp; Alle anzeigen
              </span>
            </button>
        </div> */}
    </>
  );
}
