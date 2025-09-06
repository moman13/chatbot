interface ChatbotCardProps {
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'paused';
  messagesToday: number;
  uptime: string;
  iconBg: string;
  onConfigure?: () => void;
  onViewCode?: () => void;
}

export default function ChatbotCard({ 
  name, 
  description, 
  status, 
  messagesToday, 
  uptime,
  iconBg,
  onConfigure,
  onViewCode 
}: ChatbotCardProps) {
  return (
    <div className="chatbot-card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg ${iconBg}`}></div>
          <h4 className="font-medium">{name}</h4>
        </div>
        <span className={`status-badge ${status}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <p className="text-sm text-slate-400 mb-3">{description}</p>
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{messagesToday.toLocaleString()} messages today</span>
        <span>{uptime}</span>
      </div>
      {(onConfigure || onViewCode) && (
        <div className="flex gap-2 mt-3">
          {onConfigure && (
            <button
              onClick={onConfigure}
              className="px-3 py-1 text-sm border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Configure
            </button>
          )}
          {onViewCode && (
            <button
              onClick={onViewCode}
              className="px-3 py-1 text-sm border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors"
            >
              View Code
            </button>
          )}
        </div>
      )}
    </div>
  );
}
