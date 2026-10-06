import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CocktailService } from '../../core/services/cocktail.service';
import { SeoService } from '../../core/services/seo.service';
import { CocktailCategory } from '../../core/models/cocktail.model';
import { CategoryFilterComponent } from '../../shared/components/category-filter/category-filter.component';
import { CocktailCardComponent } from '../../shared/components/cocktail-card/cocktail-card.component';
import { CtaSectionComponent } from '../../shared/components/cta-section/cta-section.component';

@Component({
  selector: 'app-cocktails-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CategoryFilterComponent,
    CocktailCardComponent,
    CtaSectionComponent
  ],
  template: `
    <main class="cocktails-page">
      <!-- Header de la página -->
      <section class="page-header">
        <div class="container text-center">
          <span class="badge">COLECCIÓN DE MIXOLOGÍA</span>
          <h1 class="page-title">Carta de Cócteles para Eventos</h1>
          <p class="page-subtitle">
            Explora nuestras creaciones de autor, reinterpretaciones de clásicos y mocktails botánicos sin alcohol diseñados para cautivar a tus invitados.
          </p>
        </div>
      </section>

      <!-- Barra de Filtros y Búsqueda -->
      <section class="section-filters">
        <div class="container">
          <!-- Filtro de Categorías -->
          <app-category-filter
            [categories]="cocktailService.categories"
            [selectedCategory]="cocktailService.selectedCategory()"
            [counts]="categoryCounts()"
            (categoryChange)="onCategorySelected($event)"
          ></app-category-filter>

          <!-- Barra de Búsqueda y Filtro de Perfil -->
          <div class="search-and-tags-bar card-glass">
            <div class="search-input-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                [ngModel]="cocktailService.searchQuery()"
                (ngModelChange)="cocktailService.setSearchQuery($event)"
                placeholder="Buscar por nombre, ingrediente (gin, mezcal, café...) o sabor..."
                class="search-input"
                aria-label="Buscar cóctel"
              />
              <button 
                *ngIf="cocktailService.searchQuery()" 
                type="button" 
                class="clear-search-btn"
                (click)="cocktailService.setSearchQuery('')"
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            </div>

            <!-- Chips de Perfil de Sabor -->
            <div class="profile-chips-wrap">
              <span class="profile-label">Perfiles:</span>
              <button
                *ngFor="let profile of cocktailService.allProfiles()"
                type="button"
                class="profile-chip"
                [class.active]="cocktailService.selectedProfile() === profile"
                (click)="toggleProfile(profile)"
              >
                {{ profile }}
              </button>
            </div>
          </div>

          <!-- Resumen de Resultados -->
          <div class="results-summary">
            <p class="results-count">
              Mostrando <strong>{{ cocktailService.filteredCocktails().length }}</strong> de {{ cocktailService.cocktails().length }} cócteles
              <span *ngIf="cocktailService.selectedCategory() !== 'todos'"> en <em>{{ getActiveCategoryName() }}</em></span>
              <span *ngIf="cocktailService.selectedProfile()"> con perfil <em>"{{ cocktailService.selectedProfile() }}"</em></span>
            </p>

            <button 
              *ngIf="isAnyFilterActive()" 
              type="button" 
              class="reset-btn"
              (click)="cocktailService.resetFilters()"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="1 4 1 10 7 10"></polyline>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
              </svg>
              Restablecer filtros
            </button>
          </div>

          <!-- Grid de Cócteles -->
          <div *ngIf="cocktailService.filteredCocktails().length > 0" class="cocktails-grid">
            <app-cocktail-card
              *ngFor="let c of cocktailService.filteredCocktails()"
              [cocktail]="c"
            ></app-cocktail-card>
          </div>

          <!-- Estado Vacío (Empty State) -->
          <div *ngIf="cocktailService.filteredCocktails().length === 0" class="empty-state card-glass">
            <div class="empty-icon">🍸</div>
            <h3 class="empty-title">No se encontraron cócteles</h3>
            <p class="empty-desc">
              No hay cócteles que coincidan con los filtros aplicados. Prueba a buscar con otros términos o a restablecer la categoría.
            </p>
            <button type="button" class="btn btn-gold btn-sm mt-3" (click)="cocktailService.resetFilters()">
              Ver toda la carta
            </button>
          </div>
        </div>
      </section>

      <!-- Banner de Personalización de Carta -->
      <section class="section custom-menu-banner">
        <div class="container">
          <div class="custom-card card-glass">
            <div class="custom-text">
              <span class="badge">SERVICIO A MEDIDA</span>
              <h2 class="custom-title">¿Quieres un cóctel personalizado para tu evento?</h2>
              <p class="custom-desc">
                Diseñamos cócteles de autor exclusivos basados en la historia de los novios, los colores corporativos de tu marca o tus destilados favoritos.
              </p>
            </div>
            <a routerLink="/contacto" class="btn btn-gold btn-lg">
              Crear carta personalizada
            </a>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <app-cta-section
        badge="BARRA LIBRE PREMIUM"
        title="Elige tu selección de cócteles y solicita presupuesto"
        description="Nos encargamos de todo el montaje, insumos frescos, cristalería labrada y bartenders para que solo te dediques a brindar."
      ></app-cta-section>
    </main>
  `,
  styles: [`
    .cocktails-page {
      padding-bottom: 3rem;
    }

    .page-header {
      padding: 4.5rem 0 2.5rem;
      background: radial-gradient(circle at 50% 20%, rgba(212, 175, 55, 0.08) 0%, transparent 60%);
    }

    .page-title {
      font-size: clamp(2.4rem, 5vw, 4rem);
      font-family: var(--font-serif);
      margin: 0.85rem 0 1rem;
      color: #ffffff;
    }

    .page-subtitle {
      font-size: 1.1rem;
      color: var(--text-secondary);
      max-width: 680px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .section-filters {
      padding-bottom: 4rem;
    }

    .search-and-tags-bar {
      padding: 1.5rem;
      margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .search-input-wrap {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      background: rgba(11, 12, 14, 0.7);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 0.75rem 1.25rem;
      transition: all var(--transition-fast);

      &:focus-within {
        border-color: var(--accent-gold);
        background: rgba(11, 12, 14, 0.95);
      }
    }

    .search-input {
      background: transparent;
      border: none;
      outline: none;
      width: 100%;
      color: var(--text-primary);
      font-size: 0.95rem;

      &::placeholder {
        color: var(--text-dimmed);
      }
    }

    .clear-search-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 1.1rem;
      padding: 0 0.25rem;

      &:hover {
        color: var(--accent-gold);
      }
    }

    .profile-chips-wrap {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;

      .profile-label {
        font-size: 0.8rem;
        font-weight: 700;
        text-transform: uppercase;
        color: var(--text-dimmed);
        margin-right: 0.4rem;
      }
    }

    .profile-chip {
      padding: 0.35rem 0.85rem;
      font-size: 0.8rem;
      border-radius: var(--radius-pill);
      background: rgba(255, 255, 255, 0.04);
      color: var(--text-secondary);
      border: 1px solid var(--border-subtle);
      cursor: pointer;
      transition: all var(--transition-fast);

      &:hover {
        background: rgba(255, 255, 255, 0.08);
        color: var(--text-primary);
      }

      &.active {
        background: rgba(212, 175, 55, 0.2);
        color: var(--accent-gold);
        border-color: var(--accent-gold);
        font-weight: 600;
      }
    }

    .results-summary {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      font-size: 0.9rem;
      color: var(--text-muted);

      @media (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
      }

      strong {
        color: var(--text-primary);
      }

      em {
        color: var(--accent-gold);
        font-style: normal;
      }
    }

    .reset-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: transparent;
      border: none;
      color: var(--accent-gold);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    .cocktails-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }

    // Empty state
    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .empty-icon {
      font-size: 3rem;
    }

    .empty-title {
      font-size: 1.8rem;
      font-family: var(--font-serif);
      color: var(--text-primary);
    }

    .empty-desc {
      font-size: 0.95rem;
      color: var(--text-secondary);
      max-width: 480px;
    }

    // Custom Menu Banner
    .custom-menu-banner {
      padding: 3rem 0;
    }

    .custom-card {
      padding: 3.5rem 3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2.5rem;
      border: 1px solid var(--border-gold);
      border-radius: var(--radius-lg);
      background: linear-gradient(135deg, #181b22 0%, #101217 100%);

      @media (max-width: 900px) {
        flex-direction: column;
        text-align: center;
        padding: 2.5rem 1.5rem;
      }
    }

    .custom-text {
      max-width: 680px;

      .custom-title {
        font-size: clamp(1.8rem, 3.2vw, 2.5rem);
        font-family: var(--font-serif);
        color: var(--text-primary);
        margin: 0.75rem 0 0.5rem;
      }

      .custom-desc {
        font-size: 0.95rem;
        color: var(--text-secondary);
        line-height: 1.6;
      }
    }
  `]
})
export class CocktailsPageComponent implements OnInit {
  readonly cocktailService = inject(CocktailService);
  private readonly seoService = inject(SeoService);
  private readonly route = inject(ActivatedRoute);

  readonly categoryCounts = computed(() => {
    const list = this.cocktailService.cocktails();
    const counts: Record<string, number> = { todos: list.length };
    for (const c of list) {
      counts[c.category] = (counts[c.category] || 0) + 1;
    }
    return counts;
  });

  ngOnInit(): void {
    this.seoService.setSeoData({
      title: 'Carta Completa de Cócteles & Mocktails para Eventos',
      description: 'Descubre nuestra carta de coctelería para eventos: clásicos reinterpretados, cócteles de autor, creaciones botánicas y mocktails sin alcohol 0.0.',
      keywords: 'carta cocteles eventos, negroni bodas, espresso martini barra movil, cocteles sin alcohol eventos'
    });

    // Check query param `cat`
    this.route.queryParams.subscribe(params => {
      if (params['cat']) {
        this.cocktailService.setCategory(params['cat'] as CocktailCategory);
      }
    });
  }

  onCategorySelected(category: CocktailCategory | 'todos'): void {
    this.cocktailService.setCategory(category);
  }

  toggleProfile(profile: string): void {
    const current = this.cocktailService.selectedProfile();
    this.cocktailService.setProfile(current === profile ? null : profile);
  }

  getActiveCategoryName(): string {
    const current = this.cocktailService.selectedCategory();
    const found = this.cocktailService.categories.find(c => c.id === current);
    return found ? found.label : current;
  }

  isAnyFilterActive(): boolean {
    return this.cocktailService.selectedCategory() !== 'todos' || 
           this.cocktailService.searchQuery() !== '' || 
           this.cocktailService.selectedProfile() !== null;
  }
}
