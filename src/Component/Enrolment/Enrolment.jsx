import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Enrolment.module.scss";
import Button from "../Buttons/Button";
import {
  handleError,
  handleSuccess,
} from "../../utils";
import { kikpayment, saveSubscription, } from "../../apis/api";

export default function Enrolment({ data, type }) {

  const navigate = useNavigate();

  // IMPORTANT
  if (!data) {
    return <div>Loading...</div>;
  }

  const handlePayment = async () => {
    try {
      const amount =
        type === "monthly"
          ? Number(data.amount)
          : Number(data.amount);

      const order = await kikpayment({
        amount,
        currency: "INR",
      });

      const options = {
        key: "rzp_test_SmWo5iYYM6AC9h",
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,

        name: "KikSTART",
        description: `${data.planName} Plan Payment`,

        handler:
          async function (
            response
          ) {

            try {

              const user =
                JSON.parse(

                  localStorage.getItem(
                    "user"
                  )

                );

              // SAVE SUBSCRIPTION

              const payload = {

                fullname:
                  user?.fullName,

                email:
                  user?.email,

                phone:
                  user?.phone,

                subscriptionId:
                  data._id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_order_id:
                  response.razorpay_order_id,

              };

              const saveRes =
                await saveSubscription(
                  payload
                );

              if (
                saveRes.success
              ) {

                handleSuccess(
                  "Subscription Activated!"
                );

                setTimeout(() => {

                  navigate(
                    "/dashboard/children-profile"
                  );

                }, 1000);

              } else {

                handleError(
                  "Subscription Save Failed"
                );
              }

            } catch (error) {

              console.log(error);

              handleError(
                "Subscription Error"
              );
            }
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

  const featureLabels = {

    feature1:
      `Maximum ${data.maxChildren} Children Access`,

    feature2:
      `${data.durationDays} Days Subscription`,

    feature3:
      "Premium Activities",

    feature4:
      "Food Tracking",

    feature5:
      "Premium Support",

    feature6:
      "Advanced Analytics",

  };

  return (
    <div className={`card ${styles.planCard}`}>
      <div className="card-body p-0">

        <span className={styles.badge}>
          {data?.planName?.toUpperCase()}
        </span>

        <p className={styles.desc}>
          {data.description}
        </p>

        <div className={styles.priceWrap}>
          <h2 className={styles.price}>
            ₹{data.amount}
          </h2>

          <span className={styles.per}>
            {data.durationDays} Days
          </span>

        </div>

        <ul className={styles.featureList}>

          {

            Object.entries(
              featureLabels
            ).map(([key, label]) => (

              <li
                key={key}

                className={
                  !data.permissions?.[key]
                    ? styles.disabled
                    : ""
                }
              >

                {label}

              </li>

            ))
          }

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