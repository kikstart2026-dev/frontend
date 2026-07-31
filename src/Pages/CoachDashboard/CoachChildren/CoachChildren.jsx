import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCoachChildren } from "../../../apis/api";
import styles from "./CoachChildren.module.scss";

// const BASE_URL = "http://localhost:8008";

import { IMAGE_BASE_URL } from "../../../Helper/Helper"; // helper path অনুযায়ী

// const BASE_URL = "http://localhost:8008";

export default function CoachChildren() {
    const { id } = useParams();

    const coach = JSON.parse(localStorage.getItem("user"));

    const coachId = coach?.id || coach?._id;

    const { data, isLoading, error } = useQuery({
        queryKey: ["coachChildren", coachId],
        queryFn: () => getCoachChildren(coachId),
        enabled: !!coachId,
    });

    const children = data?.data || [];

    const [activeChild, setActiveChild] = useState(null);

    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {

        if (!children.length) return;


        if (id) {

            const selectedChild = children.find(
                (child) => child._id === id
            );


            if (selectedChild) {
                setActiveChild(selectedChild);
                return;
            }

        }


        if (!activeChild) {
            setActiveChild(children[0]);
        }


    }, [children, id]);

    const visibleChildren = children.slice(startIndex, startIndex + 5);

    const handleNext = () => {
        if (startIndex + 5 < children.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    if (isLoading) {
        return (
            <div className={styles.page}>
                <h3>Loading...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.page}>
                <h3>Something went wrong.</h3>
            </div>
        );
    }

    if (!children.length) {
        return (
            <div className={styles.page}>
                <h3>No Children Assigned</h3>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.topBar}>
                <div className={styles.tabs}>

                    {startIndex > 0 && (
                        <button
                            className={styles.arrow}
                            onClick={handlePrev}
                        >
                            ◀
                        </button>
                    )}

                    {visibleChildren.map((child) => (
                        <button
                            key={child._id}
                            onClick={() => setActiveChild(child)}
                            className={`${styles.tab} ${activeChild?._id === child._id
                                ? styles.activeTab
                                : ""
                                }`}
                        >
                            {child.fullName}
                        </button>
                    ))}

                    {startIndex + 5 < children.length && (
                        <button
                            className={styles.arrow}
                            onClick={handleNext}
                        >
                            ▶
                        </button>
                    )}

                </div>
            </div>

            {activeChild && (
                <div className={styles.content}>

                    {/* LEFT SIDE */}

                    <div className={styles.leftSection}>

                        <h2>Children Details</h2>

                        <div className={styles.row}>

                            <div className={styles.card}>
                                <label>Full Name</label>
                                <p>{activeChild.fullName}</p>
                            </div>

                            <div className={styles.card}>
                                <label>Age</label>
                                <p>{activeChild.age} Years</p>
                            </div>

                        </div>

                        <div className={styles.row}>

                            <div className={styles.card}>
                                <label>Email</label>
                                <p>{activeChild.email}</p>
                            </div>

                            <div className={styles.card}>
                                <label>Food Habit</label>
                                <p>{activeChild.foodHabit}</p>
                            </div>

                        </div>

                        <div className={styles.fullCard}>
                            <label>Location</label>
                            <p>{activeChild.location}</p>
                        </div>

                        <div className={styles.fullCard}>
                            <label>Allergy</label>
                            <p>
                                {activeChild.allergy ? "Yes" : "No"}
                            </p>
                        </div>

                        <div className={styles.fullCard}>
                            <label>Disease</label>
                            <p>{activeChild.prolongDisease || "N/A"}</p>
                        </div>

                        <div className={styles.fullCard}>
                            <label>Assigned Date</label>
                            <p>
                                {new Date(
                                    activeChild.createdAt
                                ).toLocaleDateString()}
                            </p>
                        </div>

                    </div>

                    {/* RIGHT SIDE */}

                    <div className={styles.rightSection}>

                        {/* PROFILE */}

                        <div className={styles.profileCard}>

                            <img
                                src={`${IMAGE_BASE_URL}${activeChild.profileImage}`}
                                alt={activeChild.fullName}
                            />

                            <h3>{activeChild.fullName}</h3>

                            <span>{activeChild.age} Years</span>

                        </div>

                        {/* PROGRAM */}

                        <div className={styles.programCard}>
                            <h2>Assigned Programs</h2>

                            {activeChild.programAssignments?.length ? (
                                activeChild.programAssignments.map(
                                    (item, index) => (
                                        <div
                                            key={index}
                                            className={styles.assignmentCard}
                                        >
                                            {item.program?.image && (
                                                <img
                                                    src={item.program.image}
                                                    alt={item.program.title}
                                                />
                                            )}

                                            <h3>
                                                {item.program?.title}
                                            </h3>

                                            <p>
                                                <strong>Duration :</strong>{" "}
                                                {item.program?.duration ||
                                                    "2 Hours"}
                                            </p>

                                            {/* <p>
                                                <strong>Coach :</strong>{" "}
                                                {item.coach?.fullname}
                                            </p>

                                            <p>
                                                <strong>Email :</strong>{" "}
                                                {item.coach?.email}
                                            </p>

                                            <p>
                                                <strong>Phone :</strong>{" "}
                                                {item.coach?.phone}
                                            </p> */}
                                        </div>
                                    )
                                )
                            ) : (
                                <p>No Program Assigned</p>
                            )}
                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}


