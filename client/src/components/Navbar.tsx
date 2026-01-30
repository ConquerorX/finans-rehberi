import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Wallet, Landmark } from 'lucide-react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isFintek = location.pathname === '/fintek';
  const isBank = location.pathname === '/bankalar';

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-white/5">
      <div className="absolute inset-0 bg-[#0C1222]/80 backdrop-blur-xl" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div 
            className="flex items-center gap-4 cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
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
          
          <div className="flex items-center gap-2">
            {/* Fintekler Link */}
            <button
              onClick={() => navigate('/fintek')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isFintek 
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Wallet className="h-4 w-4" />
              <span className="hidden sm:inline">Fintekler</span>
            </button>
            
            {/* Bankalar Link */}
            <button
              onClick={() => navigate('/bankalar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isBank 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Landmark className="h-4 w-4" />
              <span className="hidden sm:inline">Bankalar</span>
            </button>

            {/* Ana Sayfa */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white text-sm font-medium transition-colors ml-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Ana Sayfa</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};