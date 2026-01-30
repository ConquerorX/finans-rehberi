import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Check, Shield, Building, Tag, ShoppingBag, Music, Utensils, Plane, ChevronDown, ChevronUp, Globe, Info, Phone, MapPin } from 'lucide-react';
import type { FintechCompany, Campaign } from '../types';
import { getCategoryLabel, getStatusColor, getStatusLabel } from '../utils/helpers';
import { Badge } from './Badge';

interface ModalProps {
  company: FintechCompany | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CompanyModal: React.FC<ModalProps> = ({ company, isOpen, onClose }) => {
  const [expandedCampaign, setExpandedCampaign] = useState<number | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) setExpandedCampaign(null);
  }, [isOpen]);

  if (!isOpen || !company) return null;

  const getCampaignIcon = (category: Campaign['category']) => {
    switch (category) {
      case 'entertainment': return <Music className="h-4 w-4" />;
      case 'shopping': return <ShoppingBag className="h-4 w-4" />;
      case 'food': return <Utensils className="h-4 w-4" />;
      case 'travel': return <Plane className="h-4 w-4" />;
      default: return <Tag className="h-4 w-4" />;
    }
  };

  const toggleCampaign = (idx: number) => {
    setExpandedCampaign(expandedCampaign === idx ? null : idx);
  };

  const statusLabel = getStatusLabel(company.status);
  const showStatusNote = company.statusNote && company.statusNote !== statusLabel;
  const hasCampaigns = company.campaigns && company.campaigns.length > 0;
  const hasFeatures = company.features && company.features.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-[#0C1222]/90 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl glass-card rounded-2xl shadow-2xl animate-scale-up overflow-hidden max-h-[85vh] flex flex-col border border-white/10">
        
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-5 border-b border-white/5 flex justify-between items-center bg-[#0C1222]/50 backdrop-blur-xl sticky top-0 z-10">
          <div>
             <h2 className="text-2xl font-bold text-white tracking-tight">
               {company.name}
             </h2>
             {company.legalName && (
               <p className="text-xs text-slate-500 mt-0.5 font-medium">
                 {company.legalName}
               </p>
             )}
             <div className="flex items-center gap-2 mt-1">
               <span className="text-sm text-slate-500">
                 {getCategoryLabel(company.category)}
               </span>
               {company.owner && (
                 <>
                   <span className="text-slate-700">•</span>
                   <span className="text-sm text-slate-500">{company.owner}</span>
                 </>
               )}
             </div>
          </div>
          <button 
            onClick={onClose}
            className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="h-4 w-4 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 custom-scrollbar">
          
          {/* Status Card */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
               <Shield className="h-4 w-4 text-slate-500" />
               <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">TCMB Durumu</span>
            </div>
            <div className="flex items-center gap-2">
               <Badge className={getStatusColor(company.status)}>
                  {statusLabel}
               </Badge>
            </div>
            {showStatusNote && (
               <p className="mt-2 text-sm text-slate-400 leading-snug">
                 {company.statusNote}
               </p>
            )}
          </div>

          {/* About */}
          <div>
             <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
               <Building className="h-4 w-4 text-slate-500" />
               Hakkında
             </h3>
             <p className="text-slate-400 text-sm leading-relaxed">
               {company.description}
             </p>
          </div>

          {/* Contact Info */}
          {(company.phone || company.address) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {company.phone && (
                <a 
                  href={`tel:${company.phone.replace(/\s/g, '')}`}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 transition-all"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-emerald-500 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-[#0C1222]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-emerald-400 uppercase tracking-wide mb-0.5">Telefon</p>
                    <p className="text-sm font-semibold text-white truncate">
                      {company.phone}
                    </p>
                  </div>
                </a>
              )}
              {company.address && (
                <div className="flex items-start gap-4 p-4 rounded-xl bg-sky-500/10 border border-sky-500/20">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-sky-500 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-[#0C1222]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-sky-400 uppercase tracking-wide mb-0.5">Adres</p>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {company.address}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Features */}
          {hasFeatures && (
            <div>
               <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                 <Check className="h-4 w-4 text-slate-500" />
                 Sunulan Hizmetler
               </h3>
               <div className="flex flex-wrap gap-2">
                 {company.features!.map((feature, idx) => (
                   <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium">
                     <Check className="h-3 w-3 text-emerald-400" />
                     {feature}
                   </span>
                 ))}
               </div>
            </div>
          )}

          {/* Campaigns */}
          {hasCampaigns && (
            <div>
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Tag className="h-4 w-4 text-slate-500" />
                Güncel Kampanyalar ({company.campaigns!.length})
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {company.campaigns!.map((campaign, idx) => (
                  <div 
                    key={idx} 
                    className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                      expandedCampaign === idx 
                        ? 'bg-amber-500/10 border-amber-500/30' 
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div 
                      className="p-3 flex items-center justify-between cursor-pointer"
                      onClick={() => toggleCampaign(idx)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          expandedCampaign === idx 
                            ? 'bg-amber-500/20 text-amber-400' 
                            : 'bg-white/5 text-slate-400'
                        }`}>
                          {getCampaignIcon(campaign.category)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-white">{campaign.merchant}</span>
                            <span className="text-xs font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-md">
                              {campaign.offer}
                            </span>
                          </div>
                          {campaign.terms && (
                            <p className="text-xs text-slate-500 mt-0.5">{campaign.terms}</p>
                          )}
                        </div>
                      </div>
                      
                      {campaign.detail && (
                        <div className="text-slate-500 ml-2 flex-shrink-0">
                          {expandedCampaign === idx ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </div>
                      )}
                    </div>

                    {expandedCampaign === idx && campaign.detail && (
                      <div className="px-4 pb-4 pt-0 animate-fade-in">
                        <div className="h-px w-full bg-amber-500/20 mb-3" />
                        <p className="text-xs text-slate-400 leading-relaxed whitespace-pre-wrap">
                          {campaign.detail}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Campaigns */}
          {!hasCampaigns && (
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <Info className="h-5 w-5 text-slate-500 mx-auto mb-2" />
              <p className="text-sm text-slate-500">
                Bu kuruluşun güncel kampanya bilgisi bulunmamaktadır.
              </p>
            </div>
          )}

          {/* Note */}
          {company.note && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
               <h4 className="text-xs font-bold text-amber-400 mb-1 uppercase">Not</h4>
               <p className="text-sm text-amber-200/80 leading-relaxed">
                 {company.note}
               </p>
            </div>
          )}

        </div>

        {/* Footer CTA */}
        {company.website && (
          <div className="flex-shrink-0 p-6 bg-[#0C1222]/50 backdrop-blur-md border-t border-white/5">
             <a 
               href={company.website}
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-[#0C1222] rounded-xl font-bold text-sm hover:from-amber-400 hover:to-amber-500 active:scale-[0.98] transition-all shadow-lg shadow-amber-500/20"
             >
               <Globe className="h-4 w-4" />
               {company.website.includes('google.com/search') ? "Şirketi Google'da Ara" : "Resmi Web Sitesini Ziyaret Et"}
               <ExternalLink className="h-4 w-4" />
             </a>
          </div>
        )}
      </div>
    </div>
  );
};