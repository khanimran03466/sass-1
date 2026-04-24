"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import api from '../../services/api';
import GoogleLogin from '../../components/GoogleLogin';

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/register', data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.location.href = '/dashboard';
    } catch (error) {
      alert(error.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md z-10"
      >
        <div className="glass-card p-10 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
            <p className="text-gray-400">Join the next generation super app</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  {...register('name', { required: true })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-primary transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="email"
                  {...register('email', { required: true })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-primary transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="password"
                  {...register('password', { required: true })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-primary transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button type="submit" className="w-full btn-primary py-4 mt-4 flex items-center justify-center gap-2" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-dark px-2 text-gray-500 font-bold">Or continue with</span>
            </div>
          </div>

          <GoogleLogin />

          <div className="text-center text-sm text-gray-500 pt-4">
            Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Sign In</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
