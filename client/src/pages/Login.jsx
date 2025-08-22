import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isStaff, setIsStaff] = useState(false)
  const nav = useNavigate()
  const API = 'http://localhost:4000/api'

  function submit(e) {
    e.preventDefault();
  
    fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, isStaff })
    })
      .then(r => r.json())
      .then(d => {
        if (isStaff && d.staff) {
          // store staff session in localStorage
          localStorage.setItem('staff_session', JSON.stringify(d.staff));
          nav(`/admin/${d.staff.id}`);
        } else if (d.user) {
          // store student session in localStorage
          localStorage.setItem('user_session', JSON.stringify(d.user));
          nav(`/profile/${d.user.id}`);
        } else {
          alert(d.error || 'Login failed');
        }
      })
      .catch(() => alert('Network error'));
  }
  
  return (
    <div style={{ maxWidth: 400, margin: '40px auto', fontFamily: "'Segoe UI', sans-serif" }}>
      <h1 style={{ textAlign: 'center', marginTop:100, marginBottom: 20 }}>{isStaff ? 'Staff Login' : 'Student Login'}</h1>

      {/* Toggle Button */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <button
          onClick={() => setIsStaff(!isStaff)}
          style={{
            padding: '8px 16px',
            borderRadius: 6,
            border: '1px solid #007bff',
            backgroundColor: isStaff ? '#007bff' : 'white',
            color: isStaff ? 'white' : '#007bff',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Switch to {isStaff ? 'Student' : 'Staff'} Login
        </button>
      </div>

      {/* Login Form */}
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom:"40vh" }}>
        <label className="medium-muted">Username</label>
        <input
          className="input"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter username"
        />

        <label className="medium-muted">Password</label>
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            className="input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
            style={{ paddingRight: 40 }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          className="btn"
          style={{
            marginTop: "10px",
            padding: '10px',
            borderRadius: 6,
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Log in
        </button>
      </form>
    </div>
  )
}
