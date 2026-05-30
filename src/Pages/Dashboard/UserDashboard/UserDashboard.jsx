import React, { useEffect, useState } from "react";
import styles from "./UserDashboard.module.scss";
import UserDashboardSkeleton from "../../../Skeletons/UserDashboardSkeleton/UserDashboardSkeleton";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  getMyChildren,
  getMyPayments,
  getUserActivePlan,
} from "../../../apis/api";

const COLORS = ["#ffcdce", "#F5222D",];

export default function UserDashboard() {
  const [loading, setLoading] =
    useState(true);

  const [childrenCount, setChildrenCount] =
    useState(0);

  const [paymentCount, setPaymentCount] =
    useState(0);

  const [planName, setPlanName] =
    useState("");

  const [daysLeft, setDaysLeft] =
    useState(0);

  const [maxChildren, setMaxChildren] =
    useState(0);

  const [chartData, setChartData] =
    useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData =
    async () => {
      try {
        const user =
          JSON.parse(
            localStorage.getItem("user")
          );

        const email =
          user?.email;

        if (!email) return;

        const [
          childrenRes,
          paymentRes,
          planRes,
        ] = await Promise.all([
          getMyChildren(email),
          getMyPayments(email),
          getUserActivePlan(email),
        ]);

        const children =
          childrenRes?.data || [];

        const payments =
          paymentRes?.payments || [];

        setChildrenCount(
          children.length
        );

        setPaymentCount(
          payments.length
        );

        setPlanName(
          planRes?.subscription
            ?.planName || "No Plan"
        );

        setDaysLeft(
          planRes?.daysLeft || 0
        );

        setMaxChildren(
          planRes?.subscription
            ?.subscriptionId
            ?.maxChildren || 0
        );

        setChartData([
          {
            name: "Children",
            value: children.length,
          },
          {
            name: "Payments",
            value: payments.length,
          },
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

  if (loading) {
    return <UserDashboardSkeleton />;
  }

  const progress =
    maxChildren > 0
      ? (childrenCount /
        maxChildren) *
      100
      : 0;

  return (
    <div className={styles.dashboard}>

      <h2>
        Dashboard Overview
      </h2>

      {/* Top Cards */}

      <div className={styles.statsGrid}>

        <div className={styles.card}>
          <p>Total Children</p>
          <h3>{childrenCount}</h3>
        </div>

        <div className={styles.card}>
          <p>Total Payments</p>
          <h3>{paymentCount}</h3>
        </div>

        <div className={styles.card}>
          <p>Active Plan</p>
          <h3>{planName}</h3>
        </div>

        <div className={styles.card}>
          <p>Days Left</p>
          <h3>{daysLeft}</h3>
        </div>

      </div>

      {/* Middle Section */}

      <div className={styles.middleGrid}>

        {/* Plan Card */}

        <div className={styles.planCard}>
          <h3>
            Subscription Usage
          </h3>

          <div
            className={
              styles.progressBar
            }
          >
            <div
              className={
                styles.progressFill
              }
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <p>
            {childrenCount} of{" "}
            {maxChildren} slots used
          </p>

          <h4>
            Remaining Slots:
            {" "}
            {maxChildren -
              childrenCount}
          </h4>
        </div>

        {/* Chart */}

        <div className={styles.chartCard}>
          <h3>
            Children vs Payments
          </h3>

          <ResponsiveContainer
            width="100%"
            height={280}
          >
            <PieChart>

              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={85}
                outerRadius={120}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >

                {chartData.map(
                  (
                    item,
                    index
                  ) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                        index %
                        COLORS.length
                        ]
                      }
                    />
                  )
                )}

              </Pie>

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow:
                    "0 8px 25px rgba(0,0,0,.12)",
                }}
              />

            </PieChart>
          </ResponsiveContainer>

          <div
            className={
              styles.legend
            }
          >

            {chartData.map(
              (
                item,
                index
              ) => (
                <div
                  key={index}
                  className={
                    styles.legendItem
                  }
                >

                  <span
                    className={
                      styles.dot
                    }
                    style={{
                      background:
                        COLORS[
                        index %
                        COLORS.length
                        ],
                    }}
                  />

                  <p>
                    {item.name}
                    {" "}
                    (
                    {item.value}
                    )
                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}