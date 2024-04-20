import { useRouter } from "next/router";
import styles from "./LoginForm.module.css";
import Link from "next/link";
import { useState } from "react";
import { User } from "@/types";
import {useAuth} from "@/context/AuthContext";


const LoginForm = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const { token, setToken, isTokenExpired ,userData,setUserData} = useAuth();

  const fetchData = async () => {
    const loginData = {
      email: user?.email,
      password: user?.password,
      rememberMe: true,
    };

    try {
      const response = await fetch("https://localhost:7164/Authentication/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
      const data = await response.json();
      console.log(data)
      setToken(data.token)
      setUserData(data.user)
      router.push("/registerUser")
    }
    catch(err:any){
      console.error(err)
    }
  };

  return (
      <form className={styles.form}>
                <p className={styles.title}>Sign in </p>
          <label >
              <input required placeholder="" type="email" className={styles.input}
                     onChange={(e) => setUser((prevUser:any) => ({ ...prevUser, email: e.target.value }))}/>
                  <span>Email</span>
          </label>

          <label >
              <input required placeholder="" type="password" className={styles.input}
                     onChange={(e) => setUser((prevUser:any) => ({ ...prevUser, password: e.target.value }))}/>
                  <span>Password</span>
          </label>
            <button onClick={fetchData} className={styles.submit}>Submit</button>
            <p className={styles.link}><Link href="/forgetPassword">Forgot password?</Link></p>
      </form>
  );
};
export default LoginForm;