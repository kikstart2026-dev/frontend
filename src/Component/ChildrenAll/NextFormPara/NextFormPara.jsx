import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./NextFormPara.module.scss";
import CmnHeading from "../../CmnHeading/CmnHeading";
import Button from "../../Buttons/Button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
  getAllService,
  getServiceById,
} from "../../../apis/api";

export default function NextFormPara({
  duration,
}) {
  const navigate = useNavigate();

  const [selectedId, setSelectedId] =
    useState("");

  const [isOpen, setIsOpen] =
    useState(false);

  const dropdownRef = useRef(null);

  // ✅ Get All Services
  const { data: servicesData } = useQuery({
    queryKey: ["services"],
    queryFn: () => getAllService(),
  });

  const services = servicesData?.data || [];

  // ✅ Default first service
  const activeId =
    selectedId || services?.[0]?._id;

  // ✅ Get Single Service By ID
  const { data: singleServiceData } =
    useQuery({
      queryKey: ["single-service", activeId],
      queryFn: () =>
        getServiceById(activeId),
      enabled: !!activeId,
    });

  const serviceDetails =
    singleServiceData?.data;

  // ✅ Active Service Object
  const activeService = services.find(
    (item) => item._id === activeId
  );

  // ✅ Outside Click Close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          e.target
        )
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div className={styles.nextFormPara}>
      <div className={styles["para-head"]}>
        <h3>Program Details</h3>

        <p>
          Lorem ipsum dolor sit amet
          consectetur
        </p>
      </div>

      <div className={styles["program-info"]}>
        <div className={styles["program-left"]}>
          <span className={styles.label}>
            Program Name:
          </span>

          {/* ✅ Custom Dropdown */}
          <div
            className={styles.customDropdown}
            ref={dropdownRef}
          >
            <div
              className={styles.dropdownHeader}
              onClick={() =>
                setIsOpen(!isOpen)
              }
            >
              <span>
                {activeService?.title ||
                  "Select Program"}
              </span>

              <span
                className={`${styles.arrow} ${
                  isOpen
                    ? styles.rotate
                    : ""
                }`}
              >
                ▼
              </span>
            </div>

            {isOpen && (
              <div
                className={
                  styles.dropdownMenu
                }
              >
                {services.map((item) => (
                  <div
                    key={item._id}
                    className={`${styles.dropdownItem} ${
                      activeId === item._id
                        ? styles.active
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedId(
                        item._id
                      );

                      setIsOpen(false);
                    }}
                  >
                    {item.title}
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

      <div className={styles.mid}>
        <h3>Details</h3>

        <CmnHeading
          details={
            <>
              <p className={styles.para}>
                {serviceDetails?.details2 ||
                  "No details found"}
              </p>
            </>
          }
          align="left"
        />
      </div>

      <div className={styles.btns}>
        <div className={styles["btn-b"]}>
          <Button
            text="back"
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
            text="next"
            variant="primary"
            onClick={() =>
              navigate(
                "/dashboard/enrolment-package"
              )
            }
          />
        </div>
      </div>
    </div>
  );
}