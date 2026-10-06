import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryItem } from '../../../core/models/site-content.model';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gallery-wrapper">
      <div class="gallery-grid">
        <div 
          *ngFor="let item of items" 
          class="gallery-item"
          [ngClass]="'aspect-' + (item.aspectRatio || 'square')"
          (click)="openLightbox(item)"
          tabindex="0"
          (keydown.enter)="openLightbox(item)"
        >
          <img 
            [src]="item.imageUrl" 
            [alt]="item.title"
            loading="lazy"
            (error)="onImageError($event)"
          />
          <div class="item-overlay">
            <span class="category-tag">{{ item.category }}</span>
            <h4 class="item-title">{{ item.title }}</h4>
            <span class="zoom-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </span>
          </div>
        </div>
      </div>

      <!-- Lightbox Modal -->
      <div 
        *ngIf="selectedItem()" 
        class="lightbox-backdrop" 
        (click)="closeLightbox()"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="selectedItem()?.title"
      >
        <div class="lightbox-content" (click)="$event.stopPropagation()">
          <button type="button" class="close-btn" (click)="closeLightbox()" aria-label="Cerrar vista ampliada">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <img [src]="selectedItem()?.imageUrl" [alt]="selectedItem()?.title" class="lightbox-image" />
          <div class="lightbox-caption">
            <span class="badge">{{ selectedItem()?.category }}</span>
            <h3 class="lightbox-title">{{ selectedItem()?.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;

      @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 550px) {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }

    .gallery-item {
      position: relative;
      border-radius: var(--radius-md);
      overflow: hidden;
      cursor: pointer;
      background: #0f1013;
      border: 1px solid var(--border-card);
      height: 320px;

      &.aspect-wide {
        grid-column: span 2;
        @media (max-width: 550px) {
          grid-column: span 1;
        }
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .item-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(11, 12, 14, 0.9) 0%, rgba(11, 12, 14, 0.2) 60%, transparent 100%);
        opacity: 0;
        transition: opacity var(--transition-normal);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 1.5rem;
      }

      &:hover {
        border-color: rgba(212, 175, 55, 0.4);

        img {
          transform: scale(1.08);
        }

        .item-overlay {
          opacity: 1;
        }
      }
    }

    .category-tag {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--accent-gold);
      margin-bottom: 0.3rem;
    }

    .item-title {
      font-size: 1.15rem;
      font-family: var(--font-serif);
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .zoom-icon {
      position: absolute;
      top: 14px;
      right: 14px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(11, 12, 14, 0.75);
      border: 1px solid var(--border-gold);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent-gold);
      backdrop-filter: blur(6px);
    }

    // Lightbox
    .lightbox-backdrop {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(8, 9, 11, 0.92);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      animation: fadeIn 0.3s ease;
    }

    .lightbox-content {
      position: relative;
      max-width: 900px;
      width: 100%;
      background: var(--bg-card);
      border: 1px solid var(--border-gold);
      border-radius: var(--radius-md);
      overflow: hidden;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8);
    }

    .close-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      z-index: 10;
      background: rgba(11, 12, 14, 0.8);
      border: 1px solid var(--border-subtle);
      color: var(--text-primary);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-fast);

      &:hover {
        background: var(--accent-gold);
        color: #0b0c0e;
      }
    }

    .lightbox-image {
      width: 100%;
      max-height: 70vh;
      object-fit: cover;
    }

    .lightbox-caption {
      padding: 1.25rem 1.75rem;
      background: var(--bg-card);
    }

    .lightbox-title {
      font-size: 1.4rem;
      font-family: var(--font-serif);
      color: var(--text-primary);
      margin-top: 0.4rem;
    }
  `]
})
export class GalleryComponent {
  @Input({ required: true }) items: GalleryItem[] = [];
  readonly selectedItem = signal<GalleryItem | null>(null);

  openLightbox(item: GalleryItem): void {
    this.selectedItem.set(item);
  }

  closeLightbox(): void {
    this.selectedItem.set(null);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80';
  }
}
