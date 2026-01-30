import { readFile, writeFile, mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Campaign {
  merchant: string;
  offer: string;
  terms?: string;
  category: 'entertainment' | 'shopping' | 'food' | 'travel' | 'other';
  detail?: string;
}

interface OldFintechCompany {
  id: string;
  name: string;
  website?: string;
  status: string;
  statusNote?: string;
  category: string;
  owner?: string;
  description: string;
  features?: string[];
  campaigns?: Campaign[];
  reliabilityScore?: number;
  reportNotes?: string;
}

interface NewFintechCompany {
  id: string;
  name: string;
  website?: string;
  status: string;
  statusNote?: string;
  category: string;
  owner?: string;
  description: string;
  features?: string[];
  campaigns?: Campaign[];
  note?: string;
}

async function cleanDataAndExportCampaigns() {
  const dataPath = join(__dirname, '../src/data/fintechs.json');
  const campaignsDir = join(__dirname, '../raw_data/campaigns');
  
  // Kampanya klasörünün var olduğundan emin ol
  await mkdir(campaignsDir, { recursive: true });
  
  // JSON verisini oku
  const rawData = await readFile(dataPath, 'utf-8');
  const companies: OldFintechCompany[] = JSON.parse(rawData);
  
  console.log(`Toplam ${companies.length} şirket işleniyor...`);
  
  const cleanedCompanies: NewFintechCompany[] = [];
  let campaignFileCount = 0;
  
  for (const company of companies) {
    // Kampanyaları ayrı dosyaya yaz
    if (company.campaigns && company.campaigns.length > 0) {
      const campaignPath = join(campaignsDir, `${company.id}.json`);
      await writeFile(campaignPath, JSON.stringify(company.campaigns, null, 2), 'utf-8');
      campaignFileCount++;
      console.log(`✓ ${company.id}.json - ${company.campaigns.length} kampanya`);
    }
    
    // Şirketi temizle (skor ve reportNotes kaldır)
    const cleanedCompany: NewFintechCompany = {
      id: company.id,
      name: company.name,
      status: company.status,
      category: company.category,
      description: company.description
    };
    
    if (company.website && company.website !== '#') {
      cleanedCompany.website = company.website;
    }
    
    if (company.statusNote) {
      cleanedCompany.statusNote = company.statusNote;
    }
    
    if (company.owner) {
      cleanedCompany.owner = company.owner;
    }
    
    if (company.features && company.features.length > 0) {
      cleanedCompany.features = company.features;
    }
    
    if (company.campaigns && company.campaigns.length > 0) {
      cleanedCompany.campaigns = company.campaigns;
    }
    
    // reportNotes varsa note olarak ekle (ama "Sektör lideri" gibi gereksiz notları ekleme)
    if (company.reportNotes && 
        !company.reportNotes.includes('sırada') && 
        company.reportNotes.length > 20) {
      cleanedCompany.note = company.reportNotes;
    }
    
    cleanedCompanies.push(cleanedCompany);
  }
  
  // Temizlenmiş veriyi yaz
  await writeFile(dataPath, JSON.stringify(cleanedCompanies, null, 2), 'utf-8');
  
  console.log('\n========================================');
  console.log(`✓ ${companies.length} şirket temizlendi ve güncellendi.`);
  console.log(`✓ ${campaignFileCount} kampanya dosyası oluşturuldu.`);
  console.log('========================================\n');
}

cleanDataAndExportCampaigns().catch(console.error);
