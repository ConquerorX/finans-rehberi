import React, { useState, useMemo } from 'react';
import { BankCard } from '../components/BankCard';
import { BankModal } from '../components/BankModal';
import { Footer } from '../components/Footer';
import { CustomSelect } from '../components/CustomSelect';
import { Navbar } from '../components/Navbar';
import banksData from '../data/banks.json';
import type { Bank, BankCategory } from '../types';
import { Search, ArrowUpDown, Tag, Filter, X, Building2, Layers, ShieldCheck } from 'lucide-react';

export const Banks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BankCategory | 'all'>('all');
  const [selectedMerchant, setSelectedMerchant] = useState('all');
  const [sortOrder, setSortOrder] = useState<'name' | 'campaign-count'>('name');
  const [filterFeature, setFilterFeature] = useState<'all' | 'has-campaigns'>('all');
  
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const banks = banksData as Bank[];

  const allMerchants = useMemo(() => {
    const merchants = new Set<string>();
    banks.forEach(bank => {
      bank.campaigns?.forEach(c => merchants.add(c.merchant));
    });
    return Array.from(merchants).sort();
  }, [banks]);

  const filteredBanks = useMemo(() => {
    let result = banks.filter(bank => {
      const matchesSearch = bank.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            bank.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || bank.category === selectedCategory;
      
      const matchesMerchant = selectedMerchant === 'all' || 
                              bank.campaigns?.some(c => c.merchant === selectedMerchant);

      let matchesFeature = true;
      if (filterFeature === 'has-campaigns') {
        matchesFeature = (bank.campaigns?.length || 0) > 0;
      }
      
      return matchesSearch && matchesCategory && matchesMerchant && matchesFeature;
    });

    if (sortOrder === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'campaign-count') {
      result.sort((a, b) => (b.campaigns?.length || 0) - (a.campaigns?.length || 0));
    }

    return result;
  }, [searchTerm, selectedCategory, selectedMerchant, filterFeature, sortOrder, banks]);

  const stats = useMemo(() => {
    return {
      total: banks.length,
      public: banks.filter(b => b.category === 'public').length,
      private: banks.filter(b => b.category === 'private').length,
      participation: banks.filter(b => b.category === 'participation').length,
      foreign: banks.filter(b => b.category === 'foreign').length,
      withCampaigns: banks.filter(b => b.campaigns && b.campaigns.length > 0).length
    };
  }, [banks]);

  const openModal = (bank: Bank) => {
    setSelectedBank(bank);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBank(null), 300);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedMerchant('all');
    setFilterFeature('all');
    setSortOrder('name');
  };

  const categories: { value: BankCategory | 'all', label: string }[] = [
    { value: 'all', label: 'Tüm Bankalar' },
    { value: 'public', label: 'Kamu Bankaları' },
    { value: 'private', label: 'Özel Bankalar' },
    { value: 'foreign', label: 'Yabancı Bankalar' },
    { value: 'participation', label: 'Katılım Bankaları' },
  ];

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || selectedMerchant !== 'all' || filterFeature !== 'all';

  return (
    <div className="min-h-screen bg-[#0C1222]">
      <Navbar />
      
      <div className="px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="max-w-7xl mx-auto mb-10 space-y-6">
          
          {/* Hero Header Section - EXACT copy from Fintek page with Emerald theme */}
          <div className="relative overflow-hidden rounded-2xl glass-card p-8 md:p-10">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-600/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                {/* Badge */}
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-gradient-to-r from-emerald-500 to-transparent" />
                  <span className="text-xs font-semibold text-emerald-400/90 tracking-[0.15em] uppercase">
                    Ocak 2026 Güncel
                  </span>
                </div>
                
                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                  Türkiye <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Banka</span> Rehberi
                </h1>
                
                {/* Description */}
                <p className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed">
                  BDDK lisanslı tüm bankaları keşfedin. 
                  Kampanyaları karşılaştırın, size en uygun bankayı bulun.
                </p>
              </div>
              
              {/* Trust Badge - EXACT same structure as Fintek */}
              <div className="flex-shrink-0 flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-6 py-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20">
                  <ShieldCheck className="h-6 w-6 text-[#0C1222]" />
                </div>
                <div>
                  <div className="text-base font-bold text-white leading-tight">BDDK & TCMB</div>
                  <div className="text-[11px] font-semibold text-emerald-400/60 uppercase tracking-[0.1em]">Resmi Kaynak</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar - Same structure as Fintek StatsBar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-card rounded-xl p-4 hover:bg-white/10 hover:scale-[1.02] transition-all duration-200 cursor-default">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="h-5 w-5 text-slate-400" />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Toplam Banka</span>
              </div>
              <div className="text-3xl font-bold text-white">{stats.total}</div>
            </div>
            <div className="glass-card rounded-xl p-4 hover:bg-emerald-500/10 hover:scale-[1.02] transition-all duration-200 cursor-default">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Kamu</span>
              </div>
              <div className="text-3xl font-bold text-emerald-400">{stats.public}</div>
            </div>
            <div className="glass-card rounded-xl p-4 hover:bg-teal-500/10 hover:scale-[1.02] transition-all duration-200 cursor-default">
              <div className="flex items-center gap-3 mb-2">
                <Layers className="h-5 w-5 text-teal-400" />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Özel/Yabancı</span>
              </div>
              <div className="text-3xl font-bold text-teal-400">{stats.private + stats.foreign}</div>
            </div>
            <div className="glass-card rounded-xl p-4 hover:bg-emerald-500/10 hover:scale-[1.02] transition-all duration-200 cursor-default">
              <div className="flex items-center gap-3 mb-2">
                <Tag className="h-5 w-5 text-emerald-400" />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Katılım</span>
              </div>
              <div className="text-3xl font-bold text-emerald-400">{stats.participation}</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="glass-card rounded-2xl p-6">
            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  placeholder="Banka veya hizmet ara..."
                  className="block w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/30"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center justify-center px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-xl text-sm font-medium transition-colors whitespace-nowrap"
                >
                  <X className="h-4 w-4 mr-2" />
                  Temizle
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <CustomSelect
                options={categories.map(cat => ({ value: cat.value, label: cat.label }))}
                value={selectedCategory}
                onChange={(val) => setSelectedCategory(val as BankCategory | 'all')}
                icon={<Layers className="h-4 w-4" />}
                placeholder="Tüm Bankalar"
              />

              <CustomSelect
                options={[
                  { value: 'all', label: 'Kampanya / Marka' },
                  ...allMerchants.map(merchant => ({ value: merchant, label: merchant }))
                ]}
                value={selectedMerchant}
                onChange={setSelectedMerchant}
                icon={<Tag className="h-4 w-4" />}
                placeholder="Kampanya / Marka"
              />

              <CustomSelect
                options={[
                  { value: 'all', label: 'Tüm Bankalar' },
                  { value: 'has-campaigns', label: 'Kampanyası Olanlar' },
                ]}
                value={filterFeature}
                onChange={(val) => setFilterFeature(val as any)}
                icon={<Filter className="h-4 w-4" />}
                placeholder="Filtre"
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

            </div>
          </div>
        </div>

        {/* Bank Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBanks.map((bank) => (
            <BankCard 
              key={bank.id} 
              bank={bank} 
              onClick={openModal}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredBanks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="h-16 w-16 glass-card rounded-2xl flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-slate-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Sonuç Bulunamadı</h3>
            <p className="text-slate-500 max-w-xs mx-auto">
              Seçtiğiniz kriterlere uygun bir banka bulunamadı.
            </p>
            <button 
              onClick={clearFilters}
              className="mt-6 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-[#0C1222] rounded-xl text-sm font-bold hover:from-emerald-400 hover:to-teal-500 transition-colors"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>

      <Footer />

      <BankModal 
        bank={selectedBank} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};
