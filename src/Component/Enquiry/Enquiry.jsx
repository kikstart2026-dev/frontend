import React from "react";
import CmnHeading from "../CmnHeading/CmnHeading";
import FaqsRightImg from "../../assets/images/faqs-right-img.png";
import "../../Main.scss";
import styles from "../Faqs/Faqs-Section/FaqSection.module.scss";
import enquiryStyles from "./Enquiry.module.scss";

export default function FaqSection() {
  return (
    <section className={`${styles.faqsSection} common-space`}>
      <div className="container">
        <div className={`row align-items-center ${styles.faqsWrap}`}>

          {/* LEFT SIDE */}
          <div className={`col-6 ${styles.faqsLeft}`}>
            <CmnHeading
              subtitle="Enquiry"
              align="left"
            />

            <p className={enquiryStyles.enqP}>
              Quam in non velit malesuada arcu eget id. Id ut turpis tempor semper et in nunc aliquet. Orci cras faucibus aliquam eget orci egestas.
            </p>

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