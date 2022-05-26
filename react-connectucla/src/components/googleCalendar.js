import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import PostAPI from '../services/post.js'
// From 
// https://www.npmjs.com/package/react-google-login
// https://reactjsexample.com/google-oauth2-using-the-new-google-identity-services-sdk-for-react/

export default function CalendarButton(props) {

    const responseGoogle = (response) => {
        console.log("SUCCESS");
        console.log(response);
        const { code } = response
        PostAPI.addToCalendar(code)
        .then(response => {console.log(response)})
        .catch(error => {console.log(error)})
    }
    
    const failureGoogle = (response) => {
        console.log("Did not work - FAILURE");
        console.log(response);
    }
    

    return(
        <div>
            <GoogleOAuthProvider 
            clientId="1074046883630-561fblnmo26ek7lppki22d1ldflgir10.apps.googleusercontent.com"
            >
            <GoogleLogin 
            
            buttonText="Add to calendar"
            onSuccess={responseGoogle}
            onError={failureGoogle}
            cookiePolicy={'single_host_origin'}
            responseType="code" //Retrieve auth code
            accessType="offline" // Get refresh token
            scope="openid email profile https://www.googleapis.com/auth/calendar"
            >
            
            </GoogleLogin>
            </GoogleOAuthProvider>
        </div>
    );
}