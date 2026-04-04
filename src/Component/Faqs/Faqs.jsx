import React, { useState } from "react";
import styles from "./Faqs.module.scss";
import "../../Main.scss";
import DOMPurify from "dompurify";

export default function Faqs({ data = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  // ✅ NEW STATE
  const [visibleCount, setVisibleCount] = useState(5);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const safeData = Array.isArray(data) ? data : [];

  // ✅ SHOW BASED ON visibleCount
  const displayedData = safeData.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 2);
  };

  return (
    <div>
      <div className={`accordion ${styles.accordionWrapper}`} id="faqsAccordion">
        {displayedData.map((item, index) => (
          <div
            key={item._id || index}
            className={styles.faqsItem}
            onClick={() => toggleAccordion(index)}
            style={{ cursor: "pointer" }}
          >
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${activeIndex === index ? "" : "collapsed"
                  } ${styles.faqsHeader}`}
                type="button"
              >
                {item.question}
              </button>
            </h2>

            <div
              className={`accordion-collapse collapse ${activeIndex === index ? "show" : ""
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

      {/* ✅ LOAD MORE BUTTON */}
      {visibleCount < safeData.length && (
        <div className={styles.loadMoreWrapper}>
          <button onClick={handleLoadMore} className={styles.loadMoreBtn}>
            Load More <span className={styles.arrow}>↓</span>
          </button>
        </div>
      )}
    </div>
  );
}