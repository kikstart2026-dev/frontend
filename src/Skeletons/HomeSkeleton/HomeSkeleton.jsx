import React from "react";
import styles from "./HomeSkeleton.module.scss";

export default function HomeSkeleton() {
  return (
    <div className={styles.homeSkeleton}>

      {/* Banner */}
      <div className={`${styles.bannerSkeleton} ${styles.shimmer}`}></div>

      {/* Two Side */}
      <div className={`${styles.twoSideSkeleton} ${styles.container}`}>

        <div className={`${styles.left} ${styles.shimmer}`}></div>

        <div className={styles.right}>
          <div className={`${styles.line} ${styles.large} ${styles.shimmer}`}></div>

          <div className={`${styles.line} ${styles.shimmer}`}></div>

          <div className={`${styles.line} ${styles.shimmer}`}></div>

          <div className={`${styles.line} ${styles.small} ${styles.shimmer}`}></div>

          <div className={`${styles.button} ${styles.shimmer}`}></div>
        </div>
      </div>

      {/* Mini Cards */}
      <div className={`${styles.miniCards} ${styles.container}`}>
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className={`${styles.card} ${styles.shimmer}`}
          ></div>
        ))}
      </div>

      {/* Programs */}
      <div className={`${styles.programs} ${styles.container}`}>

        <div className={`${styles.sectionTitle} ${styles.shimmer}`}></div>

        <div className={styles.programGrid}>
          {[1, 2, 3].map((item) => (
            <div key={item} className={styles.programCard}>

              <div className={`${styles.image} ${styles.shimmer}`}></div>

              <div className={styles.content}>

                <div className={`${styles.line} ${styles.large} ${styles.shimmer}`}></div>

                <div className={`${styles.line} ${styles.shimmer}`}></div>

                <div className={`${styles.line} ${styles.small} ${styles.shimmer}`}></div>

                <div className={`${styles.button} ${styles.shimmer}`}></div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className={`${styles.testimonial} ${styles.container}`}>

        <div className={`${styles.sectionTitle} ${styles.shimmer}`}></div>

        <div className={styles.testimonialCards}>
          {[1, 2, 3].map((item) => (
            <div key={item} className={styles.testimonialCard}>

              <div className={`${styles.avatar} ${styles.shimmer}`}></div>

              <div className={`${styles.line} ${styles.shimmer}`}></div>

              <div className={`${styles.line} ${styles.shimmer}`}></div>

              <div className={`${styles.line} ${styles.small} ${styles.shimmer}`}></div>

            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className={`${styles.faq} ${styles.container}`}>

        <div className={`${styles.sectionTitle} ${styles.shimmer}`}></div>

        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className={`${styles.faqItem} ${styles.shimmer}`}
          ></div>
        ))}
      </div>

    </div>
  );
}