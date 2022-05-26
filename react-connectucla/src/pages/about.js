import React from "react";
import NavBar from '../components/navbar.js'
import CalendarButton from '../components/googleCalendar.js'

    function About() {

        return (
          <div>
              <NavBar></NavBar>
              This is the about page
              <CalendarButton 
              summary="test summary" 
              description="description test"
              location="UCLA"
              start="2022-05-26T13:00:00"
              end="2022-05-26T14:00:00"
              ></CalendarButton>
          </div>
        );

    }

    export default About;