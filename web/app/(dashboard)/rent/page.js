"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Landmark, ArrowRight, CheckCircle, Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import api from '../../../services/api';
import ActionGuard from '../../../components/ActionGuard';

const RentPage = () => {
  const [step, setStep] = useState(1);
  const [fees, setFees] = useState(null);
  const { register, handleSubmit, watch } = useForm();
  const amount = watch('amount');

  useEffect(() => {
    if (amount >= 1000) {
      const platformFee = amount * 0.0325;
      const gst = platformFee * 0.18;
      setFees({
        platformFee: platformFee.toFixed(2),
        gst: gst.toFixed(2),
        total: (parseFloat(amount) + platformFee + gst).toFixed(2),
      });
    } else {
      setFees(null);
    }
  }, [amount]);

  const onSubmit = async (data) => {
    if (step === 1) {
      setStep(2);
      return;
    }

    try {
      // 1. Create Order in Backend
      const res = await api.post('/rent/pay', {
        landlordId: data.landlordId || "placeholder-id", // In real app, user selects landlord
        amount: parseFloat(data.amount)
      });

      const { order } = res.data;

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "SuperApp Rent Pay",
        description: `Rent for ${data.landlordName}`,
        order_id: order.id,
        handler: async (response) => {
          // Verify payment success
          alert('Payment Successful! Transaction ID: ' + response.razorpay_payment_id);
          window.location.href = '/dashboard';
        },
        prefill: {
          name: data.landlordName,
          email: "user@example.com",
        },
        theme: {
          color: "#0052FF",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert(error.response?.data?.error || 'Payment initiation failed');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Pay Rent via Credit Card</h1>
        <p className="text-gray-400 mt-2">Earn rewards and manage your cashflow effectively.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 ? (
                <>
                  <div className="flex items-center gap-3 text-primary mb-2">
                    <Landmark size={20} />
                    <h2 className="font-semibold uppercase tracking-wider text-sm">Landlord Details</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Landlord Name</label>
                      <input 
                        {...register('landlordName', { required: true })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Account Number</label>
                      <input 
                        {...register('accountNo', { required: true })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors"
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Monthly Rent (₹)</label>
                    <input 
                      type="number"
                      {...register('amount', { required: true, min: 1000 })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-2xl font-bold outline-none focus:border-primary transition-colors"
                      placeholder="0.00"
                    />
                  </div>
                </>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={32} />
                  </div>
                  <h2 className="text-xl font-bold">Review Payment</h2>
                  <p className="text-gray-400">You are paying ₹{amount} to {watch('landlordName')}</p>
                  <div className="bg-white/5 rounded-xl p-4 text-left space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Account No</span>
                      <span>{watch('accountNo')}</span>
                    </div>
                  </div>
                </div>
              )}

              <ActionGuard>
                <button type="submit" className="w-full btn-primary py-4 mt-6 flex items-center justify-center gap-2">
                  {step === 1 ? 'Review Details' : `Pay ₹${fees?.total || '0.00'}`}
                  <ArrowRight size={20} />
                </button>
              </ActionGuard>
            </form>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6 border-primary/20 bg-primary/5"
          >
            <h3 className="font-bold flex items-center gap-2 mb-4">
              <Info size={18} className="text-primary" />
              Fee Breakdown
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Rent Amount</span>
                <span>₹{amount || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Platform Fee (3.25%)</span>
                <span className="text-accent">₹{fees?.platformFee || '0.00'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">GST on Fee (18%)</span>
                <span>₹{fees?.gst || '0.00'}</span>
              </div>
              <div className="h-px bg-white/10 my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-primary">₹{fees?.total || '0.00'}</span>
              </div>
            </div>
          </motion.div>

          <div className="glass-card p-6 space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Why pay via card?</h4>
            <div className="space-y-3">
              <BenefitItem text="Earn up to 2% cashback" />
              <BenefitItem text="45 days interest-free period" />
              <BenefitItem text="Improve your credit score" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BenefitItem = ({ text }) => (
  <div className="flex items-center gap-2 text-sm text-gray-300">
    <CheckCircle size={14} className="text-accent" />
    <span>{text}</span>
  </div>
);

export default RentPage;
