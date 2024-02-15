import React from 'react';
import styles from "@/app/register-login/page.module.css";

const registerLogin = () => {
  return (
    <main className={styles.main}>
        <form className={styles.form}>
            <label className={styles.formKid}>Email
                <input name='email' type="email" />
            </label>
            <label className={styles.formKid}>Password
                <input name='password' type="password" />
            </label>
            <button className={`${styles.formKid} ${styles.justButton}`}>Login / Register</button>
        </form>
    </main>
  )
}

export default registerLogin;
