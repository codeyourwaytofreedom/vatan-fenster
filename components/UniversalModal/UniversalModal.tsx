import { useModal } from '@/context/ModalContext';
import style from './UniversalModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

export default function UniversalModal() {
  const { isModalOpen, closeModal, content } = useModal();
  if (!isModalOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={style.modal} onClick={handleBackgroundClick}>
      <div className={style.shell}>
        <div className={style.header}>
          <button onClick={closeModal} className={style.close}>
            <FontAwesomeIcon color="yellow" className={style.close} icon={faClose} size="3x" />
          </button>
        </div>
        {content}
      </div>
    </div>
  );
}
