import Image from 'next/image'
import styles from './ResetPassword.module.css'
import ResetPasswordForm from "@/components/ResetPasswordForm/ResetPasswordForm";

const ResetPassword = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logoTitle}>
                <Image className={styles.miniImage} width={200} height={200} alt='BAIM logo' src='/logo.svg' />
                <h1 className={styles.heading}>BAIM</h1>
            </div>
            {/* <div className={styles.logoTitle}>
            <Image className={styles.bigImage} width={200} height={200} alt='BAIM logo' src='/logo.svg' />
        </div> */}
            <div className={styles.login}>
                <ResetPasswordForm/>
            </div>
        </div>
    )
}

export default ResetPassword