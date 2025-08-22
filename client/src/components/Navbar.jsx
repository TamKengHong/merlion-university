import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <div style={{color:'#f8f8f8'}} className="nav">
      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <Link to="/" style={{display:'flex', alignItems:'center', gap:8, textDecoration:'none', color:'inherit'}}>
          <img 
            src="src/images/Merlion University.png" 
            alt="Merlion University Logo" 
            style={{height:40, width:140, objectFit:'contain'}} 
          />
        </Link>
      </div>

      <div style={{marginLeft:'auto'}} className="navlinks">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/staff">Staff</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  )
}
