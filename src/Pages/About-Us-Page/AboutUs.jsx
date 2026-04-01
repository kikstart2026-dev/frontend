import React from 'react'
import { useQuery } from '@tanstack/react-query'
import AboutUsValue from '../../Component/AboutUsValue/AboutUsValue'
import AboutMid from '../../Component/AboutMid/AboutMid'
import TestSection from '../../Component/Testimonial/Test/TestSection'
import CommonBanner from '../../Component/CommonBanner/CommonBanner'
import styles from './AboutUs.module.scss'
import { getAllAboutUs } from '../../apis/api'

export default function AboutUs() {


  const { data: about, isLoading, error } = useQuery({
    queryKey: ["aboutSection"],
    queryFn: async () => {

      const res = await getAllAboutUs()

      const aboutData = res?.data || []

      const activeAbout = aboutData.find((a) => a.isActive)

      return activeAbout || aboutData[0] || null
    },
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Failed to load About section</p>

  return (
    <div className={styles.page}>

      <CommonBanner title={"About Us"} />

      <section className={styles.space1}>
        <div className="container">

          <AboutUsValue aboutData={about} />

          <div className="space3">
            <AboutMid aboutData={about} />
          </div>

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