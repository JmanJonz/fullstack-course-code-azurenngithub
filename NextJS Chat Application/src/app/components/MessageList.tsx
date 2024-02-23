// @ts-nocheck
"use client"

import styles from './messageList.module.css'
import { useEffect, useState, useRef } from 'react';
import isAuth from '../modules/isAuth';

export default function MessageList(){
    const [authorized, setAuthorized] = useState(null);
    const [logginEmail, setLogginEmail] = useState(null);
    const [userMessages, setUserMessages] = useState(null);

    useEffect(()=>{
        async function asyncEffect(){
            setAuthorized(localStorage.getItem("loggedInJWT"))
            setLogginEmail(localStorage.getItem("logginEmail"))
            const messages = await fetch("http://localhost:3000/api/messageRoutes");
            const messsiages = await messages.json();
            setUserMessages(messsiages);
        }
        asyncEffect();
        setInterval(asyncEffect, 5000);
    }, [])
    return(
        <>
        <main className={styles.main}>
            <nav>
                <a className={(authorized) ? styles.showNav : styles.dontShowNav} href="/register-login">Signed In As {logginEmail} Logout</a>
                <a className={(!authorized) ? styles.showNav : styles.dontShowNav} href="/register-login">Login</a>
            </nav>
            <ul className={styles.messageScroll}>
                {userMessages && userMessages.map((message)=>{
                    if(message.senderEmail === logginEmail){
                        return <li className={styles.sentMessages} key={message.id}>You Sent -- {message.messageText} -- To {message.receiverEmail}</li>
                    }
                    if(message.receiverEmail === logginEmail){
                        return <li className={styles.receivedMessages} key={message.id}>{message.senderEmail} -- Sent You -- {message.messageText}</li>
                    }
                })}
            </ul>
        </main>
        </>
    )
}