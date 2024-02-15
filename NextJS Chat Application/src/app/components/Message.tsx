// @ts-nocheck
"use client"

import styles from './message.module.css';

export default function Message(){
    return(
        <main className={styles.main}>
            <form className={styles.form}>
                <div>
                <label>
                    <input name='message' className={`${styles.input} ${styles.inputOnly}`} placeholder='Type Your Message Here' type="text" />
                </label>
                </div>
                <button className={`${styles.input} ${styles.button}`} type='submit'>Send</button>
            </form>
        </main>
    )
}