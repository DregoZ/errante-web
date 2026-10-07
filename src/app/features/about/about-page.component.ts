import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SiteContentService } from '../../core/services/site-content.service';
import { SeoService } from '../../core/services/seo.service';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { CtaSectionComponent } from '../../shared/components/cta-section/cta-section.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SectionTitleComponent,
    CtaSectionComponent
  ],
  template: `
    <main class="about-page">
      <!-- Header de la página -->
      <section class="page-header">
        <div class="container text-center">
          <span class="badge">HISTORIA & VALORES</span>
          <h1 class="page-title">Sobre Nosotros</h1>
          <p class="page-subtitle">
            Somos apasionados de la mixología clásica y contemporánea. Llevamos el alma y la sofisticación del speakeasy a los escenarios más especiales.
          </p>
        </div>
      </section>

      <!-- Historia & Manifiesto -->
      <section class="section manifesto-section">
        <div class="container">
          <div class="manifesto-grid">
            <div class="manifesto-text">
              <span class="eyebrow-badge">EL ORIGEN DE LA ERRANTE</span>
              <h2 class="manifesto-heading">Coctelería nómada, técnica rigurosa</h2>
              <p class="manifesto-p">
                La Errante nació tras años de experiencia en las barras más emblemáticas de Madrid, Londres y Barcelona. Nos dimos cuenta de que en los eventos y bodas la coctelería solía descuidarse con bebidas industriales y servicio precipitado.
              </p>
              <p class="manifesto-p">
                Decidimos romper esa inercia diseñando un formato nómada pero sin renunciar a ninguna de las exigencias de un bar de alta coctelería: hielo puro cristalino tallado a mano, destilados premium de pequeños alambiques, frutas de temporada recién exprimidas y una cristalería impecable.
              </p>

              <div class="quote-box card-glass">
                <p class="quote-text">
                  "Un cóctel no es solo una bebida; es un ritual de bienvenida, una conversación pausada y el recuerdo imborrable de una gran celebración."
                </p>
                <span class="quote-author">— Mateo Valdés, Head Bartender</span>
              </div>
            </div>

            <div class="manifesto-media">
              <img 
                src="https://images.unsplash.com/photo-1579684947550-22e945225d9a?auto=format&fit=crop&w=1000&q=80" 
                alt="Elaboración artesanal de cócteles para eventos"
                class="manifesto-img card-glass"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Los 3 Pilares de Nuestro Oficio -->
      <section class="section pillars-section">
        <div class="container">
          <app-section-title
            eyebrow="NUESTRO COMPROMISO"
            title="Los Tres Pilares de La Errante"
            subtitle="La excelencia en cada copa se apoya en una búsqueda incansable de la calidad."
          ></app-section-title>

          <div class="pillars-grid">
            <div class="pillar-card card-glass">
              <div class="pillar-num">01</div>
              <h3 class="pillar-title">Botánica & Frescura Natural</h3>
              <p class="pillar-desc">
                No utilizamos concentrados comerciales ni saborizantes artificiales. Nuestros siropes, cordiales y tinturas son elaborados a fuego lento en nuestro obrador con botánicos seleccionados.
              </p>
            </div>

            <div class="pillar-card card-glass">
              <div class="pillar-num">02</div>
              <h3 class="pillar-title">Hielo Artesanal Cristalino</h3>
              <p class="pillar-desc">
                El hielo es el 25% de cualquier cóctel. Utilizamos bloques transparentes sin burbujas tallados en barras o esferas para enfriar con mínima dilución y máxima pureza visual.
              </p>
            </div>

            <div class="pillar-card card-glass">
              <div class="pillar-num">03</div>
              <h3 class="pillar-title">Hospitalidad & Velocidad</h3>
              <p class="pillar-desc">
                Nuestros bartenders dominan tanto la técnica como el trato humano. Minimizamos las esperas en barra para que tus invitados disfruten de una atención ágil y cercana.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- El Equipo -->
      <section class="section team-section">
        <div class="container">
          <app-section-title
            eyebrow="PROFESIONALES DE LA COCTELERÍA"
            title="El Equipo Detrás de la Barra"
            subtitle="Conoce a los mixólogos y coordinadores que harán realidad la coctelería de tu evento."
          ></app-section-title>

          <div class="team-grid">
            <div *ngFor="let member of (siteService.siteContent()?.team || defaultTeam)" class="team-card card-glass">
              <div class="team-img-wrap">
                <img [src]="member.image" [alt]="member.name + ' - ' + member.role" class="team-img" />
              </div>
              <div class="team-info">
                <span class="team-specialty">{{ member.specialty }}</span>
                <h3 class="team-name">{{ member.name }}</h3>
                <p class="team-role">{{ member.role }}</p>
                <p class="team-bio">{{ member.bio }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonios de Clientes -->
      <section class="section testimonials-section">
        <div class="container">
          <app-section-title
            eyebrow="OPINIONES"
            title="Lo Que Dicen Quienes Ya Han Brindado con Nosotros"
            subtitle="La satisfacción de parejas y empresas es nuestro mayor orgullo."
          ></app-section-title>

          <div class="testimonials-grid">
            <div *ngFor="let t of (siteService.siteContent()?.testimonials || defaultTestimonials)" class="testimonial-card card-glass">
              <div class="stars">
                <span *ngFor="let s of [1,2,3,4,5]">★</span>
              </div>
              <p class="t-quote">"{{ t.quote }}"</p>
              <div class="t-footer">
                <strong class="t-author">{{ t.author }}</strong>
                <span class="t-event">{{ t.event }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <app-cta-section
        badge="EXPERIENCIA ÚNICA"
        title="¿Hablamos sobre cómo preparar la coctelería de tu día?"
        description="Estamos listos para asesorarte y diseñar una carta que encaje perfectamente con tus preferencias."
        buttonText="Solicitar presupuesto"
      ></app-cta-section>
    </main>
  `,
  styles: [`
    .about-page {
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

    // Manifesto
    .manifesto-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 3.5rem;
      align-items: center;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
    }

    .manifesto-text {
      .eyebrow-badge {
        font-size: 0.75rem;
        font-weight: 700;
        color: var(--accent-gold);
        letter-spacing: 0.16em;
        text-transform: uppercase;
        display: block;
        margin-bottom: 0.75rem;
      }

      .manifesto-heading {
        font-size: clamp(2rem, 3.8vw, 3rem);
        font-family: var(--font-serif);
        color: var(--text-primary);
        line-height: 1.15;
        margin-bottom: 1.25rem;
      }

      .manifesto-p {
        font-size: 1rem;
        color: var(--text-secondary);
        line-height: 1.65;
        margin-bottom: 1.2rem;
      }
    }

    .quote-box {
      padding: 1.5rem;
      border-left: 3px solid var(--accent-gold);
      margin-top: 1.75rem;

      .quote-text {
        font-family: var(--font-serif);
        font-size: 1.15rem;
        font-style: italic;
        color: var(--text-primary);
        line-height: 1.5;
        margin-bottom: 0.5rem;
      }

      .quote-author {
        font-size: 0.85rem;
        color: var(--accent-gold);
        font-weight: 600;
      }
    }

    .manifesto-img {
      width: 100%;
      height: 480px;
      object-fit: cover;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-gold);
    }

    // Pillars
    .pillars-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }

    .pillar-card {
      padding: 2.5rem 2rem;
      display: flex;
      flex-direction: column;
      position: relative;

      .pillar-num {
        font-family: var(--font-serif);
        font-size: 3rem;
        font-weight: 700;
        color: var(--accent-gold);
        line-height: 1;
        margin-bottom: 1rem;
      }

      .pillar-title {
        font-size: 1.45rem;
        font-family: var(--font-serif);
        color: var(--text-primary);
        margin-bottom: 0.75rem;
      }

      .pillar-desc {
        font-size: 0.92rem;
        color: var(--text-secondary);
        line-height: 1.6;
      }
    }

    // Team
    .team-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;

      @media (max-width: 960px) {
        grid-template-columns: 1fr;
        max-width: 500px;
        margin: 0 auto;
      }
    }

    .team-card {
      overflow: hidden;
      display: flex;
      flex-direction: column;

      .team-img-wrap {
        height: 280px;
        overflow: hidden;
        background: #0f1013;

        .team-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
      }

      &:hover .team-img {
        transform: scale(1.05);
      }

      .team-info {
        padding: 1.75rem;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }

      .team-specialty {
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--accent-copper);
        margin-bottom: 0.35rem;
      }

      .team-name {
        font-size: 1.55rem;
        font-family: var(--font-serif);
        color: var(--text-primary);
        margin-bottom: 0.2rem;
      }

      .team-role {
        font-size: 0.88rem;
        color: var(--accent-gold);
        font-style: italic;
        margin-bottom: 1rem;
      }

      .team-bio {
        font-size: 0.88rem;
        color: var(--text-secondary);
        line-height: 1.55;
      }
    }

    // Testimonials
    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;

      @media (max-width: 960px) {
        grid-template-columns: 1fr;
      }
    }

    .testimonial-card {
      padding: 2.2rem 1.8rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;

      .stars {
        color: var(--accent-gold);
        letter-spacing: 2px;
        font-size: 1.1rem;
      }

      .t-quote {
        font-size: 0.95rem;
        color: var(--text-secondary);
        line-height: 1.6;
        font-style: italic;
        flex-grow: 1;
      }

      .t-footer {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        padding-top: 1rem;
        border-top: 1px solid var(--border-subtle);

        .t-author {
          color: var(--text-primary);
          font-size: 0.95rem;
        }

        .t-event {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
      }
    }
  `]
})
export class AboutPageComponent implements OnInit {
  readonly siteService = inject(SiteContentService);
  private readonly seoService = inject(SeoService);

  readonly defaultTeam = [
    { name: 'Mateo Valdés', role: 'Head Bartender & Fundador', bio: 'Más de 14 años liderando coctelerías de renombre internacional. Apasionado por las infusiones botánicas y la reinterpretación de clásicos.', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80', specialty: 'Técnicas de clarificación' },
    { name: 'Lucía Arrieta', role: 'Directora Creativa de Mixología', bio: 'Especialista en botánica y cordiales caseros. Desarrolla las propuestas de maridaje y la carta de mocktails sin alcohol.', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80', specialty: 'Mocktails gastronómicos' },
    { name: 'Javier Morales', role: 'Responsable de Operaciones', bio: 'Garantiza que la logística, tiempos de despacho y la escenografía de cada barra móvil funcionen a la perfección.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80', specialty: 'Logística de grandes eventos' }
  ];

  readonly defaultTestimonials = [
    { quote: 'Contratamos a La Errante para nuestra boda y fue sin duda el gran acierto de la noche. Los invitados siguen hablando del Espresso Martini y del servicio tan atento.', author: 'Elena & Gonzalo', event: 'Boda en Finca El Regajal (Aranjuez)' },
    { quote: 'Impecable servicio para nuestro evento de lanzamiento anual con 400 directivos. Cero colas, cócteles de nivel estrella Michelin y un montaje visual espectacular.', author: 'Carlos Mendoza', event: 'Director de Marketing, Tech Summit' },
    { quote: 'La atención al detalle con el hielo tallado y los cócteles sin alcohol marcaron una diferencia enorme. Son auténticos profesionales del sector.', author: 'Beatriz Soler', event: 'Celebración Privada 40 Aniversario' }
  ];

  ngOnInit(): void {
    this.seoService.setSeoData({
      title: 'Sobre Nosotros & Filosofía de Coctelería de Autor',
      description: 'Conoce al equipo de mixólogos de La Errante. Nuestra filosofía de barras móviles para eventos basada en destilados premium, botánicos frescos y hielo tallado a mano.',
      keywords: 'equipo bartenders eventos, filosofia cocteleria, cocteleria artesanal bodas'
    });
  }
}
