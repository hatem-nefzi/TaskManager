
const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('./task_manager.db');


db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT
  )`);
});

module.exports = db;
