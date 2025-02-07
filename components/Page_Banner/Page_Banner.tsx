import Image from 'next/image';
import styles from './PageBanner.module.css';
import logo from '../../assets/logo.webp';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faContactCard, faImage, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';

export default function PageBanner() {
    const items = useRef<HTMLDivElement>(null);
    return (
        <div style={styles} className={styles.banner}>
            <div className={styles.logo}>
               <Link href={'/'}> <Image src={logo} alt="LOL" width={210} height={53} /></Link>
            </div>
            <div className={styles.banner_actions}>
                <FontAwesomeIcon icon={faBars} size={'2x'} id={styles.menu} />
                <div id={styles.items} ref={items}>
                    <Link href={'/'}>
                        <FontAwesomeIcon icon={faContactCard} size={'2x'} />
                        <h5>Kontakt</h5>
                    </Link>
                    <Link href={'/'}>
                        <FontAwesomeIcon icon={faImage} size={'2x'} />
                        <h5>Galerie</h5>
                    </Link>
                    <Link href={'/'}>
                        <FontAwesomeIcon icon={faQuestion} size={'2x'} beat />
                        <h5>Vatan</h5>
                    </Link>
                </div>
            </div>
        </div>
    );
}