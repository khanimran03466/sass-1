"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Search, ArrowRight, MapPin, Calendar } from 'lucide-react';

const mockFlights = [
  { id: 1, airline: 'IndiGo', from: 'DEL', to: 'BOM', price: 5400, time: '06:00 - 08:15' },
  { id: 2, airline: 'Air India', from: 'DEL', to: 'BOM', price: 6200, time: '10:30 - 12:45' },
  { id: 3, airline: 'Vistara', from: 'DEL', to: 'BOM', price: 7100, time: '14:00 - 16:15' },
];

export default function FlightsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Book Flights</h1>
        <p className="text-gray-400 mt-2">Search and book the best fares with hidden savings.</p>
      </div>

      {/* Search Bar */}
      <div className="glass-card p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <SearchInput label="From" icon={MapPin} placeholder="Delhi (DEL)" />
        <SearchInput label="To" icon={MapPin} placeholder="Mumbai (BOM)" />
        <SearchInput label="Date" icon={Calendar} placeholder="25 Apr, 2026" />
        <button className="btn-primary py-3 flex items-center justify-center gap-2">
          <Search size={20} /> Search Flights
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-bold uppercase text-gray-400 tracking-wider">Available Flights</h2>
          {mockFlights.map((flight) => (
            <motion.div 
              key={flight.id}
              whileHover={{ scale: 1.01 }}
              className="glass-card p-6 flex flex-col md:flex-row justify-between items-center gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                  <Plane size={24} className="text-primary rotate-45" />
                </div>
                <div>
                  <p className="font-bold text-lg">{flight.airline}</p>
                  <p className="text-sm text-gray-500">{flight.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-12 text-center">
                <div>
                  <p className="text-xl font-bold">{flight.from}</p>
                  <p className="text-xs text-gray-500">New Delhi</p>
                </div>
                <div className="text-gray-600">→</div>
                <div>
                  <p className="text-xl font-bold">{flight.to}</p>
                  <p className="text-xs text-gray-500">Mumbai</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-black text-accent">₹{(flight.price + 750).toLocaleString()}</p>
                <p className="text-[10px] text-gray-500 italic">Includes convenience fee</p>
                <button className="mt-2 text-primary font-bold flex items-center gap-1 text-sm">
                  Book Now <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 bg-primary/5 border-primary/20">
            <h3 className="font-bold mb-4">Revenue Engine</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Fixed Markup</span>
                <span className="text-green-400">₹500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Convenience Fee</span>
                <span className="text-green-400">₹250</span>
              </div>
              <div className="h-px bg-white/10 my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Net Profit/Seat</span>
                <span className="text-primary">₹750</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchInput({ label, icon: Icon, placeholder }) {
  return (
    <div className="space-y-2 text-left">
      <label className="text-xs font-bold text-gray-500 uppercase ml-1">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
        <input 
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-primary transition-all"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
