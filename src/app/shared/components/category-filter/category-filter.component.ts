import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryInfo, CocktailCategory } from '../../../core/models/cocktail.model';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="filter-bar" aria-label="Filtro de categorías de cócteles" role="tablist">
      <button
        *ngFor="let cat of categories"
        type="button"
        role="tab"
        [id]="'tab-' + cat.id"
        [attr.aria-selected]="selectedCategory === cat.id"
        class="filter-btn"
        [class.active]="selectedCategory === cat.id"
        (click)="selectCategory(cat.id)"
      >
        <span class="btn-text">{{ cat.label }}</span>
        <span *ngIf="counts && counts[cat.id] !== undefined" class="count-pill">
          {{ counts[cat.id] }}
        </span>
      </button>
    </nav>
  `,
  styles: [`
    .filter-bar {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.6rem;
      padding: 0.5rem;
      background: var(--bg-card);
      border: 1px solid var(--border-card);
      border-radius: var(--radius-pill);
      box-shadow: var(--shadow-card);
      max-width: fit-content;
      margin: 0 auto 2.5rem;

      @media (max-width: 768px) {
        border-radius: var(--radius-md);
        justify-content: flex-start;
        overflow-x: auto;
        padding: 0.75rem;
        width: 100%;
        max-width: 100%;
      }
    }

    .filter-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.25rem;
      font-size: 0.88rem;
      font-weight: 500;
      letter-spacing: 0.02em;
      border-radius: var(--radius-pill);
      background: transparent;
      color: var(--text-secondary);
      border: 1px solid transparent;
      cursor: pointer;
      transition: all var(--transition-fast);
      white-space: nowrap;

      &:hover {
        color: var(--text-primary);
        background: rgba(255, 255, 255, 0.05);
      }

      &.active {
        background: linear-gradient(135deg, var(--accent-gold), #b89324);
        color: #0b0c0e;
        font-weight: 600;
        box-shadow: 0 4px 14px rgba(212, 175, 55, 0.35);

        .count-pill {
          background: rgba(11, 12, 14, 0.25);
          color: #0b0c0e;
        }
      }
    }

    .count-pill {
      display: inline-block;
      font-size: 0.72rem;
      font-weight: 700;
      padding: 0.15rem 0.45rem;
      border-radius: var(--radius-pill);
      background: rgba(255, 255, 255, 0.08);
      color: var(--text-muted);
      transition: all var(--transition-fast);
    }
  `]
})
export class CategoryFilterComponent {
  @Input({ required: true }) categories: CategoryInfo[] = [];
  @Input() selectedCategory: CocktailCategory | 'todos' = 'todos';
  @Input() counts?: Record<string, number>;
  @Output() categoryChange = new EventEmitter<CocktailCategory | 'todos'>();

  selectCategory(category: CocktailCategory | 'todos'): void {
    this.categoryChange.emit(category);
  }
}
