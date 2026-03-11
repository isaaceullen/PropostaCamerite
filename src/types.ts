export type ItemType = 'mensal' | 'unico';

export interface ProposalItem {
  id: number;
  desc: string;
  type: ItemType;
  unit: string;
  unitPrice: number;
  quantity: number;
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
}
