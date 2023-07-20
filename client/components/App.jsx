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
import { useDispatch } from "react-redux";
import { setAuthUser, setIsAuthenticated } from "./store/appSlice.js";

const App = () => {

  const dispatch = useDispatch();
  const [user, setUser] = useState("");

  // create placement and trophy variables in state for current user
  const [ trophy, setTrophy ] = useState('');
  const [ placement, setPlacement ] = useState('');
  const [ refresher, setRefresher ] = useState(0);



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

  // get placement of current user
  // useEffect to get user placement
  const getPlacement = async () => {
    // axios get request
    const request = await axios.get('/wofRoutes/users');
    setPlacement((request.data.map(user => user.id).indexOf(user.id)) / request.data.length);
  };
  
  useEffect(() => {
    getPlacement();
  }, [user, refresher]);

  // assign trophy according to placement
  useEffect( () => {
    const chooseAward = async () => {
      console.log(user.points, '<--- user points');
      // determine if user has no points
      if (user.points < 1) {
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
      } else if (placement > .3 && user.points > 0) {
        // else if user has points but placement is over top 30 percent, ribbon
        setTrophy('🎗️');
      }
    };
    chooseAward();
    // should update every time placement updates
  }, [placement]);

  // send trophy back to database
  useEffect( () => {
    if (user) {
      const sendTrophy = async () => {
        await axios.patch(`wofRoutes/users/${user.id}`, {
          trophy: trophy
        })
          .catch((err) => {
            console.error('Failed to axios patch trophy: ', err);
          });
      };
      sendTrophy();
    }
  }, [trophy]);

  // function to add necessary points to current user
  // also must update trophy
  const addPoints = (user, num) => {
    setRefresher(1);
    getPlacement();
    // points on user in state is 'read only' and cannot be directly updated
    // create variable to grab old points number from user
    const oldPoints = user.points;
    // axios patch request
    axios.patch(`wofRoutes/users/${user.id}`, {
      // increment old points variable INSTEAD of incrementing points property directly
      // and set that to points
      points: oldPoints + num
    })
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
            element={<WallOfFame refresher={refresher}/>} />
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
