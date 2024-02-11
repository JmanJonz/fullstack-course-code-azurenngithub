"use client"
import styles from "@/app/chatapp.module.css";
import Message from "./components/Message";
import Chats from "./components/Chats";
import MessageList from "./components/MessageList";
import { useState } from "react";

export default function ChatApp(){
  const [chatList, setChatList] = useState([]);

  function updateChatList(message){
      setChatList(currentChatList => [...currentChatList, message])
  }

  return(
      <>
      <main className={styles.main}>
          <Chats/>
          <Message updateChatListt={updateChatList}/>
          <MessageList chatList={chatList}/>
      </main>
      </>
  )
}
