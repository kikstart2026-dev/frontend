import React, { useEffect, useState } from "react";

import styles from "./DashboardHeader.module.scss";

export default function DashboardHeader({
  title = "Dashboard",
}) {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdmin =
      localStorage.getItem("adminUser");

    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  return (
    <div className={styles.topbar}>
      <h2>{title}</h2>

      <div className={styles.userBox}>
        {admin?.image ? (
          <img
            src={admin.image}
            alt="user"
            className={styles.avatar}
          />
        ) : (
          <div className={styles.fallbackAvatar}>
            {admin?.fullname?.charAt(0) || "U"}
          </div>
        )}

        <span>
          Welcome,{" "}
          {admin?.fullname || "User"}
        </span>
      </div>
    </div>
  );
}