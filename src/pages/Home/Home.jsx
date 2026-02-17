import React from "react";
import MiniCard from "../../Component/MiniCard/MiniCard";
import { CardsData } from "../../data/cardsData";
import CmnHeading from "../../Component/CmnHeading/CmnHeading";
import ProgramsSection from "../Home/ProgramsSection"

import "./Home.scss";
import "../../Main.scss";
import { Link } from "react-router-dom";
import Button from "../../Component/Buttons/Button";

export default function Home() {
    return (
        <>
            <section className="common-space">
                <div className="container">
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
                </div>
            </section>
            <section className="common-space">
                <div className="why-choose-us">
                    <CmnHeading
                        title="SERVICES"
                        subtitle="Children’s Fitness Programs"
                        align="center"
                    />
                </div>
                <div className="program-part">
                    <ProgramsSection />
                </div>
                <div className="view-btn">
                    <Link to="/demo" >
                        <Button text="View all" variant="primary" />
                    </Link>
                </div>

            </section>
        </>
    );
}
