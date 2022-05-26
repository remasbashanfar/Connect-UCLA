import React from "react";
import { useGoogleLogin } from '@react-oauth/google';

import PostAPI from '../services/post.js'
// From 
// https://www.npmjs.com/package/react-google-login
// https://reactjsexample.com/google-oauth2-using-the-new-google-identity-services-sdk-for-react/

export default function CalendarButton(props) {

    const responseGoogle = (response) => {
        const { code } = response // destruct code from response
        PostAPI.addToCalendar(code) // call api with code to generate tokens
        .then(response => {
            console.log("API tokens")
            console.log(response.data)})
        .catch(error => {
            console.log("API response failure")
            console.log(error)})
    }
    
    const errorGoogle = (response) => {
        console.log("Did not work - FAILURE");
        console.log(response);
    }
    
    const login = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: errorGoogle,
        flow: 'auth-code',
        scope: "openid email profile https://www.googleapis.com/auth/calendar",
    });

    return(
        <div>
            <button onClick={() => login()}>
                Sign in with Google
            </button>
        </div>
    );
}