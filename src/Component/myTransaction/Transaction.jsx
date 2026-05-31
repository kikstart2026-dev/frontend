import React, { useEffect, useState } from "react";
import { getAllPayments } from "../../apis/api";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import styles from "./Transaction.module.scss";

import TransactionSkeleton from "../../Skeletons/TransactionSkeleton/TransactionSkeleton";

export default function Transaction() {
  const [payments, setPayments] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= USER EMAIL =================

  let userEmail = "";

  try {
    const userData = localStorage.getItem("user");

    const parsedUser = JSON.parse(userData);

    userEmail = parsedUser?.email || "";
  } catch (error) {
    userEmail = localStorage.getItem("user") || "";
  }

  // ================= FETCH PAYMENTS =================
  const toNumber = (val) => {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  };

  const money = (v) => {
    const num = Number(v || 0);
    return "Rs." + num.toFixed(2);
  };

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);

      try {
        const res = await getAllPayments();

        const filteredPayments = res?.payments?.filter((item) => {
          // EMAIL MATCH

          if (
            item?.email &&
            item.email.toLowerCase().trim() === userEmail.toLowerCase().trim()
          ) {
            return true;
          }

          // PHONE MATCH

          if (
            item?.contact ===
            `+91${JSON.parse(localStorage.getItem("user"))?.phone}`
          ) {
            return true;
          }

          return false;
        });

        setPayments(filteredPayments || []);
      } catch (error) {
        console.log(error);
      } finally {
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
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString();
  };

  const downloadInvoice = (item) => {
    const doc = new jsPDF();

    // HEADER

    doc.setFillColor(220, 38, 38);
    doc.rect(0, 0, 220, 40, "F");

    doc.setTextColor(255, 255, 255);

    doc.setFontSize(24);

    doc.text("KIKSTART", 14, 22);

    doc.setFontSize(11);

    doc.text(`Invoice ID : ${item.payment_id}`, 14, 32);

    // BODY

    doc.setTextColor(0, 0, 0);

    doc.setFontSize(16);

    doc.text("Payment Details", 14, 55);

    autoTable(doc, {
      startY: 62,

      head: [["Field", "Details"]],

      body: [
        ["Full Name", item.fullname || "N/A"],
        ["Email", item.email || "N/A"],
        ["Phone", item.phone || item.contact || "N/A"],

        ["Plan Name", item.planName || "N/A"],
        ["Amount", money(item.amount || 0)],

        ["Payment ID", item.payment_id || "N/A"],
        ["Order ID", item.order_id || "N/A"],

        ["Payment Method", item.method || "N/A"],
        ["Currency", item.currency || "INR"],

        ["Fee", money(item.fee || 0)],
        ["Tax", money(item.tax || 0)],

        [
          "Payment Date",
          item.paymentDate
            ? new Date(item.paymentDate).toLocaleString()
            : "N/A",
        ],

        [
          "Expire Date",
          item.expireDate
            ? new Date(item.expireDate).toLocaleDateString()
            : "N/A",
        ],

        ["Status", item.status || "captured"],
      ],

      headStyles: {
        fillColor: [220, 38, 38],
      },

      styles: {
        fontSize: 11,
        cellPadding: 4,
      },
    });
    // // -------------------------
    // // TOTAL SECTION (NEW)
    // // -------------------------

    // const total =
    //   Number(item.amount || 0) +
    //   Number(item.fee || 0) +
    //   Number(item.tax || 0);

    // // table end position
    // const finalY = doc.lastAutoTable.finalY || 60;

    // // small clean spacing
    // const summaryStartY = finalY + 10;

    // doc.setFontSize(12);
    // doc.setFont("helvetica", "bold");

    // doc.setTextColor(220, 38, 38);
    // doc.text("Payment Summary", 14, summaryStartY);

    // // TOTAL (FIXED GAP HERE)
    // doc.setFont("helvetica", "bold");
    // doc.setFontSize(13);

    // doc.setTextColor(0, 0, 0);
    // doc.text(`Total Paid: ${money(total)}`, 14, summaryStartY + 18);

    // -------------------------
    // FOOTER
    // -------------------------
    const pageHeight = doc.internal.pageSize.height;

    // separator line
    doc.setDrawColor(220, 220, 220);
    doc.line(14, pageHeight - 35, 196, pageHeight - 35);

    // Thank You
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(220, 38, 38);

    doc.text("Thank you for your payment!", 14, pageHeight - 25);

    // Contact text
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);

    doc.text("For any further details, please contact:", 14, pageHeight - 17);

    doc.textWithLink("kikstart2026@gmail.com", 14, pageHeight - 9, {
      url: "https://mail.google.com/mail/?view=cm&fs=1&to=kikstart2026@gmail.com&su=Contacting%20KikStart%20Support&body=Hello%20KikStart%20Team,%0D%0A%0D%0AI%20would%20like%20to%20contact%20you%20regarding...",
    });

    // -------------------------
    // SAVE
    // -------------------------
    doc.save(`Invoice-${item.payment_id || "receipt"}.pdf`);
  };

  return (
    <div className={styles.transactionWrapper}>
      {loading ? (
        <TransactionSkeleton />
      ) : payments?.length > 0 ? (
        payments.map((item, index) => (
          <div className={styles.transactionCard} key={index}>
            {/* HEADER */}

            <div
              className={styles.transactionHeader}
              onClick={() => toggleAccordion(index)}
            >
              <div className={styles.leftHeader}>
                <div className={styles.invoiceIcon}>
                  <i className="bi bi-receipt"></i>
                </div>

                <div>
                  <h3>
                    {item.description ||
                      item.planName ||
                      "Subscription Payment"}
                  </h3>

                  <p>{formatDate(item.created_at || item.paymentDate)}</p>
                </div>
              </div>

              <div className={styles.rightHeader}>
                <div className={styles.rightAmount}>
                  <h2>₹ {item.amount}</h2>

                  <span
                    className={
                      item.status === "captured"
                        ? styles.success
                        : styles.failed
                    }
                  >
                    {item.status === "captured" ? "Paid" : item.status}
                  </span>
                </div>

                <i
                  className={`bi bi-chevron-down ${styles.arrow} ${
                    openIndex === index ? styles.rotate : ""
                  }`}
                ></i>
              </div>
            </div>

            {/* BODY */}

            <div
              className={`${styles.transactionBody} ${
                openIndex === index ? styles.show : ""
              }`}
            >
              <div className={styles.invoiceContainer}>
                {/* TOP HEADER */}

                <div className={styles.invoiceHeader}>
                  <div>
                    <h2>Payment Details</h2>
                  </div>

                  <button
                    className={styles.downloadBtn}
                    onClick={() => downloadInvoice(item)}
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
                      <span>Full Name</span>
                      <p>{item.fullname || "N/A"}</p>
                    </div>

                    <div className={styles.tableRow}>
                      <span>Email</span>
                      <p>{item.email || "N/A"}</p>
                    </div>

                    <div className={styles.tableRow}>
                      <span>Phone</span>
                      <p>{item.phone || item.contact || "N/A"}</p>
                    </div>

                    <div className={styles.tableRow}>
                      <span>Plan Name</span>
                      <p>{item.planName || "N/A"}</p>
                    </div>

                    <div className={styles.tableRow}>
                      <span>Amount</span>
                      <p>₹ {item.amount}</p>
                    </div>

                    <div className={styles.tableRow}>
                      <span>Payment ID</span>
                      <p>{item.payment_id}</p>
                    </div>
                  </div>

                  {/* RIGHT */}

                  <div className={styles.tableColumn}>
                    <div className={styles.tableRow}>
                      <span>Order ID</span>
                      <p>{item.order_id || "N/A"}</p>
                    </div>

                    <div className={styles.tableRow}>
                      <span>Payment Method</span>
                      <p>{item.method || "N/A"}</p>
                    </div>

                    <div className={styles.tableRow}>
                      <span>Currency</span>
                      <p>{item.currency || "INR"}</p>
                    </div>

                    <div className={styles.tableRow}>
                      <span>Fee</span>
                      <p>₹ {toNumber(item.fee || 0)}</p>
                    </div>

                    <div className={styles.tableRow}>
                      <span>Tax</span>
                      <p>₹ {toNumber(item.tax || 0)}</p>
                    </div>

                    <div className={styles.tableRow}>
                      <span>Subscription Ends</span>
                      <p>{formatDate(item.expireDate)}</p>
                    </div>
                  </div>
                </div>

                {/* FOOTER */}

                <div className={styles.invoiceFooter}>
                  <p>Payment receipt generated successfully</p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.noTransaction}>No Transactions Found</div>
      )}
    </div>
  );
}
