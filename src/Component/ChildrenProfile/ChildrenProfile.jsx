import React, { useState } from "react";
import styles from "./ChildrenProfile.module.scss";

const initialChildren = [
  {
    id: 1,
    name: "Jane Cooper",
    age: "5 years",
    location: "Lorem ipsum is a dummy location, 99 amet",
    school: "Topsail elementary school",
    foodHabit: "Lorem ipsum dolor sit amet consectetur",
    allergy: "Yes",
    allergyDetails:
      "Lorem ipsum dolor sit amet consectetur. Nulla egestas cursus in in.",
    disease: "Lorem ipsum dolor sit",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    name: "John Doe",
    age: "6 years",
    location: "New York",
    school: "ABC School",
    foodHabit: "Veg",
    allergy: "No",
    allergyDetails: "None",
    disease: "None",
    image: "https://i.pravatar.cc/150?img=5",
  },
];

export default function ChildrenProfile() {
  const [children] = useState(initialChildren);
  const [activeId, setActiveId] = useState(children[0].id);

  const activeChild = children.find((c) => c.id === activeId);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Children Profile</h2>
        <button className={styles.addBtn}>+ ADD CHILD</button>
      </div>

      <div className={styles.tabs}>
        {children.map((child, index) => (
          <button
            key={child.id}
            className={`${styles.tab} ${
              activeId === child.id ? styles.activeTab : ""
            }`}
            onClick={() => setActiveId(child.id)}
          >
            Child Name {index + 1}
          </button>
        ))}
      </div>

      <div className={styles.main}>
        <div className={styles.formSection}>
          <div className={styles.row}>
            <Input label="Full Name" value={activeChild.name} />
            <Input label="Age" value={activeChild.age} />
          </div>

          <Input label="Location" value={activeChild.location} />
          <Input label="School Name" value={activeChild.school} />
          <Input label="Food Habit" value={activeChild.foodHabit} />
          <Input label="Have Any Type Of Allergy?" value={activeChild.allergy} />
          <Input label="Allergy Details" value={activeChild.allergyDetails} />
          <Input
            label="Any Prolong Disease"
            value={activeChild.disease}
            highlight
          />
        </div>

        <div className={styles.sideSection}>
          <div className={styles.card}>
            <img src={activeChild.image} alt="child" />
            <h3>{activeChild.name}</h3>
            <p>{activeChild.age}</p>
            <button className={styles.editBtn}>EDIT PROFILE</button>
          </div>

          <div className={styles.paymentCard}>
            <span>ONETIME PAYMENT</span>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
            <h2>$49</h2>
            <div className={styles.paid}>● Full paid</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, highlight }) {
  return (
    <div className={`${styles.inputBox} ${highlight ? styles.highlight : ""}`}>
      <label>{label}</label>
      <p>{value}</p>
    </div>
  );
}