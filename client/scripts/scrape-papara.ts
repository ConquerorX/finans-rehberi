import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
// TypeScript path alias sorunu yaşamamak için types dosyasını göreli yol ile alıyoruz.
// .ts uzantısı normalde yazılmaz ama tsx/esm bazı durumlarda hassas olabilir. 
// Şimdilik standart import ile devam ediyoruz, tsx bunu halleder.
import { FintechCompany, Campaign } from '../src/types';

// __dirname alternatifi (ESM için)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, '../src/data/fintechs.json');

async function scrapePapara() {
  console.log('🔄 Papara Cashback verileri kontrol ediliyor...');

  try {
    const { data } = await axios.get('https://www.papara.com/cashback', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    const $ = cheerio.load(data);
    const newCampaigns: Campaign[] = [];

    // Not: Seçiciler sitenin anlık yapısına göre değişebilir.
    // Şimdilik örnek mantık:
    $('.cashback-card').each((_, element) => {
      const merchant = $(element).find('.brand-name').text().trim();
      const offer = $(element).find('.rate').text().trim();
      
      let category: Campaign['category'] = 'other';
      if (['Netflix', 'Spotify', 'YouTube'].some(k => merchant.includes(k))) category = 'entertainment';
      else if (['Burger', 'Kahve', 'Yemek'].some(k => merchant.includes(k))) category = 'food';
      else if (['Market', 'Giyim', 'Teknosa'].some(k => merchant.includes(k))) category = 'shopping';

      if (merchant && offer) {
        newCampaigns.push({
          merchant,
          offer: `${offer} Nakit İade`,
          category,
          terms: "Güncel kampanya"
        });
      }
    });

    // Veri bulunamadıysa (sitede yapı değişikliği varsa) mevcut veriyi bozma.
    if (newCampaigns.length === 0) {
      console.log('⚠️ Otomatik HTML analizi sonuç vermedi (Site yapısı değişmiş olabilir veya koruma aktif). Mevcut veri korunuyor.');
      return; 
    }

    const fileContent = await fs.readFile(DATA_PATH, 'utf-8');
    const fintechs: FintechCompany[] = JSON.parse(fileContent);

    const paparaIndex = fintechs.findIndex(f => f.id === 'papara');
    if (paparaIndex !== -1) {
      fintechs[paparaIndex].campaigns = newCampaigns;
      await fs.writeFile(DATA_PATH, JSON.stringify(fintechs, null, 2), 'utf-8');
      console.log(`✅ Papara verileri başarıyla güncellendi! (${newCampaigns.length} kampanya)`);
    }

  } catch (error) {
    console.error('❌ Papara veri çekme hatası:', error instanceof Error ? error.message : error);
  }
}

scrapePapara();