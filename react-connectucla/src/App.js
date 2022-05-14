import Home from "./pages/home.js"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from "./pages/about.js"
import ErrorPage from "./pages/errorPage.js"
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
       <Route path="/about" element={<About/>}/>
       <Route path="*" element={<ErrorPage/>}/>
       <Route path="/login" element={<Login/>}/>

       </Routes>
       </BrowserRouter>
    </div>
  ) 
}

export default App;
