const db = require('../config/db');

exports.createRequest = async (req, res) => {
  const { timetable_id, reason, requested_time, requested_room_id } = req.body;
  const teacher_id = req.user.id; // From authMiddleware
  try {
    const result = await db.query(
      'INSERT INTO change_requests (timetable_id, teacher_id, reason, requested_time, requested_room_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [timetable_id, teacher_id, reason, requested_time, requested_room_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT cr.*, u.full_name as teacher_name, t.day_of_week, s.subject_name 
      FROM change_requests cr
      JOIN users u ON cr.teacher_id = u.id
      JOIN timetable t ON cr.timetable_id = t.id
      JOIN subjects s ON t.subject_id = s.id
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await db.query(
      'UPDATE change_requests SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
