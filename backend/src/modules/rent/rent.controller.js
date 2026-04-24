const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { calculateRentFees } = require('../../utils/revenue');
const { createOrder } = require('../../utils/razorpay');

const addLandlord = async (req, res) => {
  try {
    const { name, bankName, accountNo, ifscCode } = req.body;
    const userId = req.user.id;

    const landlord = await prisma.landlord.create({
      data: {
        name,
        bankName,
        accountNo,
        ifscCode,
        userId,
      },
    });

    res.status(201).json(landlord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const initiateRentPayment = async (req, res) => {
  try {
    const { landlordId, amount } = req.body;
    const userId = req.user.id;

    if (!landlordId) {
      return res.status(400).json({ error: 'Please select a landlord' });
    }

    if (amount < 1000) {
      return res.status(400).json({ error: 'Minimum rent payment is ₹1,000' });
    }

    // Calculate Fees
    const fees = calculateRentFees(amount);

    // Create Razorpay Order
    const order = await createOrder(fees.totalAmount, 'INR', `rent_${Date.now()}`);

    // Log pending transaction in DB
    const payment = await prisma.payment.create({
      data: {
        orderId: order.id,
        amount: fees.totalAmount,
        baseAmount: fees.baseAmount,
        platformFee: fees.platformFee,
        gstAmount: fees.gstAmount,
        totalAmount: fees.totalAmount,
        serviceType: 'RENT',
        userId,
        landlordId,
        status: 'PENDING',
      },
    });

    res.json({
      order,
      payment,
      fees,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await prisma.payment.findMany({
      where: { userId, serviceType: 'RENT' },
      include: { landlord: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addLandlord, initiateRentPayment, getHistory };
