const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    
    // Optimized Aggregations
    const aggregations = await prisma.payment.aggregate({
      where: { status: 'SUCCESS' },
      _sum: {
        platformFee: true,
        gstAmount: true,
        totalAmount: true,
      },
    });

    const revenueByService = await prisma.payment.groupBy({
      by: ['serviceType'],
      where: { status: 'SUCCESS' },
      _sum: {
        platformFee: true,
        totalAmount: true,
      },
    });

    res.json({
      stats: {
        totalUsers,
        totalRevenue: aggregations._sum.platformFee || 0,
        totalGST: aggregations._sum.gstAmount || 0,
        totalTransactionVolume: aggregations._sum.totalAmount || 0,
      },
      revenueByService,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await prisma.payment.findMany({
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getDashboardStats, getAllTransactions };
