// Shared quote storage — localStorage-based CRM helpers
// Imported by both Quote.tsx (write) and Admin.tsx (read/write)

export interface QuoteRecord {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  city: string;
  notes: string;
  products: { product: string; brand: string; size: string; qty: string }[];
  status: 'new' | 'contacted' | 'closed' | 'cancelled';
}

export const STORAGE_KEY = 'solymanysteel_quotes';

export const loadQuotes = (): QuoteRecord[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

export const saveQuote = (
  q: Omit<QuoteRecord, 'id' | 'createdAt' | 'status'>,
): QuoteRecord => {
  const quotes = loadQuotes();
  const record: QuoteRecord = {
    ...q,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  quotes.unshift(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
  return record;
};

export const updateQuoteStatus = (
  id: string,
  status: QuoteRecord['status'],
): void => {
  const updated = loadQuotes().map((q) =>
    q.id === id ? { ...q, status } : q,
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const deleteQuote = (id: string): void => {
  const updated = loadQuotes().filter((q) => q.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const clearAllQuotes = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
