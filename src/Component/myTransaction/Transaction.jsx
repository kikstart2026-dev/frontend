import React, { useEffect, useState } from "react";
import { getAllPayments } from "../../apis/api";

import styles from "./Transaction.module.scss";

export default function Transaction() {

  const [payments, setPayments] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  // ================= LOADING =================

  const [loading, setLoading] = useState(true);

  // ================= FETCH PAYMENTS =================

  useEffect(() => {

    const fetchPayments = async () => {

      try {

        setLoading(true);

        // ================= USER DATA =================

        const userData =
          JSON.parse(
            localStorage.getItem("user")
          );

        const userEmail =
          userData?.email
            ?.toLowerCase()
            ?.trim();

        const userPhone =
          userData?.phone;

        // ================= API =================

        const res =
          await getAllPayments();

        console.log(
          "ALL PAYMENTS : ",
          res
        );

        // ================= FILTER =================

        const filteredPayments =
          res?.payments?.filter(
            (item) => {

              // EMAIL MATCH
              const emailMatch =
                item?.email
                  ?.toLowerCase()
                  ?.trim() ===
                userEmail;

              // PHONE MATCH
              const phoneMatch =
                item?.contact ===
                `+91${userPhone}`;

              return (
                emailMatch ||
                phoneMatch
              );
            }
          );

        console.log(
          "FILTERED PAYMENTS : ",
          filteredPayments
        );

        setPayments(
          filteredPayments || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchPayments();

  }, []);

  // ================= TOGGLE =================

  const toggleAccordion = (index) => {

    if (openIndex === index) {

      setOpenIndex(null);

    } else {

      setOpenIndex(index);
    }
  };

  return (

    <div className={styles.transactionWrapper}>

      {/* ================= LOADING ================= */}

      {loading ? (

        <div
          className={
            styles.noTransaction
          }
        >
          Loading...
        </div>

      ) : payments.length > 0 ? (

        payments.map((item, index) => (

          <div
            className={
              styles.transactionCard
            }
            key={index}
          >

            {/* HEADER */}

            <div
              className={
                styles.transactionHeader
              }
              onClick={() =>
                toggleAccordion(index)
              }
            >

              <h3>
                {
                  item.description
                }
              </h3>

              <i
                className={`bi bi-chevron-down ${styles.arrow} ${
                  openIndex === index
                    ? styles.rotate
                    : ""
                }`}
              ></i>

            </div>

            {/* DETAILS */}

            <div
              className={`${
                styles.transactionBody
              } ${
                openIndex === index
                  ? styles.show
                  : ""
              }`}
            >

              <div
                className={
                  styles.detailsGrid
                }
              >

                <div
                  className={
                    styles.detailBox
                  }
                >
                  <h4>
                    FULL NAME
                  </h4>

                  <p>
                    {item.fullname ||
                      "N/A"}
                  </p>
                </div>

                <div
                  className={
                    styles.detailBox
                  }
                >
                  <h4>
                    EMAIL ADDRESS
                  </h4>

                  <p>
                    {item.email ||
                      "N/A"}
                  </p>
                </div>

                <div
                  className={
                    styles.detailBox
                  }
                >
                  <h4>
                    PHONE NUMBER
                  </h4>

                  <p>
                    {item.contact ||
                      "N/A"}
                  </p>
                </div>

                <div
                  className={
                    styles.detailBox
                  }
                >
                  <h4>
                    PAYMENT ID
                  </h4>

                  <p>
                    {
                      item.payment_id
                    }
                  </p>
                </div>

                <div
                  className={
                    styles.detailBox
                  }
                >
                  <h4>
                    ORDER ID
                  </h4>

                  <p>
                    {
                      item.order_id
                    }
                  </p>
                </div>

                <div
                  className={
                    styles.detailBox
                  }
                >
                  <h4>
                    AMOUNT
                  </h4>

                  <p>
                    ₹ {item.amount}
                  </p>
                </div>

                <div
                  className={
                    styles.detailBox
                  }
                >
                  <h4>
                    PAYMENT METHOD
                  </h4>

                  <p>
                    {item.method}
                  </p>
                </div>

                <div
                  className={
                    styles.detailBox
                  }
                >
                  <h4>
                    STATUS
                  </h4>

                  <p>
                    {item.status}
                  </p>
                </div>

                <div
                  className={
                    styles.detailBox
                  }
                >
                  <h4>
                    CURRENCY
                  </h4>

                  <p>
                    {item.currency}
                  </p>
                </div>

                <div
                  className={
                    styles.detailBox
                  }
                >
                  <h4>
                    FEE
                  </h4>

                  <p>
                    ₹ {item.fee}
                  </p>
                </div>

                <div
                  className={
                    styles.detailBox
                  }
                >
                  <h4>
                    TAX
                  </h4>

                  <p>
                    ₹ {item.tax}
                  </p>
                </div>

                <div
                  className={
                    styles.detailBox
                  }
                >
                  <h4>
                    DATE & TIME
                  </h4>

                  <p>
                    {
                      item.created_at
                    }
                  </p>
                </div>

              </div>

            </div>

          </div>
        ))

      ) : (

        <div
          className={
            styles.noTransaction
          }
        >
          No Transactions Found
        </div>

      )}

    </div>
  );
}