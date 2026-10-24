export interface DeckMetric {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface DeckSlide {
  id: string;
  toolId: string;
  toolName: string;
  pillar: string;
  title: string;
  executiveSummary: string;
  keyMetrics: DeckMetric[];
  strategicRecommendations: string[];
  notes: string;
  createdAt: string;
}

const STORAGE_KEY = 'biztools_slide_deck_v1';

export function loadDeckSlides(): DeckSlide[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Provide initial executive default slides
      const defaultSlides: DeckSlide[] = [
        {
          id: 'slide-default-1',
          toolId: 'wardley',
          toolName: 'Wardley Mapping',
          pillar: 'Strategy & Planning',
          title: 'Value Chain Evolution & Commodity Shift',
          executiveSummary: 'Identified critical infrastructure components shifting to commodities. Recommend aggressive divestiture of bespoke compute pipelines in favor of standardized utility APIs.',
          keyMetrics: [
            { label: 'Commodity Pressure', value: 'High (84%)', trend: 'up' },
            { label: 'Bespoke Debt', value: '$2.4M/yr', trend: 'down' },
            { label: 'Horizon', value: 'H2 (18-24 Mo)' }
          ],
          strategicRecommendations: [
            'Migrate custom ingestion pipelines to managed cloud primitives',
            'Redirect 40% engineering capacity to proprietary differentiation layers',
            'Establish open-source standard for industry data exchange'
          ],
          notes: 'Present to Board Audit Committee regarding cloud capital allocation.',
          createdAt: new Date().toISOString()
        },
        {
          id: 'slide-default-2',
          toolId: 'blueocean',
          toolName: 'Blue Ocean Strategy',
          pillar: 'Business Model & Innovation',
          title: 'Uncontested Market Space: Strategy Canvas',
          executiveSummary: 'Eliminated redundant compliance manual reviews and created instant automated verifications to open up the mid-market segment previously deemed unprofitable.',
          keyMetrics: [
            { label: 'Target Margin', value: '72% Gross', trend: 'up' },
            { label: 'CAC Reduction', value: '-38%', trend: 'down' },
            { label: 'Market Canvas Divergence', value: '0.86 / 1.0' }
          ],
          strategicRecommendations: [
            'Eliminate multi-day manual onboarding friction',
            'Reduce enterprise tier configuration overhead',
            'Raise self-serve telemetry transparency for operations teams'
          ],
          notes: 'Key talking points for VP of Growth and Product council.',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSlides));
      return defaultSlides;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load slide deck:', err);
    return [];
  }
}

export function saveDeckSlide(slide: Omit<DeckSlide, 'id' | 'createdAt'>): DeckSlide {
  const slides = loadDeckSlides();
  const newSlide: DeckSlide = {
    ...slide,
    id: `slide-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString()
  };
  const updated = [newSlide, ...slides];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return newSlide;
}

export function removeDeckSlide(slideId: string): DeckSlide[] {
  const slides = loadDeckSlides();
  const updated = slides.filter(s => s.id !== slideId);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function updateDeckSlide(slideId: string, updates: Partial<DeckSlide>): DeckSlide[] {
  const slides = loadDeckSlides();
  const updated = slides.map(s => (s.id === slideId ? { ...s, ...updates } : s));
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function clearDeckSlides(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}
