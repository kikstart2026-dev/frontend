import React from 'react'
import CmnHeading from '../../CmnHeading/CmnHeading'
import { CardsData } from '../../../Data/cardsData'
import MiniCard from '../MiniCard'

import "./MiniCardSection.scss";
import "../../../Main.scss";

export default function MiniCardSection() {
    return (
        <>
            <div className="why-choose-us">
                <CmnHeading
                    title="Why Choose Us"
                    subtitle="Give the Gift of Gym"
                    details="Lorem ipsum dolor sit amet consectetur. Vitae elit quam volutpat id. Quisque orci lacinia sit non. Diam et adipiscing proin orci. Eget lorem sit etiam molestie rhoncus non. Ut tincidunt tristique suspendisse arcu ac."
                    align="center"
                />
            </div>
            <div className="cards-section">

                {CardsData.map((item, index) => (
                    <MiniCard
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                        color={item.color}
                    />
                ))}
            </div>
        </>
    )
}
