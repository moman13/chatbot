'use client';

import { useState } from 'react';

interface NewUserSectionProps {
  onSectionChange: (section: string) => void;
}

export default function NewUserSection({ onSectionChange }: NewUserSectionProps) {
  const [apiKey] = useState(() => {
    // Generate a demo API key
    const randomPart = Math.random().toString(36).substring(2, 15);
    return `ak_live_${randomPart}_${Math.random().toString(36).substring(2, 15)}`;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy to clipboard');
    });
  };

  const regenerateApiKey = () => {
    if (confirm('Are you sure you want to regenerate your API key? This will invalidate the current key.')) {
      alert('API key regenerated successfully!');
      // In a real app, you would update the API key here
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto rounded-3xl mb-4" style={{background: 'linear-gradient(135deg, #e5ff66, #d9ff2e)'}}></div>
        <h2 className="text-3xl font-bold mb-2">Welcome to AqlBot! 🎉</h2>
        <p className="text-slate-400 text-lg">Let&apos;s get your first chatbot up and running in minutes</p>
      </div>

      {/* Quick Start Guide */}
      <div className="dashboard-card">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          Quick Start - Embed Your Chatbot
        </h3>
        
        {/* Step 1: CDN Integration */}
        <div className="space-y-6">
          <div className="border-l-4 border-primary pl-6">
            <h4 className="font-semibold text-lg mb-3">Step 1: Add the CDN Script</h4>
            <p className="text-slate-400 mb-4">Copy and paste this script tag into your website&apos;s HTML:</p>
            <div className="bg-slate-800 rounded-xl p-4 relative">
              <pre className="text-sm text-green-400 overflow-x-auto">
                <code>{`<script src="https://cdn.aqlbot.com/widget/v1/aqlbot.min.js"></script>`}</code>
              </pre>
              <button 
                onClick={() => copyToClipboard('<script src="https://cdn.aqlbot.com/widget/v1/aqlbot.min.js"></script>')}
                className="absolute top-2 right-2 px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs transition-colors"
              >
                📋 Copy
              </button>
            </div>
          </div>

          {/* Step 2: Initialize Chatbot */}
          <div className="border-l-4 border-blue-500 pl-6">
            <h4 className="font-semibold text-lg mb-3">Step 2: Initialize Your Chatbot</h4>
            <p className="text-slate-400 mb-4">Add this code to initialize your chatbot with your API key:</p>
            <div className="bg-slate-800 rounded-xl p-4 relative">
              <pre className="text-sm text-blue-400 overflow-x-auto">
                <code>{`<script>
  AqlBot.init({
    apiKey: '${apiKey}',
    theme: 'dark',
    position: 'bottom-right',
    greeting: 'Hi! How can I help you today?'
  });
</script>`}</code>
              </pre>
              <button 
                onClick={() => copyToClipboard(`<script>
  AqlBot.init({
    apiKey: '${apiKey}',
    theme: 'dark',
    position: 'bottom-right',
    greeting: 'Hi! How can I help you today?'
  });
</script>`)}
                className="absolute top-2 right-2 px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs transition-colors"
              >
                📋 Copy
              </button>
            </div>
          </div>

          {/* API Key Display */}
          <div className="border-l-4 border-green-500 pl-6">
            <h4 className="font-semibold text-lg mb-3">Your API Key</h4>
            <div className="bg-slate-800 rounded-xl p-4 flex items-center gap-3">
              <div className="flex-1">
                <input 
                  type="text" 
                  value={apiKey} 
                  readOnly 
                  className="w-full bg-transparent border-none text-primary font-mono text-sm focus:outline-none"
                />
              </div>
              <button 
                onClick={() => copyToClipboard(apiKey)}
                className="px-3 py-1 bg-primary text-slate-900 rounded hover:bg-primary/80 transition-colors text-sm font-medium"
              >
                Copy Key
              </button>
              <button 
                onClick={regenerateApiKey}
                className="px-3 py-1 border border-slate-600 rounded hover:bg-slate-700 transition-colors text-sm"
              >
                Regenerate
              </button>
            </div>
            <p className="text-slate-500 text-xs mt-2">⚠️ Keep your API key secure and never expose it in client-side code</p>
          </div>
        </div>
      </div>

      {/* Configuration Options */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Customization */}
        <div className="dashboard-card">
          <h3 className="text-lg font-semibold mb-4">🎨 Customization Options</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-800 rounded-xl">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-xs text-slate-400">Dark, Light, or Auto</p>
              </div>
              <select className="bg-slate-700 border border-slate-600 rounded px-3 py-1 text-sm">
                <option>dark</option>
                <option>light</option>
                <option>auto</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-800 rounded-xl">
              <div>
                <p className="font-medium">Position</p>
                <p className="text-xs text-slate-400">Where to place the chat widget</p>
              </div>
              <select className="bg-slate-700 border border-slate-600 rounded px-3 py-1 text-sm">
                <option>bottom-right</option>
                <option>bottom-left</option>
                <option>top-right</option>
                <option>top-left</option>
              </select>
            </div>

            <div className="p-3 bg-slate-800 rounded-xl">
              <label className="block font-medium mb-2">Greeting Message</label>
              <input 
                type="text" 
                placeholder="Hi! How can I help you today?" 
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="dashboard-card">
          <h3 className="text-lg font-semibold mb-4">📋 Next Steps</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-slate-800 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-slate-900">1</span>
              </div>
              <div>
                <p className="font-medium">Embed the widget</p>
                <p className="text-xs text-slate-400">Add the script to your website</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-800 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-blue-400">2</span>
              </div>
              <div>
                <p className="font-medium">Upload knowledge base</p>
                <p className="text-xs text-slate-400">Add documents to train your bot</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-800 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-green-400">3</span>
              </div>
              <div>
                <p className="font-medium">Test and customize</p>
                <p className="text-xs text-slate-400">Fine-tune your chatbot&apos;s responses</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => onSectionChange('knowledge')}
            className="w-full mt-4 btn-primary px-4 py-2 rounded-xl font-medium"
          >
            📚 Upload Knowledge Base
          </button>
        </div>
      </div>

      {/* Help & Resources */}
      <div className="dashboard-card">
        <h3 className="text-lg font-semibold mb-4">📖 Help & Resources</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="#" className="block p-4 border border-slate-600 rounded-xl hover:border-primary transition-colors text-center">
            <div className="text-2xl mb-2">📚</div>
            <p className="font-medium">Documentation</p>
            <p className="text-xs text-slate-400">Complete setup guide</p>
          </a>
          
          <a href="#" className="block p-4 border border-slate-600 rounded-xl hover:border-primary transition-colors text-center">
            <div className="text-2xl mb-2">💬</div>
            <p className="font-medium">Live Chat</p>
            <p className="text-xs text-slate-400">Get instant help</p>
          </a>
          
          <a href="#" className="block p-4 border border-slate-600 rounded-xl hover:border-primary transition-colors text-center">
            <div className="text-2xl mb-2">🎥</div>
            <p className="font-medium">Video Tutorials</p>
            <p className="text-xs text-slate-400">Step-by-step guides</p>
          </a>
        </div>
      </div>
    </div>
  );
}
