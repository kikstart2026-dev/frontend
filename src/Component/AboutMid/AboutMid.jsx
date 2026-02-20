import React from 'react'
import man from '../../assets/images/man.png'
import MainTwoSide from '../SectionTwoSIde/MainTwoSide'
import CmnHeading from '../CmnHeading/CmnHeading'
import styles from './AboutMid.module.scss'

export default function AboutMid() {
  return (
    <div className={styles.aboutMid}>
      <div className="row align-items-center">
        
        <div className="col-lg-6 col-md-6 col-12">
          
          <CmnHeading
            title="about us"
            subtitle="Who we are"
            details={
              <>
                <p className={styles.firstPara}>
                  Lorem ipsum dolor sit amet consectetur. Vitae elit quam volutpat id. Quisque orci lacinia sit non. Diam et adipiscing proin orci. Eget lorem sit etiam molestie rhoncus non. Ut tincidunt tristique suspendisse arcu ac.Curabitur suspendisse tellus placerat libero ut. Enim auctor velit massa integer. Amet interdum at vivamus aliquet mattis integer magna aliquam.Nulla urna aliquam sit eget ac dolor aliquam tincidunt.
                </p>

                <p className={styles.secondPara}>
                  Ut fermentum elementum amet elementum arcu suspendisse. Vitae lectus penatibus est sit iaculis quis. Auctor eu vitae imperdiet dignissim hendrerit. A elementum turpis sem quis. Ut tincidunt tristique suspendisse arcu ac.Curabitur suspendisse tellus placerat libero ut.
                </p>
              </>
            }
            align="left"
          />
        </div>

        <div className="col-lg-6 col-md-6 col-12">
          <MainTwoSide img={man} />
        </div>

      </div>
    </div>
  )
}