import React from "react";
import NavBar from '../components/navbar.js'
import CalendarButton from '../components/googleCalendar.js'

    function About() {

        return (
          <div>
              <NavBar></NavBar>
              This is the about page
              <CalendarButton></CalendarButton>
          </div>
        );

    }

    export default About;