import NavMenu from "../NavMenu/NavMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone as phone } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass as magnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser as user } from "@fortawesome/free-solid-svg-icons";
import { faBars as bars } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import styles from "./ErrorPage.module.css";
import Link from "next/link";

const Error = () => {
  return (
    <div className={styles.container}>
      <div className={styles.a}>
        <header className="topHeader"></header>

        <div>
          <div className={styles.starsec}></div>
          <div className={styles.starthird}></div>
          <div className={styles.starfourth}></div>
          <div className={styles.starfifth}></div>
        </div>

        <div className={styles.lamp__wrap}>
          <div className={styles.lamp}>
            <div className={styles.cable}></div>
            <div className={styles.cover}></div>
            <div className={styles.inCover}>
              <div className={styles.bulb}></div>
            </div>
            <div className={styles.light}></div>
          </div>
        </div>
        <section className={styles.error}>
          <div className={styles.error__content}>
            <div className={styles.error__message}>
              <h1 className={styles.message__title}>Страница не найдена</h1>
              <p className={styles.message__text}>
                К сожалению, страница, которую вы искали, не найдена. Возможно,
                ссылка, по которой вы перешли, повреждена или больше не
                существует. Пожалуйста, попробуйте еще раз или загляните на наш
                сайт.
              </p>
            </div>
            <div className={styles.error__nav}>
              <Link href="/" className={styles.eNav__link}></Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Error;
