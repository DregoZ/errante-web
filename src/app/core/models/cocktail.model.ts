export type CocktailCategory = 'clasicos' | 'autor' | 'fresh' | 'tropicales' | 'sin-alcohol';

export interface Ingredient {
  name: string;
  amount?: string;
  special?: boolean;
}

export interface Cocktail {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: CocktailCategory;
  profile: string[];
  ingredients: (string | Ingredient)[];
  preparation: string;
  glassware: string;
  iceType: string;
  garnish: string;
  abv: string;
  featured: boolean;
  image: string;
  accentColor?: string;
  tags: string[];
  pairing?: string;
}

export interface CategoryInfo {
  id: CocktailCategory | 'todos';
  label: string;
  description: string;
  icon?: string;
}
