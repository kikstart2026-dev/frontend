import React, { useEffect, useState } from "react";

import styles from "./CoachProfile.module.scss";


export default function CoachProfile() {


    const [coach, setCoach] = useState(null);



    // ================= GET COACH =================

    useEffect(() => {

        const storedUser = localStorage.getItem("user");


        if(storedUser){

            setCoach(JSON.parse(storedUser));

        }


    }, []);





    const getInitial = () => {

        return (
            coach?.fullname
            ?.charAt(0)
            ?.toUpperCase()
            ||
            "C"
        );

    };





    if(!coach){

        return (

            <div className={styles.loader}>
                Loading...
            </div>

        );

    }



    return (

        <div className={styles.profilePage}>


            <div className={styles.profileCard}>


                {/* HEADER */}

                <div className={styles.profileHeader}>


                    {
                        coach?.image ?

                        <img
                            src={coach.image}
                            alt="coach"
                            className={styles.profileImage}
                        />

                        :

                        <div className={styles.avatar}>

                            {getInitial()}

                        </div>

                    }



                    <div className={styles.nameBox}>

                        <h2>
                            {coach?.fullname}
                        </h2>


                        <p>
                            {coach?.role || "Coach"}
                        </p>


                    </div>


                </div>






                {/* DETAILS */}


                <div className={styles.details}>


                    <div className={styles.item}>

                        <span>
                            Full Name
                        </span>

                        <strong>
                            {coach?.fullname || "-"}
                        </strong>

                    </div>





                    <div className={styles.item}>

                        <span>
                            Email
                        </span>

                        <strong>
                            {coach?.email || "-"}
                        </strong>

                    </div>






                    <div className={styles.item}>

                        <span>
                            Phone
                        </span>

                        <strong>
                            {coach?.phone || "-"}
                        </strong>

                    </div>






                    <div className={styles.item}>

                        <span>
                            Location
                        </span>

                        <strong>
                            {coach?.location || "-"}
                        </strong>

                    </div>






                    <div className={styles.item}>

                        <span>
                            Role
                        </span>

                        <strong>
                            {coach?.role || "-"}
                        </strong>

                    </div>




                </div>





            </div>


        </div>

    );

}