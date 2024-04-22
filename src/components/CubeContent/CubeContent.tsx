import Link from "next/link"
import styles from "./CubeContent.module.css"
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

const CubeContent = ({service}: any) => {
  return (
    <div className={`${styles.content} ${nunito.className}`}>
      <h2 className={styles.heading}>{service}</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <button className={styles.link} >Подробнее</button>
    </div> 
  )
}

export default CubeContent