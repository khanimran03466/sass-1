const express = require('express');
const router = express.Router();
const adminController = require('./admin.controller');
const { authenticate, authorize } = require('../../middleware/auth');

router.get('/stats', authenticate, authorize('ADMIN'), adminController.getDashboardStats);
router.get('/transactions', authenticate, authorize('ADMIN'), adminController.getAllTransactions);

module.exports = router;
