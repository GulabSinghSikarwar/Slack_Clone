import React from 'react';

import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import Header from './components/Header';
import styled from 'styled-components';
import SideBar from './components/sidebar';
import Chat from './components/Chat';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from './firebaseFile';
import Login from './components/Auth/Login';


function App() {

  const [user, loading] = useAuthState(auth)
  
  if(loading){
    return(
      <AppLoading>
        <AppLoadingContent>
        <img src='https://webdesigntips.blog/wp-content/uploads/2019/02/Slack-sparks-further-outrage-with-tweak-to-new-logo.jpg' />
        <h2>Loading ....</h2>
        </AppLoadingContent>
      </AppLoading>
    )
  }

  return (


    <>

      <Routes>\
        {
          (!user) ?

            <Route path='/' element={<Login />} />
            : (
              <Route path='/' element={
                <>
                  <Header />
                  <AppBody>
                    <SideBar />
                    <Chat />
                  </AppBody>
                </>
              } />
            )
        }

        {/* <Route path='/' element={<Header/>}/> */}

        

      </Routes>
    </>
  );
}

export default App;

const AppBody = styled.div`
display:flex;
height: 100vh;
`
const AppLoading=styled.div`
background-color: #f8f8f8;
height: 100vh;
display: grid;
place-items: center;
`
const AppLoadingContent=styled.div`
padding: 100px;
text-align: center;
background-color: white;
border-radius: 10px;
box-shadow: 0 1px  3px rgba(0,0,0,0.12),0 1px 2px rgba(0 ,0,0,0.24);

>img{
    object-fit: contain;
    height: 100px;margin-bottom:40px;
     
}
`
