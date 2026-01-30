import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { FintechCompany } from '../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FINTECHS_PATH = path.resolve(__dirname, '../src/data/fintechs.json');

// Marka ismi -> Şirket ünvanı eşleştirmesi
// Web sitesi domain adından marka ismini çıkarıyoruz
const brandNames: Record<string, { brand: string; legalName: string }> = {
  "1000pay": { brand: "1000Pay", legalName: "1000 Ödeme Hizmetleri ve Elektronik Para A.Ş." },
  "aodeme": { brand: "Morpara", legalName: "A Ödeme ve Elektronik Para Hizmetleri A.Ş." },
  "ahlatci": { brand: "AHL Pay", legalName: "Ahlatcı Ödeme ve Elektronik Para Hizmetleri A.Ş." },
  "tosla": { brand: "Tosla", legalName: "Aköde Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "asodeme": { brand: "Moneytolia", legalName: "As Ödeme Hizmetleri ve Elektronik Para A.Ş." },
  "beeso": { brand: "Beeso", legalName: "Beeso Elektronik Para ve Ödeme Kuruluşu A.Ş." },
  "belbim": { brand: "İstanbulkart", legalName: "Belbim Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "bpn": { brand: "BPN", legalName: "BPN Ödeme ve Elektronik Para Hizmetleri A.Ş." },
  "bsm": { brand: "BSM Pays", legalName: "BSM Ödeme Hizmetleri ve Elektronik Para A.Ş." },
  "hepsipay": { brand: "Hepsipay", legalName: "D Ödeme Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "denizode": { brand: "DenizPay", legalName: "Denizöde Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "dgpara": { brand: "Dgpara", legalName: "Dgpara Ödeme ve Elektronik Para Kuruluşu A.Ş." },
  "dinamik": { brand: "DinamikPay", legalName: "Dinamik Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "dsm": { brand: "TrendyolPay", legalName: "DSM Ödeme ve Elektronik Para Hizmetleri A.Ş." },
  "erpa": { brand: "Erpapay", legalName: "Erpa Ödeme Hizmetleri ve Elektronik Para A.Ş." },
  "faturamatik": { brand: "Faturamatik", legalName: "Faturamatik Elektronik Para ve Ödeme Kuruluşu A.Ş." },
  "fintlix": { brand: "Fairpay", legalName: "Fintlix Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "fzypay": { brand: "Fzypay", legalName: "Fzypay Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "garantiode": { brand: "Tami", legalName: "Garanti Ödeme ve Elektronik Para Hizmetleri A.Ş." },
  "gonderal": { brand: "Gönderal", legalName: "Gönderal Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "halk": { brand: "Parao", legalName: "Halk Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "hayhay": { brand: "Hayhay", legalName: "Hayhay Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "istanbulode": { brand: "İstPay", legalName: "İstanbul Ödeme ve Elektronik Para A.Ş." },
  "iyzi": { brand: "iyzico", legalName: "İyzi Ödeme ve Elektronik Para Hizmetleri A.Ş." },
  "junomoney": { brand: "Juno Money", legalName: "Junomoney Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "lydians": { brand: "Fups", legalName: "Lydians Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "mokaunited": { brand: "Moka", legalName: "Moka United Ödeme Hizmetleri ve Elektronik Para Kuruluşu A.Ş." },
  "moneymate": { brand: "Moneymate", legalName: "Moneymate Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "moneyout": { brand: "Moneyout", legalName: "Moneyout Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "moneypay": { brand: "Moneypay", legalName: "Moneypay Ödeme ve Elektronik Para Hizmetleri A.Ş." },
  "nkolay": { brand: "N Kolay", legalName: "N Kolay Ödeme ve Elektronik Para Kuruluşu A.Ş." },
  "nomupay": { brand: "Nomu Pay", legalName: "Nomu Pay Ödeme ve Elektronik Para Hizmetleri A.Ş." },
  "ozan": { brand: "Ozan", legalName: "Ozan Elektronik Para A.Ş." },
  "pep": { brand: "Peple", legalName: "Paladyum Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "papel": { brand: "Papel", legalName: "Papel Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "parakolay": { brand: "Parakolay", legalName: "Parakolay Elektronik Para A.Ş." },
  "paraqr": { brand: "ParaQR", legalName: "ParaQR Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "paratim": { brand: "Paratim", legalName: "Paratim Ödeme ve Elektronik Para Kuruluşu A.Ş." },
  "parolapara": { brand: "Parolapara", legalName: "Parolapara Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "payco": { brand: "Payco", legalName: "Payco Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "payporter": { brand: "Payporter", legalName: "Payporter Ödeme Hizmetleri ve Elektronik Para A.Ş." },
  "paytr": { brand: "PayTR", legalName: "Paytr Ödeme ve Elektronik Para Kuruluşu A.Ş." },
  "pratikislem": { brand: "Pratik İşlem", legalName: "Pratik İşlem Ödeme ve Elektronik Para A.Ş." },
  "qpay": { brand: "Qpay", legalName: "Qpay Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "rubik": { brand: "Rubik Para", legalName: "Rubik Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "sbm_f": { brand: "SBM Digital", legalName: "SBM Elektronik Para ve Ödeme Kuruluşu A.Ş." },
  "sipay": { brand: "Sipay", legalName: "Sipay Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "token": { brand: "Oderopay", legalName: "Token Ödeme Hizmetleri ve Elektronik Para A.Ş." },
  "hadi_t": { brand: "TomPay", legalName: "Tom Pay Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "pokus_t": { brand: "Türk Telekom Ödeme", legalName: "TT Ödeme ve Elektronik Para Hizmetleri A.Ş." },
  "ttm": { brand: "Bupara", legalName: "TTM Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "param_t": { brand: "Param", legalName: "Turk Elektronik Para A.Ş." },
  "paycell_t": { brand: "Paycell", legalName: "Turkcell Ödeme ve Elektronik Para Hizmetleri A.Ş." },
  "turkonay": { brand: "Turkonay", legalName: "Turkonay Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "thy_t": { brand: "TK Pay", legalName: "Türk Hava Yolları Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "uption_t": { brand: "UPT", legalName: "UPT Ödeme Hizmetleri ve Elektronik Para A.Ş." },
  "vakif_t": { brand: "Vakıfpay", legalName: "Vakıf Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "vepara": { brand: "Vepara", legalName: "Vepara Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "vizyon": { brand: "Vizyonpay", legalName: "Vizyon Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "vodafone_t": { brand: "Vodafone Pay", legalName: "Vodafone Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "yemekpay_t": { brand: "Yemekpay", legalName: "Yemekpay Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "ziraat_t": { brand: "Ziraatpay", legalName: "Ziraat Finansal Teknolojiler Elektronik Para ve Ödeme Hizmetleri A.Ş." },
  "papara": { brand: "Papara", legalName: "Papara Elektronik Para A.Ş." },
  "nays": { brand: "Nays", legalName: "Türkiye İş Bankası A.Ş." },
  "ininal": { brand: "İninal", legalName: "İninal Ödeme ve Elektronik Para Hizmetleri A.Ş." }
};

function updateBrandNames() {
  const fintechs: FintechCompany[] = JSON.parse(fs.readFileSync(FINTECHS_PATH, 'utf-8'));

  let updatedCount = 0;

  fintechs.forEach(company => {
    const mapping = brandNames[company.id];
    if (mapping) {
      company.name = mapping.brand;
      company.legalName = mapping.legalName;
      updatedCount++;
    }
  });

  fs.writeFileSync(FINTECHS_PATH, JSON.stringify(fintechs, null, 2), 'utf-8');

  console.log(`\n✅ ${updatedCount} şirketin marka ismi güncellendi.`);
}

updateBrandNames();
