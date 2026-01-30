import { readFile, writeFile, access, mkdir } from 'fs/promises';
import { constants } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface FintechCompany {
  id: string;
  name: string;
  [key: string]: any;
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function createAllCampaignFiles() {
  const dataPath = join(__dirname, '../src/data/fintechs.json');
  const campaignsDir = join(__dirname, '../raw_data/campaigns');
  
  await mkdir(campaignsDir, { recursive: true });
  
  const rawData = await readFile(dataPath, 'utf-8');
  const companies: FintechCompany[] = JSON.parse(rawData);
  
  console.log(`Toplam ${companies.length} şirket için kampanya dosyaları kontrol ediliyor...\n`);
  
  let createdCount = 0;
  let existingCount = 0;
  
  for (const company of companies) {
    const campaignPath = join(campaignsDir, `${company.id}.json`);
    
    if (await fileExists(campaignPath)) {
      existingCount++;
      console.log(`○ ${company.id}.json zaten mevcut`);
    } else {
      // Boş kampanya dosyası oluştur (şirket bilgileriyle birlikte yorum ekle)
      const template = `[
  {
    "_comment": "${company.name} kampanyaları buraya eklenecek",
    "merchant": "",
    "offer": "",
    "terms": "",
    "category": "other",
    "detail": ""
  }
]
`;
      await writeFile(campaignPath, template, 'utf-8');
      createdCount++;
      console.log(`✓ ${company.id}.json oluşturuldu (${company.name})`);
    }
  }
  
  console.log('\n========================================');
  console.log(`✓ ${createdCount} yeni dosya oluşturuldu.`);
  console.log(`○ ${existingCount} dosya zaten mevcuttu.`);
  console.log('========================================\n');
}

createAllCampaignFiles().catch(console.error);
