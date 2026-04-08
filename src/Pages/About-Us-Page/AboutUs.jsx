import React from 'react'
import { useQuery } from '@tanstack/react-query'
import AboutUsValue from '../../Component/AboutUsValue/AboutUsValue'
import AboutMid from '../../Component/AboutMid/AboutMid'
import TestSection from '../../Component/Testimonial/Test/TestSection'
import CommonBanner from '../../Component/CommonBanner/CommonBanner'
import styles from './AboutUs.module.scss'
import { getAllAboutUs } from '../../apis/api'

export default function AboutUs() {

  const { data: aboutList = [], isLoading, error } = useQuery({
    queryKey: ["aboutSection"],
    queryFn: async () => {
      const res = await getAllAboutUs();

      // 🔥 Normalize data (always array)
      const raw = res?.data?.data || res?.data || [];

      return Array.isArray(raw) ? raw : [raw];
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load About section</p>;

  return (
    <div className={styles.page}>

      <CommonBanner title={"About Us"} />

      <section className={styles.space1}>
        <div className="container">

          {/* 🔥 Multiple About Section Render */}
          {Array.isArray(aboutList) && aboutList.length > 0 ? (

            aboutList.map((item, index) => (
              <div key={item._id}>
                {index % 2 === 0 ? (
                  <AboutUsValue aboutData={item} />
                ) : (
                  <AboutMid aboutData={item} />
                )}
              </div>
            ))

          ) : (
            <p>No About Data Found</p>
          )}

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