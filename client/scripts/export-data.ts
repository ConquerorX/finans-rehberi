import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, '../src/data/fintechs.json');
const EXPORT_DIR = path.join(__dirname, '../exported_data');

async function exportData() {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    const fintechs = JSON.parse(data);

    // Ana klasörü oluştur
    await fs.mkdir(EXPORT_DIR, { recursive: true });

    // Tüm veriyi tek dosyada dışa aktar (zaten fintechs.json bu)
    
    // Her şirketi ayrı JSON olarak dışa aktar (düzenlemeyi kolaylaştırır)
    const splitDir = path.join(EXPORT_DIR, 'companies');
    await fs.mkdir(splitDir, { recursive: true });

    for (const company of fintechs) {
      const fileName = `${company.id}.json`;
      await fs.writeFile(
        path.join(splitDir, fileName),
        JSON.stringify(company, null, 2),
        'utf-8'
      );
    }

    console.log(`✅ Tüm veriler ${EXPORT_DIR} klasörüne aktarıldı.`);
    console.log(`📁 Her şirket için ayrı JSON dosyaları: ${splitDir}`);
  } catch (error) {
    console.error('❌ Dışa aktarma hatası:', error);
  }
}

exportData();
