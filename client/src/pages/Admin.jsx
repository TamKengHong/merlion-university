import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Admin() {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);
  const [error, setError] = useState('');
  const API = "http://localhost:4000/api";

  useEffect(() => {
    const session = localStorage.getItem('staff_session');
    if (!session) {
      setError('Not authenticated');
      return;
    }
  
    const staffData = JSON.parse(session);
    setStaff(staffData);
  }, []);

  if (error) {
    return (
      <div style={{ maxWidth: 600, margin: "50px auto", textAlign: "center", color: "red" }}>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!staff) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        Loading staff profile...
      </div>
    );
  }

  return (
    <div style={{ display: "flex", fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ 
        width: "150px", 
        background: "#f8f9fa", 
        padding: "20px", 
        borderRight: "1px solid #ddd"
      }}>
        <h3 style={{ paddingLeft: 15, color: "black" }}>Admin Menu</h3>
        <ul style={{ listStyle: "none", paddingLeft: 15, marginTop: 10 }}>
          {["Dashboard", "Students", "Courses", "Grades", "Reports", "Reviews"].map((item) => (
            <li key={item}>
              <a 
                href="#" 
                style={{ 
                  textDecoration: "none", 
                  color: "#e67f05",
                  display: "block",
                  padding: "8px 0"
                }}
                onClick={() => alert(`Success`)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, padding: 30 }}>
        <h1 style={{ color: "black", marginBottom: 20 }}>Admin Dashboard</h1>

        {/* Staff Profile Card */}
        <div style={{
          background: "#f8f9fa",
          padding: 20,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: 30
        }}>
          <h2 style={{ color: "black" }}>{staff.name}</h2>
          <p><strong>Email:</strong> {staff.email}</p>
          <p><strong>Username:</strong> {staff.username}</p>
          <p><strong>Password:</strong> {staff.password}</p>
          <p><strong>Address:</strong> {staff.address}</p>
          <p><strong>Date of Birth:</strong> {staff.dob}</p>
        </div>

        {/* Mock Admin Features */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {[
            "Add Student", "Delete Student", "Add Course", "Delete Course",
            "Check Grades", "Assign Courses", "View Reports", "Manage Reviews"
          ].map((feature) => (
            <button
              key={feature}
              className="admin-btn"
              onClick={() => alert(`Success`)}
            >
              {feature}
            </button>
          ))}
        </div>

        <style>{`
          .admin-btn {
            padding: 15px;
            border-radius: 8px;
            border: none;
            background-color: #C56E04;
            color: white;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .admin-btn:hover {
            background-color: #E67F05;
            transform: translateY(-2px);
          }
        `}</style>
      </div>
    </div>
  );
}