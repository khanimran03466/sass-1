const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const { authenticate } = require('../../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/google-login', authController.googleLogin);
router.get('/me', authenticate, authController.getMe);

module.exports = router;
