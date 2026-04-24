const express = require('express');
const router = express.Router();
const rentController = require('./rent.controller');
const { authenticate } = require('../../middleware/auth');

router.post('/landlord', authenticate, rentController.addLandlord);
router.post('/pay', authenticate, rentController.initiateRentPayment);
router.get('/history', authenticate, rentController.getHistory);

module.exports = router;
