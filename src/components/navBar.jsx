import React, { useContext, useState } from "react";
import { useLocation, Link } from "react-router-dom";
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

  const pathName = (route) => {
    if (route == location.pathname) {
      return true;
    }
  };

  return (
    <>
      <div className="NavBarContainer">
        <Link to="/" className="homeLogo">
          <img src={salvageMeLogo} alt="Logo" height={150} width={"100%"} />
        </Link>

        {user.length > 0 && (
          <ul className="navBarList">
            <Link to="/acceptDonation">
              {pathName("/acceptDonation") ? (
                <div className="Selected">
                  <li>
                    <FaBook size={16} /> Accept Donation
                  </li>
                  <hr color="white"></hr>
                </div>
              ) : (
                <li className="unSelected">
                  <FaBook size={16} /> Accept Donation
                </li>
              )}
            </Link>
            <Link to="/approveDonation">
              {pathName("/approveDonation") ? (
                <div className="Selected">
                  <li>
                    <RiUserReceivedFill size={16} /> Approve Order
                  </li>
                  <hr color="white"></hr>
                </div>
              ) : (
                <li className="unSelected">
                  <RiUserReceivedFill size={16} /> Approve Order
                </li>
              )}
            </Link>
            <Link to="/promoteUsertoVolunteer">
              {pathName("/promoteUsertoVolunteer") ? (
                <div className="Selected">
                  <li>
                    <MdVolunteerActivism size={16} /> Promote To Volunteer
                  </li>
                  <hr color="white"></hr>
                </div>
              ) : (
                <li className="unSelected ">
                  <MdVolunteerActivism size={16} /> Promote To Volunteer
                </li>
              )}
            </Link>
            <Link to="/promoteUsertoOrg">
              {pathName("/promoteUsertoOrg") ? (
                <div className="Selected">
                  <li>
                    <GiOrganigram size={16} /> Promote To Org
                  </li>
                  <hr color="white"></hr>
                </div>
              ) : (
                <li className="unSelected">
                  <GiOrganigram size={16} /> Promote To Org
                </li>
              )}
            </Link>
          </ul>
        )}
        {
          <Link to="/login" className="NavLoginLogoutButtonContainer Selected">
            {user.length > 0 ? (
              <button
                className="NavLoginLogoutButton"
                type="button"
                onClick={(e) => LogoutUser(e)}
              >
                <IoLogOut size={24} />
                <p>Logout</p>
              </button>
            ) : (
              <button type="button" className="NavLoginLogoutButton">
                <IoLogIn size={24} />
                <p>Login</p>
              </button>
            )}
          </Link>
        }
      </div>

      <div className="NavBarContainerMiniDrawer">
        {!isOpen && (
          <div className="MiniDrawerHeader">
            <div style={{width:"52px",height:"42px",padding:"15px"}} onClick={() => setIsOpen(true)}>
            <RxHamburgerMenu size={24}/>
            </div>

            {user.length > 0 ? (
              <button
                className="NavLoginLogoutButton"
                type="button"
                onClick={(e) => LogoutUser(e)}
              >
                <IoLogOut size={24} />
                <p style={{ marginBottom: "0px" }}>Logout</p>
              </button>
            ) : (
              <Link
                to="/login"
                
                className="NavLoginLogoutButtonContainer Selected"
              >
                <button type="button" className="NavLoginLogoutButton">
                  <IoLogIn size={24} />
                  <p style={{ marginBottom: "0px" }}>Login</p>
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
            <div
              onClick={() => setIsOpen(false)}
              style={{ position: "absolute", top: "50px", right: "50px" }}
            >
              <IoIosCloseCircleOutline size={62}/>
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
                <ul className="navBarList">
                  <Link to="/acceptDonation">
                    {pathName("/acceptDonation") ? (
                      <div className="Selected">
                        <li>
                          <FaBook size={16} /> Accept Donation
                        </li>
                        <hr color="white"></hr>
                      </div>
                    ) : (
                      <li className="unSelected">
                        <FaBook size={16} /> Accept Donation
                      </li>
                    )}
                  </Link>
                  <Link to="/approveDonation">
                    {pathName("/approveDonation") ? (
                      <div className="Selected">
                        <li>
                          <RiUserReceivedFill size={16} /> Approve Order
                        </li>
                        <hr color="white"></hr>
                      </div>
                    ) : (
                      <li className="unSelected">
                        <RiUserReceivedFill size={16} /> Approve Order
                      </li>
                    )}
                  </Link>
                  <Link to="/promoteUsertoVolunteer">
                    {pathName("/promoteUsertoVolunteer") ? (
                      <div className="Selected">
                        <li>
                          <MdVolunteerActivism size={16} /> Promote To Volunteer
                        </li>
                        <hr color="white"></hr>
                      </div>
                    ) : (
                      <li className="unSelected ">
                        <MdVolunteerActivism size={16} /> Promote To Volunteer
                      </li>
                    )}
                  </Link>
                  <Link to="/promoteUsertoOrg">
                    {pathName("/promoteUsertoOrg") ? (
                      <div className="Selected">
                        <li>
                          <GiOrganigram size={16} /> Promote To Org
                        </li>
                        <hr color="white"></hr>
                      </div>
                    ) : (
                      <li className="unSelected">
                        <GiOrganigram size={16} /> Promote To Org
                      </li>
                    )}
                  </Link>
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default NavBar;
