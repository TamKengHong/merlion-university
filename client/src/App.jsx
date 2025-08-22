import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Staff from './pages/Staff.jsx'
import Blog from './pages/Blog.jsx'
import About from './pages/About.jsx'
import Admin from './pages/Admin.jsx'


export default function App(){
return (
<div>
<Navbar />
<div className="container">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/profile/:id" element={<Profile />} />
<Route path="/staff" element={<Staff />} />
<Route path="/blog" element={<Blog />} />
<Route path="/about" element={<About />} />
<Route path="/admin/:id" element={<Admin />} />
</Routes>
</div>
</div>
)
}