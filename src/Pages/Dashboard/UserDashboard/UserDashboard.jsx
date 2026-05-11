import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import styles from "./UserDashboard.module.scss";

const data = [
  { name: "Completed", value: 65 },
  { name: "Pending", value: 20 },
  { name: "Cancelled", value: 15 },
];

const COLORS = ["#FF4D4F", "#FFA940", "#52C41A"];

export default function UserDashboard() {
  return (
    <div className={styles.chartCard}>
      <div className={styles.top}>
        <h3>Children Progress</h3>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.legend}>
        {data.map((item, index) => (
          <div key={index} className={styles.legendItem}>
            <span
              className={styles.dot}
              style={{
                background:
                  COLORS[index % COLORS.length],
              }}
            ></span>

            <p>
              {item.name} ({item.value}%)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}