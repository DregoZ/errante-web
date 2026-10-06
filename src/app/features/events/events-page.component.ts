import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { SiteContentService } from '../../core/services/site-content.service';
import { SeoService } from '../../core/services/seo.service';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { EventCardComponent } from '../../shared/components/event-card/event-card.component';
import { CtaSectionComponent } from '../../shared/components/cta-section/cta-section.component';

@Component({
  selector: 'app-events-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SectionTitleComponent,
    EventCardComponent,
    CtaSectionComponent
  ],
  template: `
    <main class="events-page">
      <!-- Header de la página -->
      <section class="page-header">
        <div class="container text-center">
          <span class="badge">SERVICIOS & FORMATOS</span>
          <h1 class="page-title">Coctelería Profesional para Eventos</h1>
          <p class="page-subtitle">
            Diseñamos experiencias líquidas a medida para bodas memorables, galas corporativas de alto impacto y celebraciones privadas exclusivas.
          </p>
        </div>
      </section>

      <!-- Grid de Tipos de Eventos -->
      <section class="section events-catalog-section">
        <div class="container">
          <app-section-title
            eyebrow="FORMATOS DISPONIBLES"
            title="Nuestros Servicios por Tipo de Evento"
            subtitle="Cada celebración cuenta con requerimientos y atmósferas distintas. Descubre cómo adaptamos nuestra barra a tus necesidades."
          ></app-section-title>

          <div class="events-grid">
            <app-event-card
              *ngFor="let ev of eventService.events()"
              [eventItem]="ev"
            ></app-event-card>
          </div>
        </div>
      </section>

      <!-- Qué incluye nuestro servicio estándar -->
      <section class="section what-is-included-section">
        <div class="container">
          <div class="included-card card-glass">
            <app-section-title
              eyebrow="LLAVE EN MANO"
              title="Qué Incluye Nuestro Servicio Integral"
              subtitle="Sin sorpresas ni gastos imprevistos. Nos encargamos absolutamente de toda la operativa."
              align="center"
            ></app-section-title>

            <div class="inclusions-grid">
              <div class="inclusion-item">
                <div class="inc-icon">🍸</div>
                <h3 class="inc-title">Barras Móviles de Diseño</h3>
                <p class="inc-desc">Estructuras modulares con acabados nobles de madera, latón e iluminación decorativa autónoma.</p>
              </div>

              <div class="inclusion-item">
                <div class="inc-icon">🧊</div>
                <h3 class="inc-title">Hielo Artesanal Tallado</h3>
                <p class="inc-desc">Bloques y esferas de hielo cristalino sin aire ni impurezas para un enfriamiento prolongado sin aguar la copa.</p>
              </div>

              <div class="inclusion-item">
                <div class="inc-icon">✨</div>
                <h3 class="inc-title">Cristalería Fina Completa</h3>
                <p class="inc-desc">Copas Coupé, Nick & Nora, vasos Old Fashioned labrados y Highballs de cristal de máxima transparencia.</p>
              </div>

              <div class="inclusion-item">
                <div class="inc-icon">🌿</div>
                <h3 class="inc-title">Insumos Frescos & Botánicos</h3>
                <p class="inc-desc">Frutas seleccionadas diariamente, siropes caseros, cordiales botánicos y flores comestibles de temporada.</p>
              </div>

              <div class="inclusion-item">
                <div class="inc-icon">🤵</div>
                <h3 class="inc-title">Bartenders Titulados</h3>
                <p class="inc-desc">Mixólogos profesionales con uniforme de gala, vocación de servicio y maestría en técnicas de coctelería.</p>
              </div>

              <div class="inclusion-item">
                <div class="inc-icon">♻️</div>
                <h3 class="inc-title">Montaje & Residuo Cero</h3>
                <p class="inc-desc">Puntualidad rigurosa en el montaje y recogida, con compromiso de reciclaje y gestión sostenible de residuos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section (Preguntas Frecuentes de Eventos) -->
      <section class="section faq-section">
        <div class="container container-narrow">
          <app-section-title
            eyebrow="RESOLVEMOS TUS DUDAS"
            title="Preguntas Frecuentes sobre Eventos"
            subtitle="Todo lo que necesitas saber sobre logística, tiempos, reserva y personalización."
          ></app-section-title>

          <div class="faq-list">
            <div 
              *ngFor="let faq of (siteService.siteContent()?.faqs || defaultFaqs); let i = index" 
              class="faq-item card-glass"
              [class.is-open]="openFaqIndex() === i"
            >
              <button 
                type="button" 
                class="faq-question-btn" 
                (click)="toggleFaq(i)"
                [attr.aria-expanded]="openFaqIndex() === i"
              >
                <span class="faq-q-text">{{ faq.question }}</span>
                <span class="faq-toggle-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
              <div class="faq-answer-wrap" *ngIf="openFaqIndex() === i">
                <p class="faq-answer-text">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <app-cta-section
        badge="RESERVA PARA TU EVENTO"
        title="¿Tienes una fecha en mente para tu celebración?"
        description="Contáctanos y te prepararemos un presupuesto detallado ajustado al número de invitados y estilo del evento."
        buttonText="Solicitar presupuesto"
      ></app-cta-section>
    </main>
  `,
  styles: [`
    .events-page {
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

    .events-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2.5rem;

      @media (max-width: 850px) {
        grid-template-columns: 1fr;
      }
    }

    // Inclusions
    .included-card {
      padding: 4rem 3rem;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-gold);

      @media (max-width: 768px) {
        padding: 2.5rem 1.5rem;
      }
    }

    .inclusions-grid {
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

    .inclusion-item {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      .inc-icon {
        font-size: 2.2rem;
      }

      .inc-title {
        font-size: 1.25rem;
        font-family: var(--font-serif);
        color: var(--text-primary);
      }

      .inc-desc {
        font-size: 0.88rem;
        color: var(--text-secondary);
        line-height: 1.55;
      }
    }

    // FAQ
    .faq-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .faq-item {
      border-radius: var(--radius-sm);
      overflow: hidden;
      transition: all var(--transition-fast);

      &.is-open {
        border-color: var(--accent-gold);

        .faq-toggle-icon svg {
          transform: rotate(180deg);
          stroke: var(--accent-gold);
        }
      }
    }

    .faq-question-btn {
      width: 100%;
      padding: 1.25rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: transparent;
      border: none;
      cursor: pointer;
      text-align: left;
      font-size: 1.05rem;
      font-family: var(--font-serif);
      font-weight: 600;
      color: var(--text-primary);

      .faq-toggle-icon svg {
        transition: transform var(--transition-fast);
      }
    }

    .faq-answer-wrap {
      padding: 0 1.5rem 1.25rem;
      animation: fadeIn 0.3s ease;
    }

    .faq-answer-text {
      font-size: 0.92rem;
      color: var(--text-secondary);
      line-height: 1.6;
      border-top: 1px solid var(--border-subtle);
      padding-top: 0.85rem;
    }
  `]
})
export class EventsPageComponent implements OnInit {
  readonly eventService = inject(EventService);
  readonly siteService = inject(SiteContentService);
  private readonly seoService = inject(SeoService);

  readonly openFaqIndex = signal<number | null>(0);

  readonly defaultFaqs = [
    { question: '¿Con cuánta antelación debemos reservar el servicio?', answer: 'Recomendamos entre 3 y 6 meses para bodas y temporada alta. Para eventos privados menores, solemos tener flexibilidad con 2-4 semanas.' },
    { question: '¿Qué incluye exactamente el presupuesto?', answer: 'Servicio llave en mano: barra móvil de diseño, bartenders uniformados, cristalería labrada, hielo tallado, insumos frescos, montaje, desmontaje y recogida.' },
    { question: '¿Podemos personalizar los cócteles y la carta?', answer: 'Sí, adaptamos la carta a vuestros gustos e incluso creamos un cóctel de autor con vuestra historia o colores de marca.' },
    { question: '¿Qué requisitos técnicos de espacio necesitáis?', answer: 'Espacio plano de 2.5x2 metros y una toma de corriente convencional de 220V. Nuestras barras son autónomas en agua.' }
  ];

  ngOnInit(): void {
    this.seoService.setSeoData({
      title: 'Servicio de Coctelería para Bodas, Empresas y Fiestas',
      description: 'Barras móviles de diseño y coctelería integral para bodas, aniversarios corporativos y celebraciones privadas exclusivas.',
      keywords: 'barra movil bodas, catering cocteles empresas, bartenders fiestas privadas, barra cocteleria eventos'
    });
  }

  toggleFaq(index: number): void {
    this.openFaqIndex.update(cur => cur === index ? null : index);
  }
}
