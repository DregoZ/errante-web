import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventServiceItem } from '../../../core/models/event.model';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <article class="event-card card-glass">
      <div class="image-container">
        <img 
          [src]="eventItem.image" 
          [alt]="'Servicio de coctelería para ' + eventItem.title"
          loading="lazy"
          (error)="onImageError($event)"
        />
        <div class="overlay-grad"></div>
        <span class="event-badge">{{ eventItem.badge }}</span>
      </div>

      <div class="content-container">
        <div class="meta-info">
          <span class="capacity-text">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            {{ eventItem.capacity }}
          </span>
          <span class="duration-text">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {{ eventItem.recommendedDuration }}
          </span>
        </div>

        <h3 class="event-title">{{ eventItem.title }}</h3>
        <p class="event-subtitle">{{ eventItem.subtitle }}</p>
        <p class="event-desc">{{ eventItem.description }}</p>

        <div class="highlights-list">
          <h4 class="highlights-heading">Aspectos destacados:</h4>
          <ul>
            <li *ngFor="let h of eventItem.highlights.slice(0, 3)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>{{ h }}</span>
            </li>
          </ul>
        </div>

        <div class="card-action">
          <a [routerLink]="['/contacto']" [queryParams]="{ event: eventItem.id }" class="btn btn-gold btn-sm w-full">
            Pedir presupuesto para {{ eventItem.title }}
          </a>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .event-card {
      display: flex;
      flex-direction: column;
      border-radius: var(--radius-md);
      overflow: hidden;
      height: 100%;
      transition: all var(--transition-normal);

      &:hover {
        transform: translateY(-6px);
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(212, 175, 55, 0.12);

        .image-container img {
          transform: scale(1.05);
        }
      }
    }

    .image-container {
      position: relative;
      height: 240px;
      overflow: hidden;
      background: #0f1013;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .overlay-grad {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(21, 24, 31, 1) 0%, rgba(21, 24, 31, 0.2) 60%, transparent 100%);
      }

      .event-badge {
        position: absolute;
        top: 14px;
        right: 14px;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        background: rgba(11, 12, 14, 0.85);
        color: var(--accent-gold);
        border: 1px solid var(--border-gold);
        padding: 0.35rem 0.75rem;
        border-radius: var(--radius-pill);
        backdrop-filter: blur(8px);
      }
    }

    .content-container {
      padding: 1.6rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .meta-info {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 0.8rem;
      font-size: 0.78rem;
      color: var(--accent-copper);
      font-weight: 600;

      span {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
      }
    }

    .event-title {
      font-size: 1.65rem;
      font-family: var(--font-serif);
      color: var(--text-primary);
      margin-bottom: 0.25rem;
      line-height: 1.2;
    }

    .event-subtitle {
      font-size: 0.9rem;
      color: var(--accent-gold);
      margin-bottom: 0.9rem;
      font-style: italic;
    }

    .event-desc {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.55;
      margin-bottom: 1.4rem;
    }

    .highlights-list {
      margin-bottom: 1.6rem;
      flex-grow: 1;

      .highlights-heading {
        font-family: var(--font-sans);
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--text-muted);
        margin-bottom: 0.6rem;
      }

      ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;

          svg {
            flex-shrink: 0;
            margin-top: 2px;
          }
        }
      }
    }

    .card-action {
      margin-top: auto;

      .w-full {
        width: 100%;
      }
    }
  `]
})
export class EventCardComponent {
  @Input({ required: true }) eventItem!: EventServiceItem;

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80';
  }
}
