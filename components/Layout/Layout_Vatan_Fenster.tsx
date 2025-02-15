import { ReactNode } from 'react';
import PageBanner from '../Page_Banner/Page_Banner';
import style from './Layout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneVolume, faLocationDot } from '@fortawesome/free-solid-svg-icons';

type LayoutProps = {
  children: ReactNode;
};

export default function Template({ children }: LayoutProps) {
  return (
    <>
      <PageBanner />
      <div className={style.wrapper}>
        <main>{children}</main>
      </div>
      <footer id={style.footer}>
        <div>
          <FontAwesomeIcon icon={faPhoneVolume} size={'2x'} color="gold" shake />
          <h3>06898 90 27 385</h3>
        </div>
        <div>
          <FontAwesomeIcon icon={faLocationDot} size={'2x'} color="gold" />
          <h3>Völklingen-DE</h3>
        </div>
      </footer>
    </>
  );
}
