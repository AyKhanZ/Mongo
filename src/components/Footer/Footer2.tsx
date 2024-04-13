import { useEffect } from 'react';
import styles from './Footer.module.css'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSquareFacebook as fb} from '@fortawesome/free-brands-svg-icons'
import {faInstagram as insta} from '@fortawesome/free-brands-svg-icons'
import {faLinkedin as linkedin} from '@fortawesome/free-brands-svg-icons'
import {faYoutube as youtube} from '@fortawesome/free-brands-svg-icons'
import {faWhatsapp as wa} from '@fortawesome/free-brands-svg-icons'

declare global {
  interface Window {
    google: any; // Declare 'google' namespace
    initMap: () => void; // Declare initMap function
  }
}

const Footer: React.FC = () => {
  useEffect(() => {
    if (!window.initMap) {
      window.initMap = () => {
        const position = { lat: 40.375766, lng: 49.832601 };
        const map = new window.google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: position
        });
        const marker = new window.google.maps.Marker({
          position,
          map,
          title: 'Uluru'
        });
      };
    }

    async function loadGoogleMaps() {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
        script.async = true;
        script.defer = true;
        window.document.body.appendChild(script);
      } else {
        window.initMap(); // Call initMap directly if the google object is already available
      }
    }

    loadGoogleMaps();
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.threeCols}>
        <div className={styles.contact}>
          <div>
            <h3>Контакты</h3>
            <p>+994555292966</p>
            <p>sales@b.az</p>
            <Image className={styles.qr} src="/qr.png" alt='qr-code' width={100} height={100} />
          </div>
        </div>
        <div>
          <div>
            <h3>Социальные сети</h3>
            <a><FontAwesomeIcon className="fa-brands fa-square-facebook" icon={fb} /> Facebook</a><br />
            <a><FontAwesomeIcon className="fa-brands fa-instagram" icon={insta} /> Instagram</a><br />
            <a><FontAwesomeIcon className="fa-brands fa-linkedin" icon={linkedin} /> Linkedin</a><br />
            <a><FontAwesomeIcon className="fa-brands fa-youtube" icon={youtube} /> Youtube</a><br />
            <a><FontAwesomeIcon className="fa-brands fa-whatsapp" icon={wa} /> Whatsapp</a>
          </div>
        </div>
        <div className="location">
          <h3>Локация</h3>
          <div id="map" style={{ width: '380px', height: '200px' }}></div>
          <p>Bakı şəh. Füzuli küç. 49 “Füzuli Residence” Biznes Mərkəzi</p>
        </div>
      </div>
      <p className={styles.copyright}>Copyright @ BAIM 2024 All rights reserved</p>
    </footer>
  );
};

export default Footer;
