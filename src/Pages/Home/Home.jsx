import React from "react";
import "./Home.scss";
import "../../Main.scss";
import TwoSide from "../../Component/SectionTwoSIde/TwoSide/TwoSide";
import TestSection from "../../Component/Testimonial/Test/TestSection";

export default function Home() {
    return (
            <>
              
                <section className="about-us">
                    <div className="container">
                        <TwoSide/>
                    </div>
                </section>
              

                
                  <section className="Testimonial">
                    <div className="container">
                        <TestSection/>
                    </div>
                  </section>
             
            </>
    );
};
