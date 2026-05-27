import React, { useState,useEffect } from "react";
import styles from "./EnrolmentSection.module.scss";

import {
  getAllPlans, getUserActivePlan
} from "../../../apis/api";
import Enrolment from "../Enrolment";

export default function EnrolmentSection() {
  const [planType, setPlanType] = useState("monthly");
  const [plans, setPlans] = useState([]);
  const [activePlan, setActivePlan] = useState(null);


  useEffect(() => {

  fetchPlans();
  fetchActivePlan();

}, []);

const fetchPlans =
  async () => {

    try {

      const res =
        await getAllPlans();

      if (res.success) {

        setPlans(res.plans);

      }

    } catch (error) {

      console.log(error);

    }
  };

  const fetchActivePlan =
  async () => {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      if (!user?.email) return;

      const res =
        await getUserActivePlan(
          user.email
        );

      if (res.success) {

        setActivePlan(
          res.subscription
        );

      }

    } catch (error) {

      console.log(error);

    }
  };

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
       {/* Cards */}
<div className="row g-4">

 {
    plans

      ?.filter((item) =>

        planType === "monthly"

          ? item.durationDays <= 30

          : item.durationDays > 30

      )

      ?.map((item) => (

        <div
          key={item._id}
          className="col-4 p-0 px-2"
        >

          <Enrolment
            data={item}
            type={planType}
          />

        </div>

      ))
  }

</div>

      </div>
    </section>
  );
}