import React, { useRef } from "react";
import "../../Main.scss";
import styles from "../ContactForm/ContactForm.module.scss";
import Button from "../Buttons/Button";
import { useMutation } from "@tanstack/react-query";
import { createEnq } from "../../apis/api";

export default function EnquiryForm() {
  const formRef = useRef(null);

  const { mutate, isPending } = useMutation({
    mutationKey: ["school-enquiry"],
    mutationFn: createEnq,

    onSuccess: () => {
      formRef.current?.reset();
      alert("Enquiry submitted successfully ✅");
    },

    onError: (error) => {
      alert(error?.response?.data?.message || "Something went wrong ❌");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const payload = {
      school: formData.get("school"),
      contactPerson: formData.get("contactPerson"),
      schoolEmail: formData.get("schoolEmail"),
      schoolPhone: formData.get("schoolPhone"),
    };

    mutate(payload);
  };

  return (
    <div className={styles.contact}>
      <div className={styles.contactWrap}>
        <div className={styles.right}>
          <div className={styles.formBox}>
            <form
              ref={formRef}
              className={styles.authForm}
              onSubmit={handleSubmit}
            >
              {/* School Name */}
              <div className={styles.inputWrapper}>
                <input
                  className={styles.inp}
                  type="text"
                  name="school"
                  placeholder=" "
                  required
                />
                <label className={styles.lbl}>School Name</label>
              </div>

              {/* Contact Person */}
              <div className={styles.inputWrapper}>
                <input
                  className={styles.inp}
                  type="text"
                  name="contactPerson"
                  placeholder=" "
                  required
                />
                <label className={styles.lbl}>
                  Contact Person Name Of The School
                </label>
              </div>

              {/* School Email */}
              <div className={styles.inputWrapper}>
                <input
                  className={styles.inp}
                  type="email"
                  name="schoolEmail"
                  placeholder=" "
                  required
                />
                <label className={styles.lbl}>
                  Email Address Of The School
                </label>
              </div>

              {/* School Phone */}
              <div className={styles.inputWrapper}>
                <input
                  className={styles.inp}
                  type="tel"
                  name="schoolPhone"
                  placeholder=" "
                  required
                  maxLength="10"
                  inputMode="numeric"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                />
                <label className={styles.lbl}>
                  Phone Number Of The School
                </label>
              </div>

              <Button
                className={styles.submitBtn}
                type="submit"
                text={isPending ? "SENDING..." : "SEND"}
                disabled={isPending}
                variant="primary"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}