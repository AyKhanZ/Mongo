import { useRouter } from "next/router";
import styles from "./LoginForm.module.css";
import Link from "next/link";
import React, { useState } from "react";
import { User } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { isBooleanObject } from "util/types";

const LoginForm = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const { token, setToken, isTokenExpired, userData, setUserData } = useAuth();
  const fetchData = async () => {
    const loginData = {
      email: user?.email,
      password: user?.password,
      rememberMe: true,
    };

    try {
      const response = await fetch(
        "https://localhost:7164/Authentication/Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        setIsConfirmed(true);
        return;
      }

      const data = await response.json();
      setToken(data.token);
      setUserData(data.user);

      if (data.user.emailConfirmed) {
        router.push("/dashboard");
        console.log("Email is confirmed");
      } else {
        setIsConfirmed(true);
        console.log("Email not confirmed");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className={styles.form}>
      <p className={styles.title}>Sign in </p>
      <label>
        <input
          required
          placeholder=""
          type="email"
          className={styles.input}
          onChange={(e) =>
            setUser((prevUser: any) => ({ ...prevUser, email: e.target.value }))
          }
        />
        <span>Email</span>
      </label>

      <label>
        <input
          required
          placeholder=""
          type="password"
          className={styles.input}
          onChange={(e) =>
            setUser((prevUser: any) => ({
              ...prevUser,
              password: e.target.value,
            }))
          }
        />
        <span>Password</span>
      </label>
      {isConfirmed && (
        <div className={styles.errorContainer}>
          <p className={styles.hiddenTextError}>
            Email is not confirmed or account does not exist. Please check your
            email and confirm email or send request for registration
          </p>
        </div>
      )}
      <button onClick={fetchData} className={styles.submit}>
        Submit
      </button>
      <p className={styles.link}>
        <Link href="/forgetPassword">Forgot password?</Link>
      </p>
      <p className={styles.link}>
        <Link href="/">Back</Link>
      </p>
    </div>
  );
};
export default LoginForm;
