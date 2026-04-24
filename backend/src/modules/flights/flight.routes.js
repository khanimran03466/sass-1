const express = require('express');
const router = express.Router();
const flightController = require('./flight.controller');
const { authenticate } = require('../../middleware/auth');

router.get('/search', authenticate, flightController.searchFlights);
router.post('/book', authenticate, flightController.bookFlight);

module.exports = router;
