import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CocktailService } from '../../core/services/cocktail.service';
import { EventService } from '../../core/services/event.service';
import { SiteContentService } from '../../core/services/site-content.service';
import { SeoService } from '../../core/services/seo.service';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { CocktailCardComponent } from '../../shared/components/cocktail-card/cocktail-card.component';
import { EventCardComponent } from '../../shared/components/event-card/event-card.component';
import { GalleryComponent } from '../../shared/components/gallery/gallery.component';
import { CtaSectionComponent } from '../../shared/components/cta-section/cta-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SectionTitleComponent,
    CocktailCardComponent,
    EventCardComponent,
    GalleryComponent,
    CtaSectionComponent
  ],
  template: `
    <main class="home-page">
      <!-- 1. HERO SECTION -->
      <section class="hero-section" aria-label="Introducción a La Errante">
        <div class="hero-bg-media">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1920&q=85" 
            alt="Ambiente de alta coctelería para eventos exclusivos" 
            class="hero-img"
          />
          <div class="hero-overlay"></div>
          <div class="hero-ambient-glow"></div>
        </div>

        <div class="container hero-container">
          <div class="hero-content">
            <span class="badge hero-badge">
              EXPERIENCIA PREMIUM & HOSPITALIDAD
            </span>
            <h1 class="hero-title">
              COCTELERÍA PARA EVENTOS
            </h1>
            <p class="hero-subtitle">
              Transformamos bodas, galas de empresa y fiestas privadas con mixología de autor, barras móviles de diseño y una puesta en escena inolvidable.
            </p>

            <div class="hero-ctas">
              <a routerLink="/carta" class="btn btn-gold btn-lg">
                Ver carta de cócteles
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
              <a routerLink="/contacto" class="btn btn-outline-gold btn-lg">
                Solicitar presupuesto
              </a>
            </div>

            <!-- Highlights rápidos del hero -->
            <div class="hero-stats">
              <div class="stat-item">
                <span class="stat-num">+350</span>
                <span class="stat-label">Eventos realizados</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-num">100%</span>
                <span class="stat-label">Ingredientes frescos</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-num">4.9 ★</span>
                <span class="stat-label">Valoración clientes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. QUÉ HACEMOS (3 BLOQUES BREVES) -->
      <section class="section what-we-do-section" aria-label="Qué hacemos">
        <div class="container">
          <app-section-title
            eyebrow="NUESTRA PROPUESTA"
            title="Qué Hacemos"
            subtitle="Tres pilares esenciales que convierten cualquier evento en una celebración memorable."
          ></app-section-title>

          <div class="features-grid">
            <!-- Bloque 1 -->
            <div class="feature-card card-glass">
              <div class="feature-icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="1.8">
                  <path d="M8 22h8"></path>
                  <path d="M12 11v11"></path>
                  <path d="m19 3-7 8-7-8Z"></path>
                </svg>
              </div>
              <h3 class="feature-title">Barra de Cócteles de Diseño</h3>
              <p class="feature-desc">
                Barras móviles modulares con acabados en madera noble, latón cepillado e iluminación cálida ambiental. Nos adaptamos a salones, terrazas, fincas o interiores.
              </p>
            </div>

            <!-- Bloque 2 -->
            <div class="feature-card card-glass">
              <div class="feature-icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="1.8">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
              </div>
              <h3 class="feature-title">Eventos a Medida</h3>
              <p class="feature-desc">
                Diseño de cartas personalizadas para bodas, celebraciones privadas y aniversarios o galas corporativas. Opciones con y sin alcohol (mocktails de autor).
              </p>
            </div>

            <!-- Bloque 3 -->
            <div class="feature-card card-glass">
              <div class="feature-icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="1.8">
                  <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"></path>
                </svg>
              </div>
              <h3 class="feature-title">Servicio Personalizado & Integral</h3>
              <p class="feature-desc">
                Solución integral 'llave en mano': bartenders profesionales uniformados, cristalería fina, hielo tallado artesanal, insumos frescos, montaje y recogida impecable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. SELECCIÓN DE LA CARTA (CÓCTELES DESTACADOS) -->
      <section class="section featured-cocktails-section" aria-label="Selección de la carta">
        <div class="container">
          <div class="section-header-flex">
            <app-section-title
              eyebrow="EXPERIENCIA SENSORIAL"
              title="Selección de la Carta"
              subtitle="Una muestra de nuestras creaciones más aclamadas para bodas y celebraciones."
              align="left"
              [showDivider]="true"
            ></app-section-title>

            <a routerLink="/carta" class="btn btn-outline-gold btn-sm view-all-btn">
              Ver carta completa ({{ cocktailService.cocktails().length }} opciones)
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          <div class="cocktails-grid">
            <app-cocktail-card 
              *ngFor="let cocktail of cocktailService.featuredCocktails()" 
              [cocktail]="cocktail"
            ></app-cocktail-card>
          </div>

          <div class="text-center mt-5">
            <a routerLink="/carta" class="btn btn-gold btn-lg">
              Explorar toda la carta de cócteles
            </a>
          </div>
        </div>
      </section>

      <!-- 4. TIPOS DE EVENTOS -->
      <section class="section events-preview-section" aria-label="Tipos de eventos">
        <div class="container">
          <app-section-title
            eyebrow="COBERTURA & FORMATOS"
            title="Tipos de Eventos"
            subtitle="Nos adaptamos a la escala y atmósfera de cada celebración con soluciones a medida."
          ></app-section-title>

          <div class="events-grid">
            <app-event-card 
              *ngFor="let ev of eventService.events()" 
              [eventItem]="ev"
            ></app-event-card>
          </div>
        </div>
      </section>

      <!-- 5. CÓMO FUNCIONA (4 PASOS) -->
      <section class="section how-it-works-section" aria-label="Cómo funciona el servicio">
        <div class="container">
          <app-section-title
            eyebrow="PROCESO SENCILLO"
            title="Cómo Funciona"
            subtitle="Organizar la coctelería de tu evento es fácil, transparente y sin complicaciones."
          ></app-section-title>

          <div class="steps-grid">
            <div *ngFor="let step of (siteService.siteContent()?.steps || defaultSteps)" class="step-card card-glass">
              <span class="step-number">{{ step.number }}</span>
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-desc">{{ step.description }}</p>
              <div class="step-highlight">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>{{ step.highlight }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. GALERÍA VISUAL -->
      <section class="section gallery-section" aria-label="Galería visual del servicio">
        <div class="container">
          <app-section-title
            eyebrow="ATMÓSFERA & DETALLES"
            title="Galería Visual"
            subtitle="Momentos capturados en nuestras barras móviles: cristalería, hielo tallado y hospitalidad."
          ></app-section-title>

          <app-gallery [items]="siteService.siteContent()?.gallery || []"></app-gallery>
        </div>
      </section>

      <!-- 7. SOBRE NOSOTROS (FILOSOFÍA & EQUIPO) -->
      <section class="section about-teaser-section" aria-label="Sobre el equipo de La Errante">
        <div class="container">
          <div class="about-grid">
            <div class="about-image-wrap">
              <img 
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80" 
                alt="Head Bartender de La Errante preparando cócteles de autor" 
                class="about-img card-glass"
              />
              <div class="about-badge-floating card-glass">
                <span class="floating-num">14+</span>
                <span class="floating-text">Años de experiencia en alta mixología</span>
              </div>
            </div>

            <div class="about-text-content">
              <span class="eyebrow-badge">FILOSOFÍA LA ERRANTE</span>
              <h2 class="about-heading">Pasión por el detalle en cada trago</h2>
              <p class="about-p">
                Nacimos con la vocación de llevar la experiencia de las mejores coctelerías clandestinas del mundo a cualquier rincón: una finca rústica, una azotea en la ciudad, una nave industrial o el jardín de tu propia casa.
              </p>
              <p class="about-p">
                No creemos en los preparados industriales ni en el servicio despersonalizado. Elaboramos nuestros propios cordiales botánicos, tallamos bloques de hielo puro sin impurezas y seleccionamos destilados de pequeños productores independientes.
              </p>

              <div class="about-bullets">
                <div class="bullet-item">
                  <span class="bullet-icon">🍸</span>
                  <div>
                    <strong>Mixología sin atajos:</strong> Frutas frescas prensadas al momento e infusiones en frío.
                  </div>
                </div>
                <div class="bullet-item">
                  <span class="bullet-icon">🧊</span>
                  <div>
                    <strong>Hielo cristalino artesanal:</strong> Dilución lenta y temperatura perfecta sin aguar el trago.
                  </div>
                </div>
              </div>

              <div class="about-action">
                <a routerLink="/nosotros" class="btn btn-outline-gold">
                  Conoce más sobre nuestro equipo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 8. CTA FINAL -->
      <app-cta-section
        badge="DISPONIBILIDAD TEMPORADA 2026"
        title="¿Preparamos una barra para tu próximo evento?"
        description="Pide tu presupuesto sin compromiso y crearemos una propuesta visual y gustativa única para tus invitados."
        buttonText="Solicitar presupuesto"
      ></app-cta-section>
    </main>
  `,
  styles: [`
    .home-page {
      display: flex;
      flex-direction: column;
    }

    // Hero Section
    .hero-section {
      position: relative;
      min-height: 88vh;
      display: flex;
      align-items: center;
      padding: 6rem 0 4rem;
      overflow: hidden;

      @media (max-width: 768px) {
        min-height: 75vh;
        padding: 4rem 0 3rem;
      }
    }

    .hero-bg-media {
      position: absolute;
      inset: 0;
      z-index: 1;

      .hero-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(0.65) contrast(1.1);
      }

      .hero-overlay {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 60% 40%, rgba(11, 12, 14, 0.4) 0%, rgba(11, 12, 14, 0.95) 100%),
                    linear-gradient(to top, rgba(11, 12, 14, 1) 0%, transparent 60%);
      }

      .hero-ambient-glow {
        position: absolute;
        top: 20%;
        left: 20%;
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%);
        pointer-events: none;
      }
    }

    .hero-container {
      position: relative;
      z-index: 2;
    }

    .hero-content {
      max-width: 820px;
    }

    .hero-badge {
      margin-bottom: 1.25rem;
    }

    .hero-title {
      font-size: clamp(2.8rem, 6.5vw, 5.2rem);
      font-family: var(--font-serif);
      font-weight: 700;
      line-height: 1.05;
      letter-spacing: -0.01em;
      color: #ffffff;
      margin-bottom: 1.25rem;
      text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
    }

    .hero-subtitle {
      font-size: clamp(1.05rem, 2vw, 1.35rem);
      color: var(--text-secondary);
      line-height: 1.6;
      max-width: 680px;
      margin-bottom: 2.5rem;
    }

    .hero-ctas {
      display: flex;
      flex-wrap: wrap;
      gap: 1.2rem;
      margin-bottom: 3.5rem;
    }

    .hero-stats {
      display: flex;
      align-items: center;
      gap: 2rem;
      padding-top: 1.75rem;
      border-top: 1px solid var(--border-subtle);

      @media (max-width: 600px) {
        gap: 1.25rem;
      }

      .stat-item {
        display: flex;
        flex-direction: column;

        .stat-num {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--accent-gold);
          line-height: 1;
        }

        .stat-label {
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-top: 4px;
        }
      }

      .stat-divider {
        width: 1px;
        height: 32px;
        background: var(--border-subtle);
      }
    }

    // Features Section
    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }

    .feature-card {
      padding: 2.5rem 2rem;
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;

      .feature-icon-wrapper {
        width: 58px;
        height: 58px;
        border-radius: var(--radius-sm);
        background: rgba(212, 175, 55, 0.1);
        border: 1px solid var(--border-gold);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .feature-title {
        font-size: 1.45rem;
        font-family: var(--font-serif);
        color: var(--text-primary);
        line-height: 1.2;
      }

      .feature-desc {
        font-size: 0.92rem;
        color: var(--text-secondary);
        line-height: 1.6;
      }
    }

    // Featured Cocktails
    .section-header-flex {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 2rem;

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
    }

    .view-all-btn {
      margin-bottom: 2.75rem;
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

    // Events Grid
    .events-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;

      @media (max-width: 850px) {
        grid-template-columns: 1fr;
      }
    }

    // Steps Grid
    .steps-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .step-card {
      padding: 2.2rem 1.6rem;
      display: flex;
      flex-direction: column;
      position: relative;

      .step-number {
        font-family: var(--font-serif);
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--accent-gold);
        line-height: 1;
        margin-bottom: 1rem;
      }

      .step-title {
        font-size: 1.3rem;
        font-family: var(--font-serif);
        color: var(--text-primary);
        margin-bottom: 0.6rem;
      }

      .step-desc {
        font-size: 0.88rem;
        color: var(--text-secondary);
        line-height: 1.55;
        margin-bottom: 1.25rem;
        flex-grow: 1;
      }

      .step-highlight {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.78rem;
        font-weight: 600;
        color: var(--accent-gold);
        padding-top: 0.75rem;
        border-top: 1px solid var(--border-subtle);
      }
    }

    // About Teaser
    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
    }

    .about-image-wrap {
      position: relative;

      .about-img {
        width: 100%;
        height: 480px;
        object-fit: cover;
        border-radius: var(--radius-md);
      }

      .about-badge-floating {
        position: absolute;
        bottom: -20px;
        right: -20px;
        background: var(--bg-card);
        border: 1px solid var(--border-gold);
        padding: 1.25rem 1.5rem;
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 250px;
        box-shadow: 0 16px 36px rgba(0, 0, 0, 0.7);

        @media (max-width: 600px) {
          bottom: 10px;
          right: 10px;
        }

        .floating-num {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--accent-gold);
          line-height: 1;
        }

        .floating-text {
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }
      }
    }

    .about-text-content {
      .eyebrow-badge {
        font-size: 0.75rem;
        font-weight: 700;
        color: var(--accent-gold);
        letter-spacing: 0.16em;
        text-transform: uppercase;
        display: block;
        margin-bottom: 0.75rem;
      }

      .about-heading {
        font-size: clamp(2rem, 3.5vw, 2.8rem);
        font-family: var(--font-serif);
        color: var(--text-primary);
        line-height: 1.15;
        margin-bottom: 1.25rem;
      }

      .about-p {
        font-size: 0.95rem;
        color: var(--text-secondary);
        line-height: 1.65;
        margin-bottom: 1.2rem;
      }

      .about-bullets {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 1.75rem 0 2rem;

        .bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.45;

          .bullet-icon {
            font-size: 1.2rem;
            line-height: 1;
          }
        }
      }
    }

    .text-center {
      text-align: center;
    }

    .mt-5 {
      margin-top: 3rem;
    }
  `]
})
export class HomeComponent implements OnInit {
  readonly cocktailService = inject(CocktailService);
  readonly eventService = inject(EventService);
  readonly siteService = inject(SiteContentService);
  private readonly seoService = inject(SeoService);

  readonly defaultSteps = [
    { number: '01', title: 'Cuéntanos tu evento', description: 'Indícanos la fecha, el lugar, el número de invitados y tu idea.', highlight: 'Respuesta en < 24h' },
    { number: '02', title: 'Diseñamos la propuesta', description: 'Seleccionamos la carta de cócteles y la estética de la barra.', highlight: 'Degustación disponible' },
    { number: '03', title: 'Preparamos y montamos', description: 'Llegamos con antelación y alistamos todos los botánicos frescos.', highlight: 'Puntualidad absoluta' },
    { number: '04', title: 'Tú disfrutas del evento', description: 'Nuestros mixólogos atienden a tus invitados con rapidez y maestría.', highlight: 'Experiencia inolvidable' }
  ];

  ngOnInit(): void {
    this.seoService.setSeoData({
      title: 'Coctelería para Eventos & Barras Móviles Exclusivas',
      description: 'Servicio profesional de coctelería para bodas, fiestas privadas y eventos corporativos. Mixología de autor, bartenders profesionales y barras móviles de diseño.',
      keywords: 'cocteleria para eventos, barra movil bodas, cocteles para bodas, bartenders eventos madrid, catering cocteleria'
    });

    this.seoService.setSchemaJsonLd({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'La Errante Coctelería para Eventos',
      description: 'Servicio profesional de coctelería y barras móviles para eventos, bodas y empresas.',
      url: 'https://errante-cocktails.com',
      telephone: '+34910200300',
      priceRange: '€€€',
      servesCuisine: 'Cocktails, Mixology'
    });
  }
}
