import { useModal } from '@/context/ModalContext';
import style from './UniversalModal.module.css';

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
        {content}
      </div>
    </div>
  );
}
