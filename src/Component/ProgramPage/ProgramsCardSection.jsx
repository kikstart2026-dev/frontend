import React from 'react'
import CommonBanner from '../CommonBanner/CommonBanner'
import ProgramCard from '../Services/ProgramCard'
import styles from "./ProgramsCardSection.module.scss"
import { programsData } from '../../data/programData'
import "../../Main.scss";

export default function Programs() {
    return (
        <>

            <section className={styles.programSection}>
                <div className="container">

                    <div className={`row ${styles.cardsRow}`}>
                        {programsData.map((item, index) => (
                            <div
                                key={index}
                                className={`col-lg-4 col-md-6 col-12 ${styles.cardWrapper}`}
                            >
                                <ProgramCard
                                    image={item.image}
                                    title={item.title}
                                    description={item.description}
                                />
                            </div>
                        ))}
                    </div>


                    <nav className="mt-4">
                        <ul className={`pagination justify-content-center ${styles.customPagination}`}>

                            <li className="page-item arrow">
                                <button className="page-link arrow">&lt;</button>
                            </li>

                            <li className="page-item ">
                                <button className="page-link num">1</button>
                            </li>

                            <li className="page-item">
                                <button className="page-link num">2</button>
                            </li>

                            <li className="page-item arrow">
                                <button className="page-link arrow">&gt;</button>
                            </li>

                        </ul>
                    </nav>

                </div>
            </section>
        </>
    )
}