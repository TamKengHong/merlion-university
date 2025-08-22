import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Profile() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [bio, setBio] = useState("")
  const API = 'http://localhost:4000/api'

  useEffect(() => {
    fetch(`${API}/profile/${id}`)
      .then(r => r.json())
      .then(d => {
        if (d.user) setUser(d.user)
      })
  }, [id])

  if (!user) return <div>Loading user #{id}...</div>

  return (
    <div style={{ display: "flex", minHeight: "80vh" }}>
      {/* Sidebar */}
      <aside style={{ width: "150px", background: "#f8f9fa", padding: "20px", borderRight: "1px solid #ddd" }}>
        <h3 style={{paddingLeft: 15}}>Menu</h3>
        <ul style={{ listStyle: "none", paddingLeft: 15, marginTop: 10 }}>
          <li><a href="#" style={{ textDecoration: "none", color: "#007bff" }}>Overview</a></li>
          <li><a href="#" style={{ textDecoration: "none", color: "#007bff" }}>Courses</a></li>
          <li><a href="#" style={{ textDecoration: "none", color: "#007bff" }}>Settings</a></li>
          <li><a href="#" style={{ textDecoration: "none", color: "#007bff" }}>Logout</a></li>
        </ul>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h2>Profile — {user.name}</h2>
        <div className="card" style={{ padding: 20, marginBottom: 20, textAlign: "center" }}>
          <img 
            src={`https://i.pravatar.cc/150?u=${user.id}`} 
            alt="avatar" 
            style={{ borderRadius: "50%", width: 120, height: 120, marginBottom: 12 }} 
          />
          <h3>{user.name}</h3>
          <p style={{ color: "gray" }}>{user.email}</p>
          
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 10 }}>
            <button className="btn">Message</button>
            <button className="btn">Follow</button>
            <select className="input" style={{ width: "auto" }}>
              <option>More Actions</option>
              <option>Report User</option>
              <option>Block</option>
              <option>Share Profile</option>
            </select>
          </div>
        </div>

        {/* Details card */}
        <div className="card" style={{ padding: 20, marginBottom: 20 }}>
          <h4>Profile Info</h4>
          <p><strong>User ID:</strong> {user.id}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Password:</strong> {user.password}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Date of birth:</strong> {user.dob}</p>
        </div>

        {/* Bio/About section */}
        <div className="card" style={{ padding: 20 }}>
          <h4>About Me</h4>
          <textarea
            className="input"
            rows={5}
            placeholder="Write a short bio here..."
            value={bio}
            onChange={e => setBio(e.target.value)}
          />
          {bio && (
            <p style={{ marginTop: 12, fontStyle: "italic", color: "#444" }}>
              Preview: "{bio}"
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
