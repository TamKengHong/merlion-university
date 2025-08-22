import React, { useState } from 'react';

export default function About() {
  const [contact, setContact] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const faculty = [
    { name: "Prof. Anita Kumar", title: "Dean of Computer Science", image: "src/images/faculty1.jpg", bio: "Expert in AI and Machine Learning with 20+ years of teaching experience." },
    { name: "Dr. Michael Ong", title: "Head of Engineering", image: "src/images/faculty2.jpg", bio: "Passionate about sustainable engineering and robotics research." },
    { name: "Ms. Joanne Tan", title: "Director of Business School", image: "src/images/faculty3.jpg", bio: "Specializes in international business and entrepreneurship." },
    { name: "Dr. Samuel Lee", title: "Professor of Mathematics", image: "src/images/faculty4.jpg", bio: "Researcher in applied mathematics and data analytics." }
  ];

  function handleChange(e) {
    setContact(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Thank you, ${contact.name}! Your message has been received.`);
    setContact({ name: '', email: '', phone: '', message: '' });
    setSubmitted(true);
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero" style={{ textAlign: 'center', marginTop:"50px" }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: 40 }}>About Merlion University</h1>

        <img
          src="src/images/campus.jpg"
          alt="campus"
          style={{
            width: '100%',
            height: '400px',
            objectFit: 'cover',
            marginBottom: 90
          }}
        />

        <p style={{ fontSize: '1.3rem', lineHeight: 1.6, maxWidth: 900, margin: 'auto', paddingBottom:120 }}>
          Merlion University is a fictional university created for demonstration purposes. Explore our vision, mission, culture, and see why students love our campus!
        </p>
      </section>

      {/* Vision, Mission, Culture, Rankings 2x2 Grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", margin: "0 auto", maxWidth: "960px", padding: "0 20px" }}>
  {/* Row 1 */}
  <div style={{ display: "flex", gap: "40px", justifyContent: "center" }}>
    <div className="card" style={{ width: "600px", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
      <h2 style={{ marginBottom: "12px" }}>Our Vision</h2>
      <p>To be a world-class institution that empowers students to innovate, lead, and make a positive impact on society.</p>
    </div>
    <div className="card" style={{ width: "600px", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
      <h2 style={{ marginBottom: "12px" }}>Our Mission</h2>
      <p>To provide a nurturing environment for learning, research, and holistic development while fostering diversity and inclusion.</p>
    </div>
  </div>

  {/* Row 2 */}
  <div style={{ display: "flex", gap: "40px", justifyContent: "center" }}>
    <div className="card" style={{ width: "600px", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
      <h2 style={{ marginBottom: "12px" }}>Our Culture</h2>
      <p>Merlion University celebrates curiosity, creativity, and collaboration. We encourage students to explore their passions and engage in community service.</p>
    </div>
    <div className="card" style={{ width: "600px", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
      <h2 style={{ marginBottom: "12px" }}>Our Rankings</h2>
      <p>Ranked top 10 in innovation, top 5 in student satisfaction, and recognized globally for research excellence in STEM and Business fields.</p>
    </div>
  </div>
</div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "40px" }}>
</div>

      {/* Faculty & Team */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Meet Our Faculty</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {faculty.map(member => (
            <div key={member.name} className="card" style={{ flex: "0 1 220px", padding: "15px", textAlign: "center" }}>
              <h3 style={{ marginBottom: "6px" }}>{member.name}</h3>
              <p style={{ fontStyle: "italic", color: "#555", marginBottom: "12px" }}>{member.title}</p>
              <p style={{ fontSize: "14px", color: "#666" }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Us with extra bottom spacing */}
      <div style={{paddingBottom:50}}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Contact Us</h2>
        <form 
          onSubmit={handleSubmit} 
          style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "500px", margin: "0 auto", background: "#f8f9fa", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}
        >
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            value={contact.name} 
            onChange={handleChange} 
            required
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={contact.email} 
            onChange={handleChange} 
            required
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <input 
            type="tel" 
            name="phone" 
            placeholder="Contact Number" 
            value={contact.phone} 
            onChange={handleChange} 
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <textarea 
            name="message" 
            placeholder="Your Message" 
            value={contact.message} 
            onChange={handleChange} 
            rows={4} 
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <button type="submit" style={{ padding: "10px", borderRadius: "6px", border: "none", background: "#007bff", color: "white", cursor: "pointer", fontWeight: "bold" }}>
            Send Message
          </button>
          {submitted && <p style={{ color: "green", textAlign: "center", marginTop: "10px" }}>Thank you! Your message has been received.</p>}
        </form>
      </div>
    </div>
  );
}
