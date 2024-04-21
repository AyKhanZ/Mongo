import Image from 'next/image'
import styles from './login.module.css'
import LoginForm from '@/components/LoginForm/LoginForm'

const Login = () => {
  return (
    <div className={styles.container}>
        <div className={styles.logoTitle}>
            <Image className={styles.miniImage} width={200} height={200} alt='BAIM logo' src='/logo.svg' />
            <h1 className={styles.heading}>BAIM</h1>
        </div>
        {/* <div className={styles.logoTitle}>
            <Image className={styles.bigImage} width={200} height={200} alt='BAIM logo' src='/logo.svg' />
        </div>  */}
        <div className={styles.login}>
        <LoginForm kind='login' />
        </div>
    </div>
  )
}

export default Login