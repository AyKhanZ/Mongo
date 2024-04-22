import styles from './NumberIncrement.module.css';
import NumberIncrement from './NumberIncrement'

const NumbersIncrement = () => {
  return (
    <div className={styles.numbers}>
        <NumberIncrement num={128} title="Проекты"></NumberIncrement>
        <NumberIncrement num={51} title="Сотрудники"></NumberIncrement>
        <NumberIncrement num={22} title="Партнеры"></NumberIncrement>
        <NumberIncrement num={81} title="Клиенты"></NumberIncrement>
    </div>
  )
}

export default NumbersIncrement