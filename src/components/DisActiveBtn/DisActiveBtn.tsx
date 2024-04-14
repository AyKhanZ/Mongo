import styles from "./DisActiveBtn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock as close, faLockOpen as open } from "@fortawesome/free-solid-svg-icons";

interface Props {
    onClick: any;
    isActive:boolean;
}

const DisActiveBtn = ({ onClick,isActive }: Props) => {
     return (
         <button className={`${styles.Btn} ${isActive ? styles.activeBtn : styles.disActiveBtn}`} onClick={onClick}>
             {isActive?
                 <>
                    <div className={styles.sign}>
                        <FontAwesomeIcon icon={open} style={{ fontSize: 16 }} />
                    </div>
                    <div className={styles.text}>Active</div>
                </>
                 :
                 <>
                 <div className={styles.sign}>
                     <FontAwesomeIcon icon={close} style={{ fontSize: 16 }} />
                 </div>
                 <div className={styles.text}>Deactive</div>
                 </>
             }
         </button>
     );
};

export default DisActiveBtn;
