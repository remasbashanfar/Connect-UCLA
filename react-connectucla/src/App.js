import Home from "./pages/home/Home"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Feed from "../src/pages/home/feed.js"
import ErrorPage from "../src/pages/home/errorPage.js"
import Menu from "../src/pages/home/menu.js"
import Login from "../src/pages/home/login.js"

function App() {
  return (
    <div>
       <BrowserRouter>
       
       <Routes>
        {/* @Anyone creatin new pages, when you have a page ready, import it to App.js then add it in the same format below
        Lmk if you need help with that -Remas */}
       {/* <Route path="/login" element={<Login/>}/> */}
       <Route path="/" element={<Home/>}/>
       <Route path="/feed" element={<Feed/>}/>
       <Route path="*" element={<ErrorPage/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/menu" element={<Menu/>}/>

       </Routes>
       </BrowserRouter>
    </div>
  ) 
}

export default App;
