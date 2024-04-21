import { useRouter } from "next/router";
import styles from "./ForgetPasswordForm.module.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ForgetPasswordForm = () => {
    const [email, setEmail] = useState("");
    const [done,setDone] = useState(false)
    const fetchData = async () => {
        setDone(true)
        try {
            const response = await fetch("https://localhost:7164/Authentication/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
        } catch (err) {
            console.error(err);
        }
        setTimeout(() => {
            setDone(false);
        }, 5000);
    };

    return (
        <div className={styles.form}>
            <p className={styles.title}>Forget password</p>
            <p className={styles.messageText}>Please enter your email to search for your account.</p>
            <label>
                <input required placeholder="" type="email" className={styles.input}
                       onChange={(e) => setEmail(e.target.value)}/>
                <span>Email</span>
            </label>
            {done && (
                <div className={ styles.successContainer }>
                    <p className={ styles.hiddenTextSuccess }>
                        Success! We send link for reset password .Please ,check your email and follow link
                    </p>
                </div>
            )}
            <button onClick={fetchData} className={styles.submit} >Search</button>
            <p className={styles.link}><Link href="/login">Back</Link></p>
        </div>
    );
};

export default ForgetPasswordForm;