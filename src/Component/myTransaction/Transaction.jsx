import React, { useEffect, useState } from "react";
import { getAllPayments } from "../../apis/api";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import styles from "./Transaction.module.scss";

export default function Transaction() {

  const [payments, setPayments] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(true);

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
      finally {

        setLoading(false);

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
        loading ? (

          <div className={styles.noTransaction}>
            Loading...
          </div>

        ) : payments?.length > 0 ? (

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
                        item.status === "captured"
                          ? styles.success
                          : styles.failed
                      }
                    >
                      {item.status === "captured"
                        ? "Paid"
                        : item.status}
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

              <div
                className={`${styles.transactionBody} ${openIndex === index
                  ? styles.show
                  : ""
                  }`}
              >

                <div className={styles.invoiceContainer}>

                  {/* TOP HEADER */}

                  <div className={styles.invoiceHeader}>

                    <div>

                      <h2>
                        {
                          item.description ||
                          "Payment Invoice"
                        }
                      </h2>


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

                  {/* TABLE */}

                  <div className={styles.invoiceTable}>

                    {/* LEFT */}

                    <div className={styles.tableColumn}>

                      <div className={styles.tableRow}>
                        <span>
                          Full Name
                        </span>

                        <p>
                          {item.fullname || "N/A"}
                        </p>
                      </div>

                      <div className={styles.tableRow}>
                        <span>
                          Email Address
                        </span>

                        <p>
                          {item.email || "N/A"}
                        </p>
                      </div>

                      <div className={styles.tableRow}>
                        <span>
                          Phone Number
                        </span>

                        <p>
                          {item.contact || "N/A"}
                        </p>
                      </div>

                      <div className={styles.tableRow}>
                        <span>
                          Payment ID
                        </span>

                        <p>
                          {item.payment_id}
                        </p>
                      </div>

                      <div className={styles.tableRow}>
                        <span>
                          Order ID
                        </span>

                        <p>
                          {item.order_id}
                        </p>
                      </div>

                      <div className={styles.tableRow}>
                        <span>
                          Date & Time
                        </span>

                        <p>
                          {item.created_at}
                        </p>
                      </div>

                    </div>

                    {/* RIGHT */}

                    <div className={styles.tableColumn}>

                      <div className={styles.tableRow}>
                        <span>
                          Currency
                        </span>

                        <p>
                          {item.currency}
                        </p>
                      </div>

                      <div className={styles.tableRow}>
                        <span>
                          Payment Type
                        </span>

                        <p>
                          {item.method}
                        </p>
                      </div>

                      <div className={styles.tableRow}>
                        <span>
                          Amount
                        </span>

                        <p className={styles.amountText}>
                          ₹ {item.amount}
                        </p>
                      </div>

                      <div className={styles.tableRow}>
                        <span>
                          Fee
                        </span>

                        <p>
                          ₹ {item.fee || 0}
                        </p>
                      </div>

                      <div className={styles.tableRow}>
                        <span>
                          Tax
                        </span>

                        <p>
                          ₹ {item.tax || 0}
                        </p>
                      </div>

                      <div className={styles.tableRow}>
                        <span>
                          Status
                        </span>

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

                    </div>

                  </div>

                  {/* FOOTER */}

                  <div className={styles.invoiceFooter}>

                    <p>
                      Payment receipt generated
                      successfully
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