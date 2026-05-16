const express = require('express');
const router = express.Router();
const changeRequestController = require('../controllers/changeRequestController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware(['teacher']), changeRequestController.createRequest);
router.get('/', authMiddleware(['admin', 'teacher']), changeRequestController.getRequests);
router.patch('/:id', authMiddleware(['admin']), changeRequestController.updateRequestStatus);

module.exports = router;
