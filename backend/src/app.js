const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require('./modules/auth/auth.routes');
const rentRoutes = require('./modules/rent/rent.routes');
const ccRoutes = require('./modules/creditCard/cc.routes');
const flightRoutes = require('./modules/flights/flight.routes');
const hotelRoutes = require('./modules/hotels/hotel.routes');
const rechargeRoutes = require('./modules/recharge/recharge.routes');
const billRoutes = require('./modules/bills/bill.routes');
const webhookRoutes = require('./webhooks/razorpay.webhooks');
const adminRoutes = require('./modules/admin/admin.routes');

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use('/api/', limiter);

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/rent', rentRoutes);
app.use('/api/credit-card', ccRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/recharge', rechargeRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err.message);

  if (err.code === 'P2002') {
    return res.status(400).json({ error: 'Unique constraint failed on ' + err.meta.target });
  }

  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
  });
});

module.exports = app;
