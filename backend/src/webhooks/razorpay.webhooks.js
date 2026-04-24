const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { verifyWebhookSignature } = require('../utils/razorpay');

router.post('/razorpay', async (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const isValid = verifyWebhookSignature(req.body, signature, secret);

  if (!isValid) {
    return res.status(400).json({ error: 'Invalid signature' });
  }

  const event = req.body.event;
  const payload = req.body.payload;

  // Log webhook
  const log = await prisma.webhookLog.create({
    data: {
      event,
      payload: JSON.stringify(payload),
      status: 'RECEIVED',
    },
  });

  try {
    if (event === 'payment.captured') {
      const orderId = payload.payment.entity.order_id;
      const paymentId = payload.payment.entity.id;

      await prisma.payment.update({
        where: { orderId },
        data: {
          status: 'SUCCESS',
          paymentId: paymentId,
        },
      });
    } else if (event === 'payment.failed') {
      const orderId = payload.payment.entity.order_id;
      await prisma.payment.update({
        where: { orderId },
        data: { status: 'FAILED' },
      });
    }

    await prisma.webhookLog.update({
      where: { id: log.id },
      data: { status: 'PROCESSED' }
    });

    res.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    
    await prisma.webhookLog.update({
      where: { id: log.id },
      data: { status: 'ERROR' }
    });

    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

module.exports = router;
