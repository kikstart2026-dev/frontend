import React, { useEffect, useState } from "react";
import { getAllPayments } from "../../apis/api";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import styles from "./Transaction.module.scss";

import TransactionSkeleton from "../../Skeletons/TransactionSkeleton/TransactionSkeleton";

export default function Transaction() {
  const [payments, setPayments] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedInvoice, setSelectedInvoice] = useState(null);

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

  const downloadInvoice = async (item) => {
    setSelectedInvoice(item);

    setTimeout(async () => {
      const invoice = document.getElementById("invoice-pdf");

      if (!invoice) return;

      const canvas = await html2canvas(invoice, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Single Page Fit
      if (imgHeight <= pageHeight) {
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      } else {
        // Scale down to fit entire invoice including footer
        const scaleRatio = pageHeight / imgHeight;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth * scaleRatio, pageHeight);
      }

      pdf.save(`Invoice-${item.payment_id || "receipt"}.pdf`);
    }, 700); // footer render হওয়ার সময় দিচ্ছে
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

      {selectedInvoice && (
        <div id="invoice-pdf" className={styles.invoicePdf}>
          {/* HEADER */}
          <div className={styles.invoicePdfHeader}>
            <h1>KIKSTART</h1>

            <p>Invoice ID :{selectedInvoice.payment_id || "N/A"}</p>

            <p>Order ID :{selectedInvoice.order_id || "N/A"}</p>
          </div>

          {/* BODY */}
          <div className={styles.invoicePdfBody}>
            <h2 className={styles.invoiceSectionTitle}>Customer Details</h2>

            <div className={styles.customerBox}>
              <p>
                <strong>Name:</strong>
                {selectedInvoice.fullname || "N/A"}
              </p>

              <p>
                <strong>Email:</strong>
                {selectedInvoice.email || "N/A"}
              </p>

              <p>
                <strong>Phone:</strong>
                {selectedInvoice.phone || selectedInvoice.contact || "N/A"}
              </p>
            </div>

            <h2 className={styles.invoiceSectionTitle}>Payment Details</h2>

            <table className={styles.invoicePdfTable}>
              <tbody>
                <tr>
                  <td>Plan Name</td>
                  <td>{selectedInvoice.planName || "N/A"}</td>
                </tr>

                <tr>
                  <td>Amount</td>
                  <td>₹ {selectedInvoice.amount || 0}</td>
                </tr>

                <tr>
                  <td>Status</td>
                  <td>{selectedInvoice.status || "N/A"}</td>
                </tr>

                <tr>
                  <td>Currency</td>
                  <td>{selectedInvoice.currency || "INR"}</td>
                </tr>

                <tr>
                  <td>Payment Method</td>
                  <td>{selectedInvoice.method || "N/A"}</td>
                </tr>

                <tr>
                  <td>Fee</td>
                  <td>₹ {toNumber(selectedInvoice.fee || 0)}</td>
                </tr>

                <tr>
                  <td>Tax</td>
                  <td>₹ {toNumber(selectedInvoice.tax || 0)}</td>
                </tr>

                <tr>
                  <td>Payment Date</td>
                  <td>{formatDate(selectedInvoice.paymentDate)}</td>
                </tr>

                <tr>
                  <td>Expire Date</td>
                  <td>{formatDate(selectedInvoice.expireDate)}</td>
                </tr>
              </tbody>
            </table>

            <div className={styles.totalBox}>
              <h2>Total Paid : ₹ {selectedInvoice.amount}</h2>
            </div>
          </div>

          {/* FOOTER */}
          <div className={styles.invoicePdfFooter}>
            <div className={styles.footerContent}>
              <p className={styles.thankYouText}>Thank you for your payment!</p>

              <p className={styles.supportText}>
                If you have any further queries, please contact us:
              </p>

              <a
                href="mailto:kikstart2026@gmail.com"
                className={styles.supportMail}
                onClick={(e) => e.stopPropagation()}
              >
                kikstart2026@gmail.com
              </a>

              <p className={styles.footerNote}>
                This invoice was generated electronically and does not require a
                signature.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
