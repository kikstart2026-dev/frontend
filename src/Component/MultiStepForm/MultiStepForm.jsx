import React, { useState } from "react";
import styles from "./MultiStepForm.module.scss";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        
        
        {/* LEFT STEPPER */}
        <div className={styles.left}>
          <div className={`${styles.stepItem} ${step >= 1 ? styles.active : ""}`}>
             <p>Children Details</p>
            <div className={styles.circle}>1</div>
           
          </div>

          <div className={`${styles.stepItem} ${step >= 2 ? styles.active : ""}`}>
            <p>School Details</p>
            <div className={styles.circle}>2</div>
          </div>

          <div className={`${styles.stepItem} ${step >= 3 ? styles.active : ""}`}>
            <p>Waiver Acceptance</p>
            <div className={styles.circle}>3</div>
          </div>

          <div className={`${styles.stepItem} ${step >= 4 ? styles.active : ""}`}>
             <p>Program Details</p>
            <div className={styles.circle}>4</div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className={styles.right}>
          {step === 1 && (
            <>
              <h2>Children Details</h2>
              <input placeholder="Full Name" />
              <input placeholder="Age" />
              <button className={styles.nextBtn} onClick={nextStep}>
                NEXT
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2>School Details</h2>
              <input placeholder="School Name" />
              <input placeholder="School Location" />
              <div className={styles.btnGroup}>
                <button className={styles.backBtn} onClick={prevStep}>
                  BACK
                </button>
                <button className={styles.nextBtn} onClick={nextStep}>
                  NEXT
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2>Waiver Acceptance</h2>
              <textarea placeholder="Accept terms..." />
              <div className={styles.btnGroup}>
                <button className={styles.backBtn} onClick={prevStep}>
                  BACK
                </button>
                <button className={styles.nextBtn} onClick={nextStep}>
                  NEXT
                </button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2>Program Details</h2>
              <input placeholder="Program Name" />
              <div className={styles.btnGroup}>
                <button className={styles.backBtn} onClick={prevStep}>
                  BACK
                </button>
                <button className={styles.submitBtn}>
                  SUBMIT
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}