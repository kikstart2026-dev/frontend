import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import CmnHeading from "../../CmnHeading/CmnHeading";
import "../../../Main.scss";
import Faqs from "../Faqs";
import styles from "./FaqSection.module.scss";
import { getAllFaqs, getHeading } from "../../../apis/api";

export default function FaqSection() {

  const { data: faqData = [], isLoading } = useQuery({
    queryKey: ["faqs-home"],
    queryFn: async () => {
      const res = await getAllFaqs(1, 5);
      return res?.data || [];
    }
  });


  const { data: headingRes } = useQuery({
    queryKey: ["faq-heading"],
    queryFn: getHeading
  });


  const headingData = headingRes?.data?.[0];

  if (isLoading) return null;

  const activeFaqs = faqData.filter(item => item.isActive);

  return (
    <section className={`${styles.faqsSection} common-space`}>
      <div className="container">
        <div className={`row align-items-center ${styles.faqsWrap}`}>

          {/* LEFT */}
          <div className={`col-6 ${styles.faqsLeft}`}>
            <CmnHeading
              title={headingData?.tagline || "FAQ"}
              subtitle={headingData?.heading || "Frequently Asked Questions"}
              align="left"
            />

            <Faqs data={activeFaqs} />
          </div>

          {/* RIGHT */}
          <div className={`col-6 ${styles.faqsRight}`}>
            <figure>
              <img
                src="http://localhost:8008/uploads/images/1773166023559-837503757.png"
                alt="faq"
                className={styles.faqsCharacter}
              />
            </figure>
          </div>

        </div>
      </div>
    </section>
  );
}