import React from "react";
import styles from "./ProgramCard.module.scss"; // ✅ MUST
import { Link } from "react-router-dom"; // ✅ MUST

export default function ProgramCard({ id, image, title, description }) {
  return (
    <Link
      to="/ProgramDeatailsPage" // ✅ SAME URL (no change)
      state={{ id }} // ✅ ONLY ID PASS
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className={styles.card}>
        <img src={image} alt={title} />

        <div className={styles.overlay}>
          <div className={styles.content}>
            <h3>{title}</h3>
            <p className={styles.clamp2}>{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
