const db = require('../config/db');

exports.addSubject = async (req, res) => {
  const { subject_name, subject_code } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO subjects (subject_name, subject_code) VALUES ($1, $2) RETURNING *',
      [subject_name, subject_code]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSubjects = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM subjects');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
