const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetableController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware(['admin']), timetableController.createTimetable);
router.get('/', authMiddleware(['admin', 'teacher', 'student']), timetableController.getTimetable);

module.exports = router;
