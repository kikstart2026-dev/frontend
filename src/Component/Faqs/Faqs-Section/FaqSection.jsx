import React from "react";
import CmnHeading from "../../CmnHeading/CmnHeading";
import FaqsRightImg from "../../../assets/images/faqs-right-img.png";
import "../../../Main.scss";
import Faqs from "../Faqs";
import styles from "./FaqSection.module.scss";
import faqData from "../../../data/faqData";

export default function FaqSection() {
  return (
    <section className={`${styles.faqsSection} common-space`}>
      <div className="container">
        <div className={`row align-items-center ${styles.faqsWrap}`}>

          {/* LEFT SIDE */}
          <div className={`col-6 ${styles.faqsLeft}`}>
            <CmnHeading
              title="FAQs"
              subtitle="Have question"
              align="left"
            />

            <Faqs data={faqData} limit={5} />
          </div>

          {/* RIGHT SIDE */}
          <div className={`col-6 ${styles.faqsRight}`}>
            <figure>
              <img
                src={FaqsRightImg}
                alt="Kikstart character"
                className={styles.faqsCharacter}
              />
            </figure>
          </div>

        </div>
      </div>
    </section>
  );
}