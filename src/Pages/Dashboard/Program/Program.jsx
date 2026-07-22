import React, {
    useEffect,
    useState,
} from "react";

import NextFormPara from "../../../Component/ChildrenAll/NextFormPara/NextFormPara";

import { useQuery } from "@tanstack/react-query";

import styles from "./Program.module.scss";


import { getMyChildren } from "../../../apis/api";
import UserDashboardSkeleton from "../../../Skeletons/UserDashboardSkeleton/UserDashboardSkeleton";

export default function Program() {
    const user =
        JSON.parse(localStorage.getItem("user")) || {};

    const [search, setSearch] = useState("");
    const [expandedChild, setExpandedChild] =
        useState(null);

    const [showModal, setShowModal] =
        useState(false);

    const [selectedChild, setSelectedChild] =
        useState(null);

    const {
        data,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["my-programs", user.email],
        queryFn: () => getMyChildren(user.email),
        enabled: !!user.email,
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    const children = data?.data || [];

    const filteredChildren = children.filter((child) =>
        child.fullName
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    const toggleChild = (id) => {
        setExpandedChild((prev) =>
            prev === id ? null : id
        );
    };

    const handleOpenModal = (child) => {
        setSelectedChild(child);
        setShowModal(true);

        document.body.style.overflow = "hidden";
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedChild(null);

        document.body.style.overflow = "auto";
    };

    if (isLoading) {
        return <UserDashboardSkeleton />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h2>Programs</h2>
                    <p>
                        View each child's assigned programs and coaches.
                    </p>
                </div>

                <input
                    type="text"
                    placeholder="Search child..."
                    className={styles.search}
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />
            </div>

            <div className={styles.childrenList}>
                {filteredChildren.length > 0 ? (
                    filteredChildren.map((child) => (
                        <div
                            key={child._id}
                            className={styles.childCard}
                        >
                            {/* ================= Child Header ================= */}

                            <div
                                className={styles.childHeader}
                                onClick={() =>
                                    toggleChild(child._id)
                                }
                            >
                                <div className={styles.left}>
                                    <div className={styles.avatar}>
                                        {child.fullName?.charAt(0)}
                                    </div>

                                    <div>
                                        <h3>{child.fullName}</h3>

                                        <p>
                                            Age : {child.age}
                                        </p>

                                        <span>
                                            {child.programAssignments
                                                ?.length || 0}{" "}
                                            Program(s)
                                        </span>
                                    </div>
                                </div>

                                <button
                                    className={styles.expandBtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenModal(child);
                                    }}
                                >
                                    +
                                </button>
                            </div>

                            {/* ================= Expanded ================= */}

                            {expandedChild ===
                                child._id && (
                                    <div
                                        className={
                                            styles.programWrapper
                                        }
                                    >
                                        {child.programAssignments
                                            ?.length > 0 ? (
                                            child.programAssignments.map(
                                                (
                                                    assignment,
                                                    index
                                                ) => (
                                                    <div
                                                        key={index}
                                                        className={
                                                            styles.programCard
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.programTop
                                                            }
                                                        >
                                                            <h4>
                                                                {
                                                                    assignment
                                                                        ?.program
                                                                        ?.title
                                                                }
                                                            </h4>

                                                            <span
                                                                className={
                                                                    styles.badge
                                                                }
                                                            >
                                                                Assigned
                                                            </span>
                                                        </div>

                                                        <div
                                                            className={
                                                                styles.coachInfo
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.coachAvatar
                                                                }
                                                            >
                                                                {assignment?.coach?.fullname?.charAt(
                                                                    0
                                                                )}
                                                            </div>

                                                            <div>
                                                                <h5>
                                                                    {
                                                                        assignment
                                                                            ?.coach
                                                                            ?.fullname
                                                                    }
                                                                </h5>

                                                                <p>
                                                                    📧{" "}
                                                                    {
                                                                        assignment
                                                                            ?.coach
                                                                            ?.email
                                                                    }
                                                                </p>

                                                                <p>
                                                                    📞{" "}
                                                                    {
                                                                        assignment
                                                                            ?.coach
                                                                            ?.phone
                                                                    }
                                                                </p>

                                                                <p>
                                                                    📍{" "}
                                                                    {
                                                                        assignment
                                                                            ?.coach
                                                                            ?.location
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )
                                        ) : (
                                            <div
                                                className={
                                                    styles.emptyProgram
                                                }
                                            >
                                                No Program Assigned
                                            </div>
                                        )}
                                    </div>
                                )}
                        </div>
                    ))
                ) : (
                    <div className={styles.noData}>
                        No children found.
                    </div>
                )}
            </div>

            {showModal && (
                <div
                    className={styles.modalOverlay}
                    onClick={handleCloseModal}
                >
                    <div
                        className={styles.modal}
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >
                        <div className={styles.modalHeader}>
                            <h3>
                                Assign Programs
                            </h3>

                            <button
                                className={styles.closeBtn}
                                onClick={handleCloseModal}
                            >
                                ✕
                            </button>
                        </div>

                        <NextFormPara
                            child={selectedChild}
                            onClose={handleCloseModal}
                            refetchChildren={refetch}
                        />
                    </div>
                </div>
            )}

            {showModal && (
                <div
                    className={styles.modalOverlay}
                    onClick={handleCloseModal}
                >
                    <div
                        className={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.modalHeader}>
                            <h2>
                                {selectedChild?.fullName} - Programs
                            </h2>

                            <button
                                className={styles.closeBtn}
                                onClick={handleCloseModal}
                            >
                                ✕
                            </button>
                        </div>

                        <NextFormPara
                            isModal={true}
                            child={selectedChild}
                            duration=""
                            onClose={handleCloseModal}
                            refetchChildren={refetch}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}