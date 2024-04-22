import styles from './Footer.module.css'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSquareFacebook as fb} from '@fortawesome/free-brands-svg-icons'
import {faInstagram as insta} from '@fortawesome/free-brands-svg-icons'
import {faLinkedin as linkedin} from '@fortawesome/free-brands-svg-icons'
import {faYoutube as youtube} from '@fortawesome/free-brands-svg-icons'
import {faWhatsapp as wa} from '@fortawesome/free-brands-svg-icons'
  
const Footer: React.FC = () => {

  return ( 
    <footer className={styles.footer}>
      <div className={styles.threeCols}>
        <div className={styles.contact}>
          <div>
            <h3 className={styles.heading}>Контакты</h3>
            <p>+994555292966</p>
            <p>sales@b.az</p>
            <Image className={styles.qr} src="/qr.png" alt='qr-code' width={100} height={100} />
          </div>
        </div> 
        <div>
          <div>
            <h3 className={styles.heading}>Социальные сети</h3>
            <a><FontAwesomeIcon className="fa-brands fa-square-facebook" icon={fb} /> Facebook</a><br />
            <a><FontAwesomeIcon className="fa-brands fa-instagram" icon={insta} /> Instagram</a><br />
            <a><FontAwesomeIcon className="fa-brands fa-linkedin" icon={linkedin} /> Linkedin</a><br />
            <a><FontAwesomeIcon className="fa-brands fa-youtube" icon={youtube} /> Youtube</a><br />
            <a><FontAwesomeIcon className="fa-brands fa-whatsapp" icon={wa} /> Whatsapp</a>
          </div>
        </div>
        <div className="location">
          <h3 className={styles.heading}>Локация</h3>
          
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.414045302207!2d49.83577337669961!3d40.37751517144599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307db46e22ccf7%3A0x1fa58f8951240bd6!2sFizuli%20residence!5e0!3m2!1sen!2saz!4v1713116436074!5m2!1sen!2saz" 
            width="400" 
            height="250" 
            style={{border:0}} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <p className={styles.p}>Bakı şəh. Füzuli küç. 49 “Füzuli Residence” Biznes Mərkəzi</p>
        </div>
      </div>
      <p className={styles.copyright}>Copyright @ BAIM 2024 All rights reserved</p>
    </footer>
  ); 
};

export default Footer;
