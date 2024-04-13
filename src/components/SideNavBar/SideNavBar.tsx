import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock as lock } from "@fortawesome/free-solid-svg-icons";
import { faUnlock as unlock } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase as bcase } from "@fortawesome/free-solid-svg-icons";
import { faUserTie as staff } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope as message } from "@fortawesome/free-solid-svg-icons";
import { faTasks as tasks } from "@fortawesome/free-solid-svg-icons";
import { faHandshake as hands } from "@fortawesome/free-solid-svg-icons";
import { faUsers as users } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper as news } from "@fortawesome/free-solid-svg-icons";
import { faDolly as dolly } from "@fortawesome/free-solid-svg-icons";
import { faGear as settings } from "@fortawesome/free-solid-svg-icons";
import styles from "./SideNavBar.module.css";

const SideNavBar = () => {
  const [isSidebarLocked, setIsSidebarLocked] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    typeof window !== "undefined" && window.innerWidth >= 800
  );

  const toggleLock = () => {
    setIsSidebarLocked(!isSidebarLocked);
  };

  const handleMouseLeave = () => {
    if (!isSidebarLocked) {
      setIsSidebarOpen(false);
    }
  };

  const handleMouseEnter = () => {
    if (!isSidebarLocked) {
      setIsSidebarOpen(true);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav
      className={`${styles.sidebar} ${isSidebarOpen ? "" : styles.close} ${
        isSidebarLocked ? styles.locked : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`${styles.logo_items} `}>
        <button
          id="lock-icon"
          className={styles.lock_icon}
          onClick={toggleLock}
        >
          {isSidebarLocked ? (
            <>
              <FontAwesomeIcon
                icon={lock}
                className={`${styles.fa_solid} ${styles.fa_bars} ${styles.bx} ${styles.bx_lock_alt}`}
              />
              <span className={styles.logo_title}>Закрепить</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={unlock}
                className={`${styles.fa_solid} ${styles.fa_bars} ${styles.bx} ${styles.bx_lock_open_alt}`}
              />
              <span className={styles.logo_title}>Закрепить</span>
            </>
          )}
        </button>
      </div>
      <div className={styles.menu_container}>
        <div className={styles.menu_items}>
          <ul className={styles.menu_item}>
            <div className={`${styles.menu_title} ${styles.flex}`}>
              <span className={styles.title}>
                <Link className={styles.link} href="/sideNav">
                  <FontAwesomeIcon
                    icon={bcase}
                    className={`${styles.fa_solid} ${styles.fa_bars} ${styles.bx} ${styles.bx_lock_alt}`}
                  />
                  <span className={styles.name}>Главная</span>
                </Link>
              </span>
              <span className={styles.ico}>
                <FontAwesomeIcon
                  icon={bcase}
                  className={`${styles.fa_solid} ${styles.fa_bars} ${styles.bx} ${styles.bx_lock_alt}`}
                />
              </span>
            </div>
            <div className={`${styles.menu_title} ${styles.flex}`}>
              <span className={styles.title}>
                <Link className={styles.link} href="/manageProducts">
                  <FontAwesomeIcon
                    icon={dolly}
                    className={`${styles.fa_solid} ${styles.fa_bars} ${styles.bx} ${styles.bx_lock_alt}`}
                  />
                  <span className={styles.name}>Продукты</span>
                </Link>
              </span>
              <span className={styles.ico}>
                <FontAwesomeIcon
                  icon={dolly}
                  className={`${styles.fa_solid} ${styles.fa_bars} ${styles.bx} ${styles.bx_lock_alt}`}
                />
              </span>
            </div>
            <div className={`${styles.menu_title} ${styles.flex}`}>
              <span className={styles.title}>
                <Link className={styles.link} href="#">
                  <FontAwesomeIcon
                    icon={lock}
                    className={`${styles.fa_solid} ${styles.fa_bars} ${styles.bx} ${styles.bx_lock_alt}`}
                  />
                  <span className={styles.name}>Сервисы</span>
                </Link>
              </span>
              <span className={styles.ico}>
                <FontAwesomeIcon
                  icon={lock}
                  className={`${styles.fa_solid} ${styles.fa_bars} ${styles.bx} ${styles.bx_lock_alt}`}
                />
              </span>
            </div>
            <div className={`${styles.menu_title} ${styles.flex}`}>
              <span className={styles.title}>
                <Link className={styles.link} href="/managePartners">
                  <FontAwesomeIcon
                    icon={hands}
                    className={`${styles.fa_solid} ${styles.fa_bars} ${styles.bx} ${styles.bx_lock_alt}`}
                  />
                  <span className={styles.name}>Партнеры</span>
                </Link>
              </span>
              <span className={styles.ico}>
                <FontAwesomeIcon
                  icon={hands}
                  className={`${styles.fa_solid} ${styles.fa_bars} ${styles.bx} ${styles.bx_lock_alt}`}
                />
              </span>
            </div>
            <div className={`${styles.menu_title} ${styles.flex}`}>
              <span className={styles.title}>
                <Link className={styles.link} href="/manageNews">
                  <FontAwesomeIcon
                    icon={news}
                    className={`${styles.fa_solid} ${styles.fa_bars} ${styles.bx} ${styles.bx_lock_alt}`}
                  />
                  <span className={styles.name}>Новости</span>
                </Link>
              </span>
              <span className={styles.ico}>
                <FontAwesomeIcon
                  icon={news}
                  className={`${styles.fa_solid} ${styles.fa_bars} ${styles.bx} ${styles.bx_lock_alt}`}
                />
              </span>
            </div>
            <div className={`${styles.menu_title} ${styles.flex}`}>
              <span className={styles.title}>
                <Link className={styles.link} href="/manageNews">
                  <FontAwesomeIcon
                    icon={staff}
                    className={`${styles.fa_solid} ${styles.fa_bars} ${styles.bx} ${styles.bx_lock_alt}`}
                  />
                  <span className={styles.name}>Наш коллектив</span>
                </Link>
              </span>
              <span className={styles.ico}>
                <FontAwesomeIcon
                  icon={staff}
                  className={`${styles.fa_solid} ${styles.fa_bars} ${styles.bx} ${styles.bx_lock_alt}`}
                />
              </span>
            </div>
            <div className={`${styles.menu_title} ${styles.flex}`}>
              <span className={styles.title}>
                <Link className={styles.link} href="/manageNews">
                  <FontAwesomeIcon
                    icon={users}
                    className={`${styles.fa_solid} ${styles.fa_bars} ${styles.bx} ${styles.bx_lock_alt}`}
                  />
                  <span className={styles.name}>Пользователи</span>
                </Link>
              </span>
              <span className={styles.ico}>
                <FontAwesomeIcon
                  icon={users}
                  className={`${styles.fa_solid} ${styles.fa_bars} ${styles.bx} ${styles.bx_lock_alt}`}
                />
              </span>
            </div>
            <div className={`${styles.menu_title} ${styles.flex}`}>
              <span className={styles.title}>
                <Link className={styles.link} href="#">
                  <FontAwesomeIcon
                    icon={tasks}
                    className={`${styles.fa_solid} ${styles.fa_bars} ${styles.bx} ${styles.bx_lock_alt}`}
                  />
                  <span className={styles.name}>Проекты</span>
                </Link>
              </span>
              <span className={styles.ico}>
                <FontAwesomeIcon
                  icon={tasks}
                  className={`${styles.fa_solid} ${styles.fa_bars} ${styles.bx} ${styles.bx_lock_alt}`}
                />
              </span>
            </div>
            <div className={`${styles.menu_title} ${styles.flex}`}>
              <span className={styles.title}>
                <Link className={styles.link} href="#">
                  <FontAwesomeIcon
                    icon={settings}
                    className={`${styles.fa_solid} ${styles.fa_bars} ${styles.bx} ${styles.bx_lock_alt}`}
                  />
                  <span className={styles.name}>Настройки</span>
                </Link>
              </span>
              <span className={styles.ico}>
                <FontAwesomeIcon
                  icon={settings}
                  className={`${styles.fa_solid} ${styles.fa_bars} ${styles.bx} ${styles.bx_lock_alt}`}
                />
              </span>
            </div>
          </ul>
        </div>

        {/* <div className={`${styles.sidebar_profile} ${styles.flex}`}>
          <span className={styles.nav_image}>
            <img src="images/profile.jpg" alt="logo_img" />
          </span>
          <div className={styles.data_text}>
            <span className={styles.name}>Mukul</span>
            <span className={styles.email}>viral@gmail.com</span>
          </div>
        </div> */}
      </div>
    </nav>
  );
};

export default SideNavBar;
