import React from 'react'
import styles from './Testimonial.module.scss'

export default function Testimonial({ img, para, miniheading, coach }) {
    return (
        <div className={styles.testimonial}>
            
            <figure className={styles.imageWrapper}>
                <img src={img} alt="client" />
            </figure>

            <p className={`${styles.paragraph} ${styles.center}`}>
                {para}
            </p>

            <h3 className={`${styles.miniheading} ${styles.center}`}>
                {miniheading}
            </h3>

            <h4 className={`${styles.coach} ${styles.center}`}>
                {coach}
            </h4>

        </div>
    )
}