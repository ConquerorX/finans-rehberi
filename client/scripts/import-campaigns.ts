import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { FintechCompany, Campaign } from '../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CAMPAIGNS_DIR = path.join(__dirname, '../raw_data/campaigns');
const DATA_PATH = path.join(__dirname, '../src/data/fintechs.json');

async function importCampaigns() {
  console.log('📂 JSON kampanya dosyaları taranıyor...');

  try {
    const files = await fs.readdir(CAMPAIGNS_DIR);
    const jsonFiles = files.filter((f: string) => f.endsWith('.json'));

    if (jsonFiles.length === 0) {
      console.log('⚠️  Hiç JSON kampanya dosyası bulunamadı. (Örn: raw_data/campaigns/papara.json)');
      return;
    }

    const data = await fs.readFile(DATA_PATH, 'utf-8');
    const fintechs: FintechCompany[] = JSON.parse(data);
    let updatedCount = 0;

    for (const file of jsonFiles) {
      const companyId = file.replace('.json', '').toLowerCase();
      const companyIndex = fintechs.findIndex(f => f.id.toLowerCase() === companyId);

      if (companyIndex === -1) {
        console.warn(`⚠️  Şirket bulunamadı: ${companyId}`);
        continue;
      }

      console.log(`🔄 İşleniyor: ${file}`);
      const content = await fs.readFile(path.join(CAMPAIGNS_DIR, file), 'utf-8');
      const campaigns: Campaign[] = JSON.parse(content);

      if (Array.isArray(campaigns)) {
        fintechs[companyIndex].campaigns = campaigns;
        updatedCount++;
        console.log(`   ✅ ${campaigns.length} kampanya güncellendi.`);
      } else {
        console.error(`❌ ${file} geçerli bir kampanya dizisi içermiyor.`);
      }
    }

    if (updatedCount > 0) {
      await fs.writeFile(DATA_PATH, JSON.stringify(fintechs, null, 2), 'utf-8');
      console.log(`\n🎉 ${updatedCount} şirketin kampanyaları başarıyla güncellendi!`);
    }

  } catch (error) {
    console.error('❌ Hata:', error);
  }
}

importCampaigns();
