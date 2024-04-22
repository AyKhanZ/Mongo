import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock as lock,
  faUnlock as unlock,
  faBriefcase as bcase,
  faUserTie as staff,
  faEnvelope as message,
  faRightFromBracket as logOut,
  faTasks as tasks,
  faHandshake as hands,
  faUsers as users,
  faNewspaper as news,
  faDolly as dolly,
  faGear as settings,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./SideNavBar.module.css";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

const SideNavBar = () => {
  const { userData, setUserData, token, setToken } = useAuth();
  const [isSidebarLocked, setIsSidebarLocked] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    typeof window !== "undefined" && window.innerWidth >= 800
  );
  const router = useRouter();

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

  const handleLogOut = () => {
    setUserData(null);
    setToken(null);
    router.push("/login");
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
                <Link className={styles.link} href="/dashboard">
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
            {userData &&
              (userData!.role == "Employer" || userData!.role == "Admin") && (
                <>
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
                      <Link className={styles.link} href="/manageUsers">
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
                </>
              )}
            {userData && userData.role == "Admin" && (
              <div className={`${styles.menu_title} ${styles.flex}`}>
                <span className={styles.title}>
                  <Link className={styles.link} href="/manageStaff">
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
            )}
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
                <Link className={styles.link} href="/account-settings">
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
            <div className={`${styles.menu_title} ${styles.flex}`}>
              <span className={styles.title}>
                <button
                  className={`${styles.link} ${styles.btn}`}
                  onClick={handleLogOut}
                >
                  <FontAwesomeIcon
                    icon={logOut}
                    className={`${styles.fa_solid} ${styles.fa_bars} ${styles.bx} ${styles.bx_lock_alt}`}
                  />
                  <span className={styles.name}>Выход</span>
                </button>
              </span>
              <span className={styles.ico}>
                <FontAwesomeIcon
                  icon={logOut}
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
