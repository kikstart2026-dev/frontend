import { Outlet } from "react-router-dom";

import DashboardSidebar from "../Shared/DashboardSidebar/DashboardSidebar";
import DashboardHeader from "../Shared/DashboardHeader/DashboardHeader";

import styles from "./DashboardLayout.module.scss";

export default function DashboardLayout() {
  return (
    <div className={styles.layout}>
      <DashboardSidebar />

      <div className={styles.main}>
        <DashboardHeader />

      <div className={styles.mainContent}>
        <Outlet />
      </div>
      </div>
    </div>
  );
}