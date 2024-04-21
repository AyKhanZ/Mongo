import styles from './Card.module.css'
import Image from 'next/image'

const Card = ({image}: any) => {
  return (
    <div className={styles.flip}>
        <div className={styles.front}>
           <Image className={styles.img} width={300} height={300} src={image} alt='logo' />
           <h1 className={styles.text}>Company name</h1>
           <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta tempore atque dolore quibusdam iure veniam? Tempora vero quod fuga et, maiores impedit corporis? Mollitia eveniet soluta maxime debitis minima obcaecati.</p>
        </div>
        <div className={styles.back}>
           <Image className={styles.imgMini} width={300} height={300} src={image} alt='logo' />
           <h2 className={styles.text}>Вид деятельности: вид деятельности</h2>
           <div className={styles.text}>
           <h2 className={styles.text}>Проекты:</h2>
           <ul className={styles.text}>
             <li className={styles.li}>Проект</li>
             <li className={styles.li}>Проект</li>
             <li className={styles.li}>Проект</li>
             <li className={styles.li}>Проект</li>
           </ul>
           </div>
           <p className={styles.text}>Начало сотрудничества: 12.08.23</p>
        </div>
    </div>
  )
}

export default Card