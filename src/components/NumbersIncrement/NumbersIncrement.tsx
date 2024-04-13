import styles from './NumberIncrement.module.css';
import NumberIncrement from './NumberIncrement'

const NumbersIncrement = () => {
  return (
    <div className={styles.numbers}>
        <NumberIncrement title="ПРОЕКТЫ"></NumberIncrement>
        <NumberIncrement title="СОТРУДНИКИ"></NumberIncrement>
        <NumberIncrement title="ПАРТНЕРЫ"></NumberIncrement>
        <NumberIncrement title="КЛИЕНТЫ"></NumberIncrement>

    </div>
  )
}

export default NumbersIncrement