export type EventType = 'bodas' | 'corporativos' | 'privados' | 'festivales';

export interface EventServiceItem {
  id: string;
  slug: string;
  type: EventType;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  badge: string;
  image: string;
  capacity: string;
  recommendedDuration: string;
  highlights: string[];
  includes: string[];
  recommendedCocktails: string[];
}
