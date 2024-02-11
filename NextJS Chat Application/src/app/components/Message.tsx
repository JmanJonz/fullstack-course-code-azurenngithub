"use client"

import styles from './message.module.css';
import {io} from 'socket.io-client'
import { useEffect, useRef} from 'react';

export default function Message({updateChatListt}){
    const socketRef = useRef(null);
    const inputRef = useRef(null);

    // only run when when the component first renders not on any other updates
    // emply array as second argument to hook is what makes this function only render
    // on initial mount
        useEffect(()=>{
            socketRef.current = io('http://localhost:4321')
            socketRef.current.on('connect', ()=>{
                updateChatListt({message: `You connected to ws with id: ${socketRef.current.id}`})
            })    
            // listen for incomming messages
            socketRef.current.on('serverToClient', (mess)=>{
                updateChatListt({'message': mess});
            })

        }, []);

    // listen for incomming messages and add them to chatlist
    // needs to be moved to inside useEffect as I tried this and 
    // this code ran before the socketwas setup so I got null errors
        // socketRef.current.on()

    function formSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const message = formData.get('message');
        const id = formData.get('id');
        const room = formData.get('room');
        updateChatListt({'message': `You Sent: ${message}`});
        socketRef.current.emit('clientToServer', {id: id, message: message, room: room})    
        // clear message once sent
            inputRef.current.value = '';
    }


    return(
        <>
        <main className={styles.main}>
            <form onSubmit={formSubmit} className='formMSG'>
                <div>
                <label>
                    <input name='id' className={`${styles.input} ${styles.inputOnly}`} placeholder='Enter Your Id Here' type="number" />
                </label>
                </div>
                <div>
                <label>
                    <input name='message' ref={inputRef} className={`${styles.input} ${styles.inputOnly}`} placeholder='Type Your Message Here' type="text" />
                </label>
                </div>
                <div>
                <label>
                    <input name='room' className={`${styles.input} ${styles.inputOnly}`} placeholder='Type Your ChatRoom Here' type="text" />
                </label>
                <button className={`${styles.input} ${styles.button}`} type='submit'>Send Message</button>
                </div>
            </form>
        </main>
        </>
    )
}