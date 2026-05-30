import React from "react";
import styles from "./TransactionSkeleton.module.scss";

export default function TransactionSkeleton() {

  return (

    <div className={styles.wrapper}>

      {[1, 2, 3, 4, 5].map((item) => (

        <div
          key={item}
          className={styles.card}
        >

          {/* LEFT */}

          <div className={styles.left}>

            <div
              className={`${styles.icon} ${styles.shimmer}`}
            ></div>

            <div className={styles.texts}>

              <div
                className={`${styles.title} ${styles.shimmer}`}
              ></div>

              <div
                className={`${styles.date} ${styles.shimmer}`}
              ></div>

            </div>

          </div>

          {/* RIGHT */}

          <div className={styles.right}>

            <div
              className={`${styles.amount} ${styles.shimmer}`}
            ></div>

            <div
              className={`${styles.status} ${styles.shimmer}`}
            ></div>

            <div
              className={`${styles.arrow} ${styles.shimmer}`}
            ></div>

          </div>

        </div>
      ))}

    </div>
  );
}