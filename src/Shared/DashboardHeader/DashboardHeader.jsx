
import React from "react";

import styles from "./DashboardHeader.module.scss";

export default function DashboardHeader({
  title = "Dashboard",
}) {
  return (
    <div className={styles.topbar}>
      <h2>{title}</h2>

      <div className={styles.userBox}>
        <img
          src="https://i.pravatar.cc/40"
          alt="user"
        />

        <span>Welcome, John</span>
      </div>
    </div>
  );
}
