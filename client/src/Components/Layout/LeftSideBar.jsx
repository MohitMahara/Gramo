import React from "react";
import { NavLink } from "react-router-dom";
import { PiDotsThreeCircle } from "react-icons/pi";
import { UseFirebase } from "../../Contexts/firebase";
import { IoIosLogOut } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { IoMdSearch } from "react-icons/io";
import { CiLocationArrow1 } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiCompass1 } from "react-icons/ci";

const LeftSideBar = () => {
  const { userInfo, setUserInfo } = UseFirebase();

  const handleSubmit = () => {
    try {
      setUserInfo({
        ...userInfo,
        user: null,
        token: null,
      });

      localStorage.removeItem("gramo");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="leftContainer" style={{ minHeight: "95vh" }}>
      <NavLink className="navbar-brand d-flex" to="/">
        <img src={"android-chrome-192x192.png"} alt="brand-icon" />
        <h3>Gramo</h3>
      </NavLink>

      <div className="featuresContainer">
        <ul className="d-flex">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              <GoHome className="nav-icon" />
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/product">
              <IoMdSearch className="nav-icon" />
              Search
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/product">
              <CiCompass1 className="nav-icon" />
              Explore
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/product">
              <CiLocationArrow1 className="nav-icon" />
              Messages
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">
              {userInfo?.user.photo ? (
                <>
                  <img
                    src={userInfo?.user.photo}
                    className="profileIcon-small"
                    alt="profile pic"
                  />
                </>
              ) : (
                <CiUser className="nav-icon" />
              )}
              {userInfo?.user.name}
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/product">
              <PiDotsThreeCircle className="nav-icon" />
              More
            </NavLink>
          </li>
          {userInfo?.user ? (
            <>
              <li className="nav-item">
                <div className="nav-link" onClick={handleSubmit}>
                  <IoIosLogOut className="nav-icon" />
                  Logout
                </div>
              </li>
            </>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default LeftSideBar;
