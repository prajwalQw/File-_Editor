import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './Login'
import Signup from './Signup';
import Chps from './Chps';
import Chps2 from './Chps2';
import Realhome from './Realhome'
import reportWebVitals from './reportWebVitals';
import Profile from './Profile';
import Edit from './Editor';
import Savededit from './Saveditor';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
	<Route path='/' element={<Home/>}/></Routes>
	<Routes>
	<Route path='/login' element={<Login/>}/></Routes>
	<Routes>
	<Route path='/signup' element={<Signup/>}/></Routes>
	<Routes>
	<Route path='/verifyuser' element={<Chps/>}/></Routes>
	<Routes>
	<Route path='/changeps' element={<Chps2/>}/></Routes>
	<Routes>
	<Route path='/home' element={<Realhome/>}/></Routes>
	<Routes>
	<Route path='/myprofile' element={<Profile/>}/></Routes>
	<Routes>
	<Route path='/editor' element={<Edit/>}/></Routes>
	<Routes>
	<Route path='/seditor' element={<Savededit/>}/></Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();