import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteContentService } from '../../core/services/site-content.service';
import { SeoService } from '../../core/services/seo.service';
import { ContactFormComponent } from '../../shared/components/contact-form/contact-form.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    CommonModule,
    ContactFormComponent
  ],
  template: `
    <main class="contact-page">
      <!-- Header de la página -->
      <section class="page-header">
        <div class="container text-center">
          <span class="badge">PRESUPUESTO & DISPONIBILIDAD</span>
          <h1 class="page-title">Contacto & Presupuesto</h1>
          <p class="page-subtitle">
            Cuéntanos la fecha, el lugar y los detalles de tu evento. Diseñaremos una propuesta a medida sin ningún compromiso.
          </p>
        </div>
      </section>

      <!-- Sección Principal: Formulario + Datos de Contacto -->
      <section class="section contact-main-section">
        <div class="container">
          <div class="contact-layout-grid">
            <!-- Columna Izquierda: Información Directa & Garantías -->
            <div class="contact-info-col">
              <div class="info-block card-glass">
                <span class="badge">ATENCIÓN PERSONALIZADA</span>
                <h2 class="info-title">Hablemos de tu celebración</h2>
                <p class="info-desc">
                  Nos adaptamos a bodas, fiestas privadas, aniversarios corporativos y festivales. Si tienes dudas previas o necesitas asesoramiento directo, puedes llamarnos o escribirnos.
                </p>

                <div class="direct-channels">
                  <a href="tel:+34910200300" class="channel-card">
                    <div class="channel-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div>
                      <span class="channel-label">Teléfono directo</span>
                      <strong class="channel-val">+34 910 200 300</strong>
                    </div>
                  </a>

                  <a href="https://wa.me/34910200300" target="_blank" rel="noopener noreferrer" class="channel-card">
                    <div class="channel-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                      </svg>
                    </div>
                    <div>
                      <span class="channel-label">WhatsApp</span>
                      <strong class="channel-val">Chatear con nosotros</strong>
                    </div>
                  </a>

                  <a href="mailto:hola@errante-cocktails.com" class="channel-card">
                    <div class="channel-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                    </div>
                    <div>
                      <span class="channel-label">Correo electrónico</span>
                      <strong class="channel-val">hola&#64;errante-cocktails.com</strong>
                    </div>
                  </a>
                </div>

                <div class="trust-commitments">
                  <div class="trust-item">
                    <span class="trust-icon">⚡</span>
                    <div>
                      <strong>Respuesta en menos de 24 horas</strong>
                      <p>Recibirás un dossier con la propuesta económica y opciones de carta.</p>
                    </div>
                  </div>
                  <div class="trust-item">
                    <span class="trust-icon">📍</span>
                    <div>
                      <strong>Cobertura nacional</strong>
                      <p>Desplazamos nuestras barras móviles y equipo por toda España.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Columna Derecha: Formulario Reactivo -->
            <div class="contact-form-col">
              <app-contact-form></app-contact-form>
            </div>
          </div>
        </div>
      </section>
    </main>
  `,
  styles: [`
    .contact-page {
      padding-bottom: 4rem;
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

    .contact-layout-grid {
      display: grid;
      grid-template-columns: 1fr 1.35fr;
      gap: 3rem;
      align-items: flex-start;

      @media (max-width: 960px) {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
    }

    .info-block {
      padding: 2.5rem;
      border-radius: var(--radius-lg);

      @media (max-width: 600px) {
        padding: 1.5rem;
      }
    }

    .info-title {
      font-size: 1.85rem;
      font-family: var(--font-serif);
      color: var(--text-primary);
      margin: 1rem 0 0.5rem;
    }

    .info-desc {
      font-size: 0.95rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .direct-channels {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2.5rem;
    }

    .channel-card {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      padding: 1rem 1.25rem;
      background: rgba(11, 12, 14, 0.6);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      transition: all var(--transition-fast);

      &:hover {
        border-color: var(--accent-gold);
        background: rgba(11, 12, 14, 0.9);
        transform: translateX(4px);
      }

      .channel-icon {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: rgba(212, 175, 55, 0.1);
        border: 1px solid var(--border-gold);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--accent-gold);
        flex-shrink: 0;
      }

      .channel-label {
        font-size: 0.75rem;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        display: block;
      }

      .channel-val {
        font-size: 1rem;
        color: var(--text-primary);
      }
    }

    .trust-commitments {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      padding-top: 1.75rem;
      border-top: 1px solid var(--border-subtle);

      .trust-item {
        display: flex;
        align-items: flex-start;
        gap: 0.85rem;

        .trust-icon {
          font-size: 1.3rem;
          line-height: 1;
        }

        strong {
          font-size: 0.92rem;
          color: var(--text-primary);
          display: block;
        }

        p {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.4;
          margin-top: 2px;
        }
      }
    }
  `]
})
export class ContactPageComponent implements OnInit {
  readonly siteService = inject(SiteContentService);
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setSeoData({
      title: 'Pedir Presupuesto de Coctelería para Eventos',
      description: 'Solicita presupuesto personalizado para tu boda o evento. Coctelería de autor, barras móviles de diseño y mixología profesional.',
      keywords: 'presupuesto cocteleria eventos, contratar barra movil bodas, precio cocteles eventos'
    });
  }
}
