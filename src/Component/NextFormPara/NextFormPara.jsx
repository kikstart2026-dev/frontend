import React from 'react'
import './NextFormPara.scss'
import CmnHeading from '../CmnHeading/CmnHeading'
import Button from '../Buttons/Button'
import { useNavigate } from 'react-router-dom'

export default function NextFormPara({ name, duration }) {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/WaiverAcceptance");
    };

    const handleNext = () => {
        navigate("/success");   // 👈 change if needed
    };

    return (
        <div>

            <div className="para-head">
                <h3>Program Details</h3>
                <p>Lorem ipsum dolor sit amet consectetur</p>
            </div>

            <div className="program-info">
                <div className="program-left">
                    <span className="label">Program Name:</span>
                    <span className="value">{name || "Program Name 01"}</span>
                </div>

                <div className="program-right">
                    <span className="label">Program Duration:</span>
                    <span className="value">{duration || "2 Hours"}</span>
                </div>
            </div>

            <div className="mid">
                <h3>Details</h3>

                <CmnHeading
                    details={
                        <>
                            <p className="para">
                                Quam in non velit malesuada arcu eget id...
                            </p>
                            <p className="para">
                                Velit auctor eros egestas nunc suspendisse...
                            </p>
                        </>
                    }
                    align="left"
                />
            </div>

            <div className="btns">

                <div className="btn-b">
                    <Button
                        text="BACK"
                        variant="dark"
                        onClick={handleBack}
                    />
                </div>

                <div className="btn-r">
                    <Button
                        text="NEXT"
                        variant="primary"
                        onClick={handleNext}
                    />
                </div>

            </div>

        </div>
    )
}