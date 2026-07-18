import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./CoachSidebar.module.scss";

import kiklogo from "../../assets/images/authLogo.png";


export default function CoachSidebar() {


  return (

    <div className={styles.sidebar}>


      {/* LOGO */}

      <div className={styles.navLogo}>

        <NavLink to="/">

          <img
            src={kiklogo}
            alt="logo"
            className={styles.logo}
          />

        </NavLink>

      </div>




      <nav>


        {/* DASHBOARD */}

        <NavLink

          to="/coach-dashboard"

          end

          className={({isActive}) =>
            isActive
            ?
            styles.active
            :
            styles.link
          }

        >

          <i className={`bi bi-speedometer2 ${styles.icon}`}></i>

          <span>
            Dashboard
          </span>


        </NavLink>





        {/* MY PROFILE */}

        <NavLink

          to="/coach-dashboard/profile"


          className={({isActive}) =>
            isActive
            ?
            styles.active
            :
            styles.link
          }

        >

          <i className={`bi bi-person ${styles.icon}`}></i>

          <span>
            My Profile
          </span>


        </NavLink>






        {/* PROGRAMS */}

        <NavLink

          to="/coach-dashboard/programs"


          className={({isActive}) =>
            isActive
            ?
            styles.active
            :
            styles.link
          }

        >

          <i className={`bi bi-grid ${styles.icon}`}></i>

          <span>
            Programs
          </span>


        </NavLink>






        {/* CHILDREN */}

        <NavLink

          to="/coach-dashboard/children"


          className={({isActive}) =>
            isActive
            ?
            styles.active
            :
            styles.link
          }

        >

          <i className={`bi bi-people ${styles.icon}`}></i>


          <span>
            Children
          </span>


        </NavLink>







        {/* MESSAGE */}

        <NavLink

          to="/coach-dashboard/messages"


          className={({isActive}) =>
            isActive
            ?
            styles.active
            :
            styles.link
          }

        >

          <i className={`bi bi-chat-dots ${styles.icon}`}></i>


          <span>
            Message
          </span>


        </NavLink>





      </nav>



    </div>

  );

}