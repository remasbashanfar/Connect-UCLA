import Home from "./pages/home.js"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from "./pages/about.js"
import ErrorPage from "./pages/errorPage.js"
import Login from "./pages/login.js"
import PostPage from "./pages/postPage.js"
import AddEvent from "./pages/addEvent.js"
import EventDetails from "./pages/eventDetails.js"
function App() {
  return (
    <div>
       <BrowserRouter>
       
       <Routes>
       {/* <Route path="/login" element={<Login/>}/> */}
       <Route path="/" element={<Home/>}/>
       <Route path="/about" element={<About/>}/>
       <Route path="*" element={<ErrorPage/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/post/:id" element={<PostPage/>}/>
       <Route path="/addEvent" element={<AddEvent/>}/>
       <Route path="/eventDetails" element={<EventDetails/>}/>


       </Routes>
       </BrowserRouter>
    </div>
  ) 
}

export default App;
