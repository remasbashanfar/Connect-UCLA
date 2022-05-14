import { Link } from 'react-router-dom'
import NavBar from '../components/navbar.js'

export default function Home() {
    return (
        <div >
            <NavBar></NavBar>
            <h1>Connect UCLA</h1>
            <h2>Welcome home!</h2>
            <br/>
            <button style={{display:'flex', alignItems:'center', justifyContent:'center', right:'80px'}}><Link to='/feed'>Feed</Link> </button> 
            <br/>
            <button style={{display:'flex',alignItems:'center'}}><Link to='/menu'>Menu</Link> </button> 
            <br/>
            <button style={{display:'flex',alignItems:'center'}}><Link to='/login'>Login</Link> </button> 
        </div>
    )
}

