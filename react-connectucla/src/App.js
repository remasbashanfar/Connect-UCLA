import Home from "./pages/home.js"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import About from "./pages/about.js"
import ErrorPage from "./pages/errorPage.js"
import Login from "./pages/login/Login.jsx"
import Register from "./pages/register/Register.jsx"
import PostPage from "./pages/postPage.js"
import Maps from "./pages/maps.js"
// imports for Context API 
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import React from 'react'

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <GoogleOAuthProvider clientId="1074046883630-561fblnmo26ek7lppki22d1ldflgir10.apps.googleusercontent.com">
       <BrowserRouter>
       
       <Routes>
        {/* @Anyone creatin new pages, when you have a page ready, import it to App.js then add it in the same format below
        Lmk if you need help with that -Remas */}
       {/* <Route path="/login" element={<Login/>}/> */}
       <Route path="/" element={<Home/>}/>
       <Route path="/about" element={<About/>}/>
       <Route path="*" element={<ErrorPage/>}/>
       <Route path="/login" element={user ? <Home/> : <Login/>}/>
       <Route path="/register" element={<Register/>}/>
       <Route path="/post/:id" element={<PostPage/>}/>
       <Route path="/maps" element={<Maps/>}/>
       </Routes>
       </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  ) 
}

export default App;
