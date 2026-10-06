export interface QuoteRequest {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  date: string;
  guests: number | string;
  location: string;
  message?: string;
  cocktailsInterest?: string[];
  budgetRange?: string;
}

export interface ContactSubmissionState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  referenceNumber?: string;
  message?: string;
}
