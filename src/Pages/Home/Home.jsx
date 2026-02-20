import React from "react";
import "./Home.scss";
import "../../Main.scss";
import TwoSide from "../../Component/SectionTwoSIde/TwoSide/TwoSide";
import TestSection from "../../Component/Testimonial/Test/TestSection";
import MiniCardSection from "../../Component/WhyChooseUs/MiniCardSection/MiniCardSection"
import ProgramsSection from "../../Component/Services/ProgramsSection/ProgramsSection";
import FaqSection from "../../Component/Faqs/Faqs-Section/FaqSection";
import HomeBanner from "../../Component/HomeBanner/HomeBanner";


export default function Home() {
    return (
        <div className="home">

            <HomeBanner />

            <TwoSide />

            <MiniCardSection limit={4} />

            <ProgramsSection limit={3} />

            <TestSection />

            <FaqSection />

        </div>
    );
};
