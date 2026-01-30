import React from 'react';
import { Users, ShieldCheck, AlertOctagon, Tag } from 'lucide-react';

interface StatsProps {
  total: number;
  active: number;
  revoked: number;
  withCampaigns: number;
}

export const StatsBar: React.FC<StatsProps> = ({ total, active, revoked, withCampaigns }) => {
  const stats = [
    { icon: Users, label: 'Toplam Şirket', value: total, color: 'text-slate-400' },
    { icon: ShieldCheck, label: 'E-Para Lisanslı', value: active, color: 'text-emerald-400' },
    { icon: AlertOctagon, label: 'Riskli/İptal', value: revoked, color: 'text-red-400' },
    { icon: Tag, label: 'Kampanyalı', value: withCampaigns, color: 'text-amber-400' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.label} className="glass-card rounded-2xl p-5 card-hover">
          <div className="flex items-center gap-3 mb-3">
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</span>
          </div>
          <p className="text-2xl font-bold text-white">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};