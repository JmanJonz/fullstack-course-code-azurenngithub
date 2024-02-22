// @ts-nocheck
"use client"

import styles from './messageList.module.css'
import { useEffect, useState, useRef } from 'react';
import isAuth from '../modules/isAuth';

export default function MessageList(){
    const [authorized, setAuthorized] = useState(localStorage.getItem("loggedInJWT"));
    console.log(`state authorized ${authorized}`);
    return(
        <>
        <main className={styles.main}>
            <nav>
                <a className={(authorized) ? styles.showNav : styles.dontShowNav} href="/register-login">Logout</a>
                <a className={(!authorized) ? styles.showNav : styles.dontShowNav} href="/register-login">Login</a>
            </nav>
            <ul>
            </ul>
        </main>
        </>
    )
}