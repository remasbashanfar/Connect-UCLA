import React, { useContext, useRef} from 'react';
import Button from '@mui/material/Button';
import {loginCall} from "../../services/loginCall"
import {AuthContext} from "../../context/AuthContext"
import CircularProgress from '@mui/material/CircularProgress';
import "./login.css";
import {useNavigate} from 'react-router-dom';

export default function Login() {
    const username= useRef();
    const password= useRef();
    const {isFetching, dispatch} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin= (e)=>{
        e.preventDefault();
        console.log(username.current.value);
        console.log(password.current.value);
        loginCall (
            {
            username: username.current.value, 
            password: password.current.value 
            }, 
            dispatch
        );
        navigate("/");

    };
    const handleRegister=()=> {
        window.location.href = "/register";
    }
    return (
        <div className="login">
            <Button className="loginLogoBox" href="/">ConnectUCLA</Button>
            <form className="loginBox" onSubmit={handleLogin}>
                <input 
                    className="loginInput" 
                    placeholder="Username" 
                    type="username"
                    ref={username}
                    required
                />
                
                <input 
                    className="loginInput" 
                    placeholder="Password" 
                    type="password"
                    ref={password}
                    minLength="8"
                    required
                />

                <button className="loginButton" 
                type="submit"
                disabled={isFetching}>
                    {isFetching ? <CircularProgress color="success"/> : "Log In"}
                </button>
                <button 
                    className="loginRegisterButton" 
                    onClick={handleRegister}>
                    Create a new account!
                </button>
            </form>
        </div>
    );
}
