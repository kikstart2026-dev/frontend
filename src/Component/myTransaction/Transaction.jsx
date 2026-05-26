import React, { useEffect, useState } from "react";
import { getAllPayments } from "../../apis/api";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import styles from "./Transaction.module.scss";

export default function Transaction() {

  const [payments, setPayments] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  // ================= USER EMAIL =================

  let userEmail = "";

  try {

    const userData =
      localStorage.getItem("user");

    const parsedUser =
      JSON.parse(userData);

    userEmail =
      parsedUser?.email || "";

  } catch (error) {

    userEmail =
      localStorage.getItem("user") || "";
  }

  // ================= FETCH PAYMENTS =================

  useEffect(() => {

    const fetchPayments = async () => {

      try {

        const res =
          await getAllPayments();

        const filteredPayments =
          res?.payments?.filter(
            (item) => {

              // EMAIL MATCH

              if (
                item?.email &&
                item.email
                  .toLowerCase()
                  .trim() ===
                userEmail
                  .toLowerCase()
                  .trim()
              ) {
                return true;
              }

              // PHONE MATCH

              if (
                item?.contact ===
                `+91${JSON.parse(
                  localStorage.getItem("user")
                )?.phone}`
              ) {
                return true;
              }

              return false;
            }
          );

        setPayments(filteredPayments || []);

      } catch (error) {

        console.log(error);
      }
    };

    fetchPayments();

  }, [userEmail]);

  // ================= TOGGLE =================

  const toggleAccordion = (index) => {

    if (openIndex === index) {

      setOpenIndex(null);

    } else {

      setOpenIndex(index);
    }
  };

  // ================= DOWNLOAD PDF =================

  const downloadInvoice = (item) => {

    const doc = new jsPDF();

    // HEADER

    doc.setFillColor(220, 38, 38);
    doc.rect(0, 0, 220, 40, "F");

    doc.setTextColor(255, 255, 255);

    doc.setFontSize(24);

    doc.text(
      "PAYMENT INVOICE",
      14,
      22
    );

    doc.setFontSize(11);

    doc.text(
      `Invoice ID : ${item.payment_id}`,
      14,
      32
    );

    // BODY

    doc.setTextColor(0, 0, 0);

    doc.setFontSize(16);

    doc.text(
      "Customer Details",
      14,
      55
    );

    autoTable(doc, {

      startY: 62,

      head: [["Field", "Details"]],

      body: [

        [
          "Full Name",
          item.fullname || "N/A"
        ],

        [
          "Email Address",
          item.email || "N/A"
        ],

        [
          "Phone Number",
          item.contact || "N/A"
        ],

        [
          "Payment ID",
          item.payment_id || "N/A"
        ],

        [
          "Order ID",
          item.order_id || "N/A"
        ],

        [
          "Amount",
          `INR ${item.amount}`
        ],

        [
          "Payment Method",
          item.method || "N/A"
        ],

        [
          "Status",
          item.status || "N/A"
        ],

        [
          "Currency",
          item.currency || "N/A"
        ],

        [
          "Fee",
          `INR ${item.fee}`
        ],

        [
          "Tax",
          `INR ${item.tax}`
        ],

        [
          "Date & Time",
          item.created_at || "N/A"
        ],
      ],

      headStyles: {

        fillColor: [220, 38, 38],
      },

      styles: {

        fontSize: 11,
        cellPadding: 4,
      },
    });

    doc.save(
      `Invoice-${item.payment_id}.pdf`
    );
  };

  return (

    <div className={styles.transactionWrapper}>

      {
        payments?.length > 0 ? (

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

                <div
                  className={
                    styles.leftHeader
                  }
                >

                  <div
                    className={
                      styles.invoiceIcon
                    }
                  >
                    <i className="bi bi-receipt"></i>
                  </div>

                  <div>

                    <h3>
                      {
                        item.description ||
                        "Professional Plan Payment"
                      }
                    </h3>

                    <p>
                      {
                        item.created_at
                      }
                    </p>

                  </div>

                </div>

                <div className={styles.rightHeader}>

                  <div className={styles.rightAmount}>

                    <h2>
                      ₹ {item.amount}
                    </h2>

                    <span
                      className={
                        item.status ===
                          "captured"
                          ? styles.success
                          : styles.failed
                      }
                    >
                      {item.status}
                    </span>
                  </div>



                  <i
                    className={`bi bi-chevron-down ${styles.arrow} ${openIndex ===
                      index
                      ? styles.rotate
                      : ""
                      }`}
                  ></i>

                </div>

              </div>

              {/* BODY */}

              <div div
                className={`${styles.transactionBody
                  } ${openIndex ===
                    index
                    ? styles.show
                    : ""
                  }`}
              >

                {/* TOP */}

                <div
                  className={
                    styles.invoiceTop
                  }
                >

                  <div>

                    <h2>
                      Invoice Details
                    </h2>

                    <p>
                      Payment receipt
                      generated
                      successfully
                    </p>

                  </div>

                  <button
                    className={
                      styles.downloadBtn
                    }
                    onClick={() =>
                      downloadInvoice(item)
                    }
                  >

                    <i className="bi bi-download"></i>

                    Download Invoice

                  </button>

                </div>

                {/* GRID */}

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

                    <p
                      className={
                        item.status ===
                          "captured"
                          ? styles.successText
                          : styles.failedText
                      }
                    >
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

            </div >
          ))
        ) : (

          <div
            className={
              styles.noTransaction
            }
          >
            No Transactions Found
          </div>
        )
      }

    </div >
  );
}