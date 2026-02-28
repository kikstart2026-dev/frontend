import React from "react";
import FormDetailsLeft from "../../../Component/FormDetailsLeft/FormDetailsLeft";
import styles from "./SchoolDetails.module.scss";
import "../../../Main.scss"; 
import SchoolDetailsForm from "../../../Component/SchoolDetailsForm/SchoolDetailsForm";


export default function SchoolDetails() {
  return (
    <div className="container">
      <div className={styles.heading}>
        <h2 className={styles.head2}>Fill the form</h2>
       <p className={styles.para}>
          Lorem ipsum dolor sit amet consectetur
       </p>
      </div>
       

      <div className={styles.totalWrapper}>
        <div className= "row">
          
          <div className= "col-5">
            <div className={styles.left}>
              <FormDetailsLeft activeStep={1} />
            </div>
          </div>

          <div className="col-7">
            <div className={styles.right}> <SchoolDetailsForm/> </div>
          </div>

        </div>
      </div>
    </div>
  );
}
      
