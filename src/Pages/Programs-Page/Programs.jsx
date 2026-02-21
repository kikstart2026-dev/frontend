import React from 'react'
import CommonBanner from '../../Component/CommonBanner/CommonBanner'
import ProgramsCardSection from "../../Component/ProgramPage/ProgramsCardSection";

import "../../Main.scss";

export default function Programs() {
    return (
        <>
            <CommonBanner title={"Programs"} />

            <ProgramsCardSection/>
        </>
    )
}