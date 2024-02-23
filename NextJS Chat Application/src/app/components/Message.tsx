// @ts-nocheck
"use client"

import styles from './message.module.css';
import { useState } from 'react';

export default function Message(){
    const [authorized, setAuthorized] = useState(localStorage.getItem("loggedInJWT"));
    const [logginEmail, setLogginEmail] = useState(localStorage.getItem("logginEmail"));

    async function handleMessageSend(e){
        e.preventDefault();
        const toEmail = e.target.elements.toEmail.value;
        const message = e.target.elements.message.value;
        const messageElement = document.querySelector("#message");
        messageElement.value = "";
        // post a new message
            const res = await fetch("http://localhost:3000/api/messageRoutes", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({              
                "senderEmail": logginEmail,
                "receiverEmail": toEmail,
                "messageText": message})        
            })
    }
    return(
        <main className={styles.main}>
            <form onSubmit={handleMessageSend} className={styles.form}>
                <div>
                <label>
                    <input id='message' name='message' className={`${styles.input} ${styles.inputOnly}`} placeholder='Message' type="text" />
                    <input id='toEmail' name='toEmail' className={`${styles.input} ${styles.inputOnly}`} placeholder='To Email' type="text" />
                </label>
                </div>
                <button className={`${styles.input} ${styles.button}`} type='submit'>Send</button>
            </form>
        </main>
    )
}