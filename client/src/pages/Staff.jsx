import React, { useState } from 'react';

export default function Staff() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const API = 'http://localhost:4000/api';

  function search(e) {
    e && e.preventDefault();
    setError('');
    fetch(`${API}/staff?search=${encodeURIComponent(query)}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) {
          setError(d.error);
          setResults([]);
        } else {
          setResults(d.results || []);
        }
      })
      .catch(() => setError('Network error'));
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '10px 20px 70px 10px', marginBottom:"0", fontFamily: "'Segoe UI', sans-serif" }}>
      
      {/* Page Header */}
      <h1 style={{ textAlign: 'center', marginBottom: 10 }}>Staff Directory</h1>
      
      {/* Intro Image & Text */}
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <img 
          src="src/images/prof.jpg" 
          alt="University Professor" 
          style={{ width: '100%', maxWidth: 800, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginBottom: 15 }} 
        />
        <p style={{ color: '#555', fontSize: 16, maxWidth: 800, margin: '0 auto' }}>
          Explore the talented faculty and staff at Merlion University. Use the search box below to find professors, lecturers, and administrative staff. Click on their profiles to learn more about their roles and expertise.
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={search} style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, gap: 10 }}>
        <input
          className="input"
          placeholder="Search staff name or email"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            padding: '10px 12px',
            borderRadius: 6,
            border: '1px solid #ccc',
            flex: 1,
            maxWidth: 400
          }}
        />
        <button
          className="btn"
          style={{
            padding: '10px 20px',
            borderRadius: 6,
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Search
        </button>
      </form>

      {error && <div className="card" style={{ color: 'red', textAlign: 'center', marginBottom: 12 }}>{error}</div>}

      {/* Staff Cards */}
      <div className="staff-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 20, marginTop: 20 }}>
      {results.length === 0 && !error && (
  <div
    className="card"
    style={{
      padding: 20,
      textAlign: 'center',
      gridColumn: '1 / -1', // spans all columns
      justifySelf: 'center' // centers in the grid
    }}
  >
    No staff found.
  </div>
)}

        {results.map(s => (
          <div
            key={s.id}
            className="card"
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 15,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              textAlign: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
          >
            <h3 style={{ marginBottom: 6, color: '#333' }}>{s.name}</h3>
            <p style={{ fontSize: 14, color: '#555', marginBottom: 4 }}>{s.email}</p>
            <p style={{ fontSize: 14, color: '#777' }}>{s.title || 'Faculty Member'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
