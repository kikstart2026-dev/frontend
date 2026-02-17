import React, { useState } from "react";
import "./Faqs.scss";
import CmnHeading from "../CmnHeading/CmnHeading";
import FaqsRightImg from "../../assets/images/faqs-right-img.png"
import "../../Main.scss"

export default function Faqs({ data }) {
  const [faqsData] = useState(data);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faqs-section">
      <div className="container">

        <div className="row align-items-center faqs">

          {/* LEFT SIDE */}

          <div className="col-6 faqs-left">


            <CmnHeading
              title="FAQs"
              subtitle="Have question"
              align="left"

            />

            <div className="accordion" id="faqsAccordion">

              {faqsData.map((item, index) => (
                <div
                  key={item.id}
                  className="faqs-item"
                  onClick={() => toggleAccordion(index)}
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

          <div className="col-6 text-center faqs-right">
            <figure>
              <img
                src={FaqsRightImg}
                alt="Kikstart charectorq"
                className="faqs-charector"
              />
            </figure>
          </div>

        </div>
      </div>
    </section>
  );
}