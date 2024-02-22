// @ts-nocheck
"use client"
import React from 'react';
import styles from "@/app/register-login/page.module.css";
import prisma from '../../../prisma/prismaSingleton';
import { useEffect } from 'react';

// function that handles login / register
  async function handleLogin(e){
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    emailInput.value = "";
    passwordInput.value = "";
    // add to database
    // XXXXXXXXXX prisma can't run on the client side! Must be 
    // done through a call to api on server. 
    // Make call to api post route, pass it the username and password
    // and it will handle hashing the password and adding it to the db
      const response = await fetch("/api/RegSlashLogUser", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
      })
      const responseMessage = await response.json();
                              console.log(responseMessage);
      // set jwt in local storage for later verification
        localStorage.setItem("loggedInJWT", responseMessage.jwt)
      // redirect logged in user to chat home page
        window.location.href = "/";
  }

export default function RegisterLogin(){
  // loguser out when they come here
  useEffect(()=>{
    localStorage.setItem("loggedInJWT", "");
  }, [])

  return (
    <main className={styles.main}>
        <form onSubmit={handleLogin} className={styles.form}>
            <label className={styles.formKid}>Email
                <input id='email' name='email' type="email" required/>
            </label>
            <label className={styles.formKid}>Password
                <input id='password' name='password' type="password"  required/>
            </label>
            <button className={`${styles.formKid} ${styles.justButton}`}>Login / Register</button>
        </form>
    </main>
  )
}