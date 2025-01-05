const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

// Connect to database
const db = new sqlite3.Database('./taskmanager.db', (err) => {
    if (err) {
        console.error('Failed to connect to database:', err.message);
    }
});


router.get('/', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) {
            res.status(500).json({ message: 'Database error', error: err });
        } else {
            res.json(rows);
        }
    });
});


router.post('/', (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description || !status) {
    return res.status(400).json({ message: 'Title, description, and status are required.' });
  }

  console.log('Received task:', { title, description, status });  // Log input data

  const stmt = db.prepare('INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)');
  stmt.run([title, description, status], function(err) {
    if (err) {
      console.error('Database error:', err);  // Log any DB errors
      return res.status(500).json({ message: 'Database error', error: err });
    }

    console.log('Task added with ID:', this.lastID);  // Log successful addition
    res.status(201).json({
      message: 'Task added successfully',
      task: {
        id: this.lastID, 
        title,
        description,
        status
      }
    });
  });
});


// Delete a task
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ message: 'Database error', error: err });
        } else {
            res.json({ message: 'Task deleted successfully' });
        }
    });
});

module.exports = router;
