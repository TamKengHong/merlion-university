import React, { useEffect, useState } from 'react';
import DangerousReview from '../components/DangerousReview';

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const API = 'http://localhost:4000/api';

  useEffect(() => {
    fetch(`${API}/reviews`)
      .then(r => r.json())
      .then(d => setReviews(d.reviews || []));
  }, []);

  function submitReview(e) {
    e.preventDefault();
    if (!name || !content) return alert('name and review required');
    fetch(`${API}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, content })
    })
      .then(r => r.json())
      .then(d => {
        if (d.review) {
          setReviews(prev => [d.review, ...prev]);
          setName('');
          setContent('');
        } else alert('error');
      });
  }

  return (
    <div>
    {/* Hero Section */}
<section className="hero" style={{ textAlign: 'center', marginTop:"50px" }}>
  <h1 style={{ fontSize: '2.5rem', marginBottom: 40 }}>Welcome to Merlion University</h1>

  <img
    src="src/images/campus.jpg"
    alt="campus"
    style={{
      width: '100%',
      height: '400px',   // fixed height
      objectFit: 'cover', // full width, nicely scaled
      marginBottom: 90
    }}
  />

  <p style={{ fontSize: '1.3rem', lineHeight: 1.6, maxWidth: 900, margin: 'auto' }}>
    Merlion University is a fictional university used for demo and testing. We offer world-class programs in
    Computer Science, Engineering, and Business to empower the next generation of leaders.
  </p>
</section>

      {/* Vision & Mission */}
      <section style={{
        marginTop: 60,
        padding: '40px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 100,
        flexWrap: 'wrap'
      }}>
        <img
          src="src/images/prof1.jpg"
          alt="professor"
          style={{ width: 600, borderRadius: 12, objectFit: 'cover' }}
        />
        <div style={{ maxWidth: 600 }}>
          <h2 style={{ marginBottom: 20 }}>Our Vision & Mission</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            <strong>Vision:</strong> To be a global hub of knowledge, innovation, and character development, shaping the leaders of tomorrow.
          </p>
          <p style={{ fontSize: '1.1rem', marginTop: 12, lineHeight: '1.6' }}>
            <strong>Mission:</strong> To provide high-quality education, foster research and innovation, and nurture a vibrant community of lifelong learners.
          </p>
        </div>
      </section>

      {/* Our Culture */}
      <section style={{ marginTop: 60, padding: '40px 10px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: 30 }}>Our Culture</h2>
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'space-around' }}>
          <div style={{ width: 400 }}>
            <img src="src/images/diversity.jpg" alt="diversity" style={{ width: '100%', borderRadius: 8, marginBottom: 10 }} />
            <h3>Diversity & Inclusion</h3>
            <p>We celebrate cultural diversity and encourage inclusivity in all aspects of campus life.</p>
          </div>
          <div style={{ width: 400 }}>
            <img src="src/images/innovation.jpg" alt="innovation" style={{ width: '100%', borderRadius: 8, marginBottom: 10 }} />
            <h3>Innovation</h3>
            <p>We foster creativity and encourage groundbreaking ideas.</p>
          </div>
          <div style={{ width: 400 }}>
            <img src="src/images/community.jpg" alt="community" style={{ width: '100%', borderRadius: 8, marginBottom: 10 }} />
            <h3>Community Spirit</h3>
            <p>We believe in collaboration, teamwork, and giving back to society.</p>
          </div>
        </div>
      </section>

      {/* Rankings & Achievements */}
      <section style={{
        marginTop: 60,
        padding: '40px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 100,
        flexWrap: 'wrap'
      }}>
        <div style={{ maxWidth: 600 }}>
          <h2 style={{ marginBottom: 20 }}>Rankings & Achievements</h2>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem', lineHeight: '1.8' }}>
            <li>Top 100 Global Universities (2025)</li>
            <li>#1 in Student Diversity in Asia</li>
            <li>Recognized as a leading hub for AI and Cybersecurity research</li>
            <li>Over 500+ international research collaborations</li>
          </ul>
        </div>
        <img
          src="src/images/lab.jpg"
          alt="lab"
          style={{ width: 600, borderRadius: 12, objectFit: 'cover' }}
        />
      </section>

      {/* Reviews Section */}
      <section style={{ marginTop: 80, paddingBottom: 20 }}>
        <h2 style={{ textAlign: 'center' }}>Here’s what people say about our university</h2>
        <form onSubmit={submitReview} style={{ marginBottom: 20, maxWidth: 600, margin: '20px auto' }}>
          <input
            className="input"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <div style={{ height: 8 }} />
          <textarea
            className="input"
            placeholder="Write your review..."
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={4}
          />
          <div style={{ height: 8 }} />
          <button className="btn">Submit Review</button>
        </form>

        <div style={{ maxWidth: 700, margin: 'auto' }}>
          {reviews.length === 0 && <div className="card">No reviews yet.</div>}
          {reviews.map(r => (
            <div key={r.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{r.name}</strong>
                <span className="small-muted">{new Date(r.created_at).toLocaleString()}</span>
              </div>
              <div style={{ marginTop: 8 }}>
                <DangerousReview content={r.content} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
