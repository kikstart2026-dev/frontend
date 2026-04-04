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
      <div className={styles["program-card"]}>
        <figure>
          <img src={image} alt={title} />
        </figure>

        <div className={styles.overlay}>
          <h3>{title}</h3>
          <p dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
      </div>
    </Link>
  );
}