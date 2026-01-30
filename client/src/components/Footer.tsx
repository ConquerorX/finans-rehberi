import React from 'react';
import { FileText, Shield, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-24 border-t border-white/5 bg-[#0C1222] relative">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Veri Kaynağı</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Bu rehberdeki şirket iletişim bilgileri{' '}
              <a 
                href="https://todeb.org.tr/sayfa/elektronik-para-kuruluslari/62/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
              >
                TÖDEB
              </a>
              {' '}resmi web sitesinden alınmıştır. Lisans durumları TCMB kayıtlarına dayanmaktadır.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Yasal Uyarı</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Sunulan bilgiler kamusal kaynaklardan derlenmiş olup bilgilendirme amaçlıdır. Yatırım tavsiyesi değildir. 
              Kullanıcılar finansal kararlarını kendi araştırmaları doğrultusunda vermelidir.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://todeb.org.tr/sayfa/elektronik-para-kuruluslari/62/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-500 hover:text-amber-400 transition-colors">
                  <FileText className="h-4 w-4" />
                  TÖDEB E-Para Kuruluşları
                </a>
              </li>
              <li>
                <a href="https://www.tcmb.gov.tr/wps/wcm/connect/tr/tcmb+tr/main+menu/temel+faaliyetler/odeme+hizmetleri/elektronik+para+kuruluslari" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-500 hover:text-amber-400 transition-colors">
                  <Shield className="h-4 w-4" />
                  TCMB Lisans Sorgulama
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 text-[#0C1222]" />
            </div>
            <span className="text-sm font-semibold text-white">Fintek Rehberi</span>
          </div>
          <p className="text-xs text-slate-600">
            &copy; 2026 Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Sistem Durumu: Güncel
          </div>
        </div>
      </div>
    </footer>
  );
};