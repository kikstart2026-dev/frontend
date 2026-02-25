import React from "react";
import "../../Main.scss";
import styles from "./FormDetailsLeft.module.scss";

import childIcon from "../../assets/images/child.png";
import schoolIcon from "../../assets/images/school.png";
import waiverIcon from "../../assets/images/waiver.png";
import programIcon from "../../assets/images/program.png";

const StepSidebar = ({ activeStep = 0 }) => {
 const steps = [
    { id: 1, title: "Children Details", icon: childIcon },
    { id: 2, title: "School Details", icon: schoolIcon },
    { id: 3, title: "Waiver Acceptance", icon: waiverIcon },
    { id: 4, title: "Program Details", icon: programIcon },
  ];

  return (
    <div className="container">
    <div className={styles.sidebar}>
      {steps.map((step, index) => (
        <div key={step.id} className={styles.step}>
          <div className={styles.title}>{step.title}</div>

          <div className={styles.iconWrapper}>
             <div
                 className={`${styles.iconCircle} ${
                 activeStep === index ? styles.active : ""
                 }`}
               >
               <img src={step.icon} alt={step.title} />
         </div>

  {index !== steps.length - 1 && (
    <div className={styles.line}></div>
  )}
</div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default StepSidebar;