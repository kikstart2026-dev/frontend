import React, { useState } from "react";
import "../../Main.scss";
import styles from "./ContactForm.module.scss";
import Button from "../Buttons/Button";

export default function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      alert("Message Sent Successfully :white_check_mark:");
      setFullName("");
      setEmail("");
      setSubject("");
      setDetails("");
    } else {
      alert("Something went wrong :x:");
    }
  };

  return (
    <div className={styles.contact}>
      <div className={styles.contactWrap}>
          <div className={`${styles.right}`}>
            <div className={styles.formBox}>

              <form
                className={styles.authForm}
                onSubmit={handleSubmit}
              >
                
                {/* REQUIRED ACCESS KEY */}
                <input
                  type="hidden"
                  name="access_key"
                  value="d6ca2b65-b867-4744-8eaa-df3228a47c06"
                />

                {/* Full Name */}
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.inp}
                    type="text"
                    name="name"
                    placeholder=" "
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                  <label className={styles.lbl}>Full Name</label>
                </div>

                {/* Email */}
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.inp}
                    type="email"
                    name="email"
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label className={styles.lbl}>Email</label>
                </div>

                {/* Query Subject */}
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.inp}
                    type="text"
                    name="subject"
                    placeholder=" "
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                  <label className={styles.lbl}>Query Subject</label>
                </div>

                {/* Query Details */}
                <div className={styles.inputWrapper}>
                  <textarea
                    className={`${styles.inp} ${styles.textarea}`}
                    name="message"
                    placeholder=" "
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    required
                  />
                  <label className={styles.lbl}>Query Details</label>
                </div>

                <Button
                  className={styles.submitBtn}
                  type="submit"
                  text="SEND"
                  variant="primary"
                />

              </form>

            </div>
          </div>
      </div>
    </div>
  );
}