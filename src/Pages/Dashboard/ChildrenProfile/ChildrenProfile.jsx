import React, {
  useEffect,
  useState,
} from "react";

import styles from "./ChildrenProfile.module.scss";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getAllChild,
} from "../../../apis/api";

const ChildrenProfile = () => {

  const IMAGE_BASE_URL =
    "http://localhost:8008";

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [children, setChildren] =
    useState([]);

  const [
    activeChild,
    setActiveChild,
  ] = useState(null);

  const [loading, setLoading] =
    useState(true);

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

          setChildren(res.data);

          if (
            res.data.length > 0
          ) {

            if (id) {

              const selectedChild =
                res.data.find(
                  (child) =>
                    child._id === id
                );

              setActiveChild(
                selectedChild ||
                  res.data[0]
              );

            } else {

              setActiveChild(
                res.data[0]
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

          {children.map((child) => (

            <button
              key={child._id}
              className={
                activeChild?._id ===
                child._id
                  ? styles.activeTab
                  : ""
              }
              onClick={() =>
                setActiveChild(
                  child
                )
              }
            >

              {child.fullName}

            </button>
          ))}

        </div>

        <button
          className={
            styles.addBtn
          }
          onClick={() =>
            navigate(
              "/dashboard/children-details"
            )
          }
        >

          +ADD CHILD

        </button>

      </div>

      {/* ================= MAIN CONTENT ================= */}

      {activeChild && (

        <div className={styles.content}>

          {/* ================= LEFT ================= */}

          <div
            className={
              styles.leftSection
            }
          >

            {/* FULL WIDTH NAME */}

            <div
              className={
                styles.fullWidthCard
              }
            >

              <label>
                Full Name
              </label>

              <p>
                {
                  activeChild.fullName
                }
              </p>

            </div>

            {/* EMAIL + AGE */}

            <div className={styles.row}>

              <div
                className={
                  styles.card
                }
              >

                <label>
                  Email Id
                </label>

                <p>
                  {activeChild.email ||
                    "N/A"}
                </p>

              </div>

              <div
                className={
                  styles.card
                }
              >

                <label>
                  Age
                </label>

                <p>
                  {
                    activeChild.age
                  }{" "}
                  years
                </p>

              </div>

            </div>

            <div
              className={
                styles.card
              }
            >

              <label>
                Location
              </label>

              <p>
                {
                  activeChild.location
                }
              </p>

            </div>

            <div
              className={
                styles.card
              }
            >

              <label>
                Food Habit
              </label>

              <p>
                {activeChild.foodHabit ||
                  "N/A"}
              </p>

            </div>

            <div
              className={
                styles.card
              }
            >

              <label>
                Have Any Type Of
                Allergy?
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

            <div
              className={
                styles.card
              }
            >

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

            <div
              className={
                styles.card
              }
            >

              <label>
                Any Prolong
                Disease
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
                }{" "}
                years old

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
                  styles.paymentBadge
                }
              >

                ONETIME PAYMENT

              </div>

              <p>

                Lorem ipsum dolor
                sit amet
                consectetur.
                Pharetra et ac
                vitae.

              </p>

              <hr />

              <div
                className={
                  styles.paymentBottom
                }
              >

                <div>

                  <h2>$49</h2>

                  <span>
                    Onetime
                  </span>

                </div>

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

      )}

    </div>
  );
};

export default ChildrenProfile;