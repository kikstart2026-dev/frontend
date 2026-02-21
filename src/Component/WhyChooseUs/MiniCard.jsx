import React from "react";
import styles from "./MiniCard.module.scss";
import "../../Main.scss"; 

export default function MiniCard({ icon, title, description, color }) {
  return (
    <div className={styles["mini-card"]}>
      <figure
        className={styles["icon-box"]}
        style={{ backgroundColor: color }}
      >
        <img src={icon} alt={title} />
      </figure>

      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}