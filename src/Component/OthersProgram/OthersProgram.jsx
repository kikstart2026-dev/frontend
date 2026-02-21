import React from "react";
import styles from "./OthersProgram.module.scss";

import img1 from "../../assets/images/other1.png";
import img2 from "../../assets/images/other2.png";
import img3 from "../../assets/images/other3.png";
import img4 from "../../assets/images/other4.png";

function OthersProgram() {
  return (
    <section className={styles.othersProgram}>
      <div className="container">
        <h3 className={styles.programTitle}>Program Images</h3>

        <div className={styles.programImages}>
          <div className={styles.imageCard}>
            <img src={img1} alt="program" />
          </div>

          <div className={styles.imageCard}>
            <img src={img2} alt="program" />
          </div>

          <div className={styles.imageCard}>
            <img src={img3} alt="program" />
          </div>

          <div className={styles.imageCard}>
            <img src={img4} alt="program" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default OthersProgram;