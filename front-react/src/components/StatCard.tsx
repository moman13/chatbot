interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  iconBg: string;
}

export default function StatCard({ title, value, change, changeType, icon, iconBg }: StatCardProps) {
  const changeColor = changeType === 'positive' ? 'text-green-400' : 
                     changeType === 'negative' ? 'text-red-400' : 'text-slate-400';

  return (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className={`${changeColor} text-xs`}>{change}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center`}>
          <span className="text-xl">{icon}</span>
        </div>
      </div>
    </div>
  );
}
