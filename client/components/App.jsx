// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DecisionMaker from "./DecisionMaker.jsx";
import Home from "./Home.jsx";
import UserProfile from "./UserProfile.jsx";
import WallOfFame from "./WallOfFame.jsx";
import Navigation from "./Navigation.jsx";
import GoogleButton from 'react-google-button';
import axios from 'axios';
import Messages from "./MessageComponents/Messages.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
// for development
const loggedIn = {id: 4, username: 'tim8'};


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
  const redirectToGoogleSSO = async () => {
    const googleLoginURL = 'http://127.0.0.1:4000/auth/login/google';
    const newWindow = window.open(googleLoginURL, "_blank", "width=500,height=600");
    
    if (newWindow) {
      const timer = setInterval(() => {
        if (newWindow.closed) {
          console.log('AUTHENTICATED');
          fetchAuthUser();
          if (timer) {
            clearInterval(timer);
          }
        }
      }, 500);
    }
  };

  // function to add necessary points to current user as
  const addPoints = async (user, num) => {
    // axios patch request
    await axios.patch(`wofRoutes/users/${user.id}`, {
      points: user.points += num
    })
      .catch((err) => {
        console.error('Failed axios PATCH: ', err);
      });
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navigation />}>
          <Route index element={<GoogleButton onClick={redirectToGoogleSSO}/>} />
          <Route exact path="/Home" element={<Home addPoints={addPoints}/>} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/Messages" element={<Messages addPoints={addPoints} loggedIn={loggedIn} />} />
          <Route path="/WallOfFame" element={<WallOfFame />} />
          <Route path="/DecisionMaker" element={<DecisionMaker addPoints={addPoints}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
