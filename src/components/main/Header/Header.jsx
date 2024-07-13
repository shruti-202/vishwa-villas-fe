import React, { useContext } from "react";
import "./Header.css";
import Logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { errorAlert, successAlert } from "../../../utility/alert";

function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const logoutHandler = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    setUserInfo(null);

    const data = await response.json();
    if (response.ok) {
      successAlert(data.success, "success");
      setUserInfo(data.data);
    } else {
      errorAlert(data.error, "error");
    }
  };

  return (
    <header>
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="header-left-brand">
            <img src={Logo} alt="logo" />
            <h2>Vishwa-Villas</h2>
          </Link>
        </div>
        <div className="header-right">
          <div className="header-right-login">
            {userInfo ? (
              <>
                <Link to="/create">List My Property</Link>
                <Link to="/profile">Profile</Link>
                <Link onClick={logoutHandler}>Log Out</Link>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
