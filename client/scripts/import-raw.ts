import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { FintechCompany, Campaign } from '../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RAW_DATA_DIR = path.join(__dirname, '../raw_data');
const DATA_PATH = path.join(__dirname, '../src/data/fintechs.json');

const CATEGORY_KEYWORDS: Record<string, Campaign['category']> = {
  'netflix': 'entertainment', 'spotify': 'entertainment', 'youtube': 'entertainment',
  'steam': 'entertainment', 'playstation': 'entertainment', 'xbox': 'entertainment',
  'exxen': 'entertainment', 'blutv': 'entertainment', 'disney': 'entertainment',
  'apple': 'entertainment', 'amazon prime': 'shopping', 'google play': 'entertainment',
  's sport': 'entertainment', 'gain': 'entertainment', 'deezer': 'entertainment',
  'burger': 'food', 'starbucks': 'food', 'kahve': 'food', 'yemek': 'food', 'getir': 'shopping',
  'market': 'shopping', 'carrefour': 'shopping', 'migros': 'shopping', 'şok': 'shopping', 'a101': 'shopping', 'temu': 'shopping',
  'giyim': 'shopping', 'mavi': 'shopping', 'defacto': 'shopping', 'lcw': 'shopping', 'koton': 'shopping',
  'trendyol': 'shopping', 'hepsiburada': 'shopping', 'n11': 'shopping', 'amazon': 'shopping', 'pazarama': 'shopping', 'çiçeksepeti': 'shopping',
  'teknosa': 'shopping', 'mediamarkt': 'shopping', 'vatan': 'shopping', 'd&r': 'shopping',
  'uçak': 'travel', 'bilet': 'travel', 'turna': 'travel', 'obilet': 'travel', 'martı': 'travel', 'binbin': 'travel', 'uber': 'travel', 'taksi': 'travel', 'istanbulkart': 'travel', 'bitaksi': 'travel',
  'eczane': 'other', 'fatura': 'other', 'chatgpt': 'other', 'udemy': 'other', 'hop': 'shopping', 'daha daha': 'other', 'mutlu kutu': 'other', 'sigortam.net': 'other'
};

// Ortak Parser Fonksiyonları
function detectCategory(text: string): Campaign['category'] {
  const lowerText = text.toLowerCase();
  for (const [key, cat] of Object.entries(CATEGORY_KEYWORDS)) {
    if (lowerText.includes(key)) return cat;
  }
  return 'other';
}

function extractOffer(text: string): string {
  const percentMatch = text.match(/%(\d+)/);
  if (percentMatch) return `%${percentMatch[1]} İade/Puan`;
  
  const amountMatch = text.match(/(\d+)\s*TL/);
  if (amountMatch) return `${amountMatch[1]} TL İade/Puan`;

  return "Nakit İade";
}

// 1. Papara Tipi (Marka - Açıklama)
function parsePaparaStyle(text: string): Campaign[] {
  const lines = text.split('\n');
  const campaigns: Campaign[] = [];
  let currentCampaign: Partial<Campaign> | null = null;
  let buffer: string[] = [];

  const save = () => {
    if (currentCampaign?.merchant) {
      if (!currentCampaign.offer) {
        currentCampaign.offer = extractOffer(buffer.join(' '));
      }
      campaigns.push({
        merchant: currentCampaign.merchant,
        offer: currentCampaign.offer || "Nakit İade",
        terms: currentCampaign.terms || "Detaylar uygulamada",
        category: currentCampaign.category || 'other',
        detail: buffer.join('\n').trim()
      } as Campaign);
    }
  };

  for (const line of lines) {
    const clean = line.trim();
    if (!clean) continue;

    if (clean.includes(' - ') && (clean.includes('kazanabilirsin') || clean.length < 80)) {
      save();
      const parts = clean.split(' - ');
      const merchant = parts[0].trim();
      let limit = parts[1] ? parts[1].replace('kazanabilirsin', '').trim() : '';
      if(limit.includes("Her ay en fazla")) limit = limit.replace("Her ay en fazla", "Aylık max");

      currentCampaign = {
        merchant,
        terms: limit,
        category: detectCategory(merchant),
        offer: ''
      };
      buffer = [];
    } else if (currentCampaign) {
      buffer.push(clean);
      if (!currentCampaign.offer) {
        const offer = extractOffer(clean);
        if (offer !== "Nakit İade") currentCampaign.offer = offer;
      }
    }
  }
  save();
  return campaigns;
}

// 2. Nays Tipi (Başlık: "Kazan!" -> Blok Detay)
function parseNaysStyle(text: string): Campaign[] {
  const lines = text.split('\n');
  const campaigns: Campaign[] = [];
  let currentCampaign: Partial<Campaign> | null = null;
  let buffer: string[] = [];

  const save = () => {
    if (currentCampaign?.merchant) {
      if (!currentCampaign.offer) {
        currentCampaign.offer = extractOffer(currentCampaign.merchant + " " + buffer.join(' '));
      }
      // Detay metnini temizle (Soru cümlelerini at)
      const cleanDetail = buffer.filter(l => !l.includes('Nasıl Hediye Para Kazanırsın?')).join('\n').trim();

      campaigns.push({
        merchant: currentCampaign.merchant,
        offer: currentCampaign.offer || "Nakit İade",
        terms: "Kampanya koşulları geçerlidir",
        category: currentCampaign.category || 'other',
        detail: cleanDetail
      } as Campaign);
    }
  };

  for (const line of lines) {
    const clean = line.trim();
    if (!clean) continue;

    // Başlık Tespiti: "Kazan!" ile biten veya "Dönüştür!" ile biten kısa cümleler
    // Örn: "YouTube Premium Ödemelerinde %50 Hediye Para Kazan!"
    if ((clean.endsWith('Kazan!') || clean.endsWith('Dönüştür!')) && clean.length < 100) {
      save();
      
      // Marka adını başlıktan çıkar (Biraz tahmin)
      let merchant = clean
        .replace(/Ödemelerinde|Harcamalarında|Alışverişlerinde|Yüklemelerinde|Üyeliklerinde|ile|Kodlarını|Puanını/gi, '')
        .replace(/%(\d+) Hediye Para Kazan!/gi, '')
        .replace(/Nays'tan Yapacağın/gi, '')
        .replace(/Yapacağın/gi, '')
        .replace(/!/g, '')
        .trim();
      
      // Bilinen markaları temizle
      const knownBrands = Object.keys(CATEGORY_KEYWORDS);
      for (const brand of knownBrands) {
        if (clean.toLowerCase().includes(brand)) {
          // Başlıkta marka geçiyorsa, merchant adı olarak onu kullanmak daha güvenli (büyük harfle)
          // Ama orijinal metindeki case'i korumak için regex match kullan
          const match = clean.match(new RegExp(brand, 'i'));
          if (match) merchant = match[0]; // Orijinal halini al (örn: YouTube)
          break;
        }
      }

      currentCampaign = {
        merchant: merchant.split(' ')[0] + (merchant.split(' ')[1] ? ' ' + merchant.split(' ')[1] : ''), // İlk 1-2 kelimeyi al
        category: detectCategory(clean),
        offer: extractOffer(clean) !== "Nakit İade" ? extractOffer(clean) : ''
      };
      buffer = [];
    } else if (currentCampaign) {
      buffer.push(clean);
    }
  }
  save();
  return campaigns;
}

// 3. Basit Liste Tipi (Netflix %10)
function parseSimpleList(text: string): Campaign[] {
  const lines = text.split('\n');
  const campaigns: Campaign[] = [];

  for (const line of lines) {
    const clean = line.trim();
    if (!clean || clean.length < 5 || clean.length > 150) continue;

    const offer = extractOffer(clean);
    if (offer !== "Nakit İade") {
      let merchant = clean
        .replace(/%\d+|(\d+)\s*TL|iade|cashback|tosback/gi, '')
        .replace(/[-*•>]/g, '')
        .trim();

      if (merchant.length > 40) continue;

      campaigns.push({
        merchant,
        offer,
        category: detectCategory(merchant),
        terms: "Güncel kampanya",
        detail: clean
      });
    }
  }
  return campaigns;
}

async function importRawData() {
  console.log('📂 Ham veri dosyaları taranıyor...');

  try {
    const files = await fs.readdir(RAW_DATA_DIR);
    const txtFiles = files.filter((f: string) => f.endsWith('.txt') && f !== 'NASIL_KULLANILIR.txt');

    if (txtFiles.length === 0) return;

    const jsonContent = await fs.readFile(DATA_PATH, 'utf-8');
    const fintechs: FintechCompany[] = JSON.parse(jsonContent);
    let updatedCount = 0;

    for (const file of txtFiles) {
      const companyId = file.replace('.txt', '').toLowerCase();
      const companyIndex = fintechs.findIndex(f => f.id.toLowerCase() === companyId);

      if (companyIndex === -1) continue;

      console.log(`🔄 İşleniyor: ${file}`);
      const content = await fs.readFile(path.join(RAW_DATA_DIR, file), 'utf-8');
      
      let newCampaigns: Campaign[] = [];

      // Şirkete göre parser seçimi
      if (companyId === 'papara') {
        newCampaigns = parsePaparaStyle(content);
      } else if (companyId === 'nays') {
        newCampaigns = parseNaysStyle(content);
      } else {
        // Varsayılan olarak basit listeyi dene, eğer sonuç azsa Nays stilini dene (belki metin blokludur)
        const simpleResults = parseSimpleList(content);
        if (simpleResults.length < 2 && content.length > 200) {
           newCampaigns = parseNaysStyle(content); // Belki blok metindir
        } else {
           newCampaigns = simpleResults;
        }
      }

      if (newCampaigns.length > 0) {
        // Mükerrer kayıtları temizle
        const uniqueCampaigns = new Map();
        newCampaigns.forEach(c => {
            // Marka ismini biraz temizle
            let cleanMerchant = c.merchant.replace(/Ödemelerinde|Harcamalarında/gi, '').trim();
            if (cleanMerchant.length > 20) cleanMerchant = cleanMerchant.substring(0, 20) + '...';
            c.merchant = cleanMerchant;
            uniqueCampaigns.set(cleanMerchant, c);
        });
        
        fintechs[companyIndex].campaigns = Array.from(uniqueCampaigns.values());
        updatedCount++;
        console.log(`   ✅ ${fintechs[companyIndex].campaigns?.length} kampanya eklendi.`);
      }
    }

    if (updatedCount > 0) {
      await fs.writeFile(DATA_PATH, JSON.stringify(fintechs, null, 2), 'utf-8');
      console.log(`
🎉 ${updatedCount} şirketin verileri güncellendi!`);
    }

  } catch (error) {
    console.error('❌ Hata:', error);
  }
}

importRawData();