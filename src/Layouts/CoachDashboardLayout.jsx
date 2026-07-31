import React from "react";
import { Outlet } from "react-router-dom";

import CoachSidebar from "../Shared/CoachSidebar/CoachSidebar";
import CoachHeader from "../Shared/CoachHeader/CoachHeader";

import styles from "./CoachDashboardLayout.module.scss";

export default function CoachDashboardLayout() {
  return (
    <div className={styles.layout}>

      {/* Full Width Header */}
      <CoachHeader />

      {/* Dashboard Body */}
      <div className={styles.body}>

        <aside className={styles.sidebar}>
          <CoachSidebar />
        </aside>

        <main className={styles.main}>
          <div className={styles.content}>
            <Outlet />
          </div>
        </main>

      </div>

    </div>
  );
}