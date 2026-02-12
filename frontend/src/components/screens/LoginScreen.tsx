import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Phone, Mail, Lock, ArrowRight, Shield, User, Briefcase, UserCog } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [userType, setUserType] = useState<'citizen' | 'cleaner' | 'admin'>('citizen');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleAuth = () => {
    // Set user data
    setUser({
      id: '1',
      name: name || 'Demo User',
      email: email || 'demo@cleanmap.gov',
      phone: phone || '+91 98765 43210',
      role: userType,
      credits: 250
    });

    // Navigate based on user type
    if (userType === 'citizen') {
      navigate('/citizen/dashboard');
    } else if (userType === 'cleaner') {
      navigate('/cleaner/dashboard');
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 pt-12 pb-6 px-6 shadow-md">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center border-2 border-white/30">
              <Shield className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <h1 className="text-white text-xl font-bold">Welcome Back</h1>
          </div>
          <p className="text-blue-100 text-xs">Sign in to continue to CleanMap</p>
        </motion.div>
      </div>

      {/* Login Form */}
      <div className="flex-1 px-6 py-8 bg-blue-50">
        {/* Sign In / Sign Up Toggle */}
        <div className="flex bg-white rounded-xl p-1 mb-6 border-2 border-blue-200 shadow-sm">
          <button
            onClick={() => setAuthMode('signin')}
            className={`flex-1 py-3 rounded-lg font-bold transition-colors ${
              authMode === 'signin'
                ? 'bg-blue-600 text-white'
                : 'text-blue-600'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-3 rounded-lg font-bold transition-colors ${
              authMode === 'signup'
                ? 'bg-blue-600 text-white'
                : 'text-blue-600'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* User Type Selection */}
        <div className="mb-6">
          <label className="block text-blue-900 font-bold mb-3">
            I am a
          </label>
          <div className="space-y-3">
            <label className="flex items-center p-4 bg-white border-2 border-blue-200 rounded-xl cursor-pointer hover:border-blue-400 transition-colors">
              <input
                type="radio"
                name="userType"
                value="citizen"
                checked={userType === 'citizen'}
                onChange={(e) => setUserType(e.target.value as 'citizen' | 'cleaner' | 'admin')}
                className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <User className="w-5 h-5 text-blue-600 mx-3" />
              <div className="flex-1">
                <span className="text-blue-900 font-semibold">Citizen</span>
                <p className="text-blue-600 text-xs">Report waste and track cleanliness</p>
              </div>
            </label>
            <label className="flex items-center p-4 bg-white border-2 border-blue-200 rounded-xl cursor-pointer hover:border-blue-400 transition-colors">
              <input
                type="radio"
                name="userType"
                value="cleaner"
                checked={userType === 'cleaner'}
                onChange={(e) => setUserType(e.target.value as 'citizen' | 'cleaner' | 'admin')}
                className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <Briefcase className="w-5 h-5 text-blue-600 mx-3" />
              <div className="flex-1">
                <span className="text-blue-900 font-semibold">Cleaning Staff</span>
                <p className="text-blue-600 text-xs">Manage and complete assigned tasks</p>
              </div>
            </label>
            <label className="flex items-center p-4 bg-white border-2 border-blue-200 rounded-xl cursor-pointer hover:border-blue-400 transition-colors">
              <input
                type="radio"
                name="userType"
                value="admin"
                checked={userType === 'admin'}
                onChange={(e) => setUserType(e.target.value as 'citizen' | 'cleaner' | 'admin')}
                className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <UserCog className="w-5 h-5 text-blue-600 mx-3" />
              <div className="flex-1">
                <span className="text-blue-900 font-semibold">Government Admin</span>
                <p className="text-blue-600 text-xs">Monitor and manage the system</p>
              </div>
            </label>
          </div>
        </div>

        {/* Name field for Sign Up */}
        {authMode === 'signup' && (
          <div className="mb-5">
            <label className="block text-blue-900 font-semibold mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full pl-12 pr-4 py-4 border-2 border-blue-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
              />
            </div>
          </div>
        )}
        
        {/* Toggle Login Method */}
        <div className="flex bg-white rounded-xl p-1 mb-6 border-2 border-blue-200">
          <button
            onClick={() => setLoginMethod('phone')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              loginMethod === 'phone'
                ? 'bg-blue-600 text-white'
                : 'text-blue-600'
            }`}
          >
            <Phone className="w-5 h-5 inline mr-2" />
            Phone
          </button>
          <button
            onClick={() => setLoginMethod('email')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              loginMethod === 'email'
                ? 'bg-blue-600 text-white'
                : 'text-blue-600'
            }`}
          >
            <Mail className="w-5 h-5 inline mr-2" />
            Email
          </button>
        </div>

        {/* Phone Login */}
        {loginMethod === 'phone' && (
          <div className="space-y-5">
            <div>
              <label className="block text-blue-900 font-semibold mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full pl-12 pr-4 py-4 border-2 border-blue-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
                />
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-blue-100 border-2 border-blue-300 rounded-xl">
              <Shield className="w-5 h-5 text-blue-700 mt-0.5" />
              <p className="text-blue-800 text-sm font-medium">
                We'll send you a secure OTP to verify your number
              </p>
            </div>
          </div>
        )}

        {/* Email Login */}
        {loginMethod === 'email' && (
          <div className="space-y-5">
            <div>
              <label className="block text-blue-900 font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 border-2 border-blue-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-blue-900 font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-4 border-2 border-blue-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Login Button */}
        <button
          onClick={handleAuth}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold mt-6 hover:bg-blue-700 transition-colors shadow-md"
        >
          {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
          <ArrowRight className="w-5 h-5 inline ml-2" />
        </button>

        {/* Toggle Sign In / Sign Up Link */}
        <div className="mt-4 text-center">
          {authMode === 'signin' ? (
            <p className="text-blue-700 text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => setAuthMode('signup')}
                className="text-blue-600 font-bold hover:text-blue-800 underline"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p className="text-blue-700 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => setAuthMode('signin')}
                className="text-blue-600 font-bold hover:text-blue-800 underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}