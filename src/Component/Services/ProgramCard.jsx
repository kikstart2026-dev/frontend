import React from "react";
import styles from "./ProgramCard.module.scss";
import { Link } from "react-router-dom";

export default function ProgramCard({ image, title, description, details2, video }) {
  return (
    <Link
      to="/ProgramDeatailsPage"
      state={{ image, title, description, details2, video }}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className={styles.card}>
        <img src={image} alt={title} />

        <div className={styles.overlay}>
          <div className={styles.content}>
            <h3>{title}</h3>
            <p className={styles.clamp2}>
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
