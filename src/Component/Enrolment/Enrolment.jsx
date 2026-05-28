import React from "react";

import { useNavigate }
  from "react-router-dom";

import styles
  from "./Enrolment.module.scss";

import Button
  from "../Buttons/Button";

import {

  handleError,

  handleSuccess,

} from "../../utils";

import {

  kikpayment,
  saveSubscription,

} from "../../apis/api";


export default function Enrolment({

  data,

  type,

}) {

  const navigate =
    useNavigate();

  // IMPORTANT
  if (!data) {

    return (
      <div>
        Loading...
      </div>
    );
  }

  const handlePayment =
    async () => {

      try {

        // ================= USER =================

        const user =
          JSON.parse(

            localStorage.getItem(
              "user"
            )

          );

        if (!user) {

          return handleError(
            "Please Login First"
          );
        }

        // ================= AMOUNT =================

        const amount =

          type === "monthly"

            ? Number(data.amount)

            : Number(data.amount);

        // ================= CREATE ORDER =================

        const order =
          await kikpayment({

            amount,

            currency:
              "INR",

          });

        // ================= RAZORPAY OPTIONS =================

        const options = {

         key: "rzp_test_SmWo5iYYM6AC9h",

          amount:
            order.amount,

          currency:
            order.currency,

          order_id:
            order.id,

          name:
            "KikSTART",

          description:
            `${data.planName} Plan Payment`,

          // ================= PAYMENT SUCCESS =================

          handler:

            async function (
              response
            ) {

              try {

                const payload = {

                  fullname:
                    user?.fullname,

                  email:
                    user?.email,

                  phone:
                    user?.phone,

                  subscriptionId:
                    data._id,

                  payment_id:

                    response
                      .razorpay_payment_id,

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

                    saveRes.message ||

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

          // ================= PREFILL =================

          prefill: {

            name:
              user?.fullname || "",

            email:
              user?.email || "",

            contact:
              user?.phone || "",

          },

          // ================= THEME =================

          theme: {
            color: "#000000",
          },

          // ================= MODAL CLOSE =================

          modal: {

            ondismiss:
              function () {

                handleError(
                  "Payment Cancelled"
                );

              },

          },

        };

        // ================= OPEN RAZORPAY =================

        const razor =
          new window.Razorpay(
            options
          );

        // ================= PAYMENT FAILED =================

        razor.on(

          "payment.failed",

          function (
            response
          ) {

            console.log(
              response.error
            );

            handleError(

              response.error
                ?.description ||

              "Payment Failed"

            );

          }

        );

        razor.open();

      } catch (error) {

        console.error(

          "Payment Error:",

          error

        );

        handleError(
          "Payment Failed"
        );
      }
    };

  // ================= FEATURES =================

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

    <div
      className={`card ${styles.planCard}`}
    >

      <div
        className="card-body p-0"
      >

        {/* ================= FREE RIBBON ================= */}

        {(

          Number(data.amount) === 399 ||

          Number(data.amount) === 799

        ) && (

          <div
            className={
              styles.freeDaysRibbon
            }
          >

            <span>

              {

                Number(data.amount) === 399

                  ? "29 Days"

                  : "39 Days"

              }

            </span>

            <span>
              Free
            </span>

          </div>
        )}

        {/* ================= PLAN NAME ================= */}

        <span
          className={styles.badge}
        >

          {data?.planName?.toUpperCase()}

        </span>

        {/* ================= DESCRIPTION ================= */}

        <p
          className={styles.desc}
        >

          {data.description}

        </p>

        {/* ================= PRICE ================= */}

        <div
          className={styles.priceWrap}
        >

          <h2
            className={styles.price}
          >

            ₹{data.amount}

          </h2>

          <span
            className={styles.per}
          >

            {data.durationDays} Days

          </span>

        </div>

        {/* ================= FEATURES ================= */}

        <ul
          className={
            styles.featureList
          }
        >

          {Object.entries(
            featureLabels
          ).map(

            ([key, label]) => (

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

            )

          )}

        </ul>

        {/* ================= BUTTON ================= */}

        <Button

          className={
            styles.subscribeBtn
          }

          text="SUBSCRIBE"

          variant="primary"

          onClick={
            handlePayment
          }

        />

      </div>

    </div>
  );
}