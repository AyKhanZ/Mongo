import styles from './News.module.css'
import Image from 'next/image'

const News = () => {
  return (
    <>
        <div className="a fade-left">
            <h2 className={styles.centeredHeading}>Новости</h2>
        </div>
        <div className={styles.twoHalves}>
            <div className="a fade-left">
                <section className="half">
                    <div className={styles.horizontal}>
                        <Image className={styles.circleImg} width={100} height={100} alt='1c' src='/nds.png' />
                        <div>
                            <h3>Автоматический зачет НДС</h3>
                            <p>Автоматический зачет НДС вводится на основании данных которые поставщик вбил в систему и так далее. Но при этом поставщик готов дать гарантии безо...</p>
                            <a className={styles.link} href="#">Читать далее </a>
                        </div>
                    </div>
                    <div className={styles.horizontal}>
                        <Image className={styles.circleImg} width={100} height={100} alt='1c' src='/money.png' />
                        <div>
                            <h3>Отражение зарплаты в финансовом учете</h3>
                            <p>Автоматический зачет НДС вводится на основании данных которые поставщик вбил в систему и так далее. Но при этом поставщик готов дать гарантии безо...</p>
                            <a className={styles.link} href="#">Читать далее </a>
                        </div>
                    </div>
                </section>
            </div>
            <div className="a fade-right">
                <section className={styles.half}>
                    <div className={styles.horizontal}>
                        <Image className={styles.circleImg} width={100} height={100} alt='1c' src='/doctor.png' />
                        <div>
                            <h3>Обязательное медицинское страхование</h3>
                            <p>Автоматический зачет НДС вводится на основании данных которые поставщик вбил в систему и так далее. Но при этом поставщик готов дать гарантии безо...</p>
                            <a className={styles.link} href="#">Читать далее </a>
                        </div>
                    </div>
                    <div className={styles.horizontal}>
                        <Image className={styles.circleImg} width={100} height={100} alt='1c' src='/cut.png' />
                        <div>
                            <h3>Новый расчет по налогу на прибыль</h3>
                            <p>Автоматический зачет НДС вводится на основании данных которые поставщик вбил в систему и так далее. Но при этом поставщик готов дать гарантии безо...</p>
                            <a className={styles.link} href="#">Читать далее </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </>
  )
}

export default News