import { Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { auth } from '../../firebaseFile'
import { GoogleAuthProvider,signInWithPopup } from 'firebase/auth'

function Login() {
const provider=new GoogleAuthProvider();

    const signIn=(event)=>{

    
    signInWithPopup(auth,provider).then((result)=>{
        const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    
    // The signed-in user info.
    const user = result.user;
    }).catch((e)=>{
        console.log(e);
        alert("error Occured ")
    })


    }
    return (
        <LoginContainer>
            <InnerLoginContainer>
                <img src='https://webdesigntips.blog/wp-content/uploads/2019/02/Slack-sparks-further-outrage-with-tweak-to-new-logo.jpg' />
                <h1>Sign In to Slac-X</h1>
                <p>slacx.com</p> 
                <Button onClick={signIn}>Sign In With Google</Button>

            </InnerLoginContainer>
        </LoginContainer>

    )
}

export default Login
const LoginContainer = styled.div`
background-color: #f8f8f8;
height: 100vh;
display: grid;
place-items: center;
`
const InnerLoginContainer = styled.div`
padding: 100px;
text-align: center;
background-color: white;
border-radius: 10px;
box-shadow: 0 1px  3px rgba(0,0,0,0.12),0 1px 2px rgba(0 ,0,0,0.24);

>img{
    object-fit: contain;
    height: 100px;margin-bottom:40px;
     
}
>button{
    margin-top: 50px;
    text-transform: uppercase;
    background-color: #0a8d48 !important;
    color: white;
    font-weight: 600;
    padding: 10px;
}
`