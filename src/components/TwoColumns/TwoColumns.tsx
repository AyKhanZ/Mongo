import styles from './TwoColumns.module.css'
import Image from 'next/image'

const TwoColumns = () => {
  return (
    <div className={styles.textAndImg}>
        <div className="a fade-left">
            <div className={styles.text}>
                <h2>Отправь налоговый отчет прямо из 1С</h2>
                <p>При отправке налогового отчета вам потребуется лишь ввести ID Asan IMZA. Остальное программа сделает все за вас</p>
            </div>
        </div>
        <div className="a fade-right">
            <Image className={styles.img} width={500} height={300} alt='1c' src='/1c.png' />
        </div>
    </div>
  )
}

export default TwoColumns