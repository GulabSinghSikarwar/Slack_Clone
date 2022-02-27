import { Button } from '@mui/material';
import React from 'react'
import styled from 'styled-components'
import { useRef, useState } from 'react';
import { db } from '../firebaseFile';
import { addDoc, collection } from 'firebase/firestore/lite';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebaseFile";


function ChatInput({ roomId ,channelName,fillBottomMessage}) {


    const [user] = useAuthState(auth)
    const [input, setInput] = useState('')
    const inputRef = useRef(null);
    const addData = async (data) => {
        const path = collection(db, 'rooms', roomId, "messages")
        const messageRef = await addDoc(path, { ...data })

        return messageRef;


    }

    const sendMessage = (event) => {



        event.preventDefault();
        const d = new Date(Date.now()).getTime();
        // d.setUTCSeconds
        if (!roomId) {
            return false;

        }

      if(inputRef.current.value.trim().length>0)
      {
        const data = {
            message: inputRef.current.value,
            // message: input,
            timestamp: d,
            user: user.displayName,
            userImage: user.photoURL

        }
        // console.log(data);
       
        



        addData(data).then((messageRef) => {
            console.log(messageRef);
            fillBottomMessage(data);

        }).catch((e) => { console.log(e); })
      }
        inputRef.current.value = '';






    }
    return (
        <ChatInputContainer>
            <form>
                <input onChange={(e) => { setInput(e.target.value) }} ref={inputRef} placeholder={(channelName)?channelName:'Message #ROOM'} />
                <Button type='submit' hidden onClick={sendMessage}> Send </Button>
            </form>

        </ChatInputContainer>
    )
}

export default ChatInput
const ChatInputContainer = styled.div`
> form{
    display: flex;
    position: relative;
    justify-content: center;

}
> form > input{
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px sloid lightgray;
    /* margin: 0px; */

    padding: 20px;
    border-radius: 1px;
    outline: none;
}
>form > button{
    display: none;
}
`