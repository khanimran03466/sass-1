"use client";
import React, { useEffect, useRef } from 'react';
import api from '../services/api';

const GoogleLogin = ({ onSuccess }) => {
  const googleButtonRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.google) return;

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: async (response) => {
        try {
          const res = await api.post('/auth/google-login', {
            token: response.credential,
          });
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          window.location.href = '/dashboard';
        } catch (err) {
          console.error('Google login failed', err);
        }
      },
    });

    window.google.accounts.id.renderButton(googleButtonRef.current, {
      theme: 'outline',
      size: 'large',
      width: '100%',
      text: 'continue_with',
      shape: 'rectangular',
    });
  }, []);

  return <div ref={googleButtonRef} className="w-full"></div>;
};

export default GoogleLogin;
