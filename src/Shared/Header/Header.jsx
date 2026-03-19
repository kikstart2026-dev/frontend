import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import kikstart from "../../assets/images/KIKSTART_logo.png";
import styles from "./Header.module.scss";
import Button from "../../Component/Buttons/Button";
import { logoutUser } from "../../apis/api";
import { handleError, handleSuccess } from "../../utils";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const token = Cookies.get("token");
  const email = localStorage.getItem("verifyEmail"); // ✅ get email

  const navItems = [
    { name: "About Us", path: "/about" },
    { name: "Programs", path: "/programs" },
    { name: "Why Us", path: "/why-us" },
    { name: "Contact Us", path: "/contact" },
    { name: "Interested Schools", path: "/Interested-Schools" },
    { name: "Become A Coach", path: "/coach" },
    { name: "Coach's Login", path: "/coach-login" },
  ];

  // ================= LOGOUT API =================
  const { mutate: logoutMutate, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      Cookies.remove("token"); // ✅ remove token
      localStorage.removeItem("verifyEmail"); // ✅ remove email
      handleSuccess("Logged out successfully ✅");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Logout failed ❌");
    },
  });

  // ================= LOGOUT POPUP =================
const handleLogoutClick = () => {
  toast(
    ({ closeToast }) => (
      <div className="logout-toast">
        <div className="logout-icon">⚠️</div>

        <p className="logout-text">
          Are you sure you want to logout?
        </p>

        <div className="logout-actions">
          <button className="btn-cancel" onClick={closeToast}>
            Cancel
          </button>

          <button
            className="btn-confirm"
            onClick={() => {
              if (!email) {
                handleError("Email not found ❌ ");
                return;
              }
              logoutMutate({ email });
              closeToast();
            }}
          >
            {isPending ? "Logging..." : "Yes, Logout"}
          </button>
        </div>
      </div>
    ),
    {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      hideProgressBar: true,
      className: "logout-toast-wrapper",
    }
  );
};

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
          {!token ? (
            <Link to="/signin" className={styles["btn-login"]}>
              <Button text="Login" variant="dark" />
            </Link>
          ) : (
            <div
              className={styles["btn-login"]}
              onClick={handleLogoutClick}
              style={{ cursor: "pointer" }}
            >
              <Button text="Logout" variant="dark" />
            </div>
          )}

          <Link to="/demo">
            <Button text="REQUEST A FREE DEMO" variant="primary" />
          </Link>
        </div>
      </div>
    </div>
  );
}
