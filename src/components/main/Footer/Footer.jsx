import React, { useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

const footerNavLink = [
  {
    link: "/",
    icon: HomeOutlinedIcon,
    color: "var(--secondary-color)",
    activeColor: "var(--primary-color)",
  },
  {
    link: "/create",
    icon: AddCircleOutlinedIcon,
    color: "var(--secondary-color)",
    activeColor: "var(--primary-color)",
  },
  {
    link: "/profile",

    icon: PersonOutlineOutlinedIcon,
    color: "var(--secondary-color)",
    activeColor: "var(--primary-color)",
  },
];

function Footer() {
  const [activePath, setActivePath] = useState();

  return (
    <>
    <div className="footer-pad"></div>
     <footer>
      <div className="footer-container">
        {footerNavLink.map((navLink, index) => (
          <FooterNavLink
            key={index}
            Icon={navLink.icon}
            link={navLink.link}
            color={navLink.color}
            activeColor={navLink.activeColor}
            activePath={activePath}
            setActivePath={setActivePath}
          />
        ))}
      </div>
    </footer>
    </>
  );
}

const FooterNavLink = ({
  Icon,
  link,
  color,
  activeColor,
  activePath,
  setActivePath,
}) => {
  return (
    <div className="footer-nav-link">
      <Link to={link} onClick={() => setActivePath(link)}>
        <Icon style={{ color: activePath === link ? activeColor : color }} />
      </Link>
    </div>
  );
};

export default Footer;
