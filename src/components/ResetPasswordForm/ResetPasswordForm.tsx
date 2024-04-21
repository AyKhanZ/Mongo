import { useRouter } from "next/router";
import styles from "./ResetPasswordForm.module.css";
import React, { useEffect, useState } from "react";
import { User } from "@/types";
import Image from 'next/image';
const ResetPasswordForm = () => {
    const router = useRouter();
    const [user, setUser] = useState<User>();
    const [messageText, setMessageText] = useState("");
    const [finalMessage, setFinalMessage] = useState("");
    const [pswd, pswdSet] = useState("");
    const [confirmPswd, confirmPswdSet] = useState("");
    const [isInputTouched, setIsInputTouched] = useState(false);
    const [passwordMatchMessage, setPasswordMatchMessage] = useState("");

    const { token, email } = router.query;

    function evaluatePasswordStrength(password: string): string {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

        if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && password.length >= 12) return "Strong";
        else if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && password.length >= 6) return "Norm";
        else return "Easy password";
    }

    useEffect(() => {
        if (confirmPswd) {
            setIsInputTouched(true);
            if (pswd === confirmPswd) {
                setPasswordMatchMessage("Passwords match");
            } else {
                setPasswordMatchMessage("Passwords do not match");
            }
        } else {
            setPasswordMatchMessage("");
        }
    }, [confirmPswd, pswd]);

    useEffect(() => {
        if (pswd) {
            setMessageText(evaluatePasswordStrength(pswd));
        } else {
            setMessageText("");
        }
    }, [pswd]);

    const fetchData = async () => {
        const resetData = {
            email: email,
            password: pswd,
            confirmPassword: confirmPswd,
            token: token
        };

        try {
            const response = await fetch("https://localhost:7164/Authentication/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(resetData),
            })
            const data = await response.json();
            setFinalMessage(data.message)
        }
        catch(err:any){
            console.error(err)
        }
    };

    return (
        <div className={styles.form}>
            {finalMessage === "" ?
                <>
                    <p className={styles.title}>Reset password</p>
                    <p className={styles.messageText}>Create new strong password!</p>
                    <label>
                        <input required placeholder="" type="password" className={styles.input}
                               onChange={(e) => { pswdSet(e.target.value); setIsInputTouched(true); }}/>
                        <span>New password</span>
                    </label>

                    <label>
                        <input required placeholder="" type="password" className={styles.input}
                               onChange={(e) => { confirmPswdSet(e.target.value); setIsInputTouched(true); }}/>
                        <span>Confirm new password</span>
                    </label>
                    {!confirmPswd && isInputTouched && pswd && messageText !== "" && (
                        <div className={(messageText !== "Easy password" ? styles.successContainer : styles.errorContainer)}>
                            <p className={(messageText !== "Easy password" ? styles.hiddenTextSuccess : styles.hiddenTextError)}>
                                {messageText}
                            </p>
                        </div>
                    )}
                    {confirmPswd && isInputTouched && confirmPswd && (
                        <div className={passwordMatchMessage === "Passwords match" ? styles.successContainer : styles.errorContainer}>
                            <p className={passwordMatchMessage === "Passwords match" ? styles.hiddenTextSuccess : styles.hiddenTextError}>
                                {passwordMatchMessage}
                            </p>
                        </div>
                    )}
                    <button onClick={fetchData} className={styles.submit}>Create new password</button>
                </>
                :
                <div className={styles.container}>
                    <Image src={"./Laptop.svg"} alt={"product"} height={200} width={200}/>
                    <p className={styles.text}>{finalMessage} </p>
                    <button onClick={() => router.push("./login")} className={styles.btnLogin}>
                            Go to login
                    </button>
                </div>}
        </div>
    );
};
export default ResetPasswordForm;