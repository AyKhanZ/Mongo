import { useRouter } from "next/router";
import styles from "./ResetPasswordForm.module.css";
import {useEffect, useState} from "react";
import { User } from "@/types";

const ResetPasswordForm = () => {
    const router = useRouter();
    const [user, setUser] = useState<User>();
    const [messageText, setMessageText] = useState("");
    const [pswd,pswdSet] = useState("")
    const [confirmPswd,confirmPswdSet] = useState("")

    function evaluatePasswordStrength(password: string): string {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

        if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && password.length >= 12) return "Strong";
        else if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && password.length >= 6) return "Norm";
        else return "Easy";
    }

    useEffect(() => {
        setMessageText(evaluatePasswordStrength(pswd));

    }, [pswd,confirmPswd]);

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
            router.push("/registerUser")
        }
        catch(err:any){
            console.error(err)
        }
    };

    return (
        <form className={styles.form}>
            <p className={styles.title}>Reset password</p>
            <p className={styles.messageText}>Create new strong password!</p>
            <label >
                <input required placeholder="" type="password" className={styles.input}
                       onChange={(e) => pswdSet(e.target.value)}/>
                <span>New password</span>
            </label>

            <label >
                <input required placeholder="" type="password" className={styles.input}
                       onChange={(e) => confirmPswdSet(e.target.value)}/>
                <span>Confirm new password</span>
            </label>
            {

            }

            <button onClick={fetchData} className={styles.submit}>Create new password   </button>
        </form>
    );
};

export default ResetPasswordForm;
