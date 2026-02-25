import React from "react";
import FormDetailsLeft from "../../../Component/FormDetailsLeft/FormDetailsLeft";
import styles from "./ChildrenDetails.module.scss";
import "../../../Main.scss"; 


export default function ChildrenDetails() {
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
              <FormDetailsLeft />
            </div>
          </div>

          <div className="col-7">
            <div className={styles.right}>jkkj</div>
          </div>

        </div>
      </div>
    </div>
  );
}
      
