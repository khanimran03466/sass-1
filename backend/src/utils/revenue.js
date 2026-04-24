/**
 * Centralized Revenue Calculation Utility
 */

const REVENUE_CONFIG = {
  RENT: {
    PLATFORM_FEE_PERCENT: 3.25,
    GST_PERCENT: 18, // GST on the platform fee, not the total amount
  },
  CREDIT_CARD: {
    CONVENIENCE_FEE_PERCENT: 1.5,
  },
  FLIGHT: {
    MARKUP_PERCENT: 5,
    SERVICE_FEE_FIXED: 250,
  },
  HOTEL: {
    COMMISSION_PERCENT: 10,
    MARKUP_PERCENT: 5,
  },
  RECHARGE: {
    COMMISSION_PERCENT: 2.5,
  },
  UTILITY_BILLS: {
    CONVENIENCE_FEE_FIXED: 15,
  },
};

const calculateRentFees = (baseAmount) => {
  const platformFee = (baseAmount * REVENUE_CONFIG.RENT.PLATFORM_FEE_PERCENT) / 100;
  const gstAmount = (platformFee * REVENUE_CONFIG.RENT.GST_PERCENT) / 100;
  const totalAmount = baseAmount + platformFee + gstAmount;

  return {
    baseAmount,
    platformFee: Number(platformFee.toFixed(2)),
    gstAmount: Number(gstAmount.toFixed(2)),
    totalAmount: Number(totalAmount.toFixed(2)),
  };
};

const calculateFlightFees = (basePrice) => {
  const markup = (basePrice * REVENUE_CONFIG.FLIGHT.MARKUP_PERCENT) / 100;
  const serviceFee = REVENUE_CONFIG.FLIGHT.SERVICE_FEE_FIXED;
  const total = basePrice + markup + serviceFee;

  return {
    basePrice,
    markup: Number(markup.toFixed(2)),
    serviceFee,
    totalPrice: Number(total.toFixed(2)),
  };
};

const calculateHotelFees = (basePrice) => {
  const commission = (basePrice * REVENUE_CONFIG.HOTEL.COMMISSION_PERCENT) / 100;
  const markup = (basePrice * REVENUE_CONFIG.HOTEL.MARKUP_PERCENT) / 100;
  const total = basePrice + markup; // Commission is usually deducted from hotel, markup is added to user

  return {
    basePrice,
    commission: Number(commission.toFixed(2)),
    markup: Number(markup.toFixed(2)),
    totalPrice: Number(total.toFixed(2)),
  };
};

const calculateRechargeCommission = (planAmount) => {
  const commission = (planAmount * REVENUE_CONFIG.RECHARGE.COMMISSION_PERCENT) / 100;
  return {
    planAmount,
    commission: Number(commission.toFixed(2)),
  };
};

const calculateUtilityFees = (amount) => {
  const convenienceFee = REVENUE_CONFIG.UTILITY_BILLS.CONVENIENCE_FEE_FIXED;
  return {
    amount,
    convenienceFee,
    totalAmount: amount + convenienceFee,
  };
};

module.exports = {
  calculateRentFees,
  calculateFlightFees,
  calculateHotelFees,
  calculateRechargeCommission,
  calculateUtilityFees,
  REVENUE_CONFIG,
};
