import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import kiklogo from "../../assets/images/authLogo.png";
import styles from "./DashboardHeader.module.scss";

export default function DashboardHeader() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const location = useLocation();

  // ================= GET USER =================
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ================= SCROLL LOCK =================
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);



  // ================= SCROLL LOCK =================
useEffect(() => {
  if (open) {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
  } else {
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
  };
}, [open]);

  // ================= ROUTE BASED TITLE =================
  const getTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";

      case "/dashboard/messages":
        return "Message";

      case "/dashboard/transactions":
        return "My Transactions";

      case "/dashboard/programs":
        return "Programs";

      case "/dashboard/children-profile":
        return "Children Profile";

      default:
        return "Dashboard";
    }
  };

  return (
    <>
      <div className={styles.topbar}>
        {/* LEFT LOGO */}
        

        {/* TITLE */}
        <h2>{getTitle()}</h2>

        {/* USER SECTION */}
        <div
          className={styles.userWrapper}
          onClick={() => setOpen(true)}
          style={{ cursor: "pointer" }}
        >
          <div className={styles.userBox}>
            {user?.image ? (
              <img
                src={user.image}
                alt="user"
                className={styles.avatar}
              />
            ) : (
              <div className={styles.fallbackAvatar}>
                {user?.fullname?.charAt(0) || "U"}
              </div>
            )}

            <span>
              Welcome, {user?.fullname || "User"}
            </span>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {open && (
        <div
          className={styles.modalOverlay}
          onClick={() => setOpen(false)}
        >
          <div
            className={styles.modalBox}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={styles.modalTitle}>
              User Details
            </h3>

            {user?.image ? (
              <img
                src={user.image}
                alt="user"
                className={styles.modalImage}
              />
            ) : (
              <div className={styles.modalFallback}>
                {user?.fullname?.charAt(0) || "U"}
              </div>
            )}

            <div className={styles.modalInfo}>
              <p>
                <b>Name:</b> {user?.fullname || "N/A"}
              </p>

              <p>
                <b>Email:</b> {user?.email || "N/A"}
              </p>

              <p>
                <b>Phone:</b> {user?.phone || "N/A"}
              </p>

              <p>
                <b>Location:</b> {user?.location || "N/A"}
              </p>

              <p>
                <b>Passcode:</b> {user?.passcode || "N/A"}
              </p>
            </div>

            <button
              className={styles.modalCloseBtn}
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}