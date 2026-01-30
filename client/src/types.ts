export type Status = "active" | "limited" | "suspended" | "revoked" | "unknown";
export type Category = "super-app" | "b2b" | "bank-subsidiary" | "telco" | "niche" | "remittance" | "other";
export type BankCategory = "public" | "private" | "foreign" | "participation" | "development";

export interface Campaign {
  merchant: string;
  offer: string;
  terms?: string;
  category: "entertainment" | "food" | "shopping" | "travel" | "other";
  detail?: string;
}

export interface FintechCompany {
  id: string;
  name: string;
  legalName?: string;
  website?: string;
  phone?: string;
  address?: string;
  logoUrl?: string;
  status: Status;
  statusNote?: string;
  category: Category;
  owner?: string;
  description: string;
  features?: string[];
  campaigns?: Campaign[];
  note?: string;
}

export interface Bank {
  id: string;
  name: string;
  legalName?: string;
  website?: string;
  phone?: string;
  address?: string;
  logoUrl?: string;
  status: Status;
  statusNote?: string;
  category: BankCategory;
  owner?: string;
  description: string;
  features?: string[];
  campaigns?: Campaign[];
  note?: string;
}
