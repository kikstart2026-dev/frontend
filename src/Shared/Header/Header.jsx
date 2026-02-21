import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import kikstart from "../../assets/images/KIKSTART_logo.png";
import styles from "./Header.module.scss";
import Button from "../../Component/Buttons/Button";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "About Us", path: "/about" },
    { name: "Programs", path: "/programs" },
    { name: "Why Us", path: "/why-us" },
    { name: "Contact Us", path: "/contact" },
    { name: "Interested Schools", path: "/Interested-Schools" },
    { name: "Become A Coach", path: "/coach" },
    { name: "Coach's Login", path: "/coach-login" },
  ];

  return (
    <div className={styles.call}>
      <div className={styles["nav-bar"]}>

        {/* Logo */}
        <Link to="/">
          <img src={kikstart} alt="logo" />
        </Link>

        {/* Hamburger */}
        <button
          className={`${styles["navbar-toggler"]} d-lg-none`}
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Nav Menu */}
        <ul className={`${styles.nav} ${isOpen ? styles.open : ""}`}>
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Side Buttons */}
        <div className={`${styles["header-right"]} d-none d-lg-flex`}>
          <Link to="/signin" className={styles["btn-login"]}>
            <Button text="Login" variant="dark" />
          </Link>

          <Link to="/demo">
            <Button text="REQUEST A FREE DEMO" variant="primary" />
          </Link>
        </div>
      </div>
    </div>
  );
}