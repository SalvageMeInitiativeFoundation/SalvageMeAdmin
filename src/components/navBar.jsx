import React, { useContext, useState } from "react";
import { useLocation, NavLink, Link } from "react-router-dom";
import "../index.css";
import { UserContext } from "../context/userContext/userContext";
import salvageMeLogo from "../assets/SalvageMeLogo.png";
import { FaBook } from "react-icons/fa6";
import { RiUserReceivedFill } from "react-icons/ri";
import { MdVolunteerActivism } from "react-icons/md";
import { GiOrganigram } from "react-icons/gi";
import { IoLogIn } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { removeLocalUser, getLocalUser, setUser, user } =
    useContext(UserContext);

  const LogoutUser = (e) => {
    e.preventDefault();
    removeLocalUser();
    console.log("===============LoggingOut==============");
    console.log(user);
  };

  const location = useLocation();

  const navItems = [
    { to: "/acceptDonation", label: "Mng. Donation", Icon: FaBook },
    { to: "/approveDonation", label: "Approve Order", Icon: MdVolunteerActivism },
    { to: "/promoteUsertoVolunteer", label: "Promote User", Icon: RiUserReceivedFill  },
  ];

  return (
    <>
      <div className="NavBarContainer">
        <Link to="/" className="homeLogo">
          <img src={salvageMeLogo} alt="Logo" height={150} width={"100%"} />
        </Link>

        {user.length > 0 && (
          <nav aria-label="Main navigation">
            <ul className="navBarList">
              {navItems.map(({ to, label, Icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) => (isActive ? "Selected nav-link" : "unSelected nav-link")}
                  >
                    <Icon size={16} /> {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <div className="NavLoginLogoutButtonContainer">
          {user.length > 0 ? (
            <button
              className="NavLoginLogoutButton"
              type="button"
              onClick={(e) => LogoutUser(e)}
              aria-label="Logout"
            >
              <IoLogOut size={24} />
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/login" className="NavLoginLogoutButtonContainer Selected">
              <button type="button" className="NavLoginLogoutButton" aria-label="Login">
                <IoLogIn size={24} />
                <span>Login</span>
              </button>
            </Link>
          )}
        </div>
      </div>

      <div className="NavBarContainerMiniDrawer">
        {!isOpen && (
          <div className="MiniDrawerHeader">
            <button
              className="hamburgerButton"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              aria-expanded={isOpen}
            >
              <RxHamburgerMenu size={24} />
            </button>

            {user.length > 0 ? (
              <button
                className="NavLoginLogoutButton"
                type="button"
                onClick={(e) => LogoutUser(e)}
                aria-label="Logout"
              >
                <IoLogOut size={24} />
                <span style={{ marginBottom: "0px" }}>Logout</span>
              </button>
            ) : (
              <Link to="/login" className="NavLoginLogoutButtonContainer Selected">
                <button type="button" className="NavLoginLogoutButton" aria-label="Login">
                  <IoLogIn size={24} />
                  <span style={{ marginBottom: "0px" }}>Login</span>
                </button>
              </Link>
            )}
          </div>
        )}

        {isOpen && (
          <div
            style={{
              width: "100%",
              backgroundColor: "#dcdada66",
              backdropFilter: "blur(10px)",
              position:"absolute",
              zIndex:"100px",

            }}
          >
            <div className="miniClose" onClick={() => setIsOpen(false)}>
              <IoIosCloseCircleOutline size={48} />
            </div>
            <div className="NavBarContainerMini">
              <Link to="/" className="homeLogo">
                <img
                  src={salvageMeLogo}
                  alt="Logo"
                  height={150}
                  width={"100%"}
                />
              </Link>

              {user.length > 0 && (
                <nav aria-label="Mobile navigation">
                  <ul className="navBarList">
                    {navItems.map(({ to, label, Icon }) => (
                      <li key={to} onClick={() => setIsOpen(false)}>
                        <NavLink
                          to={to}
                          className={({ isActive }) => (isActive ? "Selected nav-link" : "unSelected nav-link")}
                        >
                          <Icon size={16} /> {label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default NavBar;
