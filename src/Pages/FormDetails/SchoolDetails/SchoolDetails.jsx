import React from "react";
import FormDetailsLeft from "../../../Component/FormDetailsLeft/FormDetailsLeft";
import styles from "./SchoolDetails.module.scss";
import "../../../Main.scss"; 
import SchoolDetailsForm from "../../../Component/SchoolDetailsForm/SchoolDetailsForm";


export default function SchoolDetails() {
  return (
    <div className="container">
      <div className={styles.heading}>
        <h1 className={styles.head2}>Fill the form</h1>
       <p className={styles.para}>
          Lorem ipsum dolor sit amet consectetur
       </p>
      </div>
       

      <div className={styles.totalWrapper}>
        <div className= "row g-0">
          
          <div className= "col-4">
            <div className={styles.left}>
              <FormDetailsLeft activeStep={1} />
            </div>
          </div>

          <div className="col-8">
            <div className={styles.right}> <SchoolDetailsForm/> </div>
          </div>

        </div>
      </div>
    </div>
  );
}
      
