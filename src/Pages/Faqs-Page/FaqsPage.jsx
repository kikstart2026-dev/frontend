import React from 'react'
import CommonBanner from '../../Component/CommonBanner/CommonBanner'
import styles from "./FaqsPage.module.scss"
import Faqs from '../../Component/Faqs/Faqs'
import faqData from '../../data/faqData'

export default function FaqsPage() {
  return (
    <>
      <CommonBanner 
      title="FAQs"
      pageName="FAQs" />
      
      <section className={`${styles.faqsSection} ${styles.faqPage}`}>
        <div className="container">
          <Faqs data={faqData} />
        </div>
      </section>
    </>
  )
}
