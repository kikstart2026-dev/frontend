import React, { useState } from "react";
import styles from "./Faqs.module.scss";
import "../../Main.scss";
import DOMPurify from "dompurify";

export default function Faqs({ data = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const safeData = Array.isArray(data) ? data : [];

  // Ekhone kono slice ba limit nei, sorasori safeData use hobe

  return (
    <div>
      <div className={`accordion ${styles.accordionWrapper}`} id="faqsAccordion">
        {/* safeData.map use kora hoyeche jate sob data show hoy */}
        {safeData.map((item, index) => (
          <div
            key={item._id || index}
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
    </div>
  );
}