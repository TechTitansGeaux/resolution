import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DecisionMaker from "./DecisionMaker.jsx";
import Home from "./Home.jsx";
import UserProfile from "./UserProfile.jsx";
import WallOfFame from "./WallOfFame.jsx";
import Navigation from "./Navigation.jsx";
import GoogleButton from 'react-google-button';
import axios from 'axios';
import Messages from "./MessageComponents/Messages.jsx";
// for development
const loggedIn = {id: 4, username: 'tim8'};

import "bootstrap/dist/css/bootstrap.min.css";
import ".././global.css";
import { useDispatch } from "react-redux";
import { setAuthUser, setIsAuthenticated } from "./store/appSlice.js";


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAuthUser();
  }, []);

  const fetchAuthUser = async () => {
    try {
      const response = await axios.get(`/users/user`);
      if (response && response.data) {
        console.log('User', response.data);
        dispatch(setIsAuthenticated(true));
        dispatch(setAuthUser(response.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // redirect user to sign up page
  const redirectToGoogleSSO = () => {
    window.location.href = 'http://127.0.0.1:4000/auth/login/google';


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
        <Route index element={<GoogleButton onClick={redirectToGoogleSSO}/>}></Route>
        <Route exact path="/" element={<Navigation />}>
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
