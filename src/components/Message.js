import { style } from '@mui/system'
import React from 'react'
import styled from 'styled-components'
function Message({message,image,user,timestamp}) {
  return (
    // <div>Message</div>
    <MessageContainer>
        <img  src={image}/>
        <MessageInfo>
            <h4>
                {user}<span>{ new Date(timestamp).toUTCString()}</span>
            </h4>
            <p>
                {message}
            </p>
        </MessageInfo>


    </MessageContainer>
  )
}

export default Message
const MessageContainer=styled.div`
display: flex;
align-items: center;
padding:20px;

 > img{
     height: 50px;
 }   
`
const MessageInfo=styled.div`
margin-left:10px;

/* color:gray; */
> h4 > span {
    color: gray;
    margin-left: 4px;
    font-size: 10px;
}

`