import React from "react";
import styles from "./ChildrenProfileSkeleton.module.scss";

export default function ChildrenProfileSkeleton() {

  return (

    <div className={styles.wrapper}>

      {/* TOP BAR */}

      <div className={styles.topBar}>

        <div className={styles.tabs}>

          {[1,2,3,4,5].map((item) => (
            <div
              key={item}
              className={`${styles.tab} ${styles.shimmer}`}
            ></div>
          ))}

        </div>

        <div
          className={`${styles.addBtn} ${styles.shimmer}`}
        ></div>

      </div>

      {/* MAIN CONTENT */}

      <div className={styles.content}>

        {/* LEFT */}

        <div className={styles.leftSection}>

          <div
            className={`${styles.fullCard} ${styles.shimmer}`}
          ></div>

          <div className={styles.row}>

            <div
              className={`${styles.card} ${styles.shimmer}`}
            ></div>

            <div
              className={`${styles.card} ${styles.shimmer}`}
            ></div>

          </div>

          {[1,2,3,4].map((item) => (
            <div
              key={item}
              className={`${styles.card} ${styles.shimmer}`}
            ></div>
          ))}

        </div>

        {/* RIGHT */}

        <div className={styles.rightSection}>

          {/* PROFILE CARD */}

          <div className={styles.profileCard}>

            <div
              className={`${styles.image} ${styles.shimmer}`}
            ></div>

            <div
              className={`${styles.name} ${styles.shimmer}`}
            ></div>

            <div
              className={`${styles.age} ${styles.shimmer}`}
            ></div>

            <div
              className={`${styles.button} ${styles.shimmer}`}
            ></div>

          </div>

          {/* PAYMENT CARD */}

          <div className={styles.paymentCard}>

            <div className={styles.planTop}>

              <div
                className={`${styles.planText} ${styles.shimmer}`}
              ></div>

              <div
                className={`${styles.badge} ${styles.shimmer}`}
              ></div>

            </div>

            <div
              className={`${styles.planTitle} ${styles.shimmer}`}
            ></div>

            <div
              className={`${styles.planDesc} ${styles.shimmer}`}
            ></div>

            <div
              className={`${styles.price} ${styles.shimmer}`}
            ></div>

            <div className={styles.bottom}>

              <div className={styles.bottomItem}>
                <div
                  className={`${styles.smallText} ${styles.shimmer}`}
                ></div>

                <div
                  className={`${styles.mediumText} ${styles.shimmer}`}
                ></div>
              </div>

              <div className={styles.bottomItem}>
                <div
                  className={`${styles.smallText} ${styles.shimmer}`}
                ></div>

                <div
                  className={`${styles.mediumText} ${styles.shimmer}`}
                ></div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}