import Home from "./pages/home.js"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import About from "./pages/about.js"
import ErrorPage from "./pages/errorPage.js"
import Login from "./pages/login/Login.jsx"
import Register from "./pages/register/Register.jsx"
import PostPage from "./pages/postPage.js"
// imports for Context API 
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import AddEvent from "./pages/addEvent.js";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <GoogleOAuthProvider clientId="1074046883630-561fblnmo26ek7lppki22d1ldflgir10.apps.googleusercontent.com">
       <BrowserRouter>
       
       <Routes>
       {/* <Route path="/login" element={<Login/>}/> */}
       <Route path="/" element={<Home/>}/>
       <Route path="/about" element={<About/>}/>
       <Route path="*" element={<ErrorPage/>}/>
       <Route path="/login" element={user ? <Home/> : <Login/>}/>
       <Route path="/register" element={<Register/>}/>
       <Route path="/post/:id" element={<PostPage/>}/>
       <Route path="/addEvent" element={<AddEvent/>}/>


       </Routes>
       </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  ) 
}

export default App;
