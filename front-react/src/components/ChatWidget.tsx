'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm AqlBot. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! This is a demo response. In a real implementation, this would connect to your AI backend.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-root">
      {/* Launcher Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full btn-primary shadow-soft hover:scale-105 transition-transform"
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <span className="text-2xl m-auto">💬</span>
        <span className="sr-only">Open chat</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[380px] max-w-[92vw] rounded-2xl border border-slate-600 bg-slate-800 shadow-soft overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-slate-900 to-slate-700 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl" style={{background: 'linear-gradient(135deg, #e5ff66, #d9ff2e)'}}></div>
              <div>
                <div className="font-semibold">AqlBot</div>
                <div className="text-xs text-white/80">Ask anything</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/90 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto chat-scrollbar bg-slate-700">
            <div className="p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 items-start ${message.isUser ? 'justify-end' : ''}`}
                >
                  {!message.isUser && (
                    <div className="w-8 h-8 rounded-full bg-slate-500 flex-shrink-0"></div>
                  )}
                  <div
                    className={`rounded-2xl p-3 max-w-[75%] ${
                      message.isUser
                        ? 'bg-primary text-slate-900'
                        : 'bg-slate-600 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                  {message.isUser && (
                    <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0"></div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-slate-600 p-3 bg-slate-800">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 rounded-xl border border-slate-500 bg-slate-700 text-white px-3 py-2 chat-input text-sm placeholder:text-slate-300"
                placeholder="Type a message..."
              />
              <button
                onClick={handleSendMessage}
                className="btn-primary px-4 py-2 rounded-xl text-sm font-medium"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


