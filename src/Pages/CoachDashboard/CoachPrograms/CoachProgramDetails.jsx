import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getCoachProgramDetails } from "../../../apis/api";

import styles from "./CoachProgramDetails.module.scss";


const CoachProgramDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [play, setPlay] = useState(false);


    const { data, isLoading } = useQuery({
        queryKey: ["coach-program-details", id],
        queryFn: () => getCoachProgramDetails(id),
        enabled: !!id,
    });


    const program = data?.data;


    if (isLoading) {
        return (
            <div className={styles.loading}>
                Loading Program Details...
            </div>
        );
    }


    if (!program) {
        return (
            <div className={styles.notFound}>

                <h2>
                    Program Not Found
                </h2>

                <button
                    onClick={() =>
                        navigate("/coach-dashboard/programs")
                    }
                >
                    Back
                </button>

            </div>
        );
    }



    const getEmbedUrl = (url) => {

        if (!url) return "";

        if (url.includes("watch?v=")) {
            return url.replace(
                "watch?v=",
                "embed/"
            ) + "?autoplay=1";
        }

        return url;

    };



    return (

        <div className={styles.wrapper}>


            <div className={styles.card}>


                <div className={styles.content}>

                    <span className={styles.badge}>
                        Assigned Program
                    </span>

                    <h1>
                        {program.title}
                    </h1>



                    {/* VIDEO SECTION */}

                    <div className={styles.videoWrapper}>


                        {!play ? (

                            <>

                                <img
                                    src={program.image}
                                    alt={program.title}
                                    className={styles.thumbnail}
                                />


                                <div
                                    className={styles.playBtn}
                                    onClick={() => setPlay(true)}
                                >

                                    <i className="bi bi-play-fill"></i>

                                </div>

                            </>


                        ) : (


                            <iframe
                                src={getEmbedUrl(program.video)}
                                title="program video"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            ></iframe>


                        )}



                    </div>





                    <div className={styles.infoBox}>


                        <h3>
                            <i className="bi bi-file-text"></i>
                            Program Overview
                        </h3>


                        <p>
                            {program.details}
                        </p>


                    </div>




                    <div className={styles.infoBox}>


                        <h3>
                            <i className="bi bi-info-circle"></i>
                            Additional Information
                        </h3>


                        <p>
                            {program.details2}
                        </p>


                    </div>




                </div>


            </div>



            {/* BACK BUTTON নিচে */}

            <button
                className={styles.backBtn}
                onClick={() => navigate(-1)}
            >

                <i className="bi bi-arrow-left"></i>

                Back

            </button>


        </div>

    );

};


export default CoachProgramDetails;