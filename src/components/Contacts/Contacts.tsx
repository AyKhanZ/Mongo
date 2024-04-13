import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSquareFacebook as fb} from '@fortawesome/free-brands-svg-icons'
import {faInstagram as insta} from '@fortawesome/free-brands-svg-icons'
import {faLinkedin as linkedin} from '@fortawesome/free-brands-svg-icons'
import {faYoutube as youtube} from '@fortawesome/free-brands-svg-icons'
import {faWhatsapp as wa} from '@fortawesome/free-brands-svg-icons'

const Contacts = () => {
  return (
    <>
        <a><FontAwesomeIcon icon={fb} /> Facebook</a><br />
            <a><FontAwesomeIcon icon={insta} /> Instagram</a><br />
            <a><FontAwesomeIcon  icon={linkedin} /> Linkedin</a><br />
            <a><FontAwesomeIcon icon={youtube} /> Youtube</a><br />
            <a><FontAwesomeIcon  icon={wa} /> Whatsapp</a>
    </>
  )
}

export default Contacts