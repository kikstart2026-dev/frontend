import React from 'react'
import CommonBanner from '../../Component/CommonBanner/CommonBanner'
import MiniCard from '../../Component/WhyChooseUs/MiniCard'
import { CardsData } from '../../data/cardsData'
import styles from "./WhyUs.module.scss"

export default function WhyUs() {
  return (
    <>
      <CommonBanner title={"Why Us"} />

      <section className="common-space1">
        <div className="container">

          <div className={styles["WhyUs-para"]}>
            <p>
              Lorem ipsum dolor sit amet consectetur. Vitae elit quam volutpat id.
              Quisque orci lacinia sit non. Diam et adipiscing proin orci. 
              Eget lorem sit etiam molestie rhoncus non. Ut tincidunt tristique suspendisse arcu ac.
            </p>
          </div>

          <div className={`row g-4 ${styles["cards-section"]}`}>
            {CardsData.map((item, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-6 col-12"
              >
                <MiniCard
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  color={item.color}
                />
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}