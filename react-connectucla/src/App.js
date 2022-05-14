import Home from "./pages/Home.js"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Feed from "./pages/feed.js"
import ErrorPage from "./pages/errorPage.js"
import Menu from "./pages/menu.js"
import Login from "./pages/login.js"

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
