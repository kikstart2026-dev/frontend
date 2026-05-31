import React from "react";
import styles from "./UserDashboardSkeleton.module.scss";

export default function UserDashboardSkeleton() {
  return (
    <div className={styles.dashboardSkeleton}>

      <div className={styles.title}></div>

      <div className={styles.statsGrid}>
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className={styles.card}></div>
        ))}
      </div>

      <div className={styles.middleGrid}>

        <div className={styles.planCard}>
          <div className={styles.heading}></div>
          <div className={styles.progress}></div>
          <div className={styles.line}></div>
          <div className={styles.lineSmall}></div>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.heading}></div>
          <div className={styles.chart}></div>

          {[1, 2].map((item) => (
            <div key={item} className={styles.legend}></div>
          ))}
        </div>

      </div>

    </div>
  );
}