import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import styles from "./ChildrenProfile.module.scss";

import { useNavigate, useParams } from "react-router-dom";

import {
  getAllChild,
  getUserActivePlan,
} from "../../../apis/api";

import { toast } from "react-toastify";

const ChildrenProfile = () => {

  const IMAGE_BASE_URL = "http://localhost:8008";

  const { id } = useParams();

  const navigate = useNavigate();

  // ================= STATES =================

  const [children, setChildren] = useState([]);

  const [activeChild, setActiveChild] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [startIndex, setStartIndex] =
    useState(0);

  const [currentPlan, setCurrentPlan] =
    useState(null);

  const [daysLeft, setDaysLeft] =
    useState(0);

  const [paymentLoading, setPaymentLoading] =
    useState(true);

  const [maxChildren, setMaxChildren] =
    useState(0);

  // ================= USER =================

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const userEmail =
    user?.email
      ?.toLowerCase()
      ?.trim();

  // ================= VISIBLE CHILDREN =================

  const visibleChildren =
    children.slice(
      startIndex,
      startIndex + 5
    );

  // ================= SLIDER =================

  const handleNext = () => {

    if (
      startIndex + 5 <
      children.length
    ) {

      setStartIndex(
        startIndex + 1
      );
    }
  };

  const handlePrev = () => {

    if (startIndex > 0) {

      setStartIndex(
        startIndex - 1
      );
    }
  };

  // ================= FETCH CHILDREN =================

  const fetchChildren =
    async () => {

      try {

        const res =
          await getAllChild();

        console.log(
          "CHILD RESPONSE => ",
          res
        );

        if (res.success) {

          const filteredChildren =
            res.data.filter(
              (child) =>
                child?.email
                  ?.toLowerCase()
                  ?.trim() ===
                userEmail
            );

          setChildren(
            filteredChildren
          );

          if (
            filteredChildren.length > 0
          ) {

            if (id) {

              const selectedChild =
                filteredChildren.find(
                  (child) =>
                    child._id === id
                );

              setActiveChild(
                selectedChild ||
                filteredChildren[0]
              );

            } else {

              setActiveChild(
                filteredChildren[0]
              );
            }
          }
        }

      } catch (error) {

        console.log(
          "FETCH ERROR => ",
          error
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchChildren();

  }, []);

  // ================= FETCH ACTIVE PLAN =================

  useQuery({

    queryKey: [
      "active-plan",
      userEmail,
    ],

    enabled: !!userEmail,

    queryFn: async () => {

      try {

        setPaymentLoading(true);

        const res =
          await getUserActivePlan(
            userEmail
          );

        console.log(
          "ACTIVE PLAN => ",
          res
        );

        if (res?.success) {

          setCurrentPlan(
            res.subscription
          );

          setDaysLeft(
            res.daysLeft || 0
          );

          setMaxChildren(
            res.subscription
              ?.subscriptionId
              ?.maxChildren || 0
          );

        } else {

          setCurrentPlan(null);

          setDaysLeft(0);

          setMaxChildren(0);
        }

        return res;

      } catch (error) {

        console.log(
          "PLAN ERROR => ",
          error
        );

        setCurrentPlan(null);

        setDaysLeft(0);

        setMaxChildren(0);

      } finally {

        setPaymentLoading(false);
      }
    },
  });

  // ================= LIMIT CHECK =================

  const limitReached =
    maxChildren > 0 &&
    children.length >= maxChildren;

  // ================= LOADING =================

  if (loading) {

    return <h2>Loading...</h2>;
  }

  return (

    <div
      className={
        styles.childrenProfile
      }
    >

      {/* ================= TOP BAR ================= */}

      <div className={styles.topBar}>

        <div className={styles.tabs}>

          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
          >
            ◀
          </button>

          {visibleChildren.map(
            (child) => (

              <button
                key={child._id}
                className={
                  activeChild?._id ===
                    child._id
                    ? styles.activeTab
                    : ""
                }
                onClick={() =>
                  setActiveChild(child)
                }
              >
                {child.fullName}
              </button>
            )
          )}

          <button
            onClick={handleNext}
            disabled={
              startIndex + 5 >=
              children.length
            }
          >
            ▶
          </button>

        </div>

        <button
          className={`${styles.addBtn} ${limitReached
              ? styles.disabledBtn
              : ""
            }`}
          onClick={() => {

            if (limitReached) {

              toast.error(
                "Maximum child limit reached for your subscription"
              );

              return;
            }

            if (!currentPlan) {

              toast.warning(
                "Please subscribe to a plan first"
              );

              setTimeout(() => {

                navigate(
                  "/dashboard/enrolment-package"
                );

              }, 1000);

              return;
            }

            navigate(
              "/dashboard/children-details"
            );
          }}
        >
          +ADD CHILD
        </button>

      </div>

      {/* ================= MAIN CONTENT ================= */}

      {activeChild && (

        <div className={styles.content}>

          {/* ================= LEFT ================= */}

          <div className={styles.leftSection}>

            <div className={styles.fullWidthCard}>

              <label>
                Full Name
              </label>

              <p>
                {activeChild.fullName}
              </p>

            </div>

            <div className={styles.row}>

              <div className={styles.card}>

                <label>
                  Email Id
                </label>

                <p>
                  {activeChild.email ||
                    "N/A"}
                </p>

              </div>

              <div className={styles.card}>

                <label>
                  Age
                </label>

                <p>
                  {activeChild.age} years
                </p>

              </div>

            </div>

            <div className={styles.card}>

              <label>
                Location
              </label>

              <p>
                {activeChild.location}
              </p>

            </div>

            <div className={styles.card}>

              <label>
                Food Habit
              </label>

              <p>
                {activeChild.foodHabit ||
                  "N/A"}
              </p>

            </div>

            <div className={styles.card}>

              <label>
                Have Any Type Of Allergy?
              </label>

              <p>

                {activeChild.allergy ===
                  true
                  ? "Yes"
                  : activeChild.allergy ===
                    false
                    ? "No"
                    : "N/A"}

              </p>

            </div>

            <div className={styles.card}>

              <label>
                Allergy Details
              </label>

              <p>

                {activeChild.allergy
                  ? activeChild.allergyDetails ||
                  "N/A"
                  : "N/A"}

              </p>

            </div>

            <div className={styles.card}>

              <label>
                Any Prolong Disease
              </label>

              <p>

                {activeChild.prolongDisease ||
                  "N/A"}

              </p>

            </div>

          </div>

          {/* ================= RIGHT ================= */}

          <div
            className={
              styles.rightSection
            }
          >

            {/* PROFILE CARD */}

            <div
              className={
                styles.profileCard
              }
            >

              <img
                src={
                  activeChild.profileImage
                    ? `${IMAGE_BASE_URL}${activeChild.profileImage}`
                    : "https://placehold.co/300x300"
                }
                alt="child"
              />

              <h3>
                {
                  activeChild.fullName
                }
              </h3>

              <span>

                {
                  activeChild.age
                } years old

              </span>

              <button
                onClick={() =>
                  navigate(
                    `/dashboard/children-edit/${activeChild._id}`
                  )
                }
              >
                Edit Profile
              </button>

            </div>

            {/* PAYMENT CARD */}

            <div
              className={
                styles.paymentCard
              }
            >

              <div
                className={
                  styles.planTop
                }
              >

                <span>
                  CURRENT PLAN
                </span>

                <div
                  className={
                    currentPlan
                      ? styles.activeBadge
                      : styles.inactiveBadge
                  }
                >

                  ● {
                    currentPlan
                      ? "Active"
                      : "Inactive"
                  }

                </div>

              </div>

              <h3>

                {
                  paymentLoading
                    ? "Loading..."
                    : currentPlan?.description ||
                    "No Payment Done"
                }

              </h3>

              <p>

                {
                  currentPlan
                    ? "Your subscription is active and fully paid."
                    : "No active subscription found."
                }

              </p>

              <h2>

                {
                  paymentLoading
                    ? "Loading..."
                    : `₹ ${currentPlan?.amount || 0}`
                }

              </h2>

              <div
                className={
                  styles.planBottom
                }
              >

                <div>

                  <small>
                    Payment Date
                  </small>

                  <strong>

                    {
                      currentPlan?.created_at
                        ? new Date(
                          currentPlan.created_at
                        ).toLocaleDateString()
                        : "N/A"
                    }

                  </strong>

                </div>

                <div>

                  <small>
                    Expires In
                  </small>

                  <strong>
                    {daysLeft} Days
                  </strong>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default ChildrenProfile;         