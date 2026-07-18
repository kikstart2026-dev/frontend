import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import styles from "./CoachHeader.module.scss";

import {
    FaBell
} from "react-icons/fa";


export default function CoachHeader() {


    const location = useLocation();


    const [open, setOpen] = useState(false);

    const [coach, setCoach] = useState(null);



    // ================= GET COACH FROM LOCAL STORAGE =================

    useEffect(() => {

        const storedCoach = localStorage.getItem("user");


        if (storedCoach) {

            setCoach(JSON.parse(storedCoach));

        }


    }, []);





    // ================= BODY SCROLL LOCK =================

    useEffect(() => {


        if (open) {

            document.body.style.overflow = "hidden";
            document.body.style.height = "100vh";

        }
        else {

            document.body.style.overflow = "auto";
            document.body.style.height = "auto";

        }



        return () => {

            document.body.style.overflow = "auto";
            document.body.style.height = "auto";

        };


    }, [open]);







    // ================= INITIAL =================

    const getInitial = () => {

        return (
            coach?.fullname
                ?.charAt(0)
                ?.toUpperCase()
            ||
            "C"
        );

    };








    // ================= PAGE TITLE =================

    const getPageTitle = () => {


        const path = location.pathname;



        if (path === "/coach-dashboard") {

            return "Dashboard";

        }



        if (path.includes("/coach-dashboard/profile")) {

            return "My Profile";

        }



        if (path.includes("/coach-dashboard/edit-profile")) {

            return "Edit Profile";

        }



        if (path.includes("/coach-dashboard/change-password")) {

            return "Change Password";

        }



        if (path.includes("/coach-dashboard/programs")) {

            return "Programs";

        }



        if (path.includes("/coach-dashboard/children")) {

            return "Children";

        }



        if (path.includes("/coach-dashboard/messages")) {

            return "Messages";

        }



        return "Coach Dashboard";


    };








    return (

        <>


            <header className={styles.header}>


                {/* LEFT TITLE */}

                <div className={styles.left}>

                    <h2>
                        {getPageTitle()}
                    </h2>

                </div>







                {/* RIGHT SECTION */}

                <div className={styles.right}>


                    {/* Notification */}

                    <div className={styles.notification}>


                        <FaBell />


                        <span>
                            3
                        </span>


                    </div>







                    {/* PROFILE */}

                    <div

                        className={styles.profile}

                        onClick={() => setOpen(true)}

                    >



                        {
                            coach?.image ?

                                <img

                                    src={coach.image}

                                    alt="coach"

                                    className={styles.avatar}

                                />

                                :

                                <div className={styles.fallbackAvatar}>

                                    {getInitial()}

                                </div>

                        }





                        <div className={styles.info}>


                            <h4>

                                {coach?.fullname || "Coach"}

                            </h4>


                            <p>

                                {coach?.role || "Coach"}

                            </p>


                        </div>



                    </div>



                </div>



            </header>









            {/* ================= PROFILE MODAL ================= */}


            {
                open && (


                    <div

                        className={styles.modalOverlay}

                        onClick={() => setOpen(false)}

                    >



                        <div

                            className={styles.modalBox}

                            onClick={(e) => e.stopPropagation()}

                        >





                            <h3 className={styles.modalTitle}>

                                Coach Details

                            </h3>







                            {
                                coach?.image ?


                                    <img

                                        src={coach.image}

                                        alt="coach"

                                        className={styles.modalImage}

                                    />


                                    :


                                    <div className={styles.modalFallback}>

                                        {getInitial()}

                                    </div>

                            }









                            <div className={styles.modalInfo}>


                                <p>

                                    <b>Name:</b>

                                    {coach?.fullname || "N/A"}

                                </p>





                                <p>

                                    <b>Email:</b>

                                    {coach?.email || "N/A"}

                                </p>





                                <p>

                                    <b>Phone:</b>

                                    {coach?.phone || "N/A"}

                                </p>





                                <p>

                                    <b>Location:</b>

                                    {coach?.location || "N/A"}

                                </p>





                                <p>

                                    <b>Passcode:</b>

                                    {coach?.passcode || "N/A"}

                                </p>





                                <p>

                                    <b>Role:</b>

                                    {coach?.role || "N/A"}

                                </p>





                            </div>








                            <button

                                className={styles.modalCloseBtn}

                                onClick={() => setOpen(false)}

                            >

                                Close

                            </button>





                        </div>




                    </div>


                )
            }



        </>

    );

}