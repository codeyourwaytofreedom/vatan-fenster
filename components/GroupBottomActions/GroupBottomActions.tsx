import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './GroupBottomActions.module.css';

interface ActionsProps {
  expandable: boolean;
  isLastStep: boolean;
  expandAction: () => void;
  nextGroupAction: () => void;
}
export default function GroupBottomActions({
  expandable,
  isLastStep,
  expandAction,
  nextGroupAction,
}: ActionsProps) {
  return (
    <div className={style.bottom_actions}>
      {expandable && (
        <button className={style.show_more} onClick={expandAction}>
          <span>
            <FontAwesomeIcon icon={faPlus} size={'1x'} beat /> &nbsp; Alle anzeigen
          </span>
        </button>
      )}
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
