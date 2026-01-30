import React, { useState, useMemo } from 'react';
import { FintechCard } from '../components/FintechCard';
import { CompanyModal } from '../components/CompanyModal';
import { StatsBar } from '../components/StatsBar';
import { Footer } from '../components/Footer';
import { CustomSelect } from '../components/CustomSelect';
import fintechsData from '../data/fintechs.json';
import type { FintechCompany, Category, Status } from '../types';
import { Search, SlidersHorizontal, ArrowUpDown, Tag, Filter, X, ShieldCheck, Layers } from 'lucide-react';

export const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<Status | 'all'>('all');
  const [selectedMerchant, setSelectedMerchant] = useState<string>('all');
  const [filterFeature, setFilterFeature] = useState<'all' | 'has-campaigns' | 'has-physical-card'>('all');
  
  const [sortOrder, setSortOrder] = useState<'name' | 'campaign-count'>('name');
  const [selectedCompany, setSelectedCompany] = useState<FintechCompany | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const companies = fintechsData as FintechCompany[];

  const allMerchants = useMemo(() => {
    const merchants = new Set<string>();
    companies.forEach(company => {
      company.campaigns?.forEach(campaign => {
        merchants.add(campaign.merchant);
      });
    });
    return Array.from(merchants).sort();
  }, [companies]);

  const filteredCompanies = useMemo(() => {
    let result = companies.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            company.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || company.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || company.status === selectedStatus;
      
      const matchesMerchant = selectedMerchant === 'all' || 
                              company.campaigns?.some(c => c.merchant === selectedMerchant);

      let matchesFeature = true;
      if (filterFeature === 'has-campaigns') {
        matchesFeature = (company.campaigns?.length || 0) > 0;
      } else if (filterFeature === 'has-physical-card') {
        matchesFeature = company.features?.some(f => f.toLowerCase().includes('kart') || f.toLowerCase().includes('card')) || false;
      }
      
      return matchesSearch && matchesCategory && matchesStatus && matchesMerchant && matchesFeature;
    });

    if (sortOrder === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'campaign-count') {
      result.sort((a, b) => (b.campaigns?.length || 0) - (a.campaigns?.length || 0));
    }

    return result;
  }, [searchTerm, selectedCategory, selectedStatus, selectedMerchant, filterFeature, sortOrder, companies]);

  const stats = useMemo(() => {
    return {
      total: companies.length,
      active: companies.filter(c => c.status === 'active').length,
      revoked: companies.filter(c => c.status === 'revoked' || c.status === 'suspended').length,
      withCampaigns: companies.filter(c => c.campaigns && c.campaigns.length > 0).length
    };
  }, [companies]);

  const openModal = (company: FintechCompany) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCompany(null), 300);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedMerchant('all');
    setFilterFeature('all');
    setSortOrder('name');
  };

  const categories: { value: Category | 'all', label: string }[] = [
    { value: 'all', label: 'Tüm Kategoriler' },
    { value: 'super-app', label: 'Dijital Cüzdan' },
    { value: 'bank-subsidiary', label: 'Banka İştiraki' },
    { value: 'telco', label: 'Telekom İştiraki' },
    { value: 'b2b', label: 'Kurumsal Çözümler' },
    { value: 'remittance', label: 'Para Transferi' },
    { value: 'niche', label: 'Özel Amaçlı' },
    { value: 'other', label: 'Diğer' },
  ];

  return (
    <div className="min-h-screen pt-24 flex flex-col bg-[#0C1222] transition-colors duration-300 noise-bg">
      <div className="flex-grow px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto mb-10 space-y-6">
          
          {/* Hero Header Section */}
          <div className="relative overflow-hidden rounded-2xl glass-card p-8 md:p-10">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-600/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                {/* Badge */}
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-gradient-to-r from-amber-500 to-transparent" />
                  <span className="text-xs font-semibold text-amber-400/90 tracking-[0.15em] uppercase">
                    Ocak 2026 Güncel
                  </span>
                </div>
                
                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                  Türkiye <span className="gold-text">Fintek</span> Rehberi
                </h1>
                
                {/* Description */}
                <p className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed">
                  TCMB lisanslı elektronik para ve ödeme kuruluşlarını keşfedin. 
                  Kampanyaları karşılaştırın, size en uygun dijital cüzdanı bulun.
                </p>
              </div>
              
              {/* Trust Badge - Professional version */}
              <div className="flex-shrink-0 flex items-center gap-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl px-6 py-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-900/20">
                  <ShieldCheck className="h-6 w-6 text-[#0C1222]" />
                </div>
                <div>
                  <div className="text-base font-bold text-white leading-tight">TCMB & TÖDEB</div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.1em]">Resmi Kaynak</div>
                </div>
              </div>
            </div>
          </div>

          <StatsBar {...stats} />

          <div className="glass-card rounded-2xl p-5">
            
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all text-sm font-medium"
                  placeholder="Şirket, özellik veya açıklama ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
                 <button
                   onClick={clearFilters}
                   className="flex items-center justify-center px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-xl text-sm font-medium transition-colors whitespace-nowrap"
                 >
                   <X className="h-4 w-4 mr-2" />
                   Temizle
                 </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              <CustomSelect
                options={[
                  { value: 'all', label: 'Tüm Durumlar' },
                  { value: 'active', label: 'E-Para Kuruluşları' },
                  { value: 'limited', label: 'Ödeme Kuruluşları' },
                  { value: 'suspended', label: 'Durdurulanlar' },
                  { value: 'revoked', label: 'İptal Edilenler' },
                ]}
                value={selectedStatus}
                onChange={(val) => setSelectedStatus(val as Status | 'all')}
                icon={<Filter className="h-4 w-4" />}
                placeholder="Tüm Durumlar"
              />

              <CustomSelect
                options={[
                  { value: 'all', label: 'Platform / Marka Seç' },
                  ...allMerchants.map(merchant => ({ value: merchant, label: merchant }))
                ]}
                value={selectedMerchant}
                onChange={setSelectedMerchant}
                icon={<Tag className="h-4 w-4" />}
                placeholder="Platform / Marka Seç"
              />

              <CustomSelect
                options={[
                  { value: 'all', label: 'Ek Özellikler' },
                  { value: 'has-campaigns', label: 'Kampanyası Olanlar' },
                  { value: 'has-physical-card', label: 'Fiziksel Kartı Olanlar' },
                ]}
                value={filterFeature}
                onChange={(val) => setFilterFeature(val as any)}
                icon={<SlidersHorizontal className="h-4 w-4" />}
                placeholder="Ek Özellikler"
              />

              <CustomSelect
                options={[
                  { value: 'name', label: 'Sırala: İsim (A-Z)' },
                  { value: 'campaign-count', label: 'Sırala: Kampanya Sayısı' },
                ]}
                value={sortOrder}
                onChange={(val) => setSortOrder(val as any)}
                icon={<ArrowUpDown className="h-4 w-4" />}
                placeholder="Sırala"
              />

              <CustomSelect
                options={categories.map(cat => ({ value: cat.value, label: cat.label }))}
                value={selectedCategory}
                onChange={(val) => setSelectedCategory(val as Category | 'all')}
                icon={<Layers className="h-4 w-4" />}
                placeholder="Tüm Kategoriler"
              />

            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCompanies.map((company) => (
            <FintechCard 
              key={company.id} 
              company={company} 
              onClick={openModal}
            />
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="h-16 w-16 glass-card rounded-2xl flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-slate-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Sonuç Bulunamadı</h3>
            <p className="text-slate-500 max-w-xs mx-auto">
              Seçtiğiniz kriterlere uygun bir şirket bulunamadı.
            </p>
            <button 
              onClick={clearFilters}
              className="mt-6 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-[#0C1222] rounded-xl text-sm font-bold hover:from-amber-400 hover:to-amber-500 transition-colors"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>

      <Footer />

      <CompanyModal 
        company={selectedCompany} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};
