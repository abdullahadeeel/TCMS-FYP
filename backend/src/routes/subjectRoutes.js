const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware(['admin']), subjectController.addSubject);
router.get('/', authMiddleware(['admin', 'teacher', 'student']), subjectController.getSubjects);

module.exports = router;
