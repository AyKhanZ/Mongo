import NumbersIncrement from '../NumbersIncrement/NumbersIncrement'
import styles from './PositionRelative.module.css'

const PositionRelative = ({children}: any) => {
  return (
    <div className={styles.relative}>
      {children}
    </div>
  )
}

export default PositionRelative