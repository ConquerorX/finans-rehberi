import React from 'react';
import type { FintechCompany } from '../types';
import { getCategoryLabel, getStatusColor, getStatusLabel } from '../utils/helpers';
import { Badge } from './Badge';
import { ChevronRight, Tag, Building2 } from 'lucide-react';

interface FintechCardProps {
  company: FintechCompany;
  onClick: (company: FintechCompany) => void;
}

export const FintechCard: React.FC<FintechCardProps> = ({ company, onClick }) => {
  const hasCampaigns = company.campaigns && company.campaigns.length > 0;
  const hasFeatures = company.features && company.features.length > 0;

  return (
    <div 
      onClick={() => onClick(company)}
      className="group relative glass-card rounded-2xl p-6 cursor-pointer card-hover flex flex-col h-full overflow-hidden"
    >
      {/* Subtle hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              {getCategoryLabel(company.category)}
            </span>
            <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
              {company.name}
            </h3>
          </div>
          <Badge className={getStatusColor(company.status)}>
            {getStatusLabel(company.status)}
          </Badge>
        </div>

        {company.owner && (
          <div className="flex items-center gap-1.5 mb-3">
            <Building2 className="h-3 w-3 text-slate-500" />
            <span className="text-xs text-slate-500 font-medium">
              {company.owner}
            </span>
          </div>
        )}

        <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">
          {company.description}
        </p>

        {hasFeatures && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {company.features!.slice(0, 3).map((feature, idx) => (
              <span 
                key={idx} 
                className="text-[10px] font-medium px-2.5 py-1 bg-white/5 border border-white/10 text-slate-400 rounded-lg"
              >
                {feature}
              </span>
            ))}
            {company.features!.length > 3 && (
              <span className="text-[10px] font-medium px-2.5 py-1 bg-white/5 border border-white/10 text-slate-500 rounded-lg">
                +{company.features!.length - 3}
              </span>
            )}
          </div>
        )}

        {hasCampaigns && (
          <div className="mb-4 flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <Tag className="h-3 w-3 text-amber-400" />
              <span className="text-[11px] font-bold text-amber-400">
                {company.campaigns!.length} Kampanya
              </span>
            </div>
            {company.campaigns![0] && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <span className="text-[11px] font-bold text-emerald-400">
                  {company.campaigns![0].offer}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-xs text-slate-500">
            Detaylar için tıkla
          </span>
          <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-amber-500 group-hover:border-amber-500 transition-all duration-300">
            <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-[#0C1222] transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};