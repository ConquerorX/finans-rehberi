import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { FintechCompany, Campaign } from '../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FINTECHS_PATH = path.resolve(__dirname, '../src/data/fintechs.json');

// Morpara kampanyaları
const morparaCampaigns: Campaign[] = [
  {
    merchant: "Avrupa Transferi",
    offer: "200 TL Nakit İade",
    terms: "Avrupa hesaplarına transfer",
    category: "other",
    detail: "Morpara mobil uygulamasından Avrupa hesaplarına para gönderme ve alma işlemlerinde 200 TL nakit iade fırsatı."
  },
  {
    merchant: "Türk Hava Yolları",
    offer: "500 TL İndirim",
    terms: "TROY sanal kart ile",
    category: "travel",
    detail: "Morpara TROY sanal kart ile Türk Hava Yolları'ndan bilet alımlarında 500 TL indirim fırsatı."
  },
  {
    merchant: "MoneyGram",
    offer: "200 TL Nakit İade",
    terms: "Yurt dışı transfer",
    category: "other",
    detail: "Morpara kullanıcılarına Moneygram işlemlerinde 200 TL nakit iade avantajı."
  },
  {
    merchant: "Avrupa & UK Transfer",
    offer: "Ücretsiz Transfer",
    terms: "Komisyon yok",
    category: "other",
    detail: "Avrupa ve Birleşik Krallık hesaplarına para gönderirken ve alırken işlem ücreti ve komisyon alınmaz."
  }
];

// AHL Pay kampanyaları
const ahlPayCampaigns: Campaign[] = [
  {
    merchant: "Martı",
    offer: "200 TL Kupon",
    terms: "31.03.2026'ya kadar",
    category: "travel",
    detail: "Masterpass'e kayıtlı Mastercard ile masterpassplus.com üzerinden 200 TL Martı kuponu kazanın. Scooter, Mobilet ve Moped sürüşlerinde geçerli."
  },
  {
    merchant: "Altın Al",
    offer: "Nakit Hediye",
    terms: "Belirli altın ürünlerinde",
    category: "shopping",
    detail: "1 Gr Altın, 1 Gr Bebek 24 Ayar, 50 Gr ve 100 Gr Gümüş dışındaki altın alımlarında harcama bakiyesi hediye."
  },
  {
    merchant: "Galataport Dolmuş",
    offer: "%50 İndirim",
    terms: "31.12.2026'ya kadar",
    category: "travel",
    detail: "Mastercard sahipleri için Galataport deniz dolmuşu bilet bedeli 250 TL yerine 125 TL. Günde 4 kez kullanılabilir."
  },
  {
    merchant: "ENUYGUN Uçak",
    offer: "1000 TL İndirim",
    terms: "6000 TL üzeri, 28.02.2026'ya kadar",
    category: "travel",
    detail: "ENUYGUN mobil uygulamasında 6.000 TL ve üzeri uçak bileti alımlarında 1000 TL indirim. Masterpass ile ödeme gerekli."
  },
  {
    merchant: "Pamukkale Turizm",
    offer: "100 TL İndirim",
    terms: "15.03.2026'ya kadar",
    category: "travel",
    detail: "Pamukkale Turizm web ve mobil uygulamasında bilet alımlarında 100 TL indirim. Masterpass ile ödeme gerekli."
  },
  {
    merchant: "Tıkla Gelsin",
    offer: "150 TL İndirim",
    terms: "400 TL üzeri, 31.01.2026'ya kadar",
    category: "food",
    detail: "Burger King, Popeyes, Arby's, Sbarro, Usta Dönerci, Usta Pideci ve Subway'de 400 TL üzeri siparişlerde 150 TL indirim."
  },
  {
    merchant: "Türk Hava Yolları",
    offer: "500 TL İndirim",
    terms: "TROY kart ile, 31.01.2026'ya kadar",
    category: "travel",
    detail: "TROY logolu kartlarla THY bilet alımlarında 500 TL indirim. Yurt içi: TROY500, Yurt dışı: TROY500YD kodunu kullanın."
  },
  {
    merchant: "ENUYGUN Otobüs",
    offer: "150 TL İndirim",
    terms: "İlk bilet, 300 TL üzeri",
    category: "travel",
    detail: "ENUYGUN mobil uygulamasından 300 TL ve üzeri ilk otobüs bileti alımında 150 TL indirim. Metro Turizm hariç."
  },
  {
    merchant: "Teknosa",
    offer: "%3 Nakit İade",
    terms: "AHL Pay ile ödeme",
    category: "shopping",
    detail: "Teknosa alışverişlerinde %3 nakit iade kazanın."
  },
  {
    merchant: "A-101",
    offer: "%3 Nakit İade",
    terms: "AHL Pay ile ödeme",
    category: "shopping",
    detail: "A-101 marketlerinde %3 nakit iade kazanın."
  },
  {
    merchant: "CarrefourSA",
    offer: "%4 Nakit İade",
    terms: "AHL Pay ile ödeme",
    category: "shopping",
    detail: "CarrefourSA marketlerinde %4 nakit iade kazanın."
  },
  {
    merchant: "Mavi",
    offer: "%10 Nakit İade",
    terms: "AHL Pay ile ödeme",
    category: "shopping",
    detail: "Mavi mağazalarında %10 nakit iade kazanın."
  },
  {
    merchant: "Koton",
    offer: "%10 Nakit İade",
    terms: "AHL Pay ile ödeme",
    category: "shopping",
    detail: "Koton mağazalarında %10 nakit iade kazanın."
  },
  {
    merchant: "FLO",
    offer: "%10 Nakit İade",
    terms: "AHL Pay ile ödeme",
    category: "shopping",
    detail: "FLO mağazalarında %10 nakit iade kazanın."
  },
  {
    merchant: "Madame Coco",
    offer: "%5 Nakit İade",
    terms: "AHL Pay ile ödeme",
    category: "shopping",
    detail: "Madame Coco mağazalarında %5 nakit iade kazanın."
  }
];

function addCampaigns() {
  const fintechs: FintechCompany[] = JSON.parse(fs.readFileSync(FINTECHS_PATH, 'utf-8'));

  let morparaUpdated = false;
  let ahlPayUpdated = false;

  fintechs.forEach(company => {
    if (company.name === 'Morpara') {
      company.campaigns = morparaCampaigns;
      morparaUpdated = true;
    }
    if (company.name === 'AHL Pay') {
      company.campaigns = ahlPayCampaigns;
      ahlPayUpdated = true;
    }
  });

  fs.writeFileSync(FINTECHS_PATH, JSON.stringify(fintechs, null, 2), 'utf-8');

  console.log('\n✅ Kampanyalar eklendi:');
  if (morparaUpdated) console.log(`  - Morpara: ${morparaCampaigns.length} kampanya`);
  if (ahlPayUpdated) console.log(`  - AHL Pay: ${ahlPayCampaigns.length} kampanya`);
}

addCampaigns();
