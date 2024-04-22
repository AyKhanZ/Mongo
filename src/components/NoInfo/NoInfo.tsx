import styles from './NoInfo.module.css'

const NoInfo = () => { 
  return (
    <div className={styles.containerNone}>
      <p className={styles.noProductsText}>{`Loading or there's no this article  ƪ(˘⌣˘)ʃ`}</p>
    </div>
  )
}

export default NoInfo