import React from 'react';
import styles from './LogInForm2.module.css'; // Import the CSS Module

const Login = () => {
  return (
    <div className={styles.container}> {/* Use the imported styles */}
      <div className={styles.heading}>Sign In</div>
      <form action="" className={styles.form}>
        <input required className={styles.input} type="email" name="email" id="email" placeholder="E-mail" />
        <input required className={styles.input} type="password" name="password" id="password" placeholder="Password" />
        <span className={styles.forgotPassword}><a href="#">Forgot Password ?</a></span>
        <input className={styles.loginButton} type="submit" value="Sign In" />
      </form>
      <div className={styles.socialAccountContainer}>
        <span className={styles.title}>Or Sign in with</span>
        <div className={styles.socialAccounts}>
          <button className={`${styles.socialButton} ${styles.google}`}>
            <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512">
              {/* Google SVG Path */}
            </svg>
          </button>
          <button className={`${styles.socialButton} ${styles.apple}`}>
            <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
              {/* Apple SVG Path */}
            </svg>
          </button>
          <button className={`${styles.socialButton} ${styles.twitter}`}>
            <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              {/* Twitter SVG Path */}
            </svg>
          </button>
        </div>
      </div>
      <span className={styles.agreement}><a href="#">Learn user licence agreement</a></span>
    </div>
  );
}

export default Login;
