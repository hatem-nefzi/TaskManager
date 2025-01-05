const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const app = express();
const port = 8081;


const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);  // Create the 'data' directory if it doesn't exist
}


const db = new sqlite3.Database(path.join(dataDir, 'taskmanager.db'), (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            status TEXT NOT NULL
        )`);
        console.log("Database initialized successfully.");
    }
});


app.use(cors());
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, '../frontend')));


const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
