"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, ArrowRight, Clock, Percent } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function CreditCardPage() {
  const { register, handleSubmit, watch } = useForm();
  const amount = watch('amount');
  const convenienceFee = amount ? (amount * 0.015).toFixed(2) : '0.00';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Credit Card Bill Payment</h1>
        <p className="text-gray-400 mt-2">Clear your dues instantly and improve your credit health.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8"
          >
            <form className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Card Number</label>
                  <input 
                    {...register('cardNumber')}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary"
                    placeholder="XXXX XXXX XXXX 1234"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Bank Name</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary">
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>SBI Card</option>
                      <option>Axis Bank</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Bill Amount (₹)</label>
                    <input 
                      type="number"
                      {...register('amount')}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary font-bold text-xl"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full btn-primary py-4 flex items-center justify-center gap-2">
                Proceed to Pay ₹{(parseFloat(amount || 0) + parseFloat(convenienceFee)).toFixed(2)}
                <ArrowRight size={20} />
              </button>
            </form>
          </motion.div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 border-accent/20 bg-accent/5">
            <h3 className="font-bold flex items-center gap-2 mb-4 text-accent">
              <Percent size={18} />
              Revenue Insights
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Convenience Fee (1.5%)</span>
                <span>₹{convenienceFee}</span>
              </div>
              <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                Platforms generate consistent revenue via convenience fees on high-ticket CC bill payments.
              </p>
            </div>
          </div>

          <div className="glass-card p-6 space-y-4">
            <h4 className="text-xs font-semibold uppercase text-gray-400">Benefits</h4>
            <div className="space-y-3 text-sm">
              <BenefitItem icon={ShieldCheck} text="Instant Settlement" />
              <BenefitItem icon={Clock} text="24/7 Processing" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BenefitItem({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3 text-gray-300">
      <Icon size={16} className="text-primary" />
      <span>{text}</span>
    </div>
  );
}
