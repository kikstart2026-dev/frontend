import React, { useState } from "react";
import styles from "./Faqs.module.scss";   // ✅ module import
import "../../Main.scss";

export default function Faqs({ data = [], limit }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const displayedData = limit ? data.slice(0, limit) : data;

  return (
    <div className={`accordion ${styles.accordionWrapper}`} id="faqsAccordion">
      
      {displayedData.map((item, index) => (
        <div
          key={item.id || index}
          className={styles.faqsItem}
          onClick={() => toggleAccordion(index)}
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
              <p className={styles.faqsDetails}>{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}