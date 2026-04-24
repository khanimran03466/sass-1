"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import api from '../../services/api';
import GoogleLogin from '../../components/GoogleLogin';

const LoginPage = ({ isModal = false }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      if (isModal) {
        window.location.reload();
      } else {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <motion.div 
      initial={isModal ? {} : { opacity: 0, scale: 0.9 }}
      animate={isModal ? {} : { opacity: 1, scale: 1 }}
      className={`w-full ${isModal ? '' : 'max-w-md'} z-10`}
    >
      <div className={`${isModal ? 'bg-transparent' : 'glass-card'} p-10 space-y-8`}>
        <div className="text-center space-y-2">
          {!isModal && (
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 rotate-12 shadow-lg shadow-primary/20">
              <span className="text-2xl font-bold text-white">S</span>
            </div>
          )}
          <h1 className="text-3xl font-bold tracking-tight">
            {isModal ? 'Sign In to Continue' : 'Welcome Back'}
          </h1>
          <p className="text-gray-400">
            {isModal ? 'You need an account to perform this action.' : 'Login to your SuperApp dashboard'}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-medium text-gray-400">Password</label>
              <button type="button" className="text-xs text-primary font-semibold hover:underline">Forgot?</button>
            </div>
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

          <button type="submit" className="w-full btn-primary py-4 mt-4 flex items-center justify-center gap-2">
            {loading ? 'Signing In...' : 'Sign In'}
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
          Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Create one</Link>
        </div>
      </div>
    </motion.div>
  );

  return isModal ? (
    content
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-dark p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
      {content}
    </div>
  );
};

export default LoginPage;
