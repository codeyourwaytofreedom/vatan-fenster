import { faChevronDown, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './GroupBottomActions.module.css';

interface ActionsProps {
  expandable: boolean;
  isLastStep?: boolean;
  toggleExpand: () => void;
  nextGroupAction?: () => void;
  itemNumber: number;
}
export default function GroupBottomActions({
  expandable,
  isLastStep,
  toggleExpand,
  nextGroupAction,
  itemNumber
}: ActionsProps) {
  return (
    <div className={style.bottom_actions}>
      {
        itemNumber > 10 &&
        <button className={style.show_more} onClick={toggleExpand}>
          <span>
            <FontAwesomeIcon icon={expandable ? faPlus : faMinus} size={'1x'} beat /> &nbsp; {
              expandable ? 'Alle anzeigen' : 'Weniger anzeigen'
            }
          </span>
        </button>
      }
      {isLastStep && (
        <button onClick={nextGroupAction} className={style.next_group}>
          <span>
            <FontAwesomeIcon icon={faChevronDown} size={'1x'} beat /> &nbsp; Nächster Schritt
          </span>
        </button>
      )}
    </div>
  );
}
