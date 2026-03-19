import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import kikstart from "../../assets/images/KIKSTART_logo.png";
import styles from "./Header.module.scss";
import Button from "../../Component/Buttons/Button";
import { logoutUser } from "../../apis/api";
import { handleError, handleSuccess } from "../../utils";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
    onSuccess: () => {
      Cookies.remove("token");
      localStorage.removeItem("verifyEmail");
      handleSuccess("Logged out successfully ✅");
    },
    onError: (error) => {
      handleError(error?.response?.data?.message || "Logout failed ❌");
    },
  });

  const handleLogoutClick = () => setShowLogoutModal(true);

  // ================= LOCK SCROLL & FIX BACKGROUND =================
  useEffect(() => {
    const callDiv = document.querySelector(`.${styles.call}`);
    if (!callDiv) return;

    if (showLogoutModal) {
      const scrollY = window.scrollY;
      callDiv.style.position = "fixed";
      callDiv.style.top = `-${scrollY}px`;
      callDiv.style.width = "100%";
      document.body.style.overflow = "hidden";

      // store scroll position
      callDiv.dataset.scrollY = scrollY;
    } else {
      const scrollY = callDiv.dataset.scrollY || 0;
      callDiv.style.position = "";
      callDiv.style.top = "";
      callDiv.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    }
  }, [showLogoutModal]);

  return (
    <>
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

      {/* ================= LOGOUT MODAL ================= */}
      {showLogoutModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.logoutToast}>
            <div className={styles.logoutIconCircle}>
              <div className={styles.logoutIcon}>
                <i className="bi bi-box-arrow-left"></i>
              </div>
            </div>

            <p className={styles.logoutText}>
              Are you sure you want to logout?
            </p>

            <div className={styles.logoutActions}>
              <button
                className={styles.btnCancel}
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>

              <button
                className={styles.btnConfirm}
                onClick={() => {
                  if (!email) {
                    handleError("Email not found ❌");
                    return;
                  }
                  logoutMutate({ email });
                  setShowLogoutModal(false);
                }}
              >
                {isPending ? "Logging..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}