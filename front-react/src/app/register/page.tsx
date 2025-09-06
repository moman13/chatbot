'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    website: '',
    terms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.terms) {
      alert('Please accept the Terms & Conditions to continue.');
      return;
    }
    
    // Here you would typically send registration data to your backend
    console.log('Registration attempt:', formData);
    
    // For demo purposes, just show an alert
    alert('Account created successfully! Welcome to AqlBot! 🎉');
  };

  const handleGoogleSignUp = () => {
    // Here you would typically integrate with Google Sign-In
    console.log('Google Sign-Up clicked');
    alert('This is a demo. In a real app, this would use Google Sign-In for registration.');
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <>
      <Header />
      
      {/* Registration Form */}
      <section className="min-h-screen flex items-center justify-center py-12 px-6">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-2xl mb-6" style={{background: 'linear-gradient(135deg, #e5ff66, #d9ff2e)'}}></div>
            <h2 className="text-3xl font-bold text-white">Get Your Bot Now! 🚀</h2>
            <p className="mt-2 text-slate-300">Start your 14-day free trial</p>
          </div>
          
          {/* Google Registration Button */}
          <div className="space-y-4">
            <button 
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-gray-700 rounded-xl border border-gray-300 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900 text-slate-400">Or sign up with email</span>
              </div>
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <input 
                  id="name" 
                  name="name" 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                  placeholder="example@domain.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    formData.password.length > 0 
                      ? passwordStrength >= 4 
                        ? 'border-green-500' 
                        : passwordStrength >= 2 
                        ? 'border-yellow-500' 
                        : 'border-red-500'
                      : 'border-slate-600'
                  }`}
                  placeholder="Create a strong password"
                />
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-slate-300 mb-2">Website (Optional)</label>
                <input 
                  id="website" 
                  name="website" 
                  type="url" 
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input 
                id="terms" 
                name="terms" 
                type="checkbox" 
                required 
                checked={formData.terms}
                onChange={handleChange}
                className="h-4 w-4 text-primary bg-slate-800 border-slate-600 rounded focus:ring-primary"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-slate-300">
                I agree to the <a href="#" className="text-primary hover:underline">Terms & Conditions</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </label>
            </div>

            <div>
              <button type="submit" className="w-full btn-primary rounded-xl px-6 py-3 text-lg font-bold shadow-soft hover:scale-105 transition-transform">
                🎉 Start Free Trial Now
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-slate-400">
                Already have an account? 
                <Link href="/login" className="text-primary hover:underline font-medium ml-1">Sign in</Link>
              </p>
            </div>
          </form>

          {/* Features Preview */}
          <div className="mt-8 grid grid-cols-1 gap-4">
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <span className="text-slate-900">✨</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Instant Setup</h4>
                  <p className="text-sm text-slate-400">Your bot is ready in under 1 minute</p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <span className="text-slate-900">🎯</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Advanced AI</h4>
                  <p className="text-sm text-slate-400">Powered by OpenAI for smart responses</p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <span className="text-slate-900">📊</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Detailed Analytics</h4>
                  <p className="text-sm text-slate-400">Monitor bot performance and user engagement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


