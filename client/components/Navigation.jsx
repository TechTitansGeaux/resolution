import { Outlet, NavLink } from "react-router-dom";
// nav collapse feature for small device widths
import "bootstrap/js/src/collapse.js";
import ResolutionLogo from "../img/resolution_app_logo_mini.svg";
import { useState } from "react";



const Navigation = () => {
// state for navigation collapse
  const [collapseNav, setCollapseNav ] = useState(true)

// auto-close menu on click of NavLink
  const handleCollapseNav = () => setCollapseNav(!collapseNav);

  return (
    <>
      <nav className="navbar navbar-expand-md fixed-top navbar-light bg-light">
        <div className="container">
          <NavLink
            className="nav-link navbar-brand active"
            href="#"
            to="/Home"
          >
            <img
              src={ResolutionLogo}
              alt="Resolution Logo"
              style={{ width: "auto", height: "2.5em" }}
            />
          </NavLink>
          <button
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleTarget"
            aria-controls="navbarExpansion"
            aria-expanded="false"
            aria-label="Toggles Navigation"
            className="navbar-toggler"
            onClick={handleCollapseNav}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`navbar-collapse ${collapseNav ? "collapse" : ""}`}
            id="navbarToggleTarget"
          >
            <ul className="navbar-nav mr-auto mt-1 mt-lg-0">
              <li className="nav-item" role="navigation">
                <NavLink
                  className="nav-link"
                  href="#"
                  to="/Messages"
                  onClick={handleCollapseNav}
                >
                  Meme Messenger
                </NavLink>
              </li>
              <li className="nav-item" role="navigation">
                <NavLink
                  className="nav-link"
                  href="#"
                  to="/DecisionMaker"
                  onClick={handleCollapseNav}
                >
                  Decision Maker
                </NavLink>
              </li>
              <li className="nav-item" role="navigation">
                <NavLink
                  className="nav-link"
                  href="#"
                  to="/WallOfFame"
                  onClick={handleCollapseNav}
                >
                  Wall Of Fame
                </NavLink>
              </li>
              <li className="nav-item" role="navigation">
                <NavLink
                  className="nav-link"
                  href="#"
                  to="/UserProfile"
                  onClick={handleCollapseNav}
                >
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
