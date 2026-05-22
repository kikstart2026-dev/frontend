import React, { useEffect, useState } from "react";
import kiklogo from "../../assets/images/authLogo.png";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./DashboardHeader.module.scss";

export default function DashboardHeader() {
  const [admin, setAdmin] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedAdmin = localStorage.getItem("user");

    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  // ✅ ROUTE BASED TITLE
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
    <div className={styles.topbar}>
      {/* LEFT LOGO */}
      <div className="d-flex align-items-center">
        <NavLink to="/">
          <img src={kiklogo} alt="logo" className={styles.logo} />
        </NavLink>
      </div>

      {/* TITLE */}
      <h2>{getTitle()}</h2>

      {/* USER */}
      <div className={styles.userBox}>
        {admin?.user?.image ? (
          <img src={admin.user.image} alt="user" className={styles.avatar} />
        ) : (
          <div className={styles.fallbackAvatar}>
            {admin?.fullname?.charAt(0) || "U"}
          </div>
        )}

        <span>Welcome, {admin?.fullname || "User"}</span>
      </div>
    </div>
  );
}