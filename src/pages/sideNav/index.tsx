import SideNavBar from "@/components/SideNavBar/SideNavBar"
import styles from './sideNav.module.css'

const sideNav = () => {
  return (
    <div className={styles.body}>
        <SideNavBar />
    </div>
  )
}

export default sideNav