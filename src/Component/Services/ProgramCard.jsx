import React from "react";
import styles from "./ProgramCard.module.scss";

export default function ProgramCard({ image, title, description }) {
  return (
    <div className={styles["program-card"]}>
      <figure>
        <img src={image} alt={title} />
      </figure>

      <div className={styles.overlay}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}