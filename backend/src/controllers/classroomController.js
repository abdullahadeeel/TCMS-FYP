const db = require('../config/db');

exports.addClassroom = async (req, res) => {
  const { room_number, capacity, location } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO classrooms (room_number, capacity, location) VALUES ($1, $2, $3) RETURNING *',
      [room_number, capacity, location]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getClassrooms = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM classrooms');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
