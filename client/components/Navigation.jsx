import { Outlet, NavLink } from "react-router-dom";
// import React from "react";

const Navigation = () => {
  return (
    <>
      <nav className="navbar navbar-expand-md fixed-top navbar-light bg-light">
        <div className="container">
          <NavLink className="nav-link navbar-brand" href="#" to="/">
            <span className="align-top">App Logo</span>
          </NavLink>
          <button
            type="button"
            className="nav-btn navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="navbar-expansion"
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggles Navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbar-expansion" className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item" role="navigation"></li>
              <li className="nav-item" role="navigation">
                <NavLink className="nav-link" href="#" to="/Messages">
                  Messages
                </NavLink>
              </li>
              <li className="nav-item " role="navigation">
                <NavLink className="nav-link" href="#" to="/DecisionMaker">
                  Decision Maker
                </NavLink>
              </li>
              <li className="nav-item" role="navigation">
                <NavLink className="nav-link" href="#" to="/WallOfFame">
                  Wall Of Fame
                </NavLink>
              </li>
              <li className="nav-item" role="navigation">
                <NavLink className="nav-link" href="#" to="/myProfile">
                  My Profile
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Navigation;
