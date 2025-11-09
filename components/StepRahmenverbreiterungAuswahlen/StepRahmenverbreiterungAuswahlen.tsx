import Image from 'next/image';
import style from './StepRahmenverbreiterungAuswahlen.module.css';
import window from '@/assets/configurator/style/flugel2/2-Flügel.png';
import { useConfiguration } from '@/context/ConfigurationContext';
import { rahmenverbreiterungOptions } from '@/data/selectionItems/zusatze';
export default function StepRahmenverbreiterungAuswahlen() {
  const { configuration, setConfiguration } = useConfiguration();

  const opitons: { key: 'links' | 'rechts' | 'oben' | 'unten'; name: string }[] = [
    {
      key: 'links',
      name: 'Links',
    },
    {
      key: 'rechts',
      name: 'Rechts',
    },
    {
      key: 'oben',
      name: 'Oben',
    },
    {
      key: 'unten',
      name: 'Unten',
    },
  ];

  const handleSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
    key: 'links' | 'rechts' | 'oben' | 'unten'
  ) => {
    const rahmenverbreitungAuswahlen = configuration.zusatze.rahmenverbreiterungAuswahlen;
    rahmenverbreitungAuswahlen[key] = Number(e.target.value);
    setConfiguration((pr) => {
      return {
        ...pr,
        zusatze: {
          ...pr.zusatze,
          rahmenverbreiterungAuswahlen: rahmenverbreitungAuswahlen,
        },
      };
    });
  };

  return (
    <>
      <br />
      <h4 className={style.label}>Bitte auswählen:</h4>
      <br />
      <div className={style.container}>
        {opitons.map((option, index) => (
          <div className={style.frame_option} key={index}>
            <h3>{option.name}</h3>
            <div className={`${style[option.key]}`}>
              <Image src={window} width={200} height={200} alt={option.name} />
            </div>
            <select
              onChange={(e) => handleSelect(e, option.key)}
              value={configuration.zusatze.rahmenverbreiterungAuswahlen[option.key]}
            >
              {rahmenverbreiterungOptions.map((opt, ind) => (
                <option key={ind} value={parseInt(opt.key)}>
                  {opt.name} mm
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </>
  );
}
