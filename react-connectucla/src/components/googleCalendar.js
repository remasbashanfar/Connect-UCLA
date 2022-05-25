import React from "react";
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

// From 
// https://www.npmjs.com/package/react-google-login


export default function CalendarButton(props) {

    const responseGoogle = (response) => {
        console.log(response);
        const { code } = response
        axios.post('/api/posts/add-to-calendar', { code })
        .then(response => {console.log(response)})
        .catch(error => {console.log(error)})
    }
    
    const failureGoogle = (response) => {
        console.log(response);
    }
    

    return(
        <div>
            <GoogleLogin 
            clientId="1074046883630-561fblnmo26ek7lppki22d1ldflgir10.apps.googleusercontent.com"
            buttonText="Add to calendar"
            onSuccess={responseGoogle}
            onFailure={failureGoogle}
            cookiePolicy={'single_host_origin'}
            responseType="code" //Retrieve auth code
            accessType="offline" // Get refresh token
            scope="openid email profile https://www.googleapis.com/auth/calendar"
            >
            
            </GoogleLogin>

        </div>
    );
}