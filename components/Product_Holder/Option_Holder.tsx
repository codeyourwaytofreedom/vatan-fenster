import Image from 'next/image';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import style from './Option_Holder.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { SelectionItem } from '@/data/configuration_options';

type ProductHolderProps = {
  item: SelectionItem;
  selected: boolean;
  action: MouseEventHandler<HTMLDivElement>;
};
export default function OptionHolder({ item, selected, action }: ProductHolderProps) {
  const [showInfo, setShowInfo] = useState(false);
  const infoRef = useRef<HTMLDivElement | null>(null);

  const toggleInfo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent div click
    setShowInfo((prev) => !prev);
  };

  // Close the info box when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
        setShowInfo(false);
      }
    };

    if (showInfo) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showInfo]);
  return (
    <div
      className={selected ? style.option_selected : style.option}
      onClick={action}
      onBlur={() => setShowInfo(false)}
    >
      <button onClick={toggleInfo}>
        <FontAwesomeIcon beat icon={faInfo} />
      </button>
      <label>
        <Image src={item.image} alt={item.name} width={220} height={220} /> <br />
        <p>{item.name}</p>
        <br />
        {selected && <p id={style.check}>&#10003;</p>}
      </label>
      {showInfo && (
        <div ref={infoRef} id={style.infobox}>
          {item.name} details go here...
        </div>
      )}
    </div>
  );
}
