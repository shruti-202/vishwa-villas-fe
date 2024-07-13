import React, { useContext, useEffect, useState } from "react";
import LoginPage from "../LoginPage/LoginPage";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { numberToCommaString } from "../../utility/numberUtils";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { errorAlert, successAlert } from "../../utility/alert";
import "./ProfilePage.css";

function ProfilePage() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  return (
    <div className="profile">{userInfo ? <Profile /> : <LoginPage />}</div>
  );
}

function Profile() {
  const [toggleAdList, setToggleAdList] = useState(false);
  const [profileDetails, setProfileDetails] = useState(null);
  const [adList, setAdList] = useState(null);
  const { setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/profile-setting`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileDetails(data.data.profileDetails);
        setAdList(data.data.adList);
      });
  }, []);

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
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-images">
          {profileDetails ? profileDetails.name[0] : "V"}
        </div>
        {profileDetails && (
          <>
            <div className="profile-name">{profileDetails.name}</div>
            <div className="profile-email">{profileDetails.email}</div>
            <div className="profile-phone">{profileDetails.phone}</div>
          </>
        )}
      </div>
      <div className="profile-settings">
        <div className="settings-header">Settings</div>
        <div className="settings-item">
          <span>Logout</span>{" "}
          <ExitToAppIcon style={{ fontSize: "24px" }} onClick={logoutHandler} />
        </div>
      </div>
      <div className="profile-ad-listing">
        <div
          className="profile-ad-header"
          onClick={() => setToggleAdList(!toggleAdList)}
        >
          <span>Your Listings</span>
          {toggleAdList ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </div>
        {toggleAdList &&
          (adList.length > 0 ? (
            <div className="profile-ad-list">
              {adList.map((ad, index) => (
                <ProfileAdItem
                  key={index}
                  adId={ad.id}
                  title={ad.title}
                  location={ad.location}
                  listType={ad.listType}
                  price={ad.price}
                  img={ad.img}
                />
              ))}
            </div>
          ) : (
            <div className="profile-ad-no-item"> No Item</div>
          ))}
      </div>
    </div>
  );
}

function ProfileAdItem({ adId, img, title, location, price, listType }) {
  return (
    <Link to={"/item/" + adId}>
      <div className="profile-ad-item">
        <div className="profile-ad-item-left">
          <div className="profile-ad-item-img">
            <img src={img} alt="profile-img" />
          </div>
        </div>
        <div className="profile-ad-item-right">
          <div className="profile-ad-item-header">{title}</div>
          <div className="profile-ad-item-location">{location}</div>
          <div className="profile-ad-item-price-type">
            <div className="profile-ad-item-price">
              {numberToCommaString(price)}₹
            </div>
            <div className="profile-ad-item-type">{listType}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProfilePage;
