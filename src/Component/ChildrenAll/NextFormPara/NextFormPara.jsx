import React, { useState } from "react";
import styles from "./NextFormPara.module.scss";
import CmnHeading from "../../CmnHeading/CmnHeading";
import Button from "../../Buttons/Button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
  getAllService,
  getServiceById,
} from "../../../apis/api";

export default function NextFormPara({ duration }) {
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState("");

  // ✅ Get All Services
  const { data: servicesData } = useQuery({
    queryKey: ["services"],
    queryFn: () => getAllService(),
  });

  const services = servicesData?.data || [];

  // ✅ Default first service
  const activeId = selectedId || services?.[0]?._id;

  // ✅ Get Single Service By ID
  const { data: singleServiceData } = useQuery({
    queryKey: ["single-service", activeId],
    queryFn: () => getServiceById(activeId),
    enabled: !!activeId,
  });

  const serviceDetails = singleServiceData?.data;

  return (
    <div className={styles.nextFormPara}>
      <div className={styles["para-head"]}>
        <h3>Program Details</h3>
        <p>Lorem ipsum dolor sit amet consectetur</p>
      </div>

      <div className={styles["program-info"]}>
        <div className={styles["program-left"]}>
          <span className={styles.label}>
            Program Name:
          </span>

          {/* ✅ Dynamic Dropdown */}
          <select
            className={`${styles.value} ${styles.dropdown}`}
            value={activeId}
            onChange={(e) =>
              setSelectedId(e.target.value)
            }
          >
            {services.map((item) => (
              <option
                key={item._id}
                value={item._id}
              >
                {item.title}
              </option>
            ))}
          </select>
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