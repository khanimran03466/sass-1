"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginPage from '../app/login/page';
import { X } from 'lucide-react';

export default function ActionGuard({ children }) {
  const [showModal, setShowModal] = useState(false);

  const handleAction = (e) => {
    const token = localStorage.getItem('token');
    if (!token) {
      e.preventDefault();
      e.stopPropagation();
      setShowModal(true);
    }
  };

  return (
    <>
      <div onClickCapture={handleAction}>
        {children}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-dark rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 z-50 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
              
              <div className="max-h-[90vh] overflow-y-auto custom-scrollbar">
                <LoginPage isModal={true} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
