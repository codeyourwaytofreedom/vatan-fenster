import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments as faCommentsRegular } from '@fortawesome/free-regular-svg-icons';
import { useModal } from '@/context/ModalContext';

type InfoboxProps = {
  title: string;
  details: string;
  closeText: string;
};

export default function Infobox({ title, details, closeText }: InfoboxProps) {
  const detailsCss: React.CSSProperties = {
    maxWidth: 500,
    width: '90vw',
    minHeight: 200,
    padding: 20,
    paddingTop: 70,
    display: 'grid',
    justifyItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgb(225, 222, 222)',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 0 10px 3px whitesmoke',
  };
  const h3Css: React.CSSProperties = {
    backgroundColor: 'var(--color-1)',
    position: 'absolute',
    height: '70px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'salmon',
    fontWeight: 400,
  };
  const buttonCss: React.CSSProperties = {
    marginLeft: 'auto',
    border: 'none',
    padding: '5px 10px',
    backgroundColor: 'var(--color-1)',
    color: 'white',
  };

  const { closeModal } = useModal();
  return (
    <div style={detailsCss}>
      <h3 style={h3Css}>
        <FontAwesomeIcon icon={faCommentsRegular} color="salmon" size="xl" />
        <span style={{ marginLeft: 20 }}>{title}</span>
      </h3>
      <br />
      <p>{details}</p>
      <button onClick={closeModal} style={buttonCss}>
        {closeText}
      </button>
    </div>
  );
}
