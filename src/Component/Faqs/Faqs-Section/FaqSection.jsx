import React from "react";
import CmnHeading from "../../CmnHeading/CmnHeading";
import FaqsRightImg from "../../../assets/images/faqs-right-img.png";
import "../../../Main.scss";
import Faqs from "../Faqs";
import "./../Faqs-Section/FaqSection.scss"
import faqData from "../../../data/faqData";

export default function FaqSection() {

  return (
    <section className="faqs-section">
      <div className="container">
        <div className="row align-items-center faqs-Wrap">

          {/* LEFT SIDE */}
          <div className="col-6 faqs-left">

            <CmnHeading
              title="FAQs"
              subtitle="Have question"
              align="left"
            />

            <Faqs data={faqData}limit={5} />

          </div>

          {/* RIGHT SIDE */}
          <div className="col-6 faqs-right">
            <figure>
              <img
                src={FaqsRightImg}
                alt="Kikstart character"
                className="faqs-charector"
              />
            </figure>
          </div>

        </div>
      </div>
    </section>
  );
}