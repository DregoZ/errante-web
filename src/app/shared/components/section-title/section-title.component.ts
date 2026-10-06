import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section-title-wrapper" [class.text-center]="align === 'center'" [class.text-left]="align === 'left'">
      <span *ngIf="eyebrow" class="eyebrow-badge">{{ eyebrow }}</span>
      <h2 class="main-heading">{{ title }}</h2>
      <p *ngIf="subtitle" class="subtitle-text">{{ subtitle }}</p>
      <div *ngIf="showDivider" class="accent-line"></div>
    </div>
  `,
  styles: [`
    .section-title-wrapper {
      margin-bottom: 2.75rem;

      &.text-center {
        text-align: center;
        .accent-line {
          margin-left: auto;
          margin-right: auto;
        }
      }

      &.text-left {
        text-align: left;
      }
    }

    .eyebrow-badge {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      color: var(--accent-gold);
      margin-bottom: 0.75rem;
    }

    .main-heading {
      font-size: clamp(2.2rem, 4vw, 3.2rem);
      font-family: var(--font-serif);
      color: var(--text-primary);
      margin-bottom: 0.85rem;
      line-height: 1.1;
    }

    .subtitle-text {
      font-size: 1.05rem;
      color: var(--text-secondary);
      max-width: 650px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.6;

      .text-left & {
        margin-left: 0;
      }
    }

    .accent-line {
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, var(--accent-gold), var(--accent-copper));
      margin-top: 1.25rem;
      border-radius: 2px;
    }
  `]
})
export class SectionTitleComponent {
  @Input() eyebrow?: string;
  @Input({ required: true }) title!: string;
  @Input() subtitle?: string;
  @Input() align: 'center' | 'left' = 'center';
  @Input() showDivider = true;
}
