import React from 'react'
import CommonBanner from '../../Component/CommonBanner/CommonBanner'
// import faqData from '../../data/faqData'
// import Faqs from '../../Component/Faqs/Faqs'
import "./FaqsPage.scss"
import Faqs from '../../Component/Faqs/Faqs'
import faqData from '../../data/faqData'



export default function FaqsPage() {
  return (
    <>
      <CommonBanner title={"Faqs"} />

      <section className="faqs-section FaqPage">
        <div className="container">
          <Faqs data={faqData} />
        </div>
      </section>
    </>
  )
}
