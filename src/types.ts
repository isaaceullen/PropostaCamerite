export type ItemType = 'mensal' | 'unico';
export type ProposalMode = 'anual' | 'loja';

export interface ProposalItem {
  id: number;
  desc: string;
  type: ItemType;
  unit: string;
  unitPrice: number;
  quantity: number;
  acessoPlataforma?: number;
}

export interface ColorSettings {
  headerFooterBg: string;
  tableText: string;
}

export interface ProposalSettings {
  validityDays: number;
  proposalDate: string;
  city: string;
  population: number;
  recipientName?: string;
  cnpj?: string;
  address?: string;
  mode?: ProposalMode;
  storeCount?: number;
}

