import React from 'react'
import AboutUsValue from '../../Component/AboutUsValue/AboutUsValue'
import TestSection from '../../Component/Testimonial/Test/TestSection'
import AboutMid from '../../Component/AboutMid/AboutMid'
import styles from './AboutUs.module.scss'
import CommonBanner from '../../Component/CommonBanner/CommonBanner'

export default function AboutUs() {
  return (
    <div className={styles.page}>
        <CommonBanner
        title={"About Us"}/>
      <section className={styles.space}>
        <div className="container">
          <AboutUsValue />
          <AboutMid />
        </div>
      </section>

      <section className={styles.space}>
        <div className="container">
          <TestSection />
        </div>
      </section>

    </div>
  )
}