import React from "react";
import styles from "./Enrolment.module.scss";
import Button from "../Buttons/Button";
import {handleError, handleSuccess, handleWarning, handleConfirm, } from "../../utils"
import { kikpayment } from "../../apis/api";

export default function Enrolment({ data, type }) {

  const handlePayment = async () => {
    try {

      // Dynamic amount
      const amount =
        type === "monthly"
          ? Number(data.monthly)
          : Number(data.onetime);

      // Create Razorpay Order
      const order = await kikpayment({
        amount,
        currency: "INR",
      });

      const options = {
        key: "rzp_test_SmWo5iYYM6AC9h",

        amount: order.amount,
        currency: order.currency,
        order_id: order.id,

        name: "Your App Name",
        description: `${data.name} Plan Payment`,

        handler: function (response) {
          console.log("Payment Success:", response);

          handleSuccess("Payment Successful!");
        },

        prefill: {
          name: "",
          email: "",
          contact: "",
        },

        theme: {
          color: "#000000",
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();

    } catch (error) {
      console.error("Payment Error:", error);
      handleError("Payment Failed");
    }
  };

  return (
    <div className={`card ${styles.planCard}`}>
      <div className="card-body p-0">

        <span className={styles.badge}>
          {data.name.toUpperCase()}
        </span>

        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur.
          Pharetra et ac vitae.
        </p>

        <div className={styles.priceWrap}>
          <h2 className={styles.price}>
            ₹{type === "monthly"
              ? data.monthly
              : data.onetime}
          </h2>

          <span className={styles.per}>
            {type === "monthly"
              ? "Per Month"
              : "One Time"}
          </span>
        </div>

        <ul className={styles.featureList}>
          {data.features.map((feature, index) => (
            <li
              key={index}
              className={
                !feature.included
                  ? styles.disabled
                  : ""
              }
            >
              {feature.text}
            </li>
          ))}
        </ul>

        <Button
          className={styles.subscribeBtn}
          text="SUBSCRIBE"
          variant="primary"
          onClick={handlePayment}
        />

      </div>
    </div>
  );
}