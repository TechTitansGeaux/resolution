import { Outlet, NavLink } from "react-router-dom";
// nav collapse feature for small device widths
import "bootstrap/js/src/collapse.js";



const Navigation = () => {
  return (
    <>
      <nav className="navbar navbar-expand-md fixed-top navbar-light bg-light">
        <div className="container">
          <NavLink className="nav-link navbar-brand active" href="#" to="/">
            <span className="align-top">App Logo</span>
          </NavLink>
          <button
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleTarget"
            aria-controls="navbarExpansion"
            aria-expanded="false"
            aria-label="Toggles Navigation"
            className="navbar-toggler"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse" id="navbarToggleTarget">
            <ul className="navbar-nav mr-auto mt-1 mt-lg-0">
              <li className="nav-item" role="navigation">
                <NavLink className="nav-link" href="#" to="/Messages">
                  Messages
                </NavLink>
              </li>
              <li className="nav-item" role="navigation">
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
