import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { FintechCompany } from '../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FINTECHS_PATH = path.resolve(__dirname, '../src/data/fintechs.json');
const TODEB_PATH = path.resolve(__dirname, '../../bilgiler.json');

interface TodebCompany {
  company_name: string;
  phone: string;
  address: string;
  website: string;
  note: string | null;
}

const companyMapping: Record<string, string> = {
  "1000 Ödeme Hizmetleri ve Elektronik Para A.Ş.": "1000pay",
  "A Ödeme ve Elektronik Para Hizmetleri A.Ş.": "aodeme",
  "Ahlatcı Ödeme ve Elektronik Para Hizmetleri A.Ş.": "ahlatci",
  "Aköde Elektronik Para ve Ödeme Hizmetleri A.Ş.": "tosla",
  "As Ödeme Hizmetleri ve Elektronik Para A.Ş.": "asodeme",
  "Beeso Elektronik Para ve Ödeme Kuruluşu A.Ş.": "beeso",
  "Belbim Elektronik Para ve Ödeme Hizmetleri A.Ş.": "belbim",
  "BPN Ödeme ve Elektronik Para Hizmetleri A. Ş.": "bpn",
  "BSM Ödeme Hizmetleri ve Elektronik Para A.Ş.": "bsm",
  "D Ödeme Elektronik Para ve Ödeme Hizmetleri A.Ş.": "hepsipay",
  "Denizöde Elektronik Para ve Ödeme Hizmetleri A. Ş.": "denizode",
  "Dgpara Ödeme ve Elektronik Para Kuruluşu A.Ş.": "dgpara",
  "Dinamik Elektronik Para ve Ödeme Hizmetleri A.Ş.": "dinamik",
  "DSM Ödeme ve Elektronik Para Hizmetleri A.Ş.": "dsm",
  "Erpa Ödeme Hizmetleri ve Elektronik Para A. Ş.": "erpa",
  "Faturamatik Elektronik Para ve Ödeme Kuruluşu A.Ş.": "faturamatik",
  "Fintlix Elektronik Para ve Ödeme Hizmetleri A.Ş.": "fintlix",
  "Fzypay Elektronik Para ve Ödeme Hizmetleri A.Ş.": "fzypay",
  "Garanti Ödeme ve Elektronik Para Hizmetleri A.Ş.": "garantiode",
  "Gönderal Elektronik Para ve Ödeme Hizmetleri A.Ş.": "gonderal",
  "Halk Elektronik Para ve Ödeme Hizmetleri A.Ş.": "halk",
  "Hayhay Elektronik Para ve Ödeme Hizmetleri A.Ş.": "hayhay",
  "İstanbul Ödeme ve Elektronik Para A.Ş.": "istanbulode",
  "İyzi Ödeme ve Elektronik Para Hizmetleri A.Ş.": "iyzi",
  "Junomoney Elektronik Para ve Ödeme Hizmetleri A.Ş.": "junomoney",
  "Lydians Elektronik Para ve Ödeme Hizmetleri A.Ş.": "lydians",
  "Moka United Ödeme Hizmetleri ve Elektronik Para Kuruluşu A.Ş.": "mokaunited",
  "Moneymate Elektronik Para ve Ödeme Hizmetleri A.Ş.": "moneymate",
  "Moneyout Elektronik Para ve Ödeme Hizmetleri A.Ş.": "moneyout",
  "Moneypay Ödeme ve Elektronik Para Hizmetleri A.Ş.": "moneypay",
  "N Kolay Ödeme ve Elektronik Para Kuruluşu A.Ş.": "nkolay",
  "Nomu Pay Ödeme ve Elektronik Para Hizmetleri A.Ş.": "nomupay",
  "Ozan Elektronik Para A.Ş.": "ozan",
  "Paladyum Elektronik Para ve Ödeme Hizmetleri A.Ş.": "pep",
  "Papel Elektronik Para ve Ödeme Hizmetleri A.Ş.": "papel",
  "Parakolay Elektronik Para A.Ş.": "parakolay",
  "ParaQR Elektronik Para ve Ödeme Hizmetleri A.Ş.": "paraqr",
  "Paratim Ödeme ve Elektronik Para Kuruluşu A.Ş.": "paratim",
  "Parolapara Elektronik Para ve Ödeme Hizmetleri A.Ş.": "parolapara",
  "Payco Elektronik Para ve Ödeme Hizmetleri A.Ş.": "payco",
  "Payporter Ödeme Hizmetleri ve Elektronik Para A.Ş": "payporter",
  "Paytr Ödeme ve Elektronik Para Kuruluşu A.Ş.": "paytr",
  "Pratik İşlem Ödeme ve Elektronik Para A.Ş.": "pratikislem",
  "Qpay Elektronik Para ve Ödeme Hizmetleri A.Ş.": "qpay",
  "Rubik Elektronik Para ve Ödeme Hizmetleri A.Ş.": "rubik",
  "SBM Elektronik Para ve Ödeme Kuruluşu A.Ş.": "sbm_f",
  "Sipay Elektronik Para ve Ödeme Hizmetleri A.Ş.": "sipay",
  "Token Ödeme Hizmetleri ve Elektronik Para A.Ş.": "token",
  "Tom Pay Elektronik Para ve Ödeme Hizmetleri A.Ş.": "hadi_t",
  "TT Ödeme ve Elektronik Para Hizmetleri A.Ş.": "pokus_t",
  "TTM Elektronik Para ve Ödeme Hizmetleri A.Ş.": "ttm",
  "Turk Elektronik Para A.Ş.": "param_t",
  "Turkcell Ödeme ve Elektronik Para Hizmetleri A.Ş.": "paycell_t",
  "Turkonay Elektronik Para ve Ödeme Hizmetleri A.Ş.": "turkonay",
  "Türk Hava Yolları Elektronik Para ve Ödeme Hizmetleri A.Ş.": "thy_t",
  "UPT Ödeme Hizmetleri ve Elektronik Para A.Ş.": "uption_t",
  "Vakıf Elektronik Para ve Ödeme Hizmetleri A.Ş.": "vakif_t",
  "Vepara Elektronik Para ve Ödeme Hizmetleri A.Ş.": "vepara",
  "Vizyon Elektronik Para ve Ödeme Hizmetleri A.Ş.": "vizyon",
  "Vodafone Elektronik Para ve Ödeme Hizmetleri A.Ş.": "vodafone_t",
  "Yemekpay Elektronik Para ve Ödeme Hizmetleri A.Ş.": "yemekpay_t",
  "Ziraat Finansal Teknolojiler Elektronik Para ve Ödeme Hizmetleri A.Ş.": "ziraat_t"
};

function normalizeUrl(url: string): string {
  if (!url) return '';
  let normalized = url.trim();
  if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
    normalized = 'https://' + normalized;
  }
  return normalized;
}

function syncData() {
  const fintechs: FintechCompany[] = JSON.parse(fs.readFileSync(FINTECHS_PATH, 'utf-8'));
  const todebData: TodebCompany[] = JSON.parse(fs.readFileSync(TODEB_PATH, 'utf-8'));

  const fintechMap = new Map<string, FintechCompany>();
  fintechs.forEach(f => fintechMap.set(f.id, f));

  const missingCompanies: string[] = [];
  const suspendedCompanies: string[] = [];
  let updatedCount = 0;

  todebData.forEach(todeb => {
    const mappedId = companyMapping[todeb.company_name];
    
    if (!mappedId) {
      missingCompanies.push(todeb.company_name);
      return;
    }

    const existing = fintechMap.get(mappedId);
    if (existing) {
      existing.phone = todeb.phone;
      existing.address = todeb.address;
      existing.website = normalizeUrl(todeb.website);
      
      if (todeb.note) {
        existing.statusNote = todeb.note;
        if (todeb.note.includes('faaliyet izni geçici olarak durdurulmuştur') || 
            todeb.note.includes('TMSF') || 
            todeb.note.includes('kayyım')) {
          existing.status = 'suspended';
          suspendedCompanies.push(existing.name);
        }
      }
      
      updatedCount++;
    } else {
      missingCompanies.push(`${todeb.company_name} (mapped to ${mappedId} but not found)`);
    }
  });

  const updatedFintechs = Array.from(fintechMap.values());
  fs.writeFileSync(FINTECHS_PATH, JSON.stringify(updatedFintechs, null, 2), 'utf-8');

  console.log(`\n✅ ${updatedCount} şirket güncellendi.`);
  
  if (suspendedCompanies.length > 0) {
    console.log(`\n⚠️ Faaliyeti durdurulan şirketler (${suspendedCompanies.length}):`);
    suspendedCompanies.forEach(c => console.log(`  - ${c}`));
  }
  
  if (missingCompanies.length > 0) {
    console.log(`\n❌ Eşleşme bulunamayan şirketler (${missingCompanies.length}):`);
    missingCompanies.forEach(c => console.log(`  - ${c}`));
  }
}

syncData();
