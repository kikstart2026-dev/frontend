import React from "react";
import { NavLink } from "react-router-dom";
import kiklogo from "../../assets/images/authLogo.png";


import styles from "./DashboardSidebar.module.scss";

export default function DashboardSidebar() {
  return (
    <div className={styles.sidebar}>
      <div className="d-flex align-items-center">
           <img src={kiklogo} alt="logo" className={styles.logo} />
       </div>

      <nav>
        <NavLink to="/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/dashboard/programs">
          Programs
        </NavLink>

        <NavLink to="/dashboard/children-profile">
          Children Profile
        </NavLink>

        <NavLink to="/dashboard/transactions">
          My Transactions
        </NavLink>

        <NavLink to="/dashboard/messages">
          Message
        </NavLink>
      </nav>
    </div>
  );
}