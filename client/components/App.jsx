import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DecisionMaker from "./DecisionMaker.jsx";
import Home from "./Home.jsx";
import UserProfile from "./UserProfile.jsx";
import WallOfFame from "./WallOfFame.jsx";
import Navigation from "./Navigation.jsx";
import GoogleButton from "react-google-button";
import axios from "axios";
import Messages from "./MessageComponents/Messages.jsx";


import "bootstrap/dist/css/bootstrap.min.css";
import ".././global.css";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setIsAuthenticated } from "./store/appSlice.js";

const App = () => {

  // create placement and trophy variables in state for current user
  const [ placement, setPlacement ] = useState('');
  const [ trophy, setTrophy ] = useState('');

  const dispatch = useDispatch();
  const [user, setUser] = useState("");

  useEffect(() => {
    fetchAuthUser();
  }, []);

  const fetchAuthUser = async () => {
    try {
      const response = await axios.get(`/users/user`);
      if (response && response.data) {
        dispatch(setIsAuthenticated(true));
        dispatch(setAuthUser(response.data));
        setUser(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };


  // redirect user to sign up page
  const redirectToGoogleSSO = () => {
    window.location.href = "http://127.0.0.1:4000/auth/login/google";
  };

  // function to update trophy
  const updateTrophy = (user) => {
    // get all users
    // axios get request
    axios.get('/wofRoutes/users')
      .then(({data}) => {
        // in order to make placement relative to other users and to amount of users
        // set placement to users place in ranked list, divided by the length
        setPlacement((data.map(user => user.id).indexOf(user.id)) / data.length);
      })
      .catch((err) => {
        console.error('Failed axios GET user placement: ', err);
      });
    // conditionally assign trophy
    // determine if user has no points
    if (user.points === 0) {
      setTrophy('Earn points to win an award!');
      // else determine users placement
    } else if (placement <= .1) {
      // top 10 percent get gold
      setTrophy('🏆');
    } else if (placement <= .2) {
      // top 20 get Silver
      setTrophy('🥈');
    } else if (placement <= .3) {
      // top 30 get Bronze
      setTrophy('🥉');
    } else {
      // else if user has points but placement is over top 30 percent, ribbon
      setTrophy('🎗️');
    }
    // send trophy to db
    axios.patch(`wofRoutes/users/${user.id}`, {
      trophy: trophy
    })
      .catch((err) => {
        console.error('Failed to axios patch trophy: ', err);
      });
  };

  // function to add necessary points to current user
  // also must update trophy
  const addPoints = (user, num) => {
  // points on user in state is 'read only' and cannot be directly updated
    // create variable to grab old points number from user
    const oldPoints = user.points;
    // axios patch request
    axios.patch(`wofRoutes/users/${user.id}`, {
      // increment old points variable INSTEAD of incrementing points property directly
      // and set that to points
      points: oldPoints + num
    })
      .then(updateTrophy(user))
      .catch((err) => {
        console.error("Failed axios PATCH: ", err);
      });
  };


  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<GoogleButton onClick={redirectToGoogleSSO} />}
        ></Route>
        <Route
          exact
          path="/"
          element={<Navigation />}>
          <Route
            exact
            path="/Home"
            element={<Home user={user} addPoints={addPoints} />}
          />
          <Route
            path="/UserProfile"
            element={<UserProfile user={user} />} />
          <Route
            path="/Messages"
            element={<Messages addPoints={addPoints} loggedIn={user} />}
          />
          <Route
            path="/WallOfFame"
            element={<WallOfFame authUser={user} />} />
          <Route
            path="/DecisionMaker"
            element={<DecisionMaker addPoints={addPoints} user={user} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
