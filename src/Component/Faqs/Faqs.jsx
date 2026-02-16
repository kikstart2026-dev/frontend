import React, { useState } from "react";
import "./Faqs.scss";
import CmnHeading from "../CmnHeading/CmnHeading";

export default function Faqs({ data }) {
  const [faqsData] = useState(data);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faqs-section py-5">
      <div className="container">

        <div className="row align-items-center faqs">

          {/* LEFT SIDE */}
          <div className="col-lg-6 faqs-left">


            <CmnHeading
              title="FAQs"
              subtitle="Have question"
              align="left"

            />

            <div className="accordion" id="faqsAccordion">

              {faqsData.map((item, index) => (
                <div
                  key={item.id}
                  className="faqs-item mb-3"
                  onClick={() => toggleAccordion(index)} // ✅ pura item clickable
                  style={{ cursor: "pointer" }}>

                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${activeIndex === index ? "" : "collapsed"} faqs-header`}
                      type="button"
                    >
                      {item.question}
                    </button>
                  </h2>

                  <div
                    id={`collapse${index}`}
                    className={`accordion-collapse collapse ${activeIndex === index ? "show" : ""}`}
                  >
                    <div className="accordion-body">
                      <p className="faqs-details">{item.answer}</p>
                    </div>
                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-6 text-center faqs-right">
            <img
              src="/images/faqs-right-img.png"
              alt="faq"
              className="faqs-charector"
            />
          </div>

        </div>
      </div>
    </section>
  );
}