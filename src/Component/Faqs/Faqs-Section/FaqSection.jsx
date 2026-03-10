import React from "react";
import { useQuery } from "@tanstack/react-query";
import CmnHeading from "../../CmnHeading/CmnHeading";
import "../../../Main.scss";
import Faqs from "../Faqs";
import styles from "./FaqSection.module.scss";
import { getAllFaqs } from "../../../apis/api";

export default function FaqSection() {

  const { data: faqData, isLoading } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const res = await getAllFaqs();
      return res?.data || [];
    }
  });

  if (isLoading) return null;

  const headingData = faqData?.[0]?.headingData || {};

  return (
    <section className={`${styles.faqsSection} common-space`}>
      <div className="container">
        <div className={`row align-items-center ${styles.faqsWrap}`}>

          {/* LEFT SIDE */}
          <div className={`col-6 ${styles.faqsLeft}`}>
            <CmnHeading
              title={headingData?.heading}
              subtitle={headingData?.subheading}
              align="left"
            />

            <Faqs data={faqData} limit={5} />
          </div>

          {/* RIGHT SIDE */}
          <div className={`col-6 ${styles.faqsRight}`}>
            <figure>
              <img
                src="http://localhost:8008/uploads/images/1773166023559-837503757.png"
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