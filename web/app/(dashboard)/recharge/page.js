"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Zap, Wifi, Tv, ArrowRight } from 'lucide-react';

export default function RechargePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Mobile Recharge</h1>
        <p className="text-gray-400 mt-2">Instant top-ups for all major operators with cashback.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Mobile Number</label>
                  <div className="relative">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-primary" placeholder="Enter 10 digit number" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Operator</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary">
                    <option>Jio Prepaid</option>
                    <option>Airtel Prepaid</option>
                    <option>Vi Prepaid</option>
                    <option>BSNL Prepaid</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase text-gray-500">Popular Plans</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <PlanCard price="299" validity="28 Days" data="1.5GB/Day" />
                  <PlanCard price="666" validity="84 Days" data="1.5GB/Day" />
                </div>
              </div>

              <button className="w-full btn-primary py-4 flex items-center justify-center gap-2">
                Recharge Now <ArrowRight size={20} />
              </button>
            </form>
          </motion.div>
        </div>

        <div className="glass-card p-6 h-fit bg-accent/5 border-accent/20">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Zap size={18} className="text-accent" />
            Revenue Model
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Earn **2.5% fixed commission** on every successful recharge transaction. High volume, zero risk.
          </p>
          <div className="p-4 bg-white/5 rounded-xl text-center">
            <p className="text-xs text-gray-500 uppercase font-bold">Estimated Profit/Recharge</p>
            <p className="text-2xl font-black text-accent">₹15.50</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlanCard({ price, validity, data }) {
  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-primary transition-all cursor-pointer group">
      <div className="flex justify-between items-start mb-2">
        <p className="text-2xl font-bold">₹{price}</p>
        <div className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Best Value</div>
      </div>
      <div className="flex gap-4 text-xs text-gray-400">
        <span>{validity}</span>
        <span>•</span>
        <span>{data}</span>
      </div>
    </div>
  );
}
