import React from 'react'
import AboutUsValue from '../../Component/AboutUsValue/AboutUsValue'
import TestSection from '../../Component/Testimonial/Test/TestSection'
import AboutMid from '../../Component/AboutMid/AboutMid'
import styles from './AboutUs.module.scss'

export default function AboutUs() {
  return (
    <div className={styles.page}>

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