// setupDb.js
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function setup() {
  // This automatically creates a file called 'legal_copilot.db' in your project folder!
  const db = await open({
    filename: './legal_copilot.db',
    driver: sqlite3.Database
  });

  console.log("Creating tables...");

  await db.exec(`
    CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        role TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS Cases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        document_text TEXT, 
        status TEXT DEFAULT 'Pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Precedents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        case_id INTEGER NOT NULL,
        case_title TEXT NOT NULL,
        summary TEXT,
        relevance_score INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (case_id) REFERENCES Cases(id) ON DELETE CASCADE
    );
  `);

  console.log("Inserting dummy data...");
  
  await db.run(`INSERT OR IGNORE INTO Users (id, name, email, role) VALUES (1, 'John Doe', 'john@citizen.com', 'Citizen')`);
  await db.run(`INSERT OR IGNORE INTO Users (id, name, email, role) VALUES (2, 'Jane Smith', 'jane@lawyer.com', 'Lawyer')`);
  await db.run(`INSERT OR IGNORE INTO Cases (id, user_id, title, description, status) VALUES (1, 1, 'Unfair Eviction Notice', 'Landlord sent a 3-day notice.', 'Pending')`);

  console.log("✅ Database setup complete!");
}

setup();