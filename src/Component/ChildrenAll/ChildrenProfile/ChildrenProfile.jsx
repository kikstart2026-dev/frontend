import React, {
  useEffect,
  useState,
} from "react";

import styles from "./ChildrenProfile.module.scss";

import {
  getAllChild,
} from "../../apis/api";

export default function ChildrenProfile() {

  // ================= STATES =================

  const [children, setChildren] =
    useState([]);

  const [activeId, setActiveId] =
    useState(null);

  // ================= FETCH DATA =================

  useEffect(() => {

    const fetchChildren =
      async () => {

        try {

          const res =
            await getAllChildren();

          console.log(
            "CHILDREN RESPONSE : ",
            res
          );

          // API response
          // adjust according to your response structure

          const childrenData =
  Array.isArray(res)
    ? res
    : Array.isArray(res?.children)
    ? res.children
    : Array.isArray(res?.data)
    ? res.data
    : Array.isArray(
        res?.data?.children
      )
    ? res.data.children
    : [];

          setChildren(childrenData);

          // first child active
          if (
            childrenData.length > 0
          ) {

            setActiveId(
              childrenData[0]._id
            );
          }

        } catch (error) {

          console.log(error);
        }
      };

    fetchChildren();

  }, []);

  // ================= ACTIVE CHILD =================

  const activeChild =
    children.find(
      (c) => c._id === activeId
    );

  // ================= LOADING =================

  if (!activeChild) {

    return (
      <div
        className={styles.loading}
      >
        Loading...
      </div>
    );
  }

  return (

    <div className={styles.container}>

      {/* ================= HEADER ================= */}

      <div className={styles.header}>

        <h2>
          Children Profile
        </h2>

        <button
          className={styles.addBtn}
        >
          + ADD CHILD
        </button>

      </div>

      {/* ================= TABS ================= */}

      <div className={styles.tabs}>

        {
          children.map(
            (child, index) => (

              <button
                key={child._id}
                className={`${styles.tab} ${
                  activeId ===
                  child._id
                    ? styles.activeTab
                    : ""
                }`}
                onClick={() =>
                  setActiveId(
                    child._id
                  )
                }
              >

                Child Name{" "}
                {index + 1}

              </button>
            )
          )
        }

      </div>

      {/* ================= MAIN ================= */}

      <div className={styles.main}>

        {/* ================= LEFT ================= */}

        <div
          className={
            styles.formSection
          }
        >

          <div className={styles.row}>

            <Input
              label="Full Name"
              value={
                activeChild.fullName
              }
            />

            <Input
              label="Email Id"
              value={
                activeChild.email
              }
            />

            <Input
              label="Age"
              value={
                activeChild.age
              }
            />

          </div>

          <Input
            label="Location"
            value={
              activeChild.location
            }
          />

          <Input
            label="School Name"
            value={
              activeChild.school ||
              "N/A"
            }
          />

          <Input
            label="Food Habit"
            value={
              activeChild.foodHabit
            }
          />

          <Input
            label="Have Any Type Of Allergy?"
            value={
              activeChild.allergy
                ? "Yes"
                : "No"
            }
          />

          <Input
            label="Allergy Details"
            value={
              activeChild.allergyDetails
            }
          />

          <Input
            label="Any Prolong Disease"
            value={
              activeChild.prolongDisease
            }
            highlight
          />

        </div>

        {/* ================= RIGHT ================= */}

        <div
          className={
            styles.sideSection
          }
        >

          {/* PROFILE CARD */}

          <div className={styles.card}>

            <img
              src={`http://localhost:5000${activeChild.profileImage}`}
              alt="child"
            />

            <h3>
              {
                activeChild.fullName
              }
            </h3>

            <p>
              {
                activeChild.email
              }
            </p>

            <p>
              Age :{" "}
              {
                activeChild.age
              }
            </p>

            <button
              className={
                styles.editBtn
              }
            >
              EDIT PROFILE
            </button>

          </div>

          {/* PAYMENT CARD */}

          <div
            className={
              styles.paymentCard
            }
          >

            <span>
              ONETIME PAYMENT
            </span>

            <p>
              Lorem ipsum dolor sit
              amet consectetur.
            </p>

            <h2>$49</h2>

            <div
              className={
                styles.paid
              }
            >
              ● Full paid
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

// ================= INPUT COMPONENT =================

function Input({
  label,
  value,
  highlight,
}) {

  return (

    <div
      className={`${
        styles.inputBox
      } ${
        highlight
          ? styles.highlight
          : ""
      }`}
    >

      <label>{label}</label>

      <p>{value || "N/A"}</p>

    </div>
  );
}