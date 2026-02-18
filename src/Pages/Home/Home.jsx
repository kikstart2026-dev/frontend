import React from "react";
import "./Home.scss";
import "../../Main.scss";

import HomeBanner from '../../Component/HomeBanner/HomeBanner';
import FaqSection from "../../Component/Faqs/Faqs-Section/FaqSection";

export default function Home() {
    return (
        <section className="common-space">
            <div className="container">

                <div className="Home-Banner">
                    <HomeBanner />
                </div>

                <section className="Faqs-section">
                    <FaqSection />
                </section>
            </div>
        </section>
    );
};
