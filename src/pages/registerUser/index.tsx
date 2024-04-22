import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./RegisterUser.module.css";
import Combobox from "@/components/ComboBox/ComboBox";
import { Nunito } from "next/font/google";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const nunito = Nunito({ subsets: ["latin"] });

const RegisterUser = () => {
  const roles = ["Client", "Employer"];
  const [role, setRole] = useState("Client");
  const [id1C, setId1C] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const registerUser = async () => {
    try {
      const userToPost = {
        id1C: id1C,
        name: name,
        lastName: lastName,
        email: email,
        role: role,
      };
      await fetch("https://localhost:7164/Authentication/Registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToPost),
      });
    } catch (error: any) {
      console.log(error);
    }
    router.push("/manageUsers");
  };

  return (
    <div className={`${nunito.className} ${styles.container}`}>
      <div className={styles.form}>
        <p className={styles.title}>Register </p>
        <div className={styles.flex}>
          <label>
            <input
              required
              type="text"
              className={styles.input}
              onChange={(ev) => setName(ev.target.value)}
            />
            <span>Firstname</span>
          </label>

          <label>
            <input
              required
              type="text"
              className={styles.input}
              onChange={(ev) => setLastName(ev.target.value)}
            />
            <span>Lastname</span>
          </label>
        </div>

        <label>
          <input
            required
            type="text"
            className={styles.inputLong}
            onChange={(ev) => setId1C(ev.target.value)}
          />
          <span>Id 1C</span>
        </label>

        <label>
          <input
            required
            type="email"
            className={styles.inputLong}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <span>Email</span>
        </label>

        <Combobox defValue={""} options={roles} onSelect={setRole} />

        <button className={styles.submit} onClick={registerUser}>
          Register
        </button>
        <p className={styles.signin}>
          <Link href="/manageUsers">Back</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterUser;
