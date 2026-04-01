import React from "react";
import { useQuery } from "@tanstack/react-query";
import CmnHeading from "../../CmnHeading/CmnHeading";
import "../../../Main.scss";
import Faqs from "../Faqs";
import styles from "./FaqSection.module.scss";
import { getAllFaqs } from "../../../apis/api";

export default function FaqSection() {

  const { data: faqData = [], isLoading } = useQuery({
    queryKey: ["faqs-home"], // ✅ Unique key for home
    queryFn: async () => {
      // ✅ Ekhane default-e 5 asbe (jodi api.js e limit=5 set kora thake)
      const res = await getAllFaqs(1, 5); 
      return res?.data || [];
    }
  });

  if (isLoading) return null;

  // ✅ ONLY ACTIVE
  const activeFaqs = faqData.filter(item => item.isActive);

  // ✅ HEADING SAFE
  const headingData =
    activeFaqs?.[0]?.headingData ||
    faqData?.[0]?.headingData ||
    {};

  return (
    <section className={`${styles.faqsSection} common-space`}>
      <div className="container">
        <div className={`row align-items-center ${styles.faqsWrap}`}>

          {/* LEFT */}
          <div className={`col-6 ${styles.faqsLeft}`}>
            <CmnHeading
              title={headingData?.tagline}
              subtitle={headingData?.heading}
              align="left"
            />

            {/* ✅ Ekhane sudhu limit kora data-tai show hobe */}
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