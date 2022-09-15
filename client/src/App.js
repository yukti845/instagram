import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import FindUserForReset from './components/Auth/FindUserForReset';
import ValidateUserByOtp from './components/Auth/ValidateUserByOtp';
import Home from './components/Home/home';
import Profile from './components/Home/profile';
import NewPost from './components/Home/newpost';
import Search from './components/Home/search';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = '/' exact element = {<Login />} />
          <Route path = '/signup' element = {<Signup />} />
          <Route path = '/finduserforreset' element = {<FindUserForReset />} />
          <Route path = '/validateuserbyotp' element = {<ValidateUserByOtp />} />
          <Route path = '/home' element = {<Home />} />
          <Route path = '/profile/:username' element = {<Profile />} />
          <Route path = '/createnewpost' element = { <NewPost /> } />
          <Route path = '/search' element = { <Search /> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;