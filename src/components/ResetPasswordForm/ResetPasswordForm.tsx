import { useRouter } from "next/router";
import styles from "./ResetPasswordForm.module.css";
import Link from "next/link";
import { useState } from "react";
import { User } from "@/types";
import {useAuth} from "@/context/AuthContext";

interface Props {
}
const ResetPasswordForm = () => {
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
        <div className={styles.form}>
            <h1 className={styles.heading}>Reset your password</h1>
            <input
                className={styles.input}
                placeholder="New password"
                type="password"
                name="name"
            />
            <input
                className={styles.input}
                placeholder="Confirm new password"
                type="password"
                name="desc"
            />
            <button onClick={() => router.push("/login")} className={styles.btn}>
                Log in
            </button>
        </div>
    );
};

export default ResetPasswordForm;
