"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  ArrowUpRight,
  Plus
} from 'lucide-react';
import api from '../../../services/api';

const DashboardPage = () => {
  const [stats, setStats] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));

    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/stats');
        setStats(res.data.stats);
      } catch (err) {
        console.error('Failed to fetch stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
      />
    </div>
  );

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'User'}</h1>
          <p className="text-gray-400 mt-1">Here's what's happening with your revenue today.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          New Transaction
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Volume" 
          value={`₹${(stats?.totalTransactionVolume || 0).toLocaleString()}`} 
          change="+12.5%" 
          icon={TrendingUp} 
          color="text-primary" 
        />
        <StatCard 
          title="Platform Fees" 
          value={`₹${(stats?.totalRevenue || 0).toLocaleString()}`} 
          change="+18.2%" 
          icon={CreditCard} 
          color="text-accent" 
        />
        <StatCard 
          title="Active Users" 
          value={stats?.totalUsers || 0} 
          change="+5.4%" 
          icon={Users} 
          color="text-blue-400" 
        />
        <StatCard 
          title="Success Rate" 
          value="98.2%" 
          change="+0.5%" 
          icon={ArrowUpRight} 
          color="text-green-400" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Recent Transactions</h3>
            <button className="text-primary text-sm font-semibold">View All</button>
          </div>
          <div className="space-y-4">
            <TransactionItem name="Rent Payment - Flat 402" amount="45,000" status="Success" date="2 mins ago" />
            <TransactionItem name="CC Bill - SBI Card" amount="12,400" status="Processing" date="15 mins ago" />
            <TransactionItem name="Flight - DEL to BOM" amount="6,500" status="Success" date="1 hour ago" />
            <TransactionItem name="Mobile Recharge" amount="499" status="Success" date="3 hours ago" />
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-bold text-lg mb-6">Revenue by Service</h3>
          <div className="space-y-6">
            <ServiceProgress name="Rent" percentage={65} color="bg-primary" />
            <ServiceProgress name="Credit Card" percentage={15} color="bg-accent" />
            <ServiceProgress name="Flights" percentage={12} color="bg-blue-400" />
            <ServiceProgress name="Others" percentage={8} color="bg-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card p-6"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
        <Icon size={24} />
      </div>
      <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
        {change}
      </span>
    </div>
    <h4 className="text-gray-400 text-sm font-medium">{title}</h4>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </motion.div>
);

const TransactionItem = ({ name, amount, status, date }) => (
  <div className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold">
        {name[0]}
      </div>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-bold text-primary">₹{amount}</p>
      <p className={`text-[10px] font-bold uppercase tracking-wider ${status === 'Success' ? 'text-green-400' : 'text-yellow-400'}`}>
        {status}
      </p>
    </div>
  </div>
);

const ServiceProgress = ({ name, percentage, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">{name}</span>
      <span className="font-bold">{percentage}%</span>
    </div>
    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full ${color}`}
      />
    </div>
  </div>
);

export default DashboardPage;
