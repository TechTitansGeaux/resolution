import { BrowserRouter, Routes, Route } from "react-router-dom";
import DecisionMaker from "./DecisionMaker.jsx";
import Home from "./Home.jsx";
import Messages from "./Messages.jsx";
import Profile from "./Profile.jsx";
import WallOfFame from "./WallOfFame.jsx";
import Navigation from "./Navigation.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import ".././global.css"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/Messages" element={<Messages />} />
          <Route path="/DecisionMaker" element={<DecisionMaker />} />
          <Route path="/WallOfFame" element={<WallOfFame />} />
          <Route path="/myProfile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
