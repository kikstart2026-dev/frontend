import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import kikstart from "../../assets/images/KIKSTART_logo.png";
import styles from "./Header.module.scss";
import Button from "../../Component/Buttons/Button";
import { logoutUser } from "../../apis/api";

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
      Cookies.remove("token");                 // ✅ remove token
      localStorage.removeItem("verifyEmail");  // ✅ remove email
      toast.success(data?.message || "Logged out successfully ✅");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Logout failed ❌");
    },
  });

  // ================= LOGOUT POPUP =================
  const handleLogoutClick = () => {
    toast(
      ({ closeToast }) => (
        <div style={{ textAlign: "center" }}>
          <p style={{ marginBottom: "15px", fontWeight: "500" }}>
            Are You Sure Want To Logout?
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <button
              onClick={() => closeToast()}
              style={{
                padding: "6px 15px",
                borderRadius: "20px",
                border: "none",
                background: "#333",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>

            <button
              onClick={() => {
                if (!email) {
                  toast.error("Email not found ❌");
                  return;
                }
                logoutMutate({ email }); // ✅ send email to backend
                closeToast();
              }}
              style={{
                padding: "6px 15px",
                borderRadius: "20px",
                border: "none",
                background: "#ff2d2d",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              {isPending ? "Logging out..." : "Yes"}
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
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
              <Button
                text="Logout"
                variant="dark"
              />
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