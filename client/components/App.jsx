// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DecisionMaker from "./DecisionMaker.jsx";
import Home from "./Home.jsx";
import Messages from "./Messages.jsx";
import UserProfile from "./UserProfile.jsx";
import WallOfFame from "./WallOfFame.jsx";
import Navigation from "./Navigation.jsx";
import GoogleButton from 'react-google-button';
import axios from 'axios';





const App = () => {

  // check if user is authenticated
  const fetchAuthUser = async () => {
    const response = await axios.get('http://127.0.0.1:4000/users/')
      .catch((err) => console.error(err));

    if (response && response.data) {
      console.log('User', response.data);
    }
  };

  // redirect user to sign up page
  const redirectToGoogleSSO = () => {
    window.location.href = 'http://127.0.0.1:4000/auth/login/google';
  };
  



  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<GoogleButton onClick={redirectToGoogleSSO}/>}></Route>
        <Route exact path="/" element={<Navigation />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/Messages" element={<Messages />} />
          <Route path="/WallOfFame" element={<WallOfFame />} />
          <Route path="/DecisionMaker" element={<DecisionMaker />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
