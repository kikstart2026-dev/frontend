import React from "react";

import styles from "./CoachDashboard.module.scss";

import {
  FaUsers,
  FaBookOpen,
  FaCalendarCheck,
  FaComments,
  FaBell
} from "react-icons/fa";

import { useQuery } from "@tanstack/react-query";

import { getCoachDashboard } from "../../apis/api";


export default function CoachDashboard() {


  const {
    data,
    isLoading,
    error
  } = useQuery({

    queryKey: ["coach-dashboard"],

    queryFn: getCoachDashboard

  });



  if (isLoading) {

    return (
      <div className={styles.loading}>
        Loading Dashboard...
      </div>
    );

  }



  if (error) {

    return (
      <div className={styles.loading}>
        Failed to load dashboard
      </div>
    );

  }



  const dashboard = data || {};

  const coach = dashboard.coach || {};

  const stats = dashboard.stats || {};




  const cards = [

    {
      title: "Total Children",
      count: stats.totalChildren || 0,
      icon: <FaUsers />
    },

    {
      title: "Assigned Programs",
      count: stats.totalPrograms || 0,
      icon: <FaBookOpen />
    },

    {
      title: "Upcoming Sessions",
      count: stats.upcomingSessions || 0,
      icon: <FaCalendarCheck />
    },

    // {
    //   title: "Messages",
    //   count: stats.messages || 0,
    //   icon: <FaComments />
    // }

  ];


  const getActivityColor = (title = "") => {

  const text = title.toLowerCase();

  if (text.includes("child")) {
    return styles.childActivity;
  }

  if (text.includes("program")) {
    return styles.programActivity;
  }

  if (text.includes("session")) {
    return styles.sessionActivity;
  }

  return styles.generalActivity;
};


  return (

    <div className={styles.dashboard}>


      {/* Welcome Section */}

      <div className={styles.welcome}>

        <h2>
          Welcome, {coach.fullname || "Coach"}
        </h2>


        <p>
          Manage your children, assigned programs and daily activities from here.
        </p>

      </div>





      {/* Stats */}

      <div className={styles.cardGrid}>


        {
          cards.map((item, index) => (

            <div
              className={styles.card}
              key={index}
            >

              <div className={styles.icon}>
                {item.icon}
              </div>


              <div className={styles.cardContent}>

                <h3>
                  {item.count}
                </h3>


                <p>
                  {item.title}
                </p>

              </div>


            </div>

          ))
        }


      </div>







      {/* Program + Children Section */}

      <div className={styles.twoColumn}>


        {/* Assigned Programs */}

        <div className={styles.activity}>


          <h3>
            Assigned Programs
          </h3>



          <div className={styles.activityList}>


            {
              dashboard.programs?.length > 0 ?

                dashboard.programs.slice(0, 5).map((program) => (


                  <div
                    key={program._id}
                  >

                    <span>
                      {program.title}
                    </span>


                    <small className={styles.active}>
                      Active Program
                    </small>


                  </div>


                ))

                :

                <p>
                  No programs assigned yet
                </p>

            }


          </div>


        </div>







        {/* Children Overview */}

        <div className={styles.activity}>


          <h3>
            Children Overview
          </h3>



          <div className={styles.activityList}>


            {
              dashboard.children?.length > 0 ?

                dashboard.children.slice(0, 5).map((child) => (


                  <div
                    key={child._id}
                  >


                    <span>
                      {child.fullName}
                    </span>



                    <small>

                      {
                        child.programAssignments?.[0]?.program?.title
                        ||
                        "No Program"
                      }

                    </small>



                  </div>


                ))


                :

                <p>
                  No children assigned
                </p>


            }



          </div>


        </div>




      </div>




      {/* Recent Activity */}

      <div className={styles.activity}>

        <h3>
          Recent Activity
        </h3>

        <div className={styles.activityList}>

          {
            dashboard.activities?.length > 0 ?

              dashboard.activities.map((item, index) => {

  const activityColor = getActivityColor(item.title);

  return (

    <div
      className={styles.activityItem}
      key={index}
    >

      <div
        className={`${styles.activityIcon} ${activityColor}`}
      >
        <FaBell />
      </div>

      <div className={styles.activityContent}>

        <h4>{item.title}</h4>

        <small>
          <i className="bi bi-calendar3"></i>{" "}
          {new Date(item.time).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          })}
        </small>

      </div>

    </div>

  );

})

              :

              <p>No recent activity</p>

          }

        </div>

      </div>


    </div>

  );

}