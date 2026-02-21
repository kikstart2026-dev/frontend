import React from "react";
import styles from "./Enrolment.module.scss";
import Button from "../Buttons/Button";

export default function Enrolment({ data, type }) {
  return (
    <div className={`card ${styles.planCard}`}>
      <div className="card-body p-0">

        <span className={styles.badge}>{data.name.toUpperCase()}</span>

        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur. Pharetra et ac vitae.
        </p>

        <div className={styles.priceWrap}>
          <h2 className={styles.price}>
            ${type === "monthly" ? data.monthly : data.onetime}
          </h2>
          <span className={styles.per}>
            {type === "monthly" ? "Per Month" : "One Time"}
          </span>
        </div>

        <ul className={styles.featureList}>
          {data.features.map((feature, index) => (
            <li
              key={index}
              className={!feature.included ? styles.disabled : ""}
            >
              
              {feature.text}
            </li>
          ))}
        </ul>


         <Button className={styles.subscribeBtn} text="SUBSCRIBE" variant="primary" onClick={() => console.log('Clicked!')} />

      </div>
    </div>
  );
}