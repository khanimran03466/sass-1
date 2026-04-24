"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Hotel, Star, MapPin, Calendar, Users } from 'lucide-react';

const mockHotels = [
  { id: 1, name: 'The Grand Regency', location: 'Worli, Mumbai', price: 8500, rating: 4.8 },
  { id: 2, name: 'Ocean View Suites', location: 'Juhu, Mumbai', price: 12000, rating: 4.9 },
  { id: 3, name: 'Urban Comfort Inn', location: 'Andheri, Mumbai', price: 4200, rating: 4.2 },
];

export default function HotelsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Luxury Hotels</h1>
        <p className="text-gray-400 mt-2">Book premium stays with exclusive platform discounts.</p>
      </div>

      <div className="glass-card p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Destination</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 outline-none" placeholder="Mumbai, MH" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Stay Dates</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 outline-none" placeholder="28 Apr - 30 Apr" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Guests</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 outline-none" placeholder="2 Adults, 1 Room" />
          </div>
        </div>
        <button className="btn-primary py-3">Search Stays</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockHotels.map((hotel) => (
          <motion.div 
            key={hotel.id}
            whileHover={{ y: -10 }}
            className="glass-card overflow-hidden group"
          >
            <div className="h-48 bg-white/5 relative flex items-center justify-center">
              <Hotel size={64} className="text-white/10 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                {hotel.rating}
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-bold">{hotel.name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin size={12} /> {hotel.location}
                </p>
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-white/5">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Per Night</p>
                  <p className="text-2xl font-black text-primary">₹{(hotel.price * 1.15).toLocaleString()}</p>
                </div>
                <button className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold text-sm hover:bg-primary hover:text-white transition-all">
                  View Deal
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
