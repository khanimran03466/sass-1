"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Wallet, Shield, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark text-white overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      {/* Nav */}
      <nav className="container mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-bold text-xl">S</div>
          <span className="text-xl font-bold tracking-tight">SuperApp</span>
        </div>
        <Link href="/login">
          <button className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-all">
            Sign In
          </button>
        </Link>
      </nav>

      {/* Hero */}
      <main className="container mx-auto px-6 pt-20 pb-32 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20 mb-8 inline-block">
            NEW: PAY RENT VIA CREDIT CARD
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
            The Only Fintech <br /> 
            <span className="text-primary">Super App</span> You Need.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Pay rent, manage credit card bills, book flights, and earn rewards. 
            All in one place, designed for the modern earner.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/login">
              <button className="btn-primary px-10 py-5 text-lg flex items-center gap-2">
                Get Started Now <ArrowRight size={20} />
              </button>
            </Link>
            <button className="px-10 py-5 text-lg rounded-xl border border-white/10 hover:bg-white/5 transition-all">
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          <FeatureCard 
            icon={Wallet} 
            title="Rent Payments" 
            desc="Pay your monthly rent using any credit card and earn points." 
          />
          <FeatureCard 
            icon={Shield} 
            title="Bill Protection" 
            desc="Never miss a credit card or utility bill with smart reminders." 
          />
          <FeatureCard 
            icon={Zap} 
            title="Instant Rewards" 
            desc="Get cashback and partner rewards on every transaction." 
          />
        </div>
      </main>

      <footer className="container mx-auto px-6 py-12 border-t border-white/10 text-center text-gray-500 text-sm">
        © 2026 SuperApp Technologies. Build for the future.
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <div className="glass-card p-8 text-left hover:border-primary/50 transition-all cursor-default">
      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-primary mb-6">
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}
