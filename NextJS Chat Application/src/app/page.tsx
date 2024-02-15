// @ts-nocheck
"use client"
import styles from "@/app/chatapp.module.css";
import "@/app/global.css";
import Message from "./components/Message";
import Chats from "./components/Chats";
import MessageList from "./components/MessageList";
import { useState } from "react";

export default function ChatApp(){

  return(
      <>
      <main className={styles.main}>
          <Chats/>
          <Message/>
          <MessageList/>
      </main>
      </>
  )
}
