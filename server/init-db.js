// init-db.js
const sqlite3 = require('sqlite3');
const dbFile = './university.db';
const db = new sqlite3.Database(dbFile);

db.serialize(() => {
  // Drop tables if they exist (safe for re-init)
  db.run(`DROP TABLE IF EXISTS users`);
  db.run(`DROP TABLE IF EXISTS staff`);
  db.run(`DROP TABLE IF EXISTS reviews`);

  // Create users table
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      name TEXT,
      email TEXT,
      address TEXT,
      dob TEXT
    )
  `);

  // Create staff table (similar to users)
  db.run(`
    CREATE TABLE staff (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      name TEXT,
      email TEXT,
      address TEXT,
      dob TEXT
    )
  `);

  // Create reviews table
  db.run(`
    CREATE TABLE reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert demo users
  const insertUser = db.prepare(`INSERT INTO users (username,password,name,email,address,dob) VALUES (?,?,?,?,?,?)`);
  insertUser.run('alice','123456','Alice Tan','alice@example.com','123 Clementi Road, Singapore','1995-06-12');
  insertUser.run('bob','password','Bob Lim','bob@example.com','45 Marina Bay, Singapore','1992-03-01');
  insertUser.run('carol','qwerty','Carol Wong','carol@example.com','78 Jurong East, Singapore','1998-11-23');
  insertUser.finalize();

  // Insert demo staff
  const insertStaff = db.prepare(`INSERT INTO staff (username,password,name,email,address,dob) VALUES (?,?,?,?,?,?)`);
  insertStaff.run('samuel','7c4a8d09ca3762af61e59520943dc26494f8941b','Dr. Samuel Lee','samuel.lee@university.edu','12 College Road, Singapore','1975-04-10');
  insertStaff.run('anita','5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8','Prof. Anita Kumar','anita.kumar@university.edu','34 University Ave, Singapore','1980-09-22');
  insertStaff.run('joanne','b1b3773a05c0ed0176787a4f1574ff0075f7521e','Ms. Joanne Tan','joanne.tan@university.edu','56 Campus Lane, Singapore','1985-01-15');
  insertStaff.run('michael','6367c48dd193d56ea7b0baad25b19455e529f5ee','Dr. Michael Ong','michael.ong@university.edu','78 Science Park, Singapore','1978-07-03');
  insertStaff.run('rachel','b7a875fc1ea228b9061041b7cec4bd3c52ab3ce3','Prof. Rachel Lim','rachel.lim@university.edu','90 Education Rd, Singapore','1982-12-05');
  insertStaff.run('david','e38ad214943daad1d64c102faec29de4afe9da3d','Mr. David Tan','david.tan@university.edu','23 Knowledge St, Singapore','1979-11-11');
  insertStaff.finalize();

  // Insert demo reviews
  const insertReview = db.prepare(`INSERT INTO reviews (name,content) VALUES (?,?)`);
  insertReview.run('alice', 'Lovely campus!');
  insertReview.run('bob', 'Great professors and facilities.');
  insertReview.finalize();

  console.log('Database initialized at', dbFile);
});

db.close();
