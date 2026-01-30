import fs from 'fs';
import path from 'path';
import { FintechCompany } from '../src/types';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.resolve(__dirname, '../src/data/fintechs.json');

const knownWebsites: Record<string, string> = {
  "papara": "https://www.papara.com",
  "nays": "https://www.naysapp.com.tr",
  "sipay": "https://www.sipay.com.tr",
  "ozan": "https://www.ozan.com.tr",
  "tosla": "https://www.tosla.com",
  "pep": "https://www.pep.com.tr",
  "aodeme": "https://www.aodeme.com",
  "ahlatci": "https://www.ahlpay.com",
  "asodeme": "https://www.moneytolia.com",
  "beeso": "https://www.beeso.com.tr",
  "belbim": "https://www.istanbulkart.istanbul",
  "bpn": "https://www.bpn.com.tr",
  "bsm": "https://www.bsmpays.com",
  "hepsipay": "https://www.hepsipay.com",
  "dinamik": "https://www.posdinamik.com.tr",
  "dgpara": "https://www.dgpara.com",
  "dsm": "https://www.dodemepay.com.tr",
  "denizode": "https://www.denizpay.com",
  "faturamatik": "https://www.faturamatik.com.tr",
  "fintlix": "https://www.fintlix.com",
  "fzypay": "https://www.fzypay.com.tr",
  "garantiode": "https://www.garantibbvaodeme.com.tr",
  "gonderal": "https://www.gonderal.com.tr",
  "halk": "https://www.halkepara.com.tr",
  "hayhay": "https://www.hayhay.com",
  "istanbulode": "https://www.istanbulodeme.com.tr",
  "iyzi": "https://www.iyzico.com",
  "junomoney": "https://www.junomoney.com",
  "mokaunited": "https://www.moka.com",
  "moneymate": "https://www.moneymate.com.tr",
  "moneyout": "https://www.moneyout.com.tr",
  "moneypay": "https://www.moneypay.com.tr",
  "nkolay": "https://www.nkolay.com",
  "nomupay": "https://www.nomupay.com.tr",
  "papel": "https://www.papel.com.tr",
  "parakolay": "https://www.parakolay.com",
  "paratim": "https://www.paratim.com.tr",
  "paraqr": "https://www.paraqr.com",
  "parolapara": "https://www.parolapara.com",
  "payco": "https://www.payco.com.tr",
  "payporter": "https://www.payporter.com.tr",
  "paytr": "https://www.paytr.com",
  "pep_p": "https://www.pep.com.tr",
  "pokus_t": "https://www.pokus.com.tr",
  "pratikislem": "https://www.pratikislem.com.tr",
  "qpay": "https://www.qnb.com.tr/qpay",
  "rubik": "https://www.rubikpara.com",
  "sbm_f": "https://www.sbmep.com.tr",
  "token": "https://www.tokenpay.com.tr",
  "hadi_t": "https://www.hadiapp.com",
  "param_t": "https://www.param.com.tr",
  "uption_t": "https://www.uption.com.tr",
  "vakif_t": "https://www.vakifpay.com.tr",
  "vepara": "https://www.vepara.com.tr",
  "vizyon": "https://www.vizyonpay.com.tr",
  "vodafone_t": "https://www.vodafone.com.tr/vodafone-pay",
  "yemekpay_t": "https://www.yemekpay.com",
  "ziraat_t": "https://www.ziraatpay.com.tr",
  "1000pay": "https://www.binodeme.com",
  "ininal": "https://www.ininal.com"
};

function updateWebsites() {
  const data: FintechCompany[] = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));

  const updatedData = data.map(company => {
    // Eğer hali hazırda geçerli bir web sitesi varsa ve bilinenlerde yoksa dokunma
    // Ama bilinenlerde varsa güncelle (daha güncel olabilir)
    if (knownWebsites[company.id]) {
      return { ...company, website: knownWebsites[company.id] };
    }

    // Eğer web sitesi yoksa Google arama parametresi ekle
    if (!company.website) {
      const searchQuery = encodeURIComponent(`${company.name} resmi web sitesi`);
      return {
        ...company,
        website: `https://www.google.com/search?q=${searchQuery}`
      };
    }

    return company;
  });

  fs.writeFileSync(DATA_PATH, JSON.stringify(updatedData, null, 2), 'utf-8');
  console.log('Web siteleri başarıyla güncellendi.');
}

updateWebsites();
