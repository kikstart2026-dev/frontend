import React from "react";
import FormDetailsLeft from "../../../Component/FormDetailsLeft/FormDetailsLeft";
import styles from "./WaiverAcceptance.module.scss";
import "../../../Main.scss"; 
import FormParas from "../../../Component/FormPara/FormParas";

export default function WaiverAcceptance() {
  return (
    <div className="container">
      
      <div className={styles.heading}>
        <h2 className={styles.head2}>Fill the form</h2>
        <p className={styles.para}>
          Lorem ipsum dolor sit amet consectetur
        </p>
      </div>

      <div className={styles.totalWrapper}>
        <div className="row g-0"> {/* remove bootstrap gutter */}
          
          <div className="col-4">
            <div className={styles.left}>
              <FormDetailsLeft activeStep={2} />
            </div>
          </div>

          <div className="col-8">
            <div className={styles.right}>
              <FormParas/>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}