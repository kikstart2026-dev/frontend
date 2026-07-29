import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./CoachHeader.module.scss";
import { FaBell } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import kiklogo from "../../assets/images/authLogo.png";

import {
    getCoachNotifications,
    getUnreadNotifications,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    clearNotifications,
} from "../../apis/api";



export default function CoachHeader() {


    const location = useLocation();

    const navigate = useNavigate();


    const [open, setOpen] = useState(false);

    const [coach, setCoach] = useState(null);

    const [notifications, setNotifications] = useState([]);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const getImageUrl = (path) => {
        if (!path) return "/default-image.png";

        if (path.startsWith("http")) {
            return path;
        }

        return `http://localhost:8008${path}`;
    };

    // ================= GET COACH FROM LOCAL STORAGE =================

    useEffect(() => {

        const storedCoach = localStorage.getItem("user");


        if (storedCoach) {

            setCoach(JSON.parse(storedCoach));

        }


    }, []);

    useEffect(() => {
        console.log("COACH =>", coach);
    }, [coach]);




    useEffect(() => {
        if (!coach?.id) return;

        loadNotifications(coach.id);
    }, [coach]);

    const loadNotifications = async (coachId) => {
        try {
            // console.log("Coach Id:", coachId);

            const listRes = await getCoachNotifications(coachId);

            // console.log("Notification Response:", listRes);

            const countRes = await getUnreadNotifications(coachId);

            // console.log("Count Response:", countRes);

            setNotifications(listRes.data || []);
            setUnreadCount(countRes.count || 0);
        } catch (err) {
            console.log(err);
        }
    };
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
                 <div className={styles.navLogo}>
                <NavLink to="/">
                  <img
                    src={kiklogo}
                    alt="logo"
                    className={styles.logo}
                  />
                </NavLink>
              </div>

                <div className={styles.left}>

                    <h2>
                        {getPageTitle()}
                    </h2>

                </div>







                {/* RIGHT SECTION */}

                <div className={styles.right}>


                    {/* Notification */}

                    <div
                        className={styles.notification}
                        onClick={async () => {

                            setNotificationOpen(!notificationOpen);

                            if (!notificationOpen && unreadCount > 0) {

                                await markAllNotificationsRead(coach.id);

                                setUnreadCount(0);

                                loadNotifications(coach.id);
                            }

                        }}
                    >
                        <FaBell />

                        {unreadCount > 0 && (
                            <span>{unreadCount}</span>
                        )}

                        {notificationOpen && (
                            <div className={styles.notificationDropdown}>

                                <div className={styles.notificationHeader}>

                                    <h4>Notifications</h4>

                                    {notifications.length > 0 && (
                                        <button
                                            onClick={async (e) => {

                                                e.stopPropagation();

                                                await clearNotifications(coach.id);

                                                loadNotifications(coach.id);

                                            }}
                                        >
                                            Clear All
                                        </button>
                                    )}

                                </div>

                                {notifications.length === 0 ? (
                                    <p>No notifications</p>
                                ) : (
                                    notifications.map((item) => (
                                        <div
                                            key={item._id}
                                            className={`${styles.notificationItem} ${!item.isRead ? styles.unread : ""
                                                }`}
                                            onClick={async () => {


                                                if (!item.isRead) {

                                                    await markNotificationRead(item._id);

                                                }


                                                if (item.childId && item.programId) {


                                                    navigate(`/coach-dashboard/children/${item.childId._id}`);


                                                } else if (item.childId && !item.programId) {


                                                    navigate(`/coach-dashboard/children/${item.childId._id}`);

                                                } else if (item.programId) {



                                                    navigate(`/coach-dashboard/programs/${item.programId._id}`);

                                                }


                                                setNotificationOpen(false);

                                                loadNotifications(coach.id);

                                            }}
                                        >
                                            <div className={styles.imageWrapper}>
                                                {item.childId?.profileImage ? (
                                                    <img
                                                        src={getImageUrl(item.childId.profileImage)}
                                                        className={styles.childImage}
                                                        alt=""
                                                    />
                                                ) : (
                                                    <img
                                                        src={item.programId?.image}
                                                        className={styles.childImage}
                                                        alt=""
                                                    />
                                                )}
                                            </div>

                                            <div className={styles.notificationContent}>
                                                <div className={styles.notificationTop}>

                                                    <h5>
                                                        {item.childId?.fullName || item.programId?.title}
                                                    </h5>

                                                    <span
                                                        className={styles.deleteCross}

                                                        onClick={async (e) => {

                                                            e.stopPropagation();

                                                            await deleteNotification(item._id);

                                                            loadNotifications(coach.id);

                                                        }}
                                                    >
                                                        ×
                                                    </span>

                                                </div>

                                                {/* {item.programId?.title && (
                                                    <p>{item.programId.title}</p>
                                                )} */}

                                                <small>{item.message}</small>


                                                {/* <span className={styles.time}>
                                                    {new Date(item.createdAt).toLocaleString()}
                                                </span> */}
                                            </div>
                                        </div>
                                    ))
                                )}

                            </div>
                        )}
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



            </header >









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