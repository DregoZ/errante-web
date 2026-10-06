import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="site-header" [class.scrolled]="isScrolled()">
      <div class="container header-container">
        <!-- Logo / Marca -->
        <a routerLink="/" class="brand-logo" (click)="closeMobileMenu()">
          <span class="logo-mark">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M8 22h8"></path>
              <path d="M12 11v11"></path>
              <path d="m19 3-7 8-7-8Z"></path>
            </svg>
          </span>
          <div class="logo-text-group">
            <span class="brand-title">ERRANTE</span>
            <span class="brand-sub">COCTELERÍA PARA EVENTOS</span>
          </div>
        </a>

        <!-- Navegación Desktop -->
        <nav class="desktop-nav" aria-label="Navegación principal">
          <ul class="nav-list">
            <li>
              <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-link">
                Inicio
              </a>
            </li>
            <li>
              <a routerLink="/carta" routerLinkActive="active" class="nav-link">
                Carta de Cócteles
              </a>
            </li>
            <li>
              <a routerLink="/eventos" routerLinkActive="active" class="nav-link">
                Eventos & Servicios
              </a>
            </li>
            <li>
              <a routerLink="/nosotros" routerLinkActive="active" class="nav-link">
                Sobre Nosotros
              </a>
            </li>
            <li>
              <a routerLink="/contacto" routerLinkActive="active" class="nav-link">
                Contacto
              </a>
            </li>
          </ul>
        </nav>

        <!-- CTA Header -->
        <div class="header-actions">
          <a routerLink="/contacto" class="btn btn-gold btn-sm hide-mobile">
            Pedir Presupuesto
          </a>

          <!-- Botón Hamburguesa Móvil -->
          <button 
            type="button" 
            class="mobile-toggle"
            [class.is-open]="isMobileMenuOpen()"
            (click)="toggleMobileMenu()" 
            [attr.aria-expanded]="isMobileMenuOpen()"
            aria-label="Abrir menú de navegación"
          >
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </button>
        </div>
      </div>

      <!-- Menú Drawer Móvil -->
      <div class="mobile-drawer" [class.is-open]="isMobileMenuOpen()" (click)="closeMobileMenu()">
        <div class="drawer-content" (click)="$event.stopPropagation()">
          <nav aria-label="Navegación móvil">
            <ul class="mobile-nav-list">
              <li>
                <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="closeMobileMenu()" class="mobile-nav-link">
                  <span>01</span> Inicio
                </a>
              </li>
              <li>
                <a routerLink="/carta" routerLinkActive="active" (click)="closeMobileMenu()" class="mobile-nav-link">
                  <span>02</span> Carta de Cócteles
                </a>
              </li>
              <li>
                <a routerLink="/eventos" routerLinkActive="active" (click)="closeMobileMenu()" class="mobile-nav-link">
                  <span>03</span> Eventos & Servicios
                </a>
              </li>
              <li>
                <a routerLink="/nosotros" routerLinkActive="active" (click)="closeMobileMenu()" class="mobile-nav-link">
                  <span>04</span> Sobre Nosotros
                </a>
              </li>
              <li>
                <a routerLink="/contacto" routerLinkActive="active" (click)="closeMobileMenu()" class="mobile-nav-link">
                  <span>05</span> Contacto & Presupuesto
                </a>
              </li>
            </ul>
          </nav>

          <div class="drawer-footer">
            <a routerLink="/contacto" (click)="closeMobileMenu()" class="btn btn-gold btn-lg w-full">
              Solicitar Presupuesto
            </a>
            <div class="drawer-contact">
              <a href="tel:+34910200300" class="drawer-phone">📞 +34 910 200 300</a>
              <span class="drawer-tagline">Barras móviles de diseño para eventos</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .site-header {
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(11, 12, 14, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-subtle);
      transition: all var(--transition-normal);
      height: 80px;
      display: flex;
      align-items: center;

      &.scrolled {
        background: rgba(11, 12, 14, 0.96);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        height: 72px;
      }
    }

    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
    }

    // Logo
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;

      .logo-mark {
        width: 38px;
        height: 38px;
        border-radius: var(--radius-sm);
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(199, 125, 70, 0.15));
        border: 1px solid var(--border-gold);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--accent-gold);
        transition: transform var(--transition-fast);
      }

      &:hover .logo-mark {
        transform: rotate(-10deg) scale(1.05);
      }
    }

    .logo-text-group {
      display: flex;
      flex-direction: column;
    }

    .brand-title {
      font-size: 1.45rem;
      font-family: var(--font-serif);
      font-weight: 700;
      letter-spacing: 0.18em;
      color: var(--text-primary);
      line-height: 1;
    }

    .brand-sub {
      font-size: 0.62rem;
      font-weight: 600;
      letter-spacing: 0.16em;
      color: var(--accent-gold);
      margin-top: 2px;
    }

    // Desktop Nav
    .desktop-nav {
      @media (max-width: 960px) {
        display: none;
      }
    }

    .nav-list {
      display: flex;
      align-items: center;
      gap: 2rem;
      list-style: none;
    }

    .nav-link {
      font-size: 0.92rem;
      font-weight: 500;
      color: var(--text-secondary);
      letter-spacing: 0.02em;
      position: relative;
      padding: 0.5rem 0;
      transition: color var(--transition-fast);

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--accent-gold);
        transition: width var(--transition-fast);
      }

      &:hover, &.active {
        color: var(--text-primary);

        &::after {
          width: 100%;
        }
      }

      &.active {
        color: var(--accent-gold);
      }
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .hide-mobile {
      @media (max-width: 768px) {
        display: none;
      }
    }

    // Hamburguesa Móvil
    .mobile-toggle {
      display: none;
      flex-direction: column;
      justify-content: space-between;
      width: 32px;
      height: 22px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      z-index: 1010;

      @media (max-width: 960px) {
        display: flex;
      }

      .bar {
        width: 100%;
        height: 2px;
        background: var(--text-primary);
        border-radius: 2px;
        transition: all var(--transition-normal);
      }

      &.is-open {
        .bar:nth-child(1) {
          transform: translateY(10px) rotate(45deg);
          background: var(--accent-gold);
        }
        .bar:nth-child(2) {
          opacity: 0;
        }
        .bar:nth-child(3) {
          transform: translateY(-10px) rotate(-45deg);
          background: var(--accent-gold);
        }
      }
    }

    // Drawer Móvil
    .mobile-drawer {
      position: fixed;
      inset: 0;
      background: rgba(8, 9, 11, 0.9);
      backdrop-filter: blur(16px);
      z-index: 1005;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--transition-normal);

      &.is-open {
        opacity: 1;
        pointer-events: auto;

        .drawer-content {
          transform: translateX(0);
        }
      }
    }

    .drawer-content {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 85%;
      max-width: 380px;
      background: var(--bg-card);
      border-left: 1px solid var(--border-gold);
      padding: 6.5rem 2rem 2.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transform: translateX(100%);
      transition: transform var(--transition-normal);
      overflow-y: auto;
    }

    .mobile-nav-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .mobile-nav-link {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 1.3rem;
      font-family: var(--font-serif);
      color: var(--text-secondary);
      padding: 0.6rem 0;
      border-bottom: 1px solid var(--border-subtle);

      span {
        font-family: var(--font-sans);
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--accent-gold);
      }

      &.active {
        color: var(--accent-gold);
      }
    }

    .drawer-footer {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-top: 2rem;

      .w-full {
        width: 100%;
      }
    }

    .drawer-contact {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      text-align: center;

      .drawer-phone {
        font-size: 0.95rem;
        color: var(--accent-gold);
        font-weight: 600;
      }

      .drawer-tagline {
        font-size: 0.75rem;
        color: var(--text-muted);
      }
    }
  `]
})
export class HeaderComponent {
  readonly isScrolled = signal(false);
  readonly isMobileMenuOpen = signal(false);

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
