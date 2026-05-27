import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./DashboardSidebar.module.scss";
import kiklogo from "../../assets/images/authLogo.png";
export default function DashboardSidebar() {
  return (
    <div className={styles.sidebar}>

      <div className={styles.navLogo}>
                <NavLink to="/">
                  <img
                    src={kiklogo}
                    alt="logo"
                    className={styles.logo}
                  />
                </NavLink>
              </div>
      <nav>
        {/* DASHBOARD */}
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            isActive ? styles.active : styles.link
          }
        >
          <i className={`bi bi-speedometer2 ${styles.icon}`}></i>
          <span>Dashboard</span>
        </NavLink>

        {/* PROGRAMS */}
        <NavLink
          to="/dashboard/programs"
          className={({ isActive }) =>
            isActive ? styles.active : styles.link
          }
        >
          <i className={`bi bi-grid ${styles.icon}`}></i>
          <span>Programs</span>
        </NavLink>

        {/* CHILDREN PROFILE */}
        <NavLink
          to="/dashboard/children-profile"
          className={({ isActive }) =>
            isActive ? styles.active : styles.link
          }
        >
          <i className={`bi bi-people ${styles.icon}`}></i>
          <span>Children Profile</span>
        </NavLink>

        {/* TRANSACTIONS */}
        <NavLink
          to="/dashboard/transactions"
          className={({ isActive }) =>
            isActive ? styles.active : styles.link
          }
        >
          <i className={`bi bi-cash-stack ${styles.icon}`}></i>
          <span>My Transactions</span>
        </NavLink>

        {/* MESSAGES */}
        <NavLink
          to="/dashboard/messages"
          className={({ isActive }) =>
            isActive ? styles.active : styles.link
          }
        >
          <i className={`bi bi-chat-dots ${styles.icon}`}></i>
          <span>Message</span>
        </NavLink>
      </nav>
    </div>
  );
}