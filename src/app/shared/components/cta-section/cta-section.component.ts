import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="cta-banner">
      <div class="container">
        <div class="cta-inner card-glass">
          <div class="cta-bg-glow"></div>
          <div class="cta-content">
            <span class="badge">{{ badge || 'RESERVA TU FECHA' }}</span>
            <h2 class="cta-title">{{ title || '¿Preparamos una barra para tu próximo evento?' }}</h2>
            <p class="cta-desc">
              {{ description || 'Diseñamos una propuesta gastronómica personalizada para tu boda, fiesta privada o gala corporativa. Plazas limitadas por temporada.' }}
            </p>
            <div class="cta-actions">
              <a [routerLink]="['/contacto']" class="btn btn-gold btn-lg">
                {{ buttonText || 'Solicitar presupuesto' }}
              </a>
              <a [routerLink]="['/carta']" class="btn btn-ghost btn-lg">
                Explorar carta completa
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .cta-banner {
      padding: 5rem 0;
      position: relative;
    }

    .cta-inner {
      position: relative;
      padding: 4.5rem 3rem;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-gold);
      overflow: hidden;
      text-align: center;
      background: linear-gradient(145deg, #161920 0%, #0e0f14 100%);

      @media (max-width: 768px) {
        padding: 3rem 1.5rem;
      }
    }

    .cta-bg-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 500px;
      height: 250px;
      background: radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%);
      pointer-events: none;
    }

    .cta-content {
      position: relative;
      z-index: 2;
      max-width: 720px;
      margin: 0 auto;
    }

    .cta-title {
      font-size: clamp(2rem, 3.8vw, 3rem);
      font-family: var(--font-serif);
      color: var(--text-primary);
      margin: 1rem 0;
      line-height: 1.15;
    }

    .cta-desc {
      font-size: 1.05rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 2.2rem;
    }

    .cta-actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }
  `]
})
export class CtaSectionComponent {
  @Input() badge?: string;
  @Input() title?: string;
  @Input() description?: string;
  @Input() buttonText?: string;
}
