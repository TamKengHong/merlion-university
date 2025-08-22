import React, { useState } from 'react'

export default function Blog() {
  // Hardcoded posts
  const posts = [
    {
      id: 1,
      title: "Orientation Day 2025",
      date: "August 15, 2025",
      category: "Events",
      preview: "Our new students were warmly welcomed during this year’s orientation day...",
      fullText: `Our new students were warmly welcomed during this year’s orientation day. 
      The campus was buzzing with activities, from icebreaker games to faculty introductions. 
      Keynote speeches by our Dean and student leaders set the tone for an exciting year ahead.`
    },
    {
      id: 2,
      title: "University Sports Festival",
      date: "July 30, 2025",
      category: "Sports",
      preview: "The annual sports festival brought students and staff together in friendly competition...",
      fullText: `The annual sports festival brought students and staff together in friendly competition. 
      Events included basketball, football, track and field, and even an e-sports tournament. 
      Congratulations to the Engineering Faculty for winning the overall trophy!`
    },
    {
      id: 3,
      title: "Research Symposium Highlights",
      date: "June 20, 2025",
      category: "Research",
      preview: "Our faculty and postgraduate students presented groundbreaking research this summer...",
      fullText: `Our faculty and postgraduate students presented groundbreaking research this summer. 
      Topics ranged from artificial intelligence in healthcare to sustainable urban development. 
      Special thanks to our keynote guest, Professor Tan from MIT, who inspired us with her talk on quantum computing.`
    },
    {
      id: 4,
      title: "Cultural Night Celebration",
      date: "May 12, 2025",
      category: "Events",
      preview: "Students showcased their diverse cultures with music, dance, and food from around the world...",
      fullText: `Students showcased their diverse cultures with music, dance, and food from around the world. 
      The highlight of the night was the international food bazaar, which featured 20+ cuisines. 
      The event ended with a spectacular fireworks display over the main field.`
    }
  ]

  const [expanded, setExpanded] = useState(null)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  const categories = ["All", "Events", "Sports", "Research"]

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id)
  }

  // Filtered posts (by search + category)
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                          post.fullText.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = filter === "All" || post.category === filter
    return matchesSearch && matchesCategory
  })

  return (
    <div style={{ display: "flex", gap: "20px", maxWidth: "1100px", margin: "40px auto", marginBottom:"0", padding: "0 20px 20px 0" }}>
      
      {/* Main Content */}
      <div style={{ flex: 3 }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>University Blog</h1>

        {/* Search + Filter */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <input 
            type="text" 
            placeholder="Search posts..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #ccc", marginRight: "10px" }}
          />
          <select 
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Blog Posts */}
        {filteredPosts.map(post => (
          <div key={post.id} style={{ 
            background: "#fff", 
            border: "1px solid #ddd", 
            borderRadius: "10px", 
            padding: "20px", 
            marginBottom: "20px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}>
            <h3>{post.title}</h3>
            <p style={{ color: "gray", fontSize: "14px" }}>{post.date} — <em>{post.category}</em></p>
            <p>{expanded === post.id ? post.fullText : post.preview}</p>
            <button 
              onClick={() => toggleExpand(post.id)} 
              style={{ 
                background: "#007bff", 
                color: "white", 
                border: "none", 
                padding: "8px 16px", 
                borderRadius: "6px", 
                cursor: "pointer" 
              }}
            >
              {expanded === post.id ? "Show Less" : "Read More"}
            </button>
          </div>
        ))}

        {filteredPosts.length === 0 && (
          <p style={{ textAlign: "center", color: "gray" }}>No posts found.</p>
        )}
      </div>

      {/* Sidebar */}
      <div>
        <div style={{ background: "#f8f9fa", border: "1px solid #ddd", borderRadius: "10px", padding: "0px 15px", marginBottom: "20px" }}>
          <h4>Recent Posts</h4>
          <ul style={{ paddingLeft: "18px" }}>
            {posts.slice(0, 4).map(p => (
              <li key={p.id}>{p.title}</li>
            ))}
          </ul>
        </div>

        <div style={{ background: "#f8f9fa", border: "1px solid #ddd", borderRadius: "10px", padding: "0px 15px" }}>
          <h4>Categories</h4>
          <ul style={{ paddingLeft: "18px" }}>
            {categories.filter(c => c !== "All").map(c => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
