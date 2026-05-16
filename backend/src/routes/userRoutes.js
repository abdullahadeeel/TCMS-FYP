const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

router.post('/', userController.addUser);
router.get('/', authMiddleware(['admin']), userController.getUsers);
router.delete('/:id', authMiddleware(['admin']), userController.deleteUser);

module.exports = router;
