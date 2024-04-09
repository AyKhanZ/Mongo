import SideNavBar from "../SideNavBar/SideNavBar";
import type { AppProps } from "next/app";
import styles from "./SideBarLayout.module.css";

interface Props {
  children: AppProps;
}

const SideBarLayout = ({ children }: any) => {
  return (
    <>
      <SideNavBar />
      <div className={styles.container}>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};

export default SideBarLayout;
