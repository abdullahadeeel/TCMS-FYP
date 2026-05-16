const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroomController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware(['admin']), classroomController.addClassroom);
router.get('/', authMiddleware(['admin', 'teacher', 'student']), classroomController.getClassrooms);

module.exports = router;
