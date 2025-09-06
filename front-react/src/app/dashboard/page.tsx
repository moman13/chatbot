'use client';

import { useState, useEffect } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import OverviewSection from '@/components/dashboard/OverviewSection';
import NewUserSection from '@/components/dashboard/NewUserSection';

interface User {
  name: string;
  email: string;
  plan: string;
  isNewUser: boolean;
}

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showViewToggle, setShowViewToggle] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // In a real app, you would check for authentication token
      const token = 2222;//localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      // Simulate API call - in reality, you'd fetch from your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo user data
      const userData: User = {
        name: 'John Doe',
        email: 'john@example.com',
        plan: 'Pro Plan',
        isNewUser: true, // Set to true to show new user experience
      };

      setUser(userData);
      
      // Determine initial section based on user status
      if (userData.isNewUser) {
        setActiveSection('new-user');
        setShowViewToggle(true);
      } else {
        setActiveSection('overview');
        setShowViewToggle(false);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to load user data:', error);
      setLoading(false);
      // Redirect to login on error
      window.location.href = '/login';
    }
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    updatePageHeader(section);
  };

  const updatePageHeader = (section: string) => {
    // This would typically update the page title and subtitle
    // For now, we'll handle this in the individual section components
  };

  const toggleView = () => {
    if (activeSection === 'new-user') {
      setActiveSection('overview');
    } else {
      setActiveSection('new-user');
    }
  };

  const getPageTitle = () => {
    const titles: { [key: string]: string } = {
      overview: 'Overview',
      'new-user': 'Welcome to AqlBot!',
      chatbots: 'My Chatbots',
      analytics: 'Analytics',
      knowledge: 'Knowledge Base',
      settings: 'Settings',
      billing: 'Billing',
    };
    return titles[activeSection] || 'Dashboard';
  };

  const getPageSubtitle = () => {
    const subtitles: { [key: string]: string } = {
      overview: 'Welcome back! Here\'s what\'s happening with your chatbots.',
      'new-user': 'Let\'s get your first chatbot up and running in minutes',
      chatbots: 'Manage and configure your chatbots',
      analytics: 'Performance insights and metrics',
      knowledge: 'Manage your chatbot\'s training data',
      settings: 'Configure your account and preferences',
      billing: 'Manage your subscription and usage',
    };
    return subtitles[activeSection] || 'Dashboard';
  };

  if (loading) {
    return (
      <div className="h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4" style={{background: 'linear-gradient(135deg, #e5ff66, #d9ff2e)'}}></div>
          <p className="text-xl font-semibold">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'new-user':
        return <NewUserSection onSectionChange={handleSectionChange} />;
      case 'chatbots':
        return (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">My Chatbots</h3>
            <p className="text-slate-400">Chatbots management section coming soon...</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Analytics</h3>
            <p className="text-slate-400">Analytics section coming soon...</p>
          </div>
        );
      case 'knowledge':
        return (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Knowledge Base</h3>
            <p className="text-slate-400">Knowledge base management section coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Settings</h3>
            <p className="text-slate-400">Settings section coming soon...</p>
          </div>
        );
      case 'billing':
        return (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Billing</h3>
            <p className="text-slate-400">Billing section coming soon...</p>
          </div>
        );
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900">
      <DashboardSidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        user={user}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{getPageTitle()}</h2>
              <p className="text-sm text-slate-400">{getPageSubtitle()}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-xl border border-slate-600 text-white hover:bg-slate-700 transition-all">
                📄 Documentation
              </button>
              {showViewToggle && (
                <button
                  onClick={toggleView}
                  className="px-4 py-2 rounded-xl border border-slate-600 text-white hover:bg-slate-700 transition-all"
                >
                  👁️ Switch View
                </button>
              )}
              <button className="btn-primary px-4 py-2 rounded-xl font-medium hover:scale-105 transition-transform">
                ➕ New Chatbot
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-slate-900">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}
