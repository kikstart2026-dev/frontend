import React from "react";
import styles from "./ProgramCard.module.scss";
import { Link } from "react-router-dom";

export default function ProgramCard({ image, title, description, details2, video }) {
  return (
<<<<<<< HEAD
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
=======
    <div className={styles.card}>
      <img src={image} alt={title} />

      <div className={styles.overlay}>
        <div className={styles.content}>
          <h3>{title}</h3>
          <p>{description}</p>
>>>>>>> dc8edad0ed8459483b84ebe0cdf3110f5fdfc6ae
        </div>
      </div>
    </Link>
  );
}