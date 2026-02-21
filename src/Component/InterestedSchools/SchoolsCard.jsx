import React from "react";
import styles from "./SchoolsCard.module.scss";
import "../../Main.scss";

export default function SchoolsCard({
  image,
  title,
  description,
  coach,
  author,
  authorImg,
}) {
  return (
    <div className={styles.schoolsCard}>
      <div className={styles.cardImg}>
        <img src={image} alt={title} />
      </div>

      <div className={styles.cardContent}>
        <h3>{title}</h3>
        <p>{description}</p>

        <div className={styles.cardAuthor}>
          <span>
            <img src={authorImg} alt={author} />
          </span>

          <div className={styles.author}>
            <p className={styles.coach}>{coach}</p>
            <p>{author}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
