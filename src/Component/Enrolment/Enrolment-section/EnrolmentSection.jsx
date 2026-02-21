import React, { useState } from "react";
import styles from "./EnrolmentSection.module.scss";
import EnrolmentData from "../../../data/EnrolmentData";
import Enrolment from "../Enrolment";

export default function EnrolmentSection() {
  const [planType, setPlanType] = useState("monthly");

  return (
    <section className={`container-fluid ${styles.wrapper}`}>
      <div className="container">

        {/* Heading */}
        <div className="text-center">
          <h2 className={styles.heading}>Program Enrolment Package</h2>
          <p className={styles.subText}>
            Lorem ipsum dolor sit amet consectetur
          </p>
        </div>

        {/* Toggle */}
        <div className="d-flex justify-content-center">
          <div className={styles.toggleBox}>
            <button
              className={`${styles.toggleBtn} ${
                planType === "monthly" ? styles.active : ""
              }`}
              onClick={() => setPlanType("monthly")}
            >
              Monthly Subscription Plan
            </button>

            <button
              className={`${styles.toggleBtn} ${
                planType === "onetime" ? styles.active : ""
              }`}
              onClick={() => setPlanType("onetime")}
            >
              Onetime Payment
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="row g-4">
          {EnrolmentData.map((item) => (
            <div key={item.id} className="col-4 p-0 px-2">
              <Enrolment data={item} type={planType} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}