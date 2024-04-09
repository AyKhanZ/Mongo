import styles from "./CreateBtn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil as pencil } from "@fortawesome/free-solid-svg-icons";

interface Props {
  title: string;
  symbol: any;
  onClick: any;
}

const CreateBtn = ({ title, symbol, onClick }: Props) => {
  const drawBtn = () => {
    if (title === "Create") {
      return (
        <button className={`${styles.Btn}  ${styles.create}`}>
          <div className={styles.sign}>+</div>
          <div className={styles.text}>{title}</div>
        </button>
      );
    } else if (title === "Edit") {
      return (
        <button className={`${styles.Btn}  ${styles.edit}`}>
          <div className={styles.sign}>
            <FontAwesomeIcon icon={symbol} style={{ fontSize: 16 }} />
          </div>
          <div className={styles.text}>{title}</div>
        </button>
      );
    } else if (title === "Delete") {
      return (
        <button className={`${styles.Btn}  ${styles.delete}`} onClick={onClick}>
          <div className={styles.sign}>
            <FontAwesomeIcon icon={symbol} style={{ fontSize: 16 }} />
          </div>
          <div className={styles.text}>{title}</div>
        </button>
      );
    }
  };

  return drawBtn();
};

export default CreateBtn;
