import React from 'react';

// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import Header from './components/Header';
import styled from 'styled-components';
import SideBar from './components/sidebar';
// import { Slider } from '@mui/material';
function App() {
  return (


    <>
      <Header />
      <Routes>

        {/* <Route path='/' element={<Header/>}/> */}

        <Route path='/' element={<AppBody> <SideBar /></AppBody>} />

      </Routes>
    </>
  );
}

export default App;

const AppBody = styled.div`
display:flex;
height: 100vh;
`
