import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CocktailService } from '../../../core/services/cocktail.service';
import { SeoService } from '../../../core/services/seo.service';
import { Cocktail, Ingredient } from '../../../core/models/cocktail.model';
import { CocktailCardComponent } from '../../../shared/components/cocktail-card/cocktail-card.component';
import { CtaSectionComponent } from '../../../shared/components/cta-section/cta-section.component';

@Component({
  selector: 'app-cocktail-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CocktailCardComponent, CtaSectionComponent],
  template: `
    <main class="cocktail-detail-page">
      <div class="container">
        <!-- Barra de Navegación / Breadcrumbs -->
        <nav class="breadcrumb-nav" aria-label="Ruta de navegación">
          <a routerLink="/carta" class="back-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Volver a la carta completa
          </a>
          <span class="crumb-separator">/</span>
          <span class="crumb-current">{{ cocktail()?.name || 'Cargando...' }}</span>
        </nav>

        <!-- Detalle Principal del Cóctel -->
        <div *ngIf="cocktail() as item" class="detail-grid">
          <!-- Columna Izquierda: Imagen Principal -->
          <div class="media-col">
            <div class="image-showcase card-glass">
              <img 
                [src]="item.image" 
                [alt]="item.name + ' - Cóctel de autor para eventos'"
                class="detail-img"
                (error)="onImageError($event)"
              />
              <div class="image-gradient"></div>
              <span class="cat-badge">{{ getCategoryLabel(item.category) }}</span>
              <span class="abv-badge">{{ item.abv }}</span>
            </div>

            <!-- Ficha Técnica Rápida -->
            <div class="tech-specs card-glass">
              <div class="spec-item">
                <span class="spec-label">Cristalería</span>
                <span class="spec-val">{{ item.glassware }}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Tipo de Hielo</span>
                <span class="spec-val">{{ item.iceType }}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Garnish / Decoración</span>
                <span class="spec-val">{{ item.garnish }}</span>
              </div>
            </div>
          </div>

          <!-- Columna Derecha: Información, Receta & Experiencia -->
          <div class="info-col">
            <div class="title-header">
              <div class="tags-row">
                <span *ngFor="let prof of item.profile" class="profile-tag-pill">
                  {{ prof }}
                </span>
              </div>
              <h1 class="item-name">{{ item.name }}</h1>
              <p class="item-tagline">{{ item.tagline }}</p>
            </div>

            <p class="item-description">{{ item.description }}</p>

            <!-- Lista de Ingredientes -->
            <div class="ingredients-box card-glass">
              <h2 class="section-subheading">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2">
                  <path d="M12 2v20"></path>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                Ingredientes & Botánicos
              </h2>
              <ul class="ingredients-list">
                <li *ngFor="let ing of item.ingredients">
                  <span class="ing-name">{{ getIngredientName(ing) }}</span>
                  <span *ngIf="getIngredientAmount(ing)" class="ing-amount">{{ getIngredientAmount(ing) }}</span>
                </li>
              </ul>
            </div>

            <!-- Método de Elaboración -->
            <div class="prep-box card-glass">
              <h2 class="section-subheading">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 14 14"></polyline>
                </svg>
                Técnica & Servicio
              </h2>
              <p class="prep-text">{{ item.preparation }}</p>
            </div>

            <!-- Maridaje & Recomendación de Evento -->
            <div *ngIf="item.pairing" class="pairing-box card-glass">
              <h2 class="section-subheading">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2">
                  <path d="M8 22h8"></path>
                  <path d="M12 11v11"></path>
                  <path d="m19 3-7 8-7-8Z"></path>
                </svg>
                Momento & Maridaje Ideal
              </h2>
              <p class="pairing-text">{{ item.pairing }}</p>
            </div>

            <!-- CTA Directo para este cóctel -->
            <div class="detail-actions">
              <a [routerLink]="['/contacto']" [queryParams]="{ cocktail: item.name }" class="btn btn-gold btn-lg w-full">
                Solicitar este cóctel para mi evento
              </a>
              <a routerLink="/carta" class="btn btn-outline-gold btn-lg w-full">
                Ver más opciones de la carta
              </a>
            </div>
          </div>
        </div>

        <!-- Cócteles Relacionados -->
        <section *ngIf="relatedCocktails().length > 0" class="related-section">
          <h2 class="related-title">Cócteles que también te encantarán</h2>
          <div class="cocktails-grid">
            <app-cocktail-card
              *ngFor="let related of relatedCocktails()"
              [cocktail]="related"
            ></app-cocktail-card>
          </div>
        </section>
      </div>

      <!-- CTA Final -->
      <app-cta-section
        badge="EXPERIENCIA PERSONALIZADA"
        title="¿Deseas degustar esta carta antes de tu boda o evento?"
        description="Ofrecemos sesiones de cata y degustación para diseñar la combinación perfecta de copas y mocktails."
        buttonText="Pedir presupuesto"
      ></app-cta-section>
    </main>
  `,
  styles: [`
    .cocktail-detail-page {
      padding: 3rem 0;
    }

    .breadcrumb-nav {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-bottom: 2.5rem;

      .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        color: var(--accent-gold);
        font-weight: 600;

        &:hover {
          text-decoration: underline;
        }
      }

      .crumb-separator {
        color: var(--text-dimmed);
      }

      .crumb-current {
        color: var(--text-secondary);
      }
    }

    .detail-grid {
      display: grid;
      grid-template-columns: 1fr 1.15fr;
      gap: 3.5rem;
      margin-bottom: 5rem;

      @media (max-width: 960px) {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
    }

    // Media Col
    .media-col {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .image-showcase {
      position: relative;
      height: 480px;
      border-radius: var(--radius-lg);
      overflow: hidden;
      border: 1px solid var(--border-gold);

      @media (max-width: 600px) {
        height: 340px;
      }

      .detail-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .image-gradient {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(11, 12, 14, 0.9) 0%, rgba(11, 12, 14, 0.1) 50%, transparent 100%);
      }

      .cat-badge {
        position: absolute;
        top: 18px;
        left: 18px;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        background: rgba(11, 12, 14, 0.85);
        color: var(--accent-gold);
        border: 1px solid var(--border-gold);
        padding: 0.4rem 0.85rem;
        border-radius: var(--radius-pill);
        backdrop-filter: blur(8px);
      }

      .abv-badge {
        position: absolute;
        top: 18px;
        right: 18px;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        background: linear-gradient(135deg, var(--accent-gold), #b89324);
        color: #0b0c0e;
        padding: 0.4rem 0.85rem;
        border-radius: var(--radius-pill);
      }
    }

    .tech-specs {
      padding: 1.5rem;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      border-radius: var(--radius-md);

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
        gap: 0.8rem;
      }

      .spec-item {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;

        .spec-label {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-dimmed);
        }

        .spec-val {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }
      }
    }

    // Info Col
    .info-col {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .title-header {
      .tags-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }

      .profile-tag-pill {
        display: inline-block;
        padding: 0.3rem 0.75rem;
        font-size: 0.75rem;
        font-weight: 600;
        border-radius: var(--radius-pill);
        background: rgba(212, 175, 55, 0.12);
        color: var(--accent-gold);
        border: 1px solid var(--border-gold);
      }

      .item-name {
        font-size: clamp(2.4rem, 4.5vw, 3.6rem);
        font-family: var(--font-serif);
        color: #ffffff;
        line-height: 1.1;
        margin-bottom: 0.4rem;
      }

      .item-tagline {
        font-size: 1.15rem;
        color: var(--accent-gold);
        font-style: italic;
        line-height: 1.4;
      }
    }

    .item-description {
      font-size: 1.05rem;
      color: var(--text-secondary);
      line-height: 1.65;
    }

    .section-subheading {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.15rem;
      font-family: var(--font-serif);
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    .ingredients-box, .prep-box, .pairing-box {
      padding: 1.5rem;
      border-radius: var(--radius-md);
    }

    .ingredients-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.65rem;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--border-subtle);
        font-size: 0.92rem;

        &:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .ing-name {
          color: var(--text-primary);
        }

        .ing-amount {
          color: var(--accent-copper);
          font-weight: 600;
          font-size: 0.85rem;
        }
      }
    }

    .prep-text, .pairing-text {
      font-size: 0.92rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .detail-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;

      @media (max-width: 600px) {
        flex-direction: column;
      }

      .w-full {
        flex: 1;
      }
    }

    // Related Section
    .related-section {
      padding-top: 3rem;
      margin-bottom: 4rem;
      border-top: 1px solid var(--border-subtle);

      .related-title {
        font-size: 2rem;
        font-family: var(--font-serif);
        color: var(--text-primary);
        margin-bottom: 2rem;
        text-align: center;
      }
    }

    .cocktails-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;

      @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CocktailDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cocktailService = inject(CocktailService);
  private readonly seoService = inject(SeoService);

  readonly cocktail = signal<Cocktail | null>(null);
  readonly relatedCocktails = signal<Cocktail[]>([]);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.loadCocktail(slug);
      }
    });
  }

  private loadCocktail(slug: string): void {
    this.cocktailService.getCocktailBySlug(slug).subscribe(item => {
      if (item) {
        this.cocktail.set(item);

        // Actualizar SEO Dinámico
        this.seoService.setSeoData({
          title: `${item.name} - ${item.tagline}`,
          description: `${item.description} Preparado con ${item.ingredients.map(i => this.getIngredientName(i)).join(', ')}. Ideal para barras de coctelería en eventos.`,
          image: item.image,
          keywords: `${item.name}, cóctel eventos, ${item.profile.join(', ')}, ${item.category}`
        });

        // Schema.org para Cóctel
        this.seoService.setSchemaJsonLd({
          '@context': 'https://schema.org',
          '@type': 'MenuItem',
          name: item.name,
          description: item.description,
          image: item.image,
          suitableForDiet: item.category === 'sin-alcohol' ? 'https://schema.org/HalalDiet' : undefined,
          menuAddOn: item.garnish
        });

        // Cargar cócteles relacionados
        this.cocktailService.getRelatedCocktails(slug, 3).subscribe(related => {
          this.relatedCocktails.set(related);
        });
      } else {
        // Redirigir a carta si el slug no existe
        this.router.navigate(['/carta']);
      }
    });
  }

  getIngredientName(ing: string | Ingredient): string {
    return typeof ing === 'string' ? ing : ing.name;
  }

  getIngredientAmount(ing: string | Ingredient): string {
    return typeof ing === 'string' ? '' : (ing.amount || '');
  }

  getCategoryLabel(category: string): string {
    const map: Record<string, string> = {
      clasicos: 'Clásico Revisitado',
      autor: 'Cóctel de Autor',
      fresh: 'Fresh & Botánico',
      tropicales: 'Tiki & Tropical',
      'sin-alcohol': 'Mocktail 0.0'
    };
    return map[category] || category;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80';
  }
}
