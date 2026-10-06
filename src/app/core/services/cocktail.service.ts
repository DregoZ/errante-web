import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, map, catchError, shareReplay } from 'rxjs';
import { Cocktail, CocktailCategory, CategoryInfo } from '../models/cocktail.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private readonly http = inject(HttpClient);
  private readonly contentUrl = 'assets/content/cocktails.json';

  // Signals for state
  readonly cocktails = signal<Cocktail[]>([]);
  readonly selectedCategory = signal<CocktailCategory | 'todos'>('todos');
  readonly searchQuery = signal<string>('');
  readonly selectedProfile = signal<string | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  readonly categories: CategoryInfo[] = [
    { id: 'todos', label: 'Todos', description: 'Nuestra colección completa de coctelería para eventos' },
    { id: 'clasicos', label: 'Clásicos', description: 'Reinterpretaciones sublimes de los tragos más icónicos' },
    { id: 'autor', label: 'De Autor', description: 'Creaciones exclusivas de nuestra factoría de sabores' },
    { id: 'fresh', label: 'Fresh & Cítricos', description: 'Tragos vibrantes, botánicos y chispeantes' },
    { id: 'tropicales', label: 'Tropicales', description: 'Mezclas exóticas con frutas frescas y rones del mundo' },
    { id: 'sin-alcohol', label: 'Sin Alcohol 0.0', description: 'Mocktails gastronómicos de alta sofisticación' }
  ];

  readonly allProfiles = computed(() => {
    const profiles = new Set<string>();
    for (const c of this.cocktails()) {
      for (const p of c.profile) {
        profiles.add(p);
      }
    }
    return Array.from(profiles);
  });

  readonly filteredCocktails = computed(() => {
    const list = this.cocktails();
    const category = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();
    const profile = this.selectedProfile();

    return list.filter(item => {
      const matchCategory = category === 'todos' || item.category === category;
      const matchQuery = !query || 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) ||
        item.tagline.toLowerCase().includes(query) ||
        item.tags.some(t => t.toLowerCase().includes(query)) ||
        item.ingredients.some(i => (typeof i === 'string' ? i : i.name).toLowerCase().includes(query));
      const matchProfile = !profile || item.profile.includes(profile);

      return matchCategory && matchQuery && matchProfile;
    });
  });

  readonly featuredCocktails = computed(() => {
    return this.cocktails().filter(c => c.featured);
  });

  private cache$: Observable<Cocktail[]> | null = null;

  constructor() {
    this.loadCocktails().subscribe();
  }

  loadCocktails(): Observable<Cocktail[]> {
    if (this.cocktails().length > 0) {
      return of(this.cocktails());
    }

    if (!this.cache$) {
      this.isLoading.set(true);
      this.cache$ = this.http.get<Cocktail[]>(this.contentUrl).pipe(
        tap(data => {
          this.cocktails.set(data);
          this.isLoading.set(false);
          this.error.set(null);
        }),
        catchError(err => {
          console.error('Error loading cocktails:', err);
          this.isLoading.set(false);
          this.error.set('No se pudo cargar la carta de cócteles.');
          return of([]);
        }),
        shareReplay(1)
      );
    }

    return this.cache$;
  }

  getCocktailBySlug(slug: string): Observable<Cocktail | undefined> {
    return this.loadCocktails().pipe(
      map(list => list.find(c => c.slug === slug))
    );
  }

  getRelatedCocktails(currentSlug: string, limit: number = 3): Observable<Cocktail[]> {
    return this.loadCocktails().pipe(
      map(list => {
        const current = list.find(c => c.slug === currentSlug);
        if (!current) return list.slice(0, limit);

        return list
          .filter(c => c.slug !== currentSlug)
          .sort((a, b) => {
            const aSameCat = a.category === current.category ? 1 : 0;
            const bSameCat = b.category === current.category ? 1 : 0;
            return bSameCat - aSameCat;
          })
          .slice(0, limit);
      })
    );
  }

  setCategory(category: CocktailCategory | 'todos'): void {
    this.selectedCategory.set(category);
  }

  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  setProfile(profile: string | null): void {
    this.selectedProfile.set(profile);
  }

  resetFilters(): void {
    this.selectedCategory.set('todos');
    this.searchQuery.set('');
    this.selectedProfile.set(null);
  }
}
