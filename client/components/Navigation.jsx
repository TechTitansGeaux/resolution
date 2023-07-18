import { Outlet, Link } from "react-router-dom";
// import React from "react";

const Navigation = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/Home">Home</Link>
          </li>
          <li>
            <Link to="/Messages">Messages</Link>
          </li>
          <li>
            <Link to="/WallOfFame">Wall Of Fame</Link>
          </li>
          <li>
            <Link to="/UserProfile">Profile</Link>
          </li>
          <li>
            <Link to="/DecisionMaker">Decision Maker</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Navigation;
