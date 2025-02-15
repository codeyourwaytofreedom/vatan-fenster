import Image, { StaticImageData } from 'next/image';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import style from './Option_Holder.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

type ProductHolderProps = {
  image: StaticImageData;
  name: string;
  imageAlt: string;
  selected: boolean;
  action: MouseEventHandler<HTMLDivElement>; // Correct type
};
export default function OptionHolder({
  image,
  name,
  imageAlt,
  selected,
  action,
}: ProductHolderProps) {
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
        <Image src={image} alt={imageAlt} width={220} height={220} /> <br />
        <p>{name}</p>
        <br />
        {selected && <p id={style.check}>&#10003;</p>}
      </label>
      {showInfo && (
        <div ref={infoRef} id={style.infobox}>
          {name} details go here...
        </div>
      )}
    </div>
  );
}
