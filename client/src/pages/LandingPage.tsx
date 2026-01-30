import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  ArrowRight, 
  Building2,
  BadgeCheck,
  Zap,
  Search,
  BarChart3,
  ChevronRight,
  Landmark
} from 'lucide-react';
import fintechsData from '../data/fintechs.json';
import banksData from '../data/banks.json';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const fintechStats = {
    total: fintechsData.length,
    active: fintechsData.filter((c: any) => c.status === 'active').length,
    withCampaigns: fintechsData.filter((c: any) => c.campaigns && c.campaigns.length > 0).length,
  };

  const bankStats = {
    total: banksData.length,
    public: banksData.filter((b: any) => b.category === 'public').length,
    participation: banksData.filter((b: any) => b.category === 'participation').length,
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: BadgeCheck,
      title: 'Resmi Kaynak',
      description: 'TCMB ve TÖDEB verilerine dayalı, güvenilir ve güncel bilgiler.',
    },
    {
      icon: Search,
      title: 'Akıllı Filtreleme',
      description: 'Kategori, durum ve özellik bazlı gelişmiş arama.',
    },
    {
      icon: Zap,
      title: 'Canlı Kampanyalar',
      description: 'Güncel cashback ve indirim fırsatlarını takip edin.',
    },
    {
      icon: BarChart3,
      title: 'Detaylı Analiz',
      description: 'Kuruluşların özelliklerini karşılaştırın.',
    }
  ];

  return (
    <div className="min-h-screen bg-[#0C1222] overflow-hidden relative noise-bg">
      {/* Ambient Light Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5">
        <div className="absolute inset-0 bg-[#0C1222]/80 backdrop-blur-xl" />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <ShieldCheck className="h-5 w-5 text-[#0C1222]" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">
                  Finans Rehberi
                </span>
                <div className="text-[11px] font-medium text-amber-400/80 tracking-widest uppercase">
                  Türkiye 2026
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/bankalar')}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <Landmark className="h-4 w-4" />
                Bankalar
              </button>
              <button
                onClick={() => navigate('/fintek')}
                className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-sm font-semibold text-white transition-all duration-300"
              >
                Fintekler
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Overline */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-amber-500 to-transparent" />
              <span className="text-xs font-semibold text-amber-400/90 tracking-[0.2em] uppercase">
                Ocak 2026 Güncel
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-8 max-w-4xl">
              Türkiye'nin{' '}
              <span className="gold-text">Finans</span>{' '}
              Ekosistemini Keşfedin
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed text-balance">
              Bankalar, fintekler ve ödeme kuruluşları tek çatı altında. 
              Kampanyaları karşılaştırın, güvenilir bilgilere ulaşın.
            </p>

            {/* CTA Cards */}
            <div className="grid sm:grid-cols-2 gap-6 mb-20 max-w-3xl">
              {/* Fintekler Card */}
              <button
                onClick={() => navigate('/fintek')}
                className="group glass-card rounded-2xl p-6 text-left card-hover border border-amber-500/20 hover:border-amber-500/40 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <Wallet className="h-6 w-6 text-[#0C1222]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      Fintekler
                    </h3>
                    <p className="text-sm text-slate-500">E-Para & Ödeme Kuruluşları</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <div>
                      <div className="text-2xl font-bold text-amber-400">{fintechStats.total}</div>
                      <div className="text-xs text-slate-500">Kuruluş</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-amber-300">{fintechStats.withCampaigns}</div>
                      <div className="text-xs text-slate-500">Kampanya</div>
                    </div>
                  </div>
                  <ChevronRight className="h-6 w-6 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Bankalar Card - Emerald Theme */}
              <button
                onClick={() => navigate('/bankalar')}
                className="group glass-card rounded-2xl p-6 text-left card-hover border border-emerald-500/20 hover:border-emerald-500/40 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Landmark className="h-6 w-6 text-[#0C1222]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                      Bankalar
                    </h3>
                    <p className="text-sm text-slate-500">Kamu, Özel & Katılım</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">{bankStats.total}</div>
                      <div className="text-xs text-slate-500">Banka</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-300">{bankStats.participation}</div>
                      <div className="text-xs text-slate-500">Katılım</div>
                    </div>
                  </div>
                  <ChevronRight className="h-6 w-6 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { value: fintechStats.total + bankStats.total, label: 'Toplam Kuruluş', icon: Building2, color: 'text-white' },
                { value: fintechStats.active, label: 'E-Para Lisanslı', icon: CreditCard, color: 'text-amber-400' },
                { value: bankStats.total, label: 'Banka', icon: Landmark, color: 'text-emerald-400' },
                { value: fintechStats.withCampaigns, label: 'Aktif Kampanya', icon: TrendingUp, color: 'text-amber-300' },
              ].map((stat, index) => (
                <div 
                  key={stat.label}
                  className="glass-card rounded-2xl p-6 card-hover"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <stat.icon className={`h-4 w-4 ${stat.color} opacity-70`} />
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</span>
                  </div>
                  <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Features Section */}
      <section id="features" className="relative py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-amber-500 to-transparent" />
            <span className="text-xs font-semibold text-amber-400/90 tracking-[0.2em] uppercase">
              Özellikler
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Neden Finans Rehberi?
          </h2>
          <p className="text-lg text-slate-400 mb-16 max-w-xl">
            Türkiye finans ekosistemini anlamak için ihtiyacınız olan tüm araçlar.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card rounded-2xl p-8 card-hover group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-amber-400" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual CTA Section */}
      <section className="relative py-24 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Fintek CTA */}
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-transparent" />
              <div className="absolute inset-0 border border-amber-500/20 rounded-3xl" />
              
              <div className="relative p-10 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-6 mx-auto">
                  <Wallet className="h-7 w-7 text-[#0C1222]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Fintek Rehberi
                </h3>
                <p className="text-slate-400 mb-8">
                  {fintechStats.total} E-Para ve Ödeme Kuruluşu
                </p>
                <button
                  onClick={() => navigate('/fintek')}
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0C1222] rounded-xl text-base font-bold shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-all duration-300"
                >
                  Fintekleri Keşfet
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Banka CTA - Emerald Theme */}
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-600/5 to-transparent" />
              <div className="absolute inset-0 border border-emerald-500/20 rounded-3xl" />
              
              <div className="relative p-10 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center mb-6 mx-auto">
                  <Landmark className="h-7 w-7 text-[#0C1222]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Banka Rehberi
                </h3>
                <p className="text-slate-400 mb-8">
                  {bankStats.total} Banka (Kamu, Özel, Katılım)
                </p>
                <button
                  onClick={() => navigate('/bankalar')}
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-[#0C1222] rounded-xl text-base font-bold shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all duration-300"
                >
                  Bankaları Keşfet
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <ShieldCheck className="h-4 w-4 text-[#0C1222]" />
              </div>
              <span className="font-semibold text-white">
                Finans Rehberi
              </span>
            </div>
            
            <p className="text-sm text-slate-500 text-center">
              TCMB verileri temel alınarak hazırlanmıştır. Yatırım tavsiyesi içermez.
            </p>
            
            <p className="text-sm text-slate-600">
              © 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
