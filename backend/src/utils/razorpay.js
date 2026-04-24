const Razorpay = require('razorpay');

let razorpay = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  console.log('Razorpay initialized successfully');
} else {
  console.warn('Razorpay Keys missing. Payment features will not work.');
}

const createOrder = async (amount, currency = 'INR', receipt) => {
  const options = {
    amount: Math.round(amount * 100), // Amount in paise
    currency,
    receipt,
  };

  try {
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    throw new Error(`Razorpay Order Error: ${error.message}`);
  }
};

const verifyWebhookSignature = (body, signature, secret) => {
  return Razorpay.validateWebhookSignature(JSON.stringify(body), signature, secret);
};

module.exports = { createOrder, verifyWebhookSignature, razorpay };
