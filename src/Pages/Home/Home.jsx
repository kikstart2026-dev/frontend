import React from "react";
import "./Home.scss";
import "../../Main.scss";
import TwoSide from "../../Component/SectionTwoSIde/TwoSide/TwoSide";
import TestSection from "../../Component/Testimonial/Test/TestSection";
import MiniCardSection from "../../Component/WhyChooseUs/MiniCardSection/MiniCardSection"
import ProgramsSection from "../../Component/Services/ProgramsSection/ProgramsSection";
import FaqSection from "../../Component/Faqs/Faqs-Section/FaqSection";
import HomeBanner from "../../Component/HomeBanner/HomeBanner";
import { CardsData } from "../../data/cardsData";


export default function Home() {
    return (
        <>
            <section className="Home-Banner">
                <HomeBanner />
            </section>

            <section className="about-us both-space">
                <div className="container">
                    <TwoSide />
                </div>
            </section>

            <section className="MiniCard">
                <div className="container">
                    <MiniCardSection
                        data={CardsData}
                        limit={4}
                    />
                </div>
            </section>
            <section className="program-part">
                <ProgramsSection />
            </section>

            <section className="Testimonial common-space ">
                <div className="container">
                    <TestSection />
                </div>
            </section>

            <section className="Faqs-section common-space">
                <div className="container">
                    <FaqSection />
                </div>

            </section>


        </>
    );
};
