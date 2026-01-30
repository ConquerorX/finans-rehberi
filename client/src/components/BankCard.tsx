import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import type { Bank } from '../types';
import { getBankCategoryLabel, getBankCategoryColor } from '../utils/helpers';
import { Badge } from './Badge';

interface BankCardProps {
  bank: Bank;
  onClick: (bank: Bank) => void;
}

export const BankCard: React.FC<BankCardProps> = ({ bank, onClick }) => {
  const hasCampaigns = bank.campaigns && bank.campaigns.length > 0;

  return (
    <div 
      onClick={() => onClick(bank)}
      className="group relative glass-card rounded-2xl p-5 cursor-pointer card-hover overflow-hidden"
    >
      {/* Subtle hover glow - Emerald Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-transparent to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-500 rounded-2xl" />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white truncate group-hover:text-emerald-300 transition-colors">
              {bank.name}
            </h3>
            {bank.owner && (
              <p className="text-xs text-slate-500 mt-0.5 truncate">{bank.owner}</p>
            )}
          </div>
          <div className="flex-shrink-0 ml-2">
            <Badge className={getBankCategoryColor(bank.category)}>
              {getBankCategoryLabel(bank.category)}
            </Badge>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {bank.description}
        </p>

        {/* Features */}
        {bank.features && bank.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {bank.features.slice(0, 3).map((feature, idx) => (
              <span 
                key={idx} 
                className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-md text-slate-400"
              >
                {feature}
              </span>
            ))}
            {bank.features.length > 3 && (
              <span className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-md text-slate-500">
                +{bank.features.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Campaign indicator - Emerald Theme */}
        {hasCampaigns && (
          <div className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-emerald-400">
              {bank.campaigns!.length} Aktif Kampanya
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-3">
            {bank.phone && (
              <div className="flex items-center gap-1 text-slate-500">
                <Phone className="h-3 w-3" />
                <span className="text-xs">{bank.phone}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 text-slate-500 group-hover:text-emerald-400 transition-colors">
            <span className="text-xs font-medium">Detaylar</span>
            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
