import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { FintechCompany } from '../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FINTECHS_PATH = path.resolve(__dirname, '../src/data/fintechs.json');

// Detaylı şirket açıklamaları
const descriptions: Record<string, string> = {
  "Papara": "Türkiye'nin öncü dijital cüzdan ve ödeme platformu. Anında para transferi, cashback kampanyaları, metal ve sanal kart seçenekleri sunuyor. Kripto para alım-satım özelliği ve yatırım araçlarıyla finans süper uygulamasına dönüşüyor.",
  
  "Nays": "İş Bankası'nın dijital ödeme platformu. Kredi kartı taksitlendirme, QR ile ödeme ve alışveriş kredisi imkanları sunuyor. Banka müşterisi olmasanız bile kullanabilirsiniz.",
  
  "Sipay": "E-ticaret odaklı ödeme çözümleri sunan platform. Online mağazalar için sanal POS, link ile ödeme ve marketplace entegrasyonları sağlıyor. TCMB tarafından faaliyeti geçici olarak durduruldu.",
  
  "Ozan": "Dijital cüzdan ve para transferi uygulaması. Yurt içi ve yurt dışı para gönderimi, kart hizmetleri sunuyordu. TMSF tarafından kayyım atandı ve faaliyetleri durduruldu.",
  
  "Tosla": "Akbank'ın dijital ödeme platformu. Temassız ödeme, para transferi ve bütçe yönetimi araçları sunuyor. Genç kullanıcılara yönelik modern arayüzü ile öne çıkıyor.",
  
  "Hepsipay": "Hepsiburada'nın ödeme altyapısı. Online alışverişlerde hızlı ödeme, taksitlendirme ve Hepsiburada ekosisteminde avantajlar sunuyor.",
  
  "Morpara": "Uluslararası para transferi ve dijital cüzdan hizmeti. Avrupa ve İngiltere'ye ücretsiz transfer, TROY sanal kart ve MoneyGram entegrasyonu ile öne çıkıyor.",
  
  "AHL Pay": "Ahlatcı Holding'in dijital ödeme platformu. Altın alım-satım, nakit iade kampanyaları ve Mastercard destekli kart hizmetleri sunuyor. Geniş perakende ağında cashback fırsatları mevcut.",
  
  "Moneytolia": "Kurumsal ve bireysel ödeme çözümleri sunan platform. Fatura ödeme, para transferi ve dijital cüzdan hizmetleri sağlıyor.",
  
  "Beeso": "Dijital ödeme ve e-para hizmetleri sunan platform. Kart bazlı ödeme çözümleri ve kurumsal hizmetler sunuyor.",
  
  "İstanbulkart": "İstanbul'un toplu taşıma kartı altyapısını işleten şirket. Ulaşım ödemelerinin yanı sıra otopark, müze girişi gibi şehir hizmetlerinde de kullanılabiliyor.",
  
  "BPN": "Kurumsal ödeme çözümleri sunan B2B odaklı platform. İşletmelere özel toplu ödeme ve tahsilat hizmetleri sağlıyor.",
  
  "BSM Pays": "Ödeme hizmetleri ve elektronik para çözümleri sunan kuruluş. Kurumsal müşterilere yönelik ödeme altyapısı sağlıyor.",
  
  "DenizPay": "DenizBank'ın dijital ödeme platformu. Banka hesabı olmadan kullanılabilen, para transferi ve kart hizmetleri sunuyor.",
  
  "Dgpara": "Doğuş Grubu'nun dijital ödeme platformu. Grup şirketlerinde ve anlaşmalı işyerlerinde kullanılabilen ödeme çözümleri sunuyor.",
  
  "DinamikPay": "POS ve ödeme terminali çözümleri sunan platform. İşyerlerine yönelik ödeme kabul hizmetleri sağlıyor.",
  
  "TrendyolPay": "Trendyol'un ödeme altyapısı. Trendyol platformunda hızlı ödeme, taksitlendirme ve cüzdan hizmetleri sunuyor.",
  
  "Erpapay": "Ankara merkezli ödeme hizmetleri kuruluşu. Kurumsal ve bireysel ödeme çözümleri sunuyor.",
  
  "Faturamatik": "Fatura ödeme ve tahsilat hizmetleri sunan platform. Elektrik, su, doğalgaz gibi fatura ödemelerini kolaylaştırıyor.",
  
  "Fairpay": "Dijital ödeme ve e-para hizmetleri sunan platform. Bireysel ve kurumsal ödeme çözümleri sağlıyor.",
  
  "Fzypay": "Dijital ödeme platformu. TCMB tarafından faaliyeti geçici olarak durduruldu.",
  
  "Tami": "Garanti BBVA'nın dijital ödeme platformu. Temassız ödeme ve para transferi hizmetleri sunuyor.",
  
  "Gönderal": "Para transferi odaklı dijital platform. Hızlı ve güvenli para gönderimi hizmetleri sağlıyor.",
  
  "Parao": "Halkbank'ın dijital ödeme uygulaması. Banka hesabı gerektirmeden para transferi ve ödeme imkanları sunuyor.",
  
  "Hayhay": "Ankara merkezli dijital ödeme platformu. Bireysel kullanıcılara yönelik ödeme çözümleri sunuyor.",
  
  "İstPay": "İstanbul merkezli ödeme hizmetleri platformu. Kurumsal ve bireysel ödeme çözümleri sağlıyor.",
  
  "iyzico": "Türkiye'nin en büyük online ödeme altyapısı sağlayıcılarından. E-ticaret siteleri için sanal POS, pazaryeri çözümleri ve ödeme koruma hizmetleri sunuyor. PayU tarafından satın alındı.",
  
  "Juno Money": "Dijital cüzdan ve ödeme hizmetleri sunan platform. Para transferi ve kart hizmetleri sağlıyor.",
  
  "Fups": "Dijital cüzdan ve ön ödemeli kart platformu. Gençlere yönelik tasarlanmış, ebeveyn kontrollü harcama özellikleri ve cashback kampanyaları sunuyor.",
  
  "Moka": "İşletmelere yönelik ödeme çözümleri platformu. Mobil POS, sanal POS ve e-ticaret entegrasyonları sunuyor. İş Bankası tarafından satın alındı.",
  
  "Moneymate": "Ankara merkezli dijital ödeme platformu. Kurumsal ve bireysel ödeme hizmetleri sunuyor.",
  
  "Moneyout": "Para transferi ve ödeme hizmetleri sunan platform. Yurt içi ve yurt dışı transfer çözümleri sağlıyor.",
  
  "Moneypay": "Dijital ödeme ve e-para platformu. Bireysel ve kurumsal ödeme çözümleri sunuyor.",
  
  "N Kolay": "Kentsel dönüşüm ve konut projelerinde kullanılan ödeme platformu. Kira ve aidat ödemeleri için çözümler sunuyor.",
  
  "Nomu Pay": "Dijital ödeme hizmetleri sunan platform. Kurumsal ödeme çözümleri ve e-para hizmetleri sağlıyor.",
  
  "Peple": "Dijital cüzdan ve e-para platformu. TCMB tarafından faaliyeti geçici olarak durduruldu.",
  
  "Papel": "Dijital cüzdan ve ödeme uygulaması. Para transferi ve kart hizmetleri sunuyordu. TCMB tarafından faaliyeti geçici olarak durduruldu.",
  
  "Parakolay": "E-ticaret odaklı ödeme çözümleri. Online mağazalar için sanal POS ve ödeme altyapısı sağlıyor.",
  
  "ParaQR": "QR kod tabanlı ödeme çözümleri sunan platform. TCMB tarafından faaliyeti geçici olarak durduruldu.",
  
  "Paratim": "Kurumsal ödeme çözümleri platformu. İşletmelere yönelik toplu ödeme ve tahsilat hizmetleri sunuyor.",
  
  "Parolapara": "Dijital ödeme platformu. TCMB tarafından faaliyeti geçici olarak durduruldu.",
  
  "Payco": "Ödeme hizmetleri platformu. TCMB tarafından faaliyeti geçici olarak durduruldu.",
  
  "Payporter": "Uluslararası para transferi platformu. Yurt dışından Türkiye'ye ve Türkiye'den yurt dışına para gönderimi hizmetleri sunuyor.",
  
  "PayTR": "E-ticaret ödeme altyapısı sağlayıcısı. Sanal POS, link ile ödeme, pazaryeri çözümleri ve abonelik yönetimi hizmetleri sunuyor.",
  
  "Pratik İşlem": "Fatura ve ödeme hizmetleri platformu. Kurumsal tahsilat çözümleri sunuyor.",
  
  "Qpay": "QNB Finansbank'ın dijital ödeme platformu. Hızlı ödeme ve para transferi hizmetleri sunuyor.",
  
  "Rubik Para": "Dijital cüzdan ve e-para platformu. Bireysel kullanıcılara yönelik ödeme çözümleri sunuyor.",
  
  "SBM Digital": "Dijital ödeme ve e-para hizmetleri sunan kuruluş. Kurumsal ödeme çözümleri sağlıyor.",
  
  "Oderopay": "Dijital ödeme ve para transferi platformu. Hızlı ve güvenli ödeme hizmetleri sunuyor.",
  
  "TomPay": "Dijital cüzdan ve ödeme uygulaması. Para transferi ve kart hizmetleri sunuyor.",
  
  "Türk Telekom Ödeme": "Türk Telekom'un dijital ödeme platformu. Fatura ödeme, kontör yükleme ve dijital içerik satın alma hizmetleri sunuyor.",
  
  "Bupara": "Dijital ödeme ve e-para platformu. Bireysel ve kurumsal ödeme çözümleri sunuyor.",
  
  "Param": "Dijital cüzdan ve ödeme platformu. Para transferi, fatura ödeme ve online alışveriş hizmetleri sunuyor. Geniş kullanıcı ağına sahip.",
  
  "Paycell": "Turkcell'in dijital cüzdan ve ödeme platformu. Telefon faturası ödeme, para transferi, online alışveriş ve temassız ödeme hizmetleri sunuyor.",
  
  "Turkonay": "Dijital ödeme hizmetleri sunan platform. Bireysel ve kurumsal çözümler sağlıyor.",
  
  "TK Pay": "Türk Hava Yolları'nın dijital ödeme platformu. THY ekosisteminde kullanılabilen ödeme ve sadakat programı hizmetleri sunuyor.",
  
  "UPT": "Para transferi ve ödeme hizmetleri platformu. Yurt içi ve yurt dışı para gönderimi, fatura ödeme hizmetleri sunuyor.",
  
  "Vakıfpay": "VakıfBank'ın dijital ödeme platformu. Para transferi, QR ile ödeme ve dijital cüzdan hizmetleri sunuyor.",
  
  "Vepara": "Dijital cüzdan ve ödeme uygulaması. TCMB tarafından faaliyeti geçici olarak durduruldu.",
  
  "Vizyonpay": "Dijital ödeme ve e-para platformu. Kurumsal ve bireysel ödeme çözümleri sunuyor.",
  
  "Vodafone Pay": "Vodafone'un dijital ödeme platformu. Telefon faturası ödeme, para transferi ve online alışveriş hizmetleri sunuyor.",
  
  "Yemekpay": "Yeme-içme sektörüne özel ödeme çözümleri. Yemek kartı ve kurumsal yemek hizmetleri sunuyor.",
  
  "Ziraatpay": "Ziraat Bankası'nın dijital ödeme platformu. Banka hesabı gerektirmeden para transferi ve ödeme hizmetleri sunuyor.",
  
  "1000Pay": "Dijital ödeme ve e-para platformu. Bireysel ve kurumsal ödeme çözümleri sunuyor.",
  
  "İninal": "Türkiye'nin ilk bağımsız ön ödemeli kart platformuydu. Market ve PTT şubelerinden temin edilebilen kartlarıyla tanınıyordu. Lisansı iptal edildi."
};

function updateDescriptions() {
  const fintechs: FintechCompany[] = JSON.parse(fs.readFileSync(FINTECHS_PATH, 'utf-8'));

  let updatedCount = 0;

  fintechs.forEach(company => {
    if (descriptions[company.name]) {
      company.description = descriptions[company.name];
      updatedCount++;
    }
  });

  fs.writeFileSync(FINTECHS_PATH, JSON.stringify(fintechs, null, 2), 'utf-8');

  console.log(`\n✅ ${updatedCount} şirketin açıklaması güncellendi.`);
}

updateDescriptions();
