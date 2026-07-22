import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import styles from "./NextFormPara.module.scss";

import Button from "../../Buttons/Button";
import CmnHeading from "../../CmnHeading/CmnHeading";

import {
  handleError,
  handleSuccess,
} from "../../../utils";

import {
  createChild,
  updateChild,
  getAllServicesForDropdown,
  getServiceById,
} from "../../../apis/api";

export default function NextFormPara({
  duration,
  isModal = false,
  child = null,
  onClose,
  refetchChildren,
}) {
  const navigate = useNavigate();

  // ===========================
  // Dropdown State
  // ===========================

  const [programOpen, setProgramOpen] =
    useState(false);

  const [coachOpen, setCoachOpen] =
    useState(false);

  const dropdownRef = useRef(null);
  const coachDropdownRef = useRef(null);

  // ===========================
  // Selected Values
  // ===========================

  const [selectedProgram, setSelectedProgram] =
    useState("");

  const [selectedCoach, setSelectedCoach] =
    useState("");

  // ===========================
  // Final Added Programs
  // ===========================

  const [
    programAssignments,
    setProgramAssignments,
  ] = useState([]);

  useEffect(() => {
    if (
      isModal &&
      child?.programAssignments
    ) {
      const formatted =
        child.programAssignments.map(
          (item) => ({
            program:
              item.program._id,
            coach:
              item.coach._id,

            programTitle:
              item.program.title,

            coachName:
              item.coach.fullname,
          })
        );

      setProgramAssignments(formatted);
    }
  }, [child, isModal]);

  // ===========================
  // Get All Programs
  // ===========================

  const { data: servicesData } = useQuery({
    queryKey: ["services-dropdown"],
    queryFn: getAllServicesForDropdown,
  });

  const services =
    servicesData?.data || [];

  // ===========================
  // Selected Program Details
  // ===========================

  const {
    data: singleServiceData,
  } = useQuery({
    queryKey: [
      "service-details",
      selectedProgram,
    ],
    queryFn: () =>
      getServiceById(selectedProgram),
    enabled: !!selectedProgram,
  });

  const serviceDetails =
    singleServiceData?.data;

  const coaches =
    serviceDetails?.coaches || [];

  // ===========================
  // Outside Click
  // ===========================

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          e.target
        )
      ) {
        setProgramOpen(false);
      }

      if (
        coachDropdownRef.current &&
        !coachDropdownRef.current.contains(
          e.target
        )
      ) {
        setCoachOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  // ===========================
  // Add Program
  // ===========================

  const handleAddProgram = () => {
    if (!selectedProgram) {
      handleError(
        "Please select a program"
      );
      return;
    }

    if (!selectedCoach) {
      handleError(
        "Please select a coach"
      );
      return;
    }

    const alreadyAdded =
      programAssignments.find(
        (item) =>
          item.program ===
          selectedProgram
      );

    if (alreadyAdded) {
      handleError(
        "Program already added"
      );
      return;
    }

    const program = services.find(
      (item) =>
        item._id === selectedProgram
    );

    const coach = coaches.find(
      (item) =>
        item._id === selectedCoach
    );

    setProgramAssignments((prev) => [
      ...prev,
      {
        program:
          selectedProgram,
        coach:
          selectedCoach,

        programTitle:
          program?.title,

        coachName:
          coach?.fullname,
      },
    ]);

    // Reset Selection
    setSelectedProgram("");
    setSelectedCoach("");
  };

  // ===========================
  // Remove Program
  // ===========================

  const handleRemoveProgram = (
    programId
  ) => {
    setProgramAssignments((prev) =>
      prev.filter(
        (item) =>
          item.program !==
          programId
      )
    );
  };

  const handleSubmit = async () => {
    if (!programAssignments.length) {
      handleError(
        "Please add at least one program"
      );
      return;
    }

    try {
      const childData = JSON.parse(
        localStorage.getItem("childFormData")
      );

      if (!childData) {
        handleError(
          "Child information not found"
        );
        return;
      }

      const formData = new FormData();

      // Child Information
      Object.keys(childData).forEach((key) => {
        formData.append(key, childData[key]);
      });

      // Program + Coach Assignment
      formData.append(
        "programAssignments",
        JSON.stringify(programAssignments)
      );

      // Profile Image
      const image =
        localStorage.getItem("childImage");

      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();

        formData.append(
          "profileImage",
          blob,
          "child-image.png"
        );
      }

      const res = await createChild(formData);

      if (res.success) {
        localStorage.removeItem(
          "childFormData"
        );

        localStorage.removeItem(
          "childImage"
        );

        handleSuccess(
          "Children created successfully"
        );

        navigate(
          "/dashboard/children-profile"
        );
      } else {
        handleError(res.message);
      }
    } catch (err) {
      console.log(err);

      handleError(
        "Failed to create child"
      );
    }
  };

  const handleProgramUpdate = async () => {
    if (
      !programAssignments.length
    ) {
      handleError(
        "Please add at least one program"
      );
      return;
    }

    try {
      const formData =
        new FormData();

      formData.append(
        "programAssignments",
        JSON.stringify(
          programAssignments
        )
      );

      const res =
        await updateChild(
          child._id,
          formData
        );

      if (res.success) {
        handleSuccess(
          "Programs Updated"
        );

        refetchChildren?.();

        onClose?.();
      } else {
        handleError(
          res.message
        );
      }
    } catch (err) {
      handleError(
        "Update Failed"
      );
    }
  };

  return (
    <div className={styles.nextFormPara}>
      <div className={styles["para-head"]}>
        <h3>Program Details</h3>
        <p>Lorem ipsum dolor sit amet consectetur</p>
      </div>

      {/* ================= Program ================= */}

      <div className={styles["program-info"]}>
        <div className={styles["program-left"]}>
          <span className={styles.label}>
            Program Name:
          </span>

          <div
            className={styles.customDropdown}
            ref={dropdownRef}
          >
            <div
              className={styles.dropdownHeader}
              onClick={() =>
                setProgramOpen(!programOpen)
              }
            >
              <span>
                {selectedProgram
                  ? services.find(
                    (item) =>
                      item._id ===
                      selectedProgram
                  )?.title
                  : "Select Program"}
              </span>

              <span
                className={`${styles.arrow} ${programOpen
                  ? styles.rotate
                  : ""
                  }`}
              >
                ▼
              </span>
            </div>

            {programOpen && (
              <div
                className={styles.dropdownMenu}
              >
                {services
                  .filter(
                    (service) =>
                      !programAssignments.some(
                        (item) =>
                          item.program ===
                          service._id
                      )
                  )
                  .map((service) => (
                    <div
                      key={service._id}
                      className={`${styles.dropdownItem} ${selectedProgram ===
                        service._id
                        ? styles.active
                        : ""
                        }`}
                      onClick={() => {
                        setSelectedProgram(
                          service._id
                        );
                        setSelectedCoach("");
                        setProgramOpen(false);
                      }}
                    >
                      {service.title}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles["program-right"]}>
          <span className={styles.label}>
            Program Duration:
          </span>

          <span className={styles.value}>
            {duration || "2 Hours"}
          </span>
        </div>
      </div>

      {/* ================= Coach ================= */}

      <div className={styles["program-right"]}>
        <span className={styles.label}>
          Coach:
        </span>

        <div
          className={styles.customDropdown}
          ref={coachDropdownRef}
        >
          <div
            className={styles.dropdownHeader}
            onClick={() => {
              if (!selectedProgram) {
                handleError(
                  "Select Program First"
                );
                return;
              }

              setCoachOpen(!coachOpen);
            }}
          >
            <span>
              {selectedCoach
                ? coaches.find(
                  (coach) =>
                    coach._id ===
                    selectedCoach
                )?.fullname
                : "Select Coach"}
            </span>

            <span
              className={`${styles.arrow} ${coachOpen
                ? styles.rotate
                : ""
                }`}
            >
              ▼
            </span>
          </div>

          {coachOpen && (
            <div
              className={styles.dropdownMenu}
            >
              {coaches.length ? (
                coaches.map((coach) => (
                  <div
                    key={coach._id}
                    className={`${styles.dropdownItem} ${selectedCoach ===
                      coach._id
                      ? styles.active
                      : ""
                      }`}
                    onClick={() => {
                      setSelectedCoach(
                        coach._id
                      );
                      setCoachOpen(false);
                    }}
                  >
                    {coach.fullname}
                  </div>
                ))
              ) : (
                <div
                  className={
                    styles.dropdownItem
                  }
                >
                  No Coach Available
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ================= Add Button ================= */}

      <div
        style={{
          marginTop: 20,
          marginBottom: 30,
        }}
      >
        <Button
          text="+ Add Program"
          variant="primary"
          onClick={handleAddProgram}
        />
      </div>

      {/* ================= Added Programs ================= */}

      {programAssignments.length > 0 && (
        <div className={styles.mid}>
          <h3>Added Programs</h3>

          {programAssignments.map(
            (item) => (
              <div
                key={item.program}
                className={
                  styles.programCard
                }
              >
                <div>
                  <strong>
                    {item.programTitle}
                  </strong>

                  <p>
                    Coach :{" "}
                    {item.coachName}
                  </p>
                </div>

                <Button
                  text="Remove"
                  variant="dark"
                  onClick={() =>
                    handleRemoveProgram(
                      item.program
                    )
                  }
                />
              </div>
            )
          )}
        </div>
      )}

      {/* ================= Details ================= */}

      <div className={styles.mid}>
        <h3>Program Details</h3>

        <CmnHeading
          align="left"
          details={
            <p className={styles.para}>
              {serviceDetails?.details2 ||
                "Select a Program"}
            </p>
          }
        />
      </div>
      {/* ================= Buttons ================= */}

      <div className={styles.btns}>

        {isModal ? (
          <>
            <div className={styles["btn-b"]}>
              <Button
                text="Cancel"
                variant="dark"
                onClick={onClose}
              />
            </div>

            <div className={styles["btn-r"]}>
              <Button
                text="Save Programs"
                variant="primary"
                onClick={
                  handleProgramUpdate
                }
              />
            </div>
          </>
        ) : (
          <>
            <div className={styles["btn-b"]}>
              <Button
                text="Back"
                variant="dark"
                onClick={() =>
                  navigate(
                    "/dashboard/waiveracceptance"
                  )
                }
              />
            </div>

            <div className={styles["btn-r"]}>
              <Button
                text="Next"
                variant="primary"
                onClick={handleSubmit}
              />
            </div>
          </>
        )}

      </div>
    </div>
  );
}
