"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, TrendingUp, DollarSign, Download, Filter, ShieldCheck } from 'lucide-react';
import api from '../../../services/api';

export default function AdminRevenuePage() {
  const [stats, setStats] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;
    
    if (!user || user.role !== 'ADMIN') {
      window.location.href = '/dashboard';
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch admin stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-8 text-gray-400">Loading revenue data...</div>;

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Revenue Analytics</h1>
          <p className="text-gray-400 mt-1">Real-time breakdown of platform profits and margins.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
            <Download size={18} /> Export CSV
          </button>
          <button className="btn-primary flex items-center gap-2 px-6 py-2">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <RevenueCard title="Net Profit" value={`₹${stats?.stats?.totalRevenue || 0}`} icon={DollarSign} color="text-green-400" />
        <RevenueCard title="GST Collected" value={`₹${stats?.stats?.totalGST || 0}`} icon={ShieldCheck} color="text-blue-400" />
        <RevenueCard title="Total Volume" value={`₹${stats?.stats?.totalTransactionVolume || 0}`} icon={TrendingUp} color="text-primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
            <PieChart size={20} className="text-primary" />
            Revenue by Service
          </h3>
          <div className="space-y-6">
            {stats?.revenueByService?.map((item) => (
              <div key={item.serviceType} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 uppercase font-bold tracking-wider">{item.serviceType}</span>
                  <span className="font-bold">₹{item._sum.platformFee || 0}</span>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(item._sum.platformFee / stats?.stats?.totalRevenue) * 100}%` }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 flex flex-col justify-center items-center text-center">
          <div className="w-20 h-20 bg-green-400/10 rounded-full flex items-center justify-center text-green-400 mb-6">
            <TrendingUp size={40} />
          </div>
          <h3 className="text-2xl font-bold mb-2">Growth Target</h3>
          <p className="text-gray-400 max-w-xs mx-auto mb-6">
            You are currently at **74%** of your monthly revenue goal. Push Rent and CC payments to maximize margins.
          </p>
          <button className="text-primary font-bold hover:underline">View Optimization Tips →</button>
        </div>
      </div>
    </div>
  );
}

function RevenueCard({ title, value, icon: Icon, color }) {
  return (
    <div className="glass-card p-8 relative overflow-hidden">
      <div className={`absolute -right-4 -bottom-4 opacity-5 ${color}`}>
        <Icon size={120} />
      </div>
      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">{title}</h4>
      <p className={`text-4xl font-black ${color}`}>{value}</p>
    </div>
  );
}

