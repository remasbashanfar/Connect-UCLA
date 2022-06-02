import React from "react";
import NavBar from '../components/navbar.js'
import FollowFeed from '../components/profile-feed/follow-feed'
    function About() {

        return (
          <div>
              <NavBar></NavBar>
              This is the about page
              <FollowFeed username="JungHoseok"/>
          </div>
        );

    }

    export default About;