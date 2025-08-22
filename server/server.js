// server.js
const express = require('express');
const cors = require('cors'); // <-- import cors
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto'); // Import crypto for SHA-1 hashing

const app = express();
const PORT = process.env.PORT || 4000;
const DB_FILE = path.join(__dirname, 'university.db');

// Middleware
// Allow requests from your React app
app.use(cors({
  origin: 'http://localhost:5173', // React dev server
  credentials: true,               // allow cookies if needed
}));

app.use(bodyParser.json());

// Connect to SQLite
const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) console.error('Failed to open DB', err);
  else console.log('Connected to SQLite DB at', DB_FILE);
});

// ------------------- LOGIN -------------------
app.post('/api/login', (req, res) => {
  const { username, password, isStaff } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: 'username and password required' });

  const table = isStaff ? 'staff' : 'users';
  let hashedPassword = password; // Default to plaintext for users

  // If staff, hash the password with SHA-1
  if (isStaff) {
    hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
  }

  const query = `SELECT id, username, name, email, password, address, dob FROM ${table} WHERE username = ? AND password = ?`;

  db.get(query, [username, hashedPassword], (err, row) => {
    if (err) return res.status(500).json({ error: 'db error', details: err.message });
    if (!row) return res.status(401).json({ error: 'invalid credentials' });

    res.json(isStaff ? { staff: row } : { user: row });
  });
});

// ------------------- STAFF PROFILE -------------------
app.get('/api/admin/:id', (req, res) => {
  const id = Number(req.params.id);
  db.get(
    'SELECT id, username, name, email, password, address, dob FROM staff WHERE id = ?',
    [id],
    (err, row) => {
      if (err) return res.status(500).json({ error: 'db error' });
      if (!row) return res.status(404).json({ error: 'staff not found' });
      res.json({ staff: row });
    }
  );
});

// Get profile by id
// ------------------- STUDENT PROFILE -------------------
app.get('/api/profile/:id', (req, res) => {
  const id = Number(req.params.id);
  db.get(
    'SELECT id, username, password, name, email, address, dob FROM users WHERE id = ?',
    [id],
    (err, row) => {
      if (err) return res.status(500).json({ error: 'db error' });
      if (!row) return res.status(404).json({ error: 'user not found' });
      res.json({ user: row });
    }
  );
});

// ------------------- STAFF SEARCH (SQLi demo) -------------------
app.get('/api/staff', (req, res) => {
  const q = req.query.search || '';
  const query = `
    SELECT id, username, password, name, email, address, dob
    FROM staff
    ${q ? `WHERE name LIKE '%${q}%'` : ''}
    LIMIT 100
  `;

  console.log('Running query:', query);

  db.all(query, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const results = rows.map(r => ({
      id: r.id,
      name: r.name,
      email: r.email,
        username: r.username,
        password: r.password,
        address: r.address,
        dob: r.dob
      }
    ));

    res.json({ results });
  });
});

// ------------------- REVIEWS -------------------
app.get('/api/reviews', (req, res) => {
  db.all(
    'SELECT id, name, content, created_at FROM reviews ORDER BY created_at DESC LIMIT 200',
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'db error' });
      res.json({ reviews: rows });
    }
  );
});

app.post('/api/reviews', (req, res) => {
  const { name, content } = req.body;
  if (!name || !content)
    return res.status(400).json({ error: 'name and content required' });

  db.run('INSERT INTO reviews (name, content) VALUES (?, ?)', [name, content], function (err) {
    if (err) return res.status(500).json({ error: 'db error' });

    db.get(
      'SELECT id, name, content, created_at FROM reviews WHERE id = ?',
      [this.lastID],
      (err, row) => {
        if (err) return res.status(500).json({ error: 'db error' });
        res.json({ review: row });
      }
    );
  });
});

// ------------------- START SERVER -------------------
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
