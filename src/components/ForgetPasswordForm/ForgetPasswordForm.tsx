import { useRouter } from "next/router";
import styles from "./ForgetPasswordForm.module.css";
import Link from "next/link";
import {useEffect, useState} from "react";
import { User } from "@/types";
import {useAuth} from "@/context/AuthContext";


const ForgetPasswordForm = () => {
    const [user, setUser] = useState<User>();
    const[status,setStatus] = useState("")

    const fetchData = async () => {
        try {
            const response = await fetch("https://localhost:7164/Authentication/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: user?.email }),
            })
            const data = await response.json();
            if (!response.ok) {
                // Если ответ сервера не 'ok', используем HTTP статус код
                setStatus(response.status.toString());
            } else {
                // Используем статус из тела ответа, если ответ 'ok'
                setStatus(data.status);
            }
        }
        catch(err:any){
            console.error(err);
            setStatus("400");
        }
    };

    return (
        <div className={styles.form}>
            <p className={styles.title}>Forget password</p>
            <p className={styles.messageText}>Please enter your email to search for your account.</p>
            <label >
                <input required placeholder="" type="email" className={styles.input}
                       onChange={(e) => setUser((prevUser:any) => ({ ...prevUser, email: e.target.value }))}/>
                <span>Email</span>
            </label>
            {
                status===""?<></>:
                <div className={status === "400" ? styles.errorContainer : styles.successContainer}>
                    <p className={status === "400" ? styles.hiddenTextError : styles.hiddenTextSuccess}>
                        {status === "400" ? "No search results" : `We send a link to: ${user?.email}`}
                    </p>
                </div>
            }
            <button onClick={fetchData} className={styles.submit}>Search</button>
            <p className={styles.link}><Link href="/login">Back</Link></p>
        </div>
    );
};

export default ForgetPasswordForm;
