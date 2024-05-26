import React, { useContext } from "react";
import "./Header.css";
import Logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

function Header() {
  const { userInfo } = useContext(UserContext);
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
                <Link to="/create">Create Post</Link>
                <Link>Log Out</Link>
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
