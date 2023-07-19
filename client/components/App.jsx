import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DecisionMaker from "./DecisionMaker.jsx";
import Home from "./Home.jsx";
import Messages from "./Messages.jsx";
import UserProfile from "./UserProfile.jsx";
import WallOfFame from "./WallOfFame.jsx";
import Navigation from "./Navigation.jsx";
import GoogleButton from 'react-google-button';
import axios from 'axios';
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
