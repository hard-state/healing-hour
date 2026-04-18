'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Points to the new backend API
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Set authentication in localStorage
        localStorage.setItem('isAdminAuthenticated', 'true');
        localStorage.setItem('adminLoginTime', Date.now().toString());
        localStorage.setItem('adminUsername', data.username);
        
        // Show success state
        setIsSuccess(true);
        
        // Redirect to dashboard
        setTimeout(() => {
          window.location.href = '/admin';
        }, 1000);
      } else {
        setError(data.message || 'Invalid username or password');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Connection to server failed. Make sure backend is running.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-cream via-amber-50 to-yellow-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-soft-gold/20">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-elegant font-bold text-matte-black mb-2">
              Admin Login
            </h1>
            <p className="text-charcoal">
              Healthy Massage Therapy Dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-matte-black mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-soft-gold/30 rounded-lg focus:ring-2 focus:ring-soft-gold/50 focus:border-soft-gold transition-all duration-300 bg-white/50 backdrop-blur-sm"
                placeholder="Enter username"
                required
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-matte-black mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-soft-gold/30 rounded-lg focus:ring-2 focus:ring-soft-gold/50 focus:border-soft-gold transition-all duration-300 bg-white/50 backdrop-blur-sm"
                placeholder="Enter password"
                required
                autoComplete="current-password"
              />
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading || isSuccess}
              className={`w-full px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                isSuccess 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                  : 'bg-gradient-to-r from-soft-gold to-yellow-400 text-matte-black'
              }`}
              whileHover={{ scale: (isLoading || isSuccess) ? 1 : 1.02 }}
              whileTap={{ scale: (isLoading || isSuccess) ? 1 : 0.98 }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-matte-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : isSuccess ? (
                <span className="flex items-center justify-center">
                  <svg className="-ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path className="opacity-75" fill="currentColor" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Success! Redirecting...
                </span>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-charcoal">
              Protected admin area
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
