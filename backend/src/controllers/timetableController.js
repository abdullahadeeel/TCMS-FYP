const db = require('../config/db');

exports.createTimetable = async (req, res) => {
  const { subject_id, teacher_id, classroom_id, day_of_week, start_time, end_time } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO timetable (subject_id, teacher_id, classroom_id, day_of_week, start_time, end_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [subject_id, teacher_id, classroom_id, day_of_week, start_time, end_time]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTimetable = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM timetable');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
