import React from "react";
import "./Home.scss";
import "../../Main.scss";
import MiniCard from "../../Component/MiniCard/MiniCard";
import { CardsData } from "../../data/cardsData";
import CmnHeading from "../../Component/CmnHeading/CmnHeading";
import HomeBanner from '../../Component/HomeBanner/HomeBanner';
import FaqSection from "../../Component/Faqs/Faqs-Section/FaqSection";
import TwoSide from "../../Component/SectionTwoSIde/TwoSide/TwoSide";
import TestSection from "../../Component/Testimonial/Test/TestSection";

export default function Home() {
    return (
        <section className="common-space">
            <div className="container">

                <div className="Home-Banner">
                    <HomeBanner />
                </div>
                <div className="about-us">
                    <TwoSide/>
                    
                </div>
                

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
                  <section className="Testimonial">
                    <TestSection/>
                  </section>
                <section className="Faqs-section">
                    <FaqSection />
                </section>


            </div>
        </section>
    );
};
