'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  user: {
    name: string;
    plan: string;
  } | null;
}

const navigationItems = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'chatbots', label: 'My Chatbots', icon: '🤖' },
  { id: 'analytics', label: 'Analytics', icon: '📈' },
  { id: 'knowledge', label: 'Knowledge Base', icon: '📚' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
  { id: 'billing', label: 'Billing', icon: '💳' },
];

export default function DashboardSidebar({ activeSection, onSectionChange, user }: SidebarProps) {
  const handleLogout = () => {
    // In a real app, this would clear tokens and redirect
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl" style={{background: 'linear-gradient(135deg, #e5ff66, #d9ff2e)'}}></div>
          <div>
            <h1 className="font-display text-xl font-bold">AqlBot</h1>
            <p className="text-xs text-slate-400">Dashboard</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`nav-item w-full text-left ${activeSection === item.id ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-700">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-lime-400"></div>
          <div className="flex-1">
            <p className="font-medium">{user?.name || 'Loading...'}</p>
            <p className="text-xs text-slate-400">{user?.plan || 'Loading...'}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-white transition-colors"
            title="Logout"
          >
            <span>🚪</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
