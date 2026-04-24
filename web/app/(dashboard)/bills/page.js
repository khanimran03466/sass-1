"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Tv, Wifi, Droplets, ArrowRight } from 'lucide-react';

const billTypes = [
  { name: 'Electricity', icon: Zap, color: 'text-yellow-400' },
  { name: 'DTH', icon: Tv, color: 'text-red-400' },
  { name: 'Broadband', icon: Wifi, color: 'text-blue-400' },
  { name: 'Water', icon: Droplets, color: 'text-cyan-400' },
];

export default function BillsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Utility Bill Payments</h1>
        <p className="text-gray-400 mt-2">Pay all your utility bills securely and instantly.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {billTypes.map((bill) => (
          <motion.div 
            key={bill.name}
            whileHover={{ y: -5 }}
            className="glass-card p-6 flex flex-col items-center gap-4 cursor-pointer hover:border-primary transition-all"
          >
            <div className={`p-4 rounded-2xl bg-white/5 ${bill.color}`}>
              <bill.icon size={32} />
            </div>
            <span className="font-bold">{bill.name}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-yellow-400/20 text-yellow-400 rounded-xl flex items-center justify-center">
                <Zap size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Electricity Bill</h2>
                <p className="text-sm text-gray-500">Fast & Secure processing via BBPS</p>
              </div>
            </div>

            <form className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Select Board</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary">
                    <option>Tata Power - Mumbai</option>
                    <option>Adani Electricity</option>
                    <option>BEST - Mumbai</option>
                    <option>MSEDCL - Maharashtra</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Consumer Number</label>
                  <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary" placeholder="Enter your 12-digit consumer ID" />
                </div>
              </div>

              <button className="w-full btn-primary py-4 flex items-center justify-center gap-2">
                Fetch Bill Details <ArrowRight size={20} />
              </button>
            </form>
          </motion.div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-center items-center text-center space-y-4">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-primary">
            <ArrowRight size={32} />
          </div>
          <h3 className="text-lg font-bold">Convenience Fee</h3>
          <p className="text-sm text-gray-400">
            A flat convenience fee of **₹15.00** is applied to every utility bill payment.
          </p>
          <div className="text-3xl font-black text-primary">₹15.00</div>
          <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">Platform Profit</p>
        </div>
      </div>
    </div>
  );
}
