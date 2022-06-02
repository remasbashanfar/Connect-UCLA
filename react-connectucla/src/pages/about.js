import React from "react";
import NavBar from '../components/navbar.js'
import FollowFeed from '../components/profile-feed/follow-feed'
import IntroPage from "./introPage.js";
    function About() {

        return (
          <div>
              <IntroPage/>
              <FollowFeed username="JungHoseok"/>
          </div>
        );

    }

    export default About;