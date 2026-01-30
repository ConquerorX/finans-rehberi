import type { Status, Category, BankCategory } from "../types";

export const getStatusColor = (status: Status): string => {
  switch (status) {
    case "active":
      return "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30";
    case "limited":
      return "bg-amber-500/15 text-amber-400 border border-amber-500/30";
    case "suspended":
    case "revoked":
      return "bg-red-500/15 text-red-400 border border-red-500/30";
    default:
      return "bg-slate-500/15 text-slate-400 border border-slate-500/30";
  }
};

export const getStatusLabel = (status: Status): string => {
  switch (status) {
    case "active": return "E-Para Kuruluşu";
    case "limited": return "Ödeme Kuruluşu";
    case "suspended": return "Durduruldu";
    case "revoked": return "İptal Edildi";
    default: return "Bilinmiyor";
  }
};

export const getCategoryLabel = (category: Category): string => {
  switch (category) {
    case "super-app": return "Dijital Cüzdan";
    case "bank-subsidiary": return "Banka İştiraki";
    case "telco": return "Telekom İştiraki";
    case "b2b": return "Kurumsal Çözümler";
    case "remittance": return "Para Transferi";
    case "niche": return "Özel Amaçlı";
    default: return "Diğer";
  }
};

export const getBankCategoryLabel = (category: BankCategory): string => {
  switch (category) {
    case "public": return "Kamu Bankası";
    case "private": return "Özel Banka";
    case "foreign": return "Yabancı Banka";
    case "participation": return "Katılım Bankası";
    case "development": return "Kalkınma Bankası";
    default: return "Diğer";
  }
};

export const getBankCategoryColor = (category: BankCategory): string => {
  switch (category) {
    case "public": 
      return "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30";
    case "private": 
      return "bg-teal-500/15 text-teal-400 border border-teal-500/30";
    case "foreign": 
      return "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30";
    case "participation": 
      return "bg-green-500/15 text-green-400 border border-green-500/30";
    case "development": 
      return "bg-lime-500/15 text-lime-400 border border-lime-500/30";
    default: 
      return "bg-slate-500/15 text-slate-400 border border-slate-500/30";
  }
};
