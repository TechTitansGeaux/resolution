// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DecisionMaker from "./DecisionMaker.jsx";
import Home from "./Home.jsx";
import Messages from "./MessageComponents/Messages.jsx";
import SignUp from "./SignUp.jsx";
import WallOfFame from "./WallOfFame.jsx";
import Navigation from "./Navigation.jsx";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
// for development
const loggedIn = {id: 4, username: 'tim8'};


const App = () => {

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
          <Route index element={<Home addPoints={addPoints}/>} />
          <Route index element={<Home />} />
          <Route path="/Messages" element={<Messages addPoints={addPoints} loggedIn={loggedIn} />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/WallOfFame" element={<WallOfFame />} />
          <Route path="/DecisionMaker" element={<DecisionMaker addPoints={addPoints}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
