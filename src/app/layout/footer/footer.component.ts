import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SiteContentService } from '../../core/services/site-content.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="site-footer">
      <div class="container footer-container">
        <div class="footer-grid">
          <!-- Columna 1: Marca & Filosofía -->
          <div class="footer-col brand-col">
            <div class="logo-group">
              <span class="logo-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M8 22h8"></path>
                  <path d="M12 11v11"></path>
                  <path d="m19 3-7 8-7-8Z"></path>
                </svg>
              </span>
              <span class="brand-title">ERRANTE</span>
            </div>
            <p class="brand-bio">
              Mixología de autor, barras móviles de alta gama y hospitalidad refinada para bodas, eventos corporativos y celebraciones privadas exclusivas.
            </p>
            <div class="social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Instagram de Errante">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://wa.me/34910200300" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="WhatsApp de Errante">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
              <a href="mailto:hola@errante-cocktails.com" class="social-btn" aria-label="Email de contacto">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </a>
            </div>
          </div>

          <!-- Columna 2: Navegación Rápida -->
          <div class="footer-col">
            <h4 class="col-title">Explorar</h4>
            <ul class="footer-links">
              <li><a routerLink="/">Inicio</a></li>
              <li><a routerLink="/carta">Carta de Cócteles</a></li>
              <li><a routerLink="/eventos">Eventos & Servicios</a></li>
              <li><a routerLink="/nosotros">Sobre Nosotros</a></li>
              <li><a routerLink="/contacto">Pedir Presupuesto</a></li>
            </ul>
          </div>

          <!-- Columna 3: Categorías de Cócteles -->
          <div class="footer-col">
            <h4 class="col-title">Nuestra Carta</h4>
            <ul class="footer-links">
              <li><a routerLink="/carta" [queryParams]="{ cat: 'clasicos' }">Clásicos Revisitados</a></li>
              <li><a routerLink="/carta" [queryParams]="{ cat: 'autor' }">Cócteles de Autor</a></li>
              <li><a routerLink="/carta" [queryParams]="{ cat: 'fresh' }">Fresh & Botánicos</a></li>
              <li><a routerLink="/carta" [queryParams]="{ cat: 'tropicales' }">Tiki & Tropicales</a></li>
              <li><a routerLink="/carta" [queryParams]="{ cat: 'sin-alcohol' }">Mocktails 0.0</a></li>
            </ul>
          </div>

          <!-- Columna 4: Contacto Directo -->
          <div class="footer-col contact-col">
            <h4 class="col-title">Atención al Cliente</h4>
            <div class="contact-details">
              <p class="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>+34 910 200 300</span>
              </p>
              <p class="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span>hola&#64;errante-cocktails.com</span>
              </p>
              <p class="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Madrid & Cobertura en toda España</span>
              </p>
            </div>
            <a routerLink="/contacto" class="btn btn-outline-gold btn-sm mt-3">
              Contactar Ahora
            </a>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="copyright">
            © {{ currentYear }} ERRANTE COCKTAILS S.L. Todos los derechos reservados.
          </p>
          <p class="disclaimer">
            Disfruta de un consumo responsable. Servicio exclusivo para eventos mayores de edad.
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
      background: #08090b;
      border-top: 1px solid var(--border-subtle);
      padding-top: 4.5rem;
      padding-bottom: 2.5rem;
      margin-top: auto;
      color: var(--text-secondary);
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1.5fr;
      gap: 3rem;
      margin-bottom: 3.5rem;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 2.5rem;
      }

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }

    .brand-col {
      .logo-group {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        margin-bottom: 1rem;

        .logo-icon {
          color: var(--accent-gold);
        }

        .brand-title {
          font-size: 1.4rem;
          font-family: var(--font-serif);
          font-weight: 700;
          letter-spacing: 0.16em;
          color: var(--text-primary);
        }
      }

      .brand-bio {
        font-size: 0.88rem;
        color: var(--text-muted);
        line-height: 1.6;
        margin-bottom: 1.5rem;
        max-width: 320px;
      }
    }

    .social-links {
      display: flex;
      gap: 0.75rem;

      .social-btn {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary);
        transition: all var(--transition-fast);

        &:hover {
          background: var(--accent-gold);
          color: #0b0c0e;
          border-color: var(--accent-gold);
          transform: translateY(-2px);
        }
      }
    }

    .col-title {
      font-size: 0.85rem;
      font-family: var(--font-sans);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--accent-gold);
      margin-bottom: 1.25rem;
    }

    .footer-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      li a {
        font-size: 0.9rem;
        color: var(--text-secondary);
        transition: all var(--transition-fast);

        &:hover {
          color: var(--accent-gold);
          padding-left: 4px;
        }
      }
    }

    .contact-details {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      margin-bottom: 1rem;

      .contact-item {
        display: flex;
        align-items: flex-start;
        gap: 0.6rem;
        font-size: 0.88rem;
        color: var(--text-secondary);
        line-height: 1.4;

        svg {
          flex-shrink: 0;
          margin-top: 2px;
        }
      }
    }

    .footer-bottom {
      padding-top: 2rem;
      border-top: 1px solid var(--border-subtle);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      font-size: 0.8rem;
      color: var(--text-dimmed);

      @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {
  readonly siteService = inject(SiteContentService);
  readonly currentYear = new Date().getFullYear();
}
