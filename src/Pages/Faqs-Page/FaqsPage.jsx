import React from 'react'
import CommonBanner from '../../Component/CommonBanner/CommonBanner'
import "./FaqsPage.module.scss"
import Faqs from '../../Component/Faqs/Faqs'
import { useQuery } from "@tanstack/react-query";
import { getAllFaqs } from "../../apis/api"; 

export default function FaqsPage() {

  const { data: faqData = [], isLoading } = useQuery({
    queryKey: ["faqs-all-frontend"],
    queryFn: async () => {
      // ✅ limit 1000
      const res = await getAllFaqs(1, 1000); 
      return res?.data || [];
    }
  });

  if (isLoading) return <p>Loading...</p>;

  // filter active part
  const activeFaqs = faqData.filter(item => item.isActive);

  return (
    <>
      <CommonBanner title={"Faqs"} />

      <section className="faqs-section FaqPage">
        <div className="container">
          <Faqs data={activeFaqs} />
        </div>
      </section>
    </>
  )
}