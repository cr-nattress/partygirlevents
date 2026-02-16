export interface LeadData {
  name: string;
  email: string;
  phone?: string;
  weddingType: string;
  guestCount?: string;
  weddingDate?: string;
  venue?: string;
  budgetRange?: string;
  location?: string;
  notes?: string;
  source: string;
  utmParams?: Record<string, string>;
}

export interface CRMResult {
  success: boolean;
  contactId?: string;
  error?: string;
}

export interface CRMProvider {
  createOrUpdateContact(data: LeadData): Promise<CRMResult>;
}
