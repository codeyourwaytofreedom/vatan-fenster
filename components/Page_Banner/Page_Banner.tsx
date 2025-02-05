import Image from 'next/image';
import styles from './PageBanner.module.css';
import logo from '../../assets/logo.webp';
import whatsapp from '../../assets/banner/whatsapp.png';
import gallery from '../../assets/banner/gallery.png';
import who from '../../assets/banner/who.png';

export default function PageBanner() {
    return (
        <div style={styles} className={styles.banner}>
            <div className={styles.logo}>
                <Image src={logo} alt="LOL" width={210} height={53} />
            </div>
            <div className={styles.banner_actions}>
                <button>
                    <Image src={whatsapp} alt="LOL" width={25} height={25} />
                    Kontakt
                </button>
                <button>
                    <Image src={gallery} alt="LOL" width={25} height={25} />
                    Galerie
                </button>
                <button>
                    <Image src={who} alt="LOL" width={25} height={25} />
                    VATAN
                </button>
            </div>
        </div>
    );
}