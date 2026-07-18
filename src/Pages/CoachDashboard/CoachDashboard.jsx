import React from "react";

import styles from "./CoachDashboard.module.scss";

import {
  FaUsers,
  FaBookOpen,
  FaCalendarCheck,
  FaComments
} from "react-icons/fa";


export default function CoachDashboard() {


  const coach = JSON.parse(
    localStorage.getItem("coach")
  ) || {};



  const cards = [

    {
      title:"Total Children",
      count:"120",
      icon:<FaUsers />
    },


    {
      title:"Active Programs",
      count:"8",
      icon:<FaBookOpen />
    },


    {
      title:"Upcoming Sessions",
      count:"15",
      icon:<FaCalendarCheck />
    },


    {
      title:"Messages",
      count:"24",
      icon:<FaComments />
    }


  ];




  return (

    <div className={styles.dashboard}>


      {/* Welcome */}

      <div className={styles.welcome}>


        <h2>

          Welcome, {coach?.name || "Coach"}

        </h2>


        <p>

          Manage your children, programs and sessions from here.

        </p>


      </div>







      {/* Stats Cards */}


      <div className={styles.cardGrid}>


        {
          cards.map((item,index)=>(


            <div
              className={styles.card}
              key={index}
            >


              <div className={styles.icon}>

                {item.icon}

              </div>



              <div>

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








      {/* Recent Activity */}


      <div className={styles.activity}>


        <h3>
          Recent Activity
        </h3>



        <div className={styles.activityList}>


          <div>

            <span>
              New child assigned
            </span>

            <small>
              10 minutes ago
            </small>

          </div>




          <div>

            <span>
              Program updated
            </span>

            <small>
              1 hour ago
            </small>

          </div>




          <div>

            <span>
              Session completed
            </span>

            <small>
              Today
            </small>

          </div>



        </div>



      </div>




    </div>

  );

}