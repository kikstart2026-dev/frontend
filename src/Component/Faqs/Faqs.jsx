import React, { useState } from "react";
import styles from "./Faqs.module.scss";
import "../../Main.scss";
import DOMPurify from "dompurify"; // ✅ safe HTML rendering

export default function Faqs({ data = [], limit }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const safeData = Array.isArray(data) ? data : []; 
  const displayedData = limit ? safeData.slice(0, limit) : safeData;

  return (
    <div className={`accordion ${styles.accordionWrapper}`} id="faqsAccordion">
      {displayedData.map((item, index) => (
        <div
          key={item._id || index}
          className={styles.faqsItem}
          onClick={() => toggleAccordion(index)} // ✅ full div clickable
          style={{ cursor: "pointer" }}
        >
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${
                activeIndex === index ? "" : "collapsed"
              } ${styles.faqsHeader}`}
              type="button"
            >
              {item.question}
            </button>
          </h2>

          <div
            className={`accordion-collapse collapse ${
              activeIndex === index ? "show" : ""
            }`}
          >
            <div className={`accordion-body ${styles.accordionBody}`}>
              {/* ✅ Safe CKEditor HTML rendering */}
              <div
                className={styles.faqsDetails}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item.answer),
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}