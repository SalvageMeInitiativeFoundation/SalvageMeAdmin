import React, { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import "../index.css";
import { UserContext } from "../context/userContext/userContext";

function NavBar() {
  const { removeLocalUser, getLocalUser, setUser, user } =
    useContext(UserContext);

  const LogoutUser = (e) => {
    e.preventDefault();
    removeLocalUser();
    console.log("===============LoggingOut==============");
    console.log(user);
  };

  const location = useLocation();

  const pathName = (route) => {
    if (route == location.pathname) {
      return true;
    }
  };

  return (
    <>
      <div className="NavBarContainer">
        <header className="navBarHeader">
          <Link to="/">
            <h2>
              Salvage<span>Me</span>
            </h2>
          </Link>

          <ul className="navBarList">
            <Link to="/acceptDonation">
              {pathName("/acceptDonation") ? (
                <div className="Selected">
                  <li>Accept</li>
                  <hr color="white"></hr>
                </div>
              ) : (
                <li className="unSelected">Accept</li>
              )}
            </Link>
            <Link to="/approveDonation">
              {pathName("/approveDonation") ? (
                <div className="Selected">
                  <li>Approve</li>
                  <hr color="white"></hr>
                </div>
              ) : (
                <li className="unSelected">Approve</li>
              )}
            </Link>
            <Link to="/promoteUsertoVolunteer">
              {pathName("/promoteUsertoVolunteer") ? (
                <div className="Selected">
                  <li>Promote2Volunt</li>
                  <hr color="white"></hr>
                </div>
              ) : (
                <li className="unSelected ">Promote2Volunt</li>
              )}
            </Link>
            <Link to="/promoteUsertoOrg">
              {pathName("/promoteUsertoOrg") ? (
                <div className="Selected">
                  <li>Promote2Org</li>
                  <hr color="white"></hr>
                </div>
              ) : (
                <li className="unSelected">Promote2Org</li>
              )}
            </Link>
            <Link to="/login" className="NavLoginLogoutButtonContainer">
              {pathName("/login") ? (
                <div className="Selected">
                  <li>
                    {user.length > 0 ? (
                      <button
                        className="NavLoginLogoutButton"
                        type="button"
                        onClick={(e) => LogoutUser(e)}
                      >
                        logout
                      </button>
                    ) : (
                      "login"
                    )}
                  </li>
                  <hr color="white"></hr>
                </div>
              ) : (
                <li className="unSelected">
                  {user.length > 0 ? (
                    <button
                      className="NavLoginLogoutButton"
                      type="button"
                      onClick={(e) => LogoutUser(e)}
                    >
                      logout
                    </button>
                  ) : (
                    "login"
                  )}
                </li>
              )}
            </Link>
          </ul>
          
        </header>
        {/* <button className="LogoutButton">logout</button> */}
      </div>
    </>
  );
}

export default NavBar;
