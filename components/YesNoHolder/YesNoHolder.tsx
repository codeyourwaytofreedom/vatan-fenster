import style from './YesNo.module.css';

interface YesNoProps {
  stepKey: string;
  yesS: string[],
  setYesS: React.Dispatch<React.SetStateAction<string[]>>;    
}

export default function YesNoHolder({stepKey, yesS, setYesS}: YesNoProps) {
    const handleJa = () => {
        if(!yesS.includes(stepKey)){
          setYesS([...yesS, stepKey]);
        }
    }
    const handleNein = () => {
      if(yesS.includes(stepKey)){
        setYesS(yesS.filter((y)=> y !== stepKey));
      }
  }
  return (
    <div className={style.yesno}>
      <button className={!yesS.includes(stepKey) ?  style.selected : ''} onClick={handleNein}>NEIN</button>
      <button className={yesS.includes(stepKey) ?  style.selected : ''} onClick={handleJa}>JA</button>
    </div>
  );
}
