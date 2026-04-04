import React from "react";
import styles from "./ProgramCard.module.scss";

export default function ProgramCard({ image, title, description }) {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} />

      <div className={styles.overlay}>
        <div className={styles.content}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}