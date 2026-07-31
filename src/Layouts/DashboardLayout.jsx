import { Outlet } from "react-router-dom";

import DashboardSidebar from "../Shared/DashboardSidebar/DashboardSidebar";
import DashboardHeader from "../Shared/DashboardHeader/DashboardHeader";

import styles from "./DashboardLayout.module.scss";

export default function DashboardLayout() {
  return (
    <div className={styles.layout}>

      {/* Full Width Header */}
      <DashboardHeader />

      <div className={styles.body}>

        <DashboardSidebar />

        <main className={styles.main}>
          <div className={styles.mainContent}>
            <Outlet />
          </div>
        </main>

      </div>

    </div>
  );
}