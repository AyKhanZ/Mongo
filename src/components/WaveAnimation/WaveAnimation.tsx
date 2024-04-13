import styles from './WaveAnimarion.module.css'

const WaveAnimation = () => {
  return (
    <div className={styles.box}>
        <div className={`${styles.w} ${styles.one}`}></div>
        <div className={`${styles.w} ${styles.two}`}></div>
        <div className={`${styles.w} ${styles.three}`}></div>
    </div>
  )
}

export default WaveAnimation