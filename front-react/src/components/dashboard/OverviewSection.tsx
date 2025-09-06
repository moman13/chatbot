'use client';

import StatCard from '@/components/StatCard';
import ChatbotCard from '@/components/ChatbotCard';

export default function OverviewSection() {
  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Messages"
          value="12,847"
          change="↗ +23% from last week"
          changeType="positive"
          icon="💬"
          iconBg="bg-blue-500/20"
        />
        <StatCard
          title="Active Users"
          value="2,341"
          change="↗ +12% from last week"
          changeType="positive"
          icon="👥"
          iconBg="bg-green-500/20"
        />
        <StatCard
          title="Response Rate"
          value="94.2%"
          change="↗ +2% from last week"
          changeType="positive"
          icon="⚡"
          iconBg="bg-primary/20"
        />
        <StatCard
          title="Avg Response Time"
          value="0.8s"
          change="↗ Improved by 0.2s"
          changeType="positive"
          icon="⏱️"
          iconBg="bg-purple-500/20"
        />
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="dashboard-card">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 text-sm">✅</span>
              </div>
              <div className="flex-1">
                <p className="font-medium">Support Bot responded to 23 new queries</p>
                <p className="text-xs text-slate-400">2 minutes ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 text-sm">📊</span>
              </div>
              <div className="flex-1">
                <p className="font-medium">New knowledge base article added</p>
                <p className="text-xs text-slate-400">1 hour ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-slate-900 text-sm">🚀</span>
              </div>
              <div className="flex-1">
                <p className="font-medium">Sales Bot deployment successful</p>
                <p className="text-xs text-slate-400">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 rounded-xl border border-slate-600 hover:border-primary transition-all text-center">
              <div className="text-2xl mb-2">🤖</div>
              <p className="font-medium">Create Bot</p>
              <p className="text-xs text-slate-400">New chatbot</p>
            </button>

            <button className="p-4 rounded-xl border border-slate-600 hover:border-primary transition-all text-center">
              <div className="text-2xl mb-2">📚</div>
              <p className="font-medium">Add Knowledge</p>
              <p className="text-xs text-slate-400">Upload docs</p>
            </button>

            <button className="p-4 rounded-xl border border-slate-600 hover:border-primary transition-all text-center">
              <div className="text-2xl mb-2">📊</div>
              <p className="font-medium">View Analytics</p>
              <p className="text-xs text-slate-400">Performance</p>
            </button>

            <button className="p-4 rounded-xl border border-slate-600 hover:border-primary transition-all text-center">
              <div className="text-2xl mb-2">⚙️</div>
              <p className="font-medium">Settings</p>
              <p className="text-xs text-slate-400">Configure</p>
            </button>
          </div>
        </div>
      </div>

      {/* Active Chatbots */}
      <div className="dashboard-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Your Chatbots</h3>
          <button className="text-primary hover:underline text-sm">View All</button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ChatbotCard
            name="Support Bot"
            description="Customer support chatbot for main website"
            status="active"
            messagesToday={1247}
            uptime="98% uptime"
            iconBg="bg-blue-500/20"
          />
          <ChatbotCard
            name="Sales Bot"
            description="Lead generation and sales inquiries"
            status="active"
            messagesToday={342}
            uptime="96% uptime"
            iconBg="bg-green-500/20"
          />
          <ChatbotCard
            name="FAQ Bot"
            description="Frequently asked questions handler"
            status="paused"
            messagesToday={0}
            uptime="--"
            iconBg="bg-orange-500/20"
          />
        </div>
      </div>
    </div>
  );
}
