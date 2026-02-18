import React from "react";
import ProgramsSection from "../../Component/Services/ProgramsSection/ProgramsSection";
import "./Home.scss";
import "../../Main.scss";
import MiniCardSection from "../../Component/WhyChooseUs/MiniCardSection/MiniCardSection";
import FaqSection from "../../Component/Faqs/Faqs-Section/FaqSection";
import HomeBanner from "../../Component/HomeBanner/HomeBanner";

export default function Home() {
    return (
        <>
            <section className="Home-Banner">
                <HomeBanner />
            </section>

            <section className="MiniCard">
                <div className="container">
                    <MiniCardSection />
                </div>
            </section>
            
            <section className="program-part">
                <ProgramsSection />
            </section>

            <section className="Faqs-section">
                <div className="container">
                    <FaqSection />
                </div>
            </section>


        </>
    );
}
