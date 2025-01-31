import Image from 'next/image';
import styles from './PageBanner.module.css';
import logo from '../../assets/banner/window2.png';
import whatsapp from '../../assets/banner/whatsapp.png';
import gallery from '../../assets/banner/gallery.png';
import who from '../../assets/banner/who.png';

export default function PageBanner() {
    return (
        <div style={styles} className={styles.banner}>
            <div className={styles.logo}>
                <Image src={logo} alt="LOL" width={60} height={60} />
                <div className={styles.logo_company_name}>
                    <h1>VATAN</h1>
                    <h2>fenster</h2>
                </div>
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