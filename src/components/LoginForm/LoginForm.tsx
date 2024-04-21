import { useRouter } from 'next/router'
import styles from './LoginForm.module.css'
import Link from "next/link"

interface Props {
  kind: string
}

const LoginForm = ({kind}: Props) => {
  const router = useRouter()
  return (
 
    <div className={styles.form}>
      {
      kind=='login'
      ? 
      <>
        <h1 className={styles.heading}>Log In</h1>
        <input className={styles.input} placeholder='Email' type='text' name='name' />
        <input className={styles.input} placeholder='Password' type='password' name='desc' />
        <Link href='/forgetPassword' className={styles.forget}>Forgot password?</Link>
        <button className={styles.btn}>Log in</button>
      </>
      : 
      <>
        <h1 className={styles.heading}>Forget Password</h1>
        <input className={styles.input} placeholder='Email' type='text' name='name' />
        <input className={styles.input} placeholder='Password' type='password' name='name' />
        <input className={styles.input} placeholder='Confirm Password' type='password' name='desc' />
        <button onClick={() => router.push('/login')} className={styles.btn}>Log in</button>
      </>
      }
    </div>
  )
}

export default LoginForm