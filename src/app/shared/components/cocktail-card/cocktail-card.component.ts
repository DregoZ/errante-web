import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Cocktail } from '../../../core/models/cocktail.model';

@Component({
  selector: 'app-cocktail-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <article class="cocktail-card card-glass" [routerLink]="['/carta', cocktail.slug]" tabindex="0" (keydown.enter)="navigateToDetail()">
      <div class="image-wrapper">
        <img 
          [src]="cocktail.image" 
          [alt]="'Cóctel ' + cocktail.name + ' para eventos'"
          loading="lazy"
          (error)="onImageError($event)"
        />
        <div class="image-overlay"></div>
        <span class="category-pill">{{ getCategoryLabel(cocktail.category) }}</span>
        <span *ngIf="cocktail.featured" class="featured-badge">Destacado</span>
      </div>

      <div class="content-wrapper">
        <div class="header-info">
          <span class="abv-text">{{ cocktail.abv }}</span>
          <h3 class="cocktail-title">{{ cocktail.name }}</h3>
          <p class="cocktail-tagline">{{ cocktail.tagline }}</p>
        </div>

        <p class="cocktail-desc">{{ cocktail.description }}</p>

        <div class="profile-tags">
          <span *ngFor="let prof of cocktail.profile.slice(0, 3)" class="tag-pill">
            {{ prof }}
          </span>
        </div>

        <div class="card-footer">
          <span class="cta-link">
            Ver receta y detalles
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .cocktail-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      cursor: pointer;
      position: relative;
      border: 1px solid var(--border-card);
      border-radius: var(--radius-md);
      background: var(--bg-card);
      transition: all var(--transition-normal);

      &:hover {
        transform: translateY(-6px);
        border-color: rgba(212, 175, 55, 0.4);
        box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6), 0 0 20px rgba(212, 175, 55, 0.15);

        .image-wrapper img {
          transform: scale(1.06);
        }

        .cta-link {
          color: var(--accent-gold);
          svg {
            transform: translateX(4px);
          }
        }
      }
    }

    .image-wrapper {
      position: relative;
      height: 250px;
      overflow: hidden;
      background: #0f1013;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .image-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(21, 24, 31, 1) 0%, rgba(21, 24, 31, 0.2) 50%, transparent 100%);
      }

      .category-pill {
        position: absolute;
        bottom: 12px;
        left: 14px;
        font-size: 0.72rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        background: rgba(11, 12, 14, 0.85);
        color: var(--accent-gold);
        padding: 0.3rem 0.7rem;
        border-radius: var(--radius-pill);
        border: 1px solid var(--border-gold);
        backdrop-filter: blur(8px);
      }

      .featured-badge {
        position: absolute;
        top: 12px;
        right: 14px;
        font-size: 0.68rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        background: linear-gradient(135deg, var(--accent-gold), #b89324);
        color: #0b0c0e;
        padding: 0.25rem 0.65rem;
        border-radius: var(--radius-pill);
      }
    }

    .content-wrapper {
      padding: 1.4rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .header-info {
      margin-bottom: 0.8rem;
    }

    .abv-text {
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--accent-copper);
      letter-spacing: 0.05em;
      text-transform: uppercase;
      display: block;
      margin-bottom: 0.25rem;
    }

    .cocktail-title {
      font-size: 1.55rem;
      font-family: var(--font-serif);
      color: var(--text-primary);
      margin-bottom: 0.3rem;
      line-height: 1.2;
    }

    .cocktail-tagline {
      font-size: 0.88rem;
      color: var(--accent-gold);
      font-style: italic;
      line-height: 1.35;
    }

    .cocktail-desc {
      font-size: 0.88rem;
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 1.2rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      flex-grow: 1;
    }

    .profile-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 1.2rem;
    }

    .card-footer {
      padding-top: 1rem;
      border-top: 1px solid var(--border-subtle);
    }

    .cta-link {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-secondary);
      transition: color var(--transition-fast);

      svg {
        transition: transform var(--transition-fast);
      }
    }
  `]
})
export class CocktailCardComponent {
  @Input({ required: true }) cocktail!: Cocktail;

  getCategoryLabel(category: string): string {
    const map: Record<string, string> = {
      clasicos: 'Clásico',
      autor: 'De Autor',
      fresh: 'Fresh',
      tropicales: 'Tropical',
      'sin-alcohol': 'Mocktail 0.0'
    };
    return map[category] || category;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80';
  }

  navigateToDetail(): void {
    // Accessible keydown handler
  }
}
