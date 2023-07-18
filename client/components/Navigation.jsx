import { Outlet, NavLink } from "react-router-dom";
// import React from "react";

const Navigation = () => {
  return (
    <>
      <nav className="container">
        <ul className="nav nav-pills nav-justified">
          <li role="navigation">
            <NavLink to="/">Home</NavLink>
          </li>
          <li role="navigation">
            <NavLink to="/Messages">Messages</NavLink>
          </li>
          <li role="navigation">
            <NavLink to="/DecisionMaker">Decision Maker</NavLink>
          </li>
          <li role="navigation">
            <NavLink to="/WallOfFame">Wall Of Fame</NavLink>
          </li>
          <li role="navigation">
            <NavLink to="/myProfile">My Profile</NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Navigation;
