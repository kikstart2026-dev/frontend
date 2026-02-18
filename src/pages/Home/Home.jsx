import React from "react";
import ProgramsSection from "../../Component/Services/ProgramsSection/ProgramsSection";
import "./Home.scss";
import "../../Main.scss";
import MiniCardSection from "../../Component/WhyChooseUs/MiniCardSection/MiniCardSection";

export default function Home() {
    return (
        <>
            <section className="common-space">
                <div className="container">
                    <MiniCardSection />
                </div>
            </section>

            <section>
                <div className="program-part">
                    <ProgramsSection />
                </div>
            </section>
        </>
    );
}
